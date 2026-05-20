<script setup lang="ts">
import {
  computed,
  nextTick,
  ref,
  shallowRef,
  toRef,
  watch,
  type CSSProperties,
} from 'vue'
import {
  useNamespace,
  usePopper,
  useClickOutside,
  useFormDisabled,
  useFormSize,
  useFormItem,
  useZIndex,
} from '@stellux/hooks'
import { cascaderProps, cascaderEmits } from './cascader'
import type { CascaderOption } from './cascader'
import StxScrollbar from '../scrollbar/scrollbar.vue'

defineOptions({ name: 'StxCascader' })

const props = defineProps(cascaderProps)
const emit = defineEmits(cascaderEmits)

const ns = useNamespace('cascader')
const { nextZIndex } = useZIndex()
const { formItem } = useFormItem()
const actualDisabled = useFormDisabled(props)
const actualSize = useFormSize(props)

// Refs
const cascaderRef = shallowRef<HTMLElement>()
const triggerRef = shallowRef<HTMLElement>()
const menuRef = shallowRef<HTMLElement>()

// State
const menuVisible = ref(false)
const currentZIndex = ref(2000)
const isFocused = ref(false)
const filterQuery = ref('')

// Property accessors
const valueKey = computed(() => props.props?.value || 'value')
const labelKey = computed(() => props.props?.label || 'label')
const childrenKey = computed(() => props.props?.children || 'children')
const disabledKey = computed(() => props.props?.disabled || 'disabled')
const leafKey = computed(() => props.props?.leaf || 'leaf')
const expandTrigger = computed(() => props.props?.expandTrigger || 'click')
const emitPath = computed(() => props.props?.emitPath !== false)

function getOptValue(opt: CascaderOption): any {
  return (opt as any)[valueKey.value] ?? opt.value
}

function getOptLabel(opt: CascaderOption): string {
  return (opt as any)[labelKey.value] ?? opt.label
}

function getOptChildren(opt: CascaderOption): CascaderOption[] | undefined {
  return (opt as any)[childrenKey.value] ?? opt.children
}

function isOptDisabled(opt: CascaderOption): boolean {
  return !!(opt as any)[disabledKey.value]
}

function isOptLeaf(opt: CascaderOption): boolean {
  if ((opt as any)[leafKey.value] !== undefined) return (opt as any)[leafKey.value]
  const children = getOptChildren(opt)
  return !children || children.length === 0
}

// Track active selection path at each level
const activeValues = ref<any[]>([])

// Panels: computed from activeValues walking the options tree
const activePanels = computed(() => {
  const panels: CascaderOption[][] = [props.options]
  let currentOptions = props.options

  for (const val of activeValues.value) {
    const found = currentOptions.find(
      (opt) => getOptValue(opt) === val
    )
    if (found) {
      const children = getOptChildren(found)
      if (children && children.length > 0) {
        panels.push(children)
        currentOptions = children
      } else {
        break
      }
    } else {
      break
    }
  }

  return panels
})

// Display value
const displayValue = computed(() => {
  if (filterQuery.value && menuVisible.value) return filterQuery.value

  const path = props.modelValue
  if (!path || path.length === 0) return ''

  if (!props.showAllLevels) {
    // Show only the last level label
    const lastVal = path[path.length - 1]
    const label = findLabelByValue(props.options, lastVal)
    return label || String(lastVal)
  }

  // Show full path
  const labels: string[] = []
  let currentOptions = props.options

  for (const val of path) {
    const found = currentOptions.find(
      (opt) => getOptValue(opt) === val
    )
    if (found) {
      labels.push(getOptLabel(found))
      const children = getOptChildren(found)
      if (children) {
        currentOptions = children
      }
    } else {
      labels.push(String(val))
      break
    }
  }

  return labels.join(props.separator)
})

function findLabelByValue(
  options: CascaderOption[],
  val: any
): string | undefined {
  for (const opt of options) {
    if (getOptValue(opt) === val) return getOptLabel(opt)
    const children = getOptChildren(opt)
    if (children) {
      const found = findLabelByValue(children, val)
      if (found) return found
    }
  }
  return undefined
}

