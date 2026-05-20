<script setup lang="ts">
import {
  computed,
  nextTick,
  provide,
  ref,
  shallowRef,
  toRef,
  watch,
  type CSSProperties,
} from 'vue'
import {
  useNamespace,
  useZIndex,
  useClickOutside,
  usePopper,
  useFormItem,
  useFormDisabled,
  useFormSize,
} from '@stellux/hooks'
import { selectProps, selectEmits } from './select'
import { selectContextKey, type SelectContext } from './constants'
import StxScrollbar from '../scrollbar/scrollbar.vue'
import StxTag from '../tag/tag.vue'

defineOptions({ name: 'StxSelect' })

const props = defineProps(selectProps)
const emit = defineEmits(selectEmits)

const ns = useNamespace('select')
const { nextZIndex } = useZIndex()
const { formItem } = useFormItem()
const actualDisabled = useFormDisabled(props)
const actualSize = useFormSize(props)

// Refs
const selectRef = shallowRef<HTMLElement>()
const triggerRef = shallowRef<HTMLElement>()
const menuRef = shallowRef<HTMLElement>()
const inputRef = shallowRef<HTMLInputElement>()

// State
const menuVisible = ref(false)
const isFocused = ref(false)
const filterQuery = ref('')
const hoveredValue = ref<any>(null)
const currentZIndex = ref(2000)

// Options registry
const options = ref(new Map<any, { value: any; label: string; disabled: boolean }>())

function registerOption(value: any, data: { label: string; disabled: boolean }) {
  options.value.set(value, { value, ...data })
}

function unregisterOption(value: any) {
  options.value.delete(value)
}

// Popper
const { x, y, placement, update: updatePopper } = usePopper(triggerRef, menuRef, {
  placement: toRef(props, 'placement') as any,
  offset: toRef(props, 'offset'),
})

const floatingStyles = computed<CSSProperties>(() => {
  const width = triggerRef.value ? `${triggerRef.value.offsetWidth}px` : 'auto'
  return {
    position: 'absolute',
    left: `${x.value}px`,
    top: `${y.value}px`,
    zIndex: currentZIndex.value,
    minWidth: width,
  }
})

// Click outside
useClickOutside([selectRef, menuRef], () => {
  if (menuVisible.value) {
    closeMenu()
  }
})

// Selected options (resolved from the options map)
const selectedOptions = computed(() => {
  if (!props.multiple) return []
  const val = props.modelValue
  if (!Array.isArray(val)) return []
  return val.map((v: any) => {
    const opt = options.value.get(v)
    return { value: v, label: opt ? opt.label : String(v) }
  })
})

const selectedLabel = computed(() => {
  if (props.multiple) return ''
  if (props.modelValue == null || props.modelValue === '') return ''
  const opt = options.value.get(props.modelValue)
  return opt ? opt.label : String(props.modelValue)
})

const currentPlaceholder = computed(() => {
  if (props.multiple && Array.isArray(props.modelValue) && props.modelValue.length > 0) {
    return ''
  }
  if (!props.multiple && props.modelValue != null && props.modelValue !== '') {
    return selectedLabel.value
  }
  return props.placeholder
})

const displayInputValue = computed(() => {
  if (props.filterable && menuVisible.value) {
    return filterQuery.value
  }
  if (props.multiple) return ''
  return selectedLabel.value
})

// Filtered options empty check
const filteredOptionsEmpty = computed(() => {
  if (options.value.size === 0) return true
  if (!props.filterable || !filterQuery.value) return false
  // Check if any option is visible
  for (const [, opt] of options.value) {
    if (opt.label.toLowerCase().includes(filterQuery.value.toLowerCase())) {
      return false
    }
  }
  return true
})

const showClear = computed(() => {
  if (!props.clearable || actualDisabled.value) return false
  if (props.multiple) {
    return Array.isArray(props.modelValue) && props.modelValue.length > 0
  }
  return props.modelValue != null && props.modelValue !== ''
})

// Visible options for keyboard nav
function getVisibleOptions(): Array<{ value: any; label: string; disabled: boolean }> {
  const result: Array<{ value: any; label: string; disabled: boolean }> = []
  for (const [, opt] of options.value) {
    if (opt.disabled) continue
    if (props.filterable && filterQuery.value) {
      if (!opt.label.toLowerCase().includes(filterQuery.value.toLowerCase())) continue
    }
    result.push(opt)
  }
  return result
}

// Handlers
function isSelected(value: any): boolean {
  if (props.multiple) {
    return Array.isArray(props.modelValue) && props.modelValue.includes(value)
  }
  return props.modelValue === value
}

function handleOptionSelect(value: any, label: string) {
  if (props.multiple) {
    const current = Array.isArray(props.modelValue) ? [...props.modelValue] : []
    const idx = current.indexOf(value)
    if (idx > -1) {
      current.splice(idx, 1)
    } else {
      if (props.multipleLimit > 0 && current.length >= props.multipleLimit) return
      current.push(value)
    }
    emit('update:modelValue', current)
    emit('change', current)
    // Keep menu open for multi-select, clear filter
    filterQuery.value = ''
    nextTick(() => {
      updatePopper()
      inputRef.value?.focus()
    })
  } else {
    emit('update:modelValue', value)
    emit('change', value)
    closeMenu()
    filterQuery.value = ''
  }
  formItem?.validate('change')
}