// Popper
const { x, y, placement, update: updatePopper } = usePopper(
  triggerRef,
  menuRef,
  {
    placement: ref('bottom-start') as any,
    offset: ref(4),
  }
)

const floatingStyles = computed<CSSProperties>(() => {
  return {
    position: 'absolute',
    left: `${x.value}px`,
    top: `${y.value}px`,
    zIndex: currentZIndex.value,
  }
})

// Click outside
useClickOutside([cascaderRef, menuRef], () => {
  if (menuVisible.value) {
    closeMenu()
  }
})

// Node active check
function isNodeActive(opt: CascaderOption, level: number): boolean {
  return activeValues.value[level] === getOptValue(opt)
}

// Handlers
function toggleMenu() {
  if (actualDisabled.value) return
  if (menuVisible.value) {
    closeMenu()
  } else {
    openMenu()
  }
}

function openMenu() {
  if (actualDisabled.value) return
  currentZIndex.value = nextZIndex()
  menuVisible.value = true

  // Restore active path from modelValue
  if (props.modelValue.length > 0) {
    activeValues.value = [...props.modelValue]
  }

  emit('visible-change', true)
  nextTick(() => updatePopper())
}

function closeMenu() {
  menuVisible.value = false
  filterQuery.value = ''
  emit('visible-change', false)
}

function handleNodeClick(opt: CascaderOption, level: number) {
  if (isOptDisabled(opt)) return

  const val = getOptValue(opt)

  // Update active values up to this level
  const newActiveValues = activeValues.value.slice(0, level)
  newActiveValues[level] = val
  activeValues.value = newActiveValues

  emit('expand-change', [...newActiveValues])

  if (isOptLeaf(opt)) {
    // This is a leaf node, select it
    const selectedPath = [...newActiveValues]
    const emitValue = emitPath.value ? selectedPath : [val]
    emit('update:modelValue', emitValue)
    emit('change', emitValue)
    formItem?.validate('change')
    closeMenu()
  } else {
    // Has children, update popper after expansion
    nextTick(() => updatePopper())
  }
}

function handleNodeExpand(opt: CascaderOption, level: number) {
  if (isOptDisabled(opt)) return
  if (isOptLeaf(opt)) return

  const val = getOptValue(opt)
  const newActiveValues = activeValues.value.slice(0, level)
  newActiveValues[level] = val
  activeValues.value = newActiveValues

  emit('expand-change', [...newActiveValues])
  nextTick(() => updatePopper())
}

function handleClear() {
  emit('update:modelValue', [])
  emit('change', [])
  emit('clear')
  activeValues.value = []
  formItem?.validate('change')
}

function handleFocus(evt: FocusEvent) {
  isFocused.value = true
  emit('focus', evt)
}

function handleBlur(evt: FocusEvent) {
  isFocused.value = false
  emit('blur', evt)
  formItem?.validate('blur')
}

// Filterable search
const filteredOptions = computed<
  Array<{ path: CascaderOption[]; labels: string[] }>
>(() => {
  if (!props.filterable || !filterQuery.value) return []

  const results: Array<{ path: CascaderOption[]; labels: string[] }> = []
  const query = filterQuery.value.toLowerCase()

  function walk(options: CascaderOption[], path: CascaderOption[], labels: string[]) {
    for (const opt of options) {
      const currentPath = [...path, opt]
      const currentLabels = [...labels, getOptLabel(opt)]
      const children = getOptChildren(opt)

      if (isOptLeaf(opt)) {
        const fullLabel = currentLabels.join(props.separator).toLowerCase()
        if (
          props.filterMethod
            ? (props.filterMethod as any)(filterQuery.value, currentPath)
            : fullLabel.includes(query)
        ) {
          results.push({ path: currentPath, labels: currentLabels })
        }
      } else if (children) {
        walk(children, currentPath, currentLabels)
      }
    }
  }

  walk(props.options, [], [])
  return results
})

function handleFilterSelect(item: { path: CascaderOption[]; labels: string[] }) {
  const values = item.path.map((opt) => getOptValue(opt))
  const emitValue = emitPath.value ? values : [values[values.length - 1]]
  emit('update:modelValue', emitValue)
  emit('change', emitValue)
  formItem?.validate('change')
  closeMenu()
}

let debounceTimer: ReturnType<typeof setTimeout> | null = null
function handleFilterInput(evt: Event) {
  const val = (evt.target as HTMLInputElement).value
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    filterQuery.value = val
  }, props.debounce)
}

const showClear = computed(() => {
  return props.clearable && props.modelValue.length > 0 && !actualDisabled.value
})

const isFiltering = computed(() => {
  return props.filterable && filterQuery.value && menuVisible.value
})

defineExpose({
  toggleMenu,
  contentRef: menuRef,
})
</script>

<template>
  <div
    ref="cascaderRef"
    :class="[
      ns.b(),
      actualSize !== 'default' && actualSize ? ns.m(actualSize) : '',
      ns.is('disabled', actualDisabled),
      ns.is('focus', isFocused || menuVisible),
    ]"
    @click.stop="toggleMenu"
  >
    <div ref="triggerRef" :class="ns.e('trigger')">
      <input
        :class="ns.e('input')"
        :value="filterable && menuVisible ? filterQuery : displayValue"
        :placeholder="displayValue || placeholder"
        :readonly="!filterable"
        :disabled="actualDisabled"
        autocomplete="off"
        @input="handleFilterInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown.esc.stop.prevent="closeMenu"
      />
      <span :class="ns.e('suffix')">
        <span
          v-if="showClear"
          :class="ns.e('clear')"
          @click.stop="handleClear"
        >
          <svg
            viewBox="0 0 24 24"
            width="1em"
            height="1em"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </span>
        <svg
          :class="[ns.e('arrow'), ns.is('reverse', menuVisible)]"
          viewBox="0 0 24 24"
          width="1em"
          height="1em"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </span>
    </div>

    <Teleport to="body" :disabled="!teleported">
      <Transition name="stx-zoom-in-top">
        <div
          v-show="menuVisible"
          ref="menuRef"
          :class="[ns.e('dropdown'), popperClass]"
          :style="floatingStyles"
        >
          <!-- Filter suggestion list -->
          <div v-if="isFiltering" :class="ns.e('suggestion')">
            <stx-scrollbar>
              <ul :class="ns.e('suggestion-list')">
                <li
                  v-for="(item, idx) in filteredOptions"
                  :key="idx"
                  :class="ns.e('suggestion-item')"
                  @click.stop="handleFilterSelect(item)"
                >
                  {{ item.labels.join(separator) }}
                </li>
                <li
                  v-if="filteredOptions.length === 0"
                  :class="ns.e('empty')"
                >
                  No matching data
                </li>
              </ul>
            </stx-scrollbar>
          </div>

          <!-- Cascading panels -->
          <div v-else :class="ns.e('panels')">
            <div
              v-for="(panel, level) in activePanels"
              :key="level"
              :class="ns.e('panel')"
            >
              <stx-scrollbar>
                <ul :class="ns.e('menu')">
                  <li
                    v-for="opt in panel"
                    :key="getOptValue(opt)"
                    :class="[
                      ns.e('node'),
                      ns.is('active', isNodeActive(opt, level)),
                      ns.is('disabled', isOptDisabled(opt)),
                    ]"
                    @click.stop="handleNodeClick(opt, level)"
                    @mouseenter="
                      expandTrigger === 'hover' &&
                        handleNodeExpand(opt, level)
                    "
                  >
                    <span :class="ns.e('node-label')">{{
                      getOptLabel(opt)
                    }}</span>
                    <svg
                      v-if="!isOptLeaf(opt)"
                      :class="ns.e('node-arrow')"
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </li>
                </ul>
              </stx-scrollbar>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