function removeTag(value: any) {
  if (actualDisabled.value) return
  const current = Array.isArray(props.modelValue) ? [...props.modelValue] : []
  const idx = current.indexOf(value)
  if (idx > -1) {
    current.splice(idx, 1)
    emit('update:modelValue', current)
    emit('change', current)
    emit('remove-tag', value)
    formItem?.validate('change')
    nextTick(() => updatePopper())
  }
}

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
  emit('visible-change', true)
  nextTick(() => {
    updatePopper()
    inputRef.value?.focus()
  })
}

function closeMenu() {
  menuVisible.value = false
  filterQuery.value = ''
  hoveredValue.value = null
  emit('visible-change', false)
}

function handleClear() {
  if (props.multiple) {
    emit('update:modelValue', [])
    emit('change', [])
  } else {
    emit('update:modelValue', undefined)
    emit('change', undefined)
  }
  emit('clear')
  filterQuery.value = ''
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

function onFilterInput(evt: Event) {
  const target = evt.target as HTMLInputElement
  filterQuery.value = target.value
  hoveredValue.value = null
  nextTick(() => updatePopper())
}

function setHovered(value: any) {
  hoveredValue.value = value
}

// Keyboard navigation
function navigateDown() {
  const visible = getVisibleOptions()
  if (visible.length === 0) return
  const currentIdx = visible.findIndex((o) => o.value === hoveredValue.value)
  const nextIdx = currentIdx < visible.length - 1 ? currentIdx + 1 : 0
  hoveredValue.value = visible[nextIdx].value
}

function navigateUp() {
  const visible = getVisibleOptions()
  if (visible.length === 0) return
  const currentIdx = visible.findIndex((o) => o.value === hoveredValue.value)
  const nextIdx = currentIdx > 0 ? currentIdx - 1 : visible.length - 1
  hoveredValue.value = visible[nextIdx].value
}

function handleEnter() {
  if (!menuVisible.value) {
    openMenu()
    return
  }
  if (hoveredValue.value != null) {
    const opt = options.value.get(hoveredValue.value)
    if (opt && !opt.disabled) {
      handleOptionSelect(opt.value, opt.label)
    }
  }
}

// When menu opens via filterable, set the input to be editable
watch(menuVisible, (visible) => {
  if (visible && props.filterable) {
    nextTick(() => {
      inputRef.value?.focus()
    })
  }
})

// Provide context
provide(selectContextKey, {
  modelValue: toRef(props, 'modelValue'),
  multiple: toRef(props, 'multiple'),
  disabled: actualDisabled,
  filterQuery,
  handleOptionSelect,
  isSelected,
  hoveredValue,
  setHovered,
  registerOption,
  unregisterOption,
} as SelectContext)

defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  toggleMenu,
})
</script>

<template>
  <div
    ref="selectRef"
    :class="[
      ns.b(),
      actualSize !== 'default' && ns.m(actualSize),
      ns.is('disabled', actualDisabled),
      ns.is('focus', isFocused || menuVisible),
    ]"
    @click.stop="toggleMenu"
  >
    <!-- Trigger area -->
    <div ref="triggerRef" :class="ns.e('trigger')">
      <!-- Multiple: tags -->
      <div v-if="multiple" :class="ns.e('tags')">
        <template v-if="collapseTags && selectedOptions.length > maxCollapseTags">
          <stx-tag
            v-for="opt in selectedOptions.slice(0, maxCollapseTags)"
            :key="opt.value"
            :closable="!actualDisabled"
            size="small"
            disable-transitions
            @close="removeTag(opt.value)"
          >
            {{ opt.label }}
          </stx-tag>
          <stx-tag size="small" disable-transitions>
            +{{ selectedOptions.length - maxCollapseTags }}
          </stx-tag>
        </template>
        <stx-tag
          v-else
          v-for="opt in selectedOptions"
          :key="opt.value"
          :closable="!actualDisabled"
          size="small"
          disable-transitions
          @close="removeTag(opt.value)"
        >
          {{ opt.label }}
        </stx-tag>
      </div>

      <!-- Input for filter or display -->
      <input
        ref="inputRef"
        :class="ns.e('input')"
        :value="displayInputValue"
        :placeholder="currentPlaceholder"
        :readonly="!filterable"
        :disabled="actualDisabled"
        @input="onFilterInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown.esc.stop.prevent="closeMenu"
        @keydown.enter.stop.prevent="handleEnter"
        @keydown.down.prevent="navigateDown"
        @keydown.up.prevent="navigateUp"
        autocomplete="off"
      />

      <!-- Suffix icons: arrow + clear -->
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

    <!-- Dropdown -->
    <Teleport to="body" :disabled="!teleported">
      <Transition name="stx-zoom-in-top">
        <div
          v-if="persistent ? true : menuVisible"
          v-show="menuVisible"
          ref="menuRef"
          :class="[ns.e('dropdown'), popperClass]"
          :style="floatingStyles"
        >
          <stx-scrollbar max-height="274px">
            <ul :class="ns.e('list')">
              <li v-if="loading" :class="ns.e('loading')">
                {{ loadingText }}
              </li>
              <li
                v-else-if="filteredOptionsEmpty && !loading"
                :class="ns.e('empty')"
              >
                {{ filterable && filterQuery ? noMatchText : noDataText }}
              </li>
              <slot v-else />
            </ul>
          </stx-scrollbar>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
