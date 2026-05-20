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
  useZIndex,
  useClickOutside,
  usePopper,
  useFormDisabled,
  useFormSize,
} from '@stellux/hooks'
import { treeSelectProps, treeSelectEmits } from './tree-select'
import StxTree from '../tree/tree.vue'
import StxTag from '../tag/tag.vue'
import StxScrollbar from '../scrollbar/scrollbar.vue'
import type { TreeNode } from '../tree/tree'

defineOptions({ name: 'StxTreeSelect' })

const props = defineProps(treeSelectProps)
const emit = defineEmits(treeSelectEmits)

const ns = useNamespace('tree-select')
const { nextZIndex } = useZIndex()
const actualDisabled = useFormDisabled(props)
const actualSize = useFormSize(props)

// Refs
const rootRef = shallowRef<HTMLElement>()
const triggerRef = shallowRef<HTMLElement>()
const dropdownRef = shallowRef<HTMLElement>()
const inputRef = shallowRef<HTMLInputElement>()
const treeRef = ref<InstanceType<typeof StxTree>>()

// State
const menuVisible = ref(false)
const filterQuery = ref('')
const currentZIndex = ref(2000)

// Popper
const { x, y, placement: actualPlacement, update: updatePopper } = usePopper(
  triggerRef,
  dropdownRef,
  {
    placement: toRef(props, 'placement') as any,
    offset: toRef(props, 'offset'),
  },
)

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
useClickOutside([rootRef, dropdownRef], () => {
  if (menuVisible.value) {
    closeMenu()
  }
})

// Build a label map from tree data for resolving display labels
function buildLabelMap(
  data: any[],
  map: Map<any, string>,
) {
  const labelProp = props.props.label || 'label'
  const childrenProp = props.props.children || 'children'
  const valueProp = props.props.value || 'value'

  for (const item of data) {
    const key = item[valueProp] ?? item[props.nodeKey]
    if (key != null) {
      map.set(key, item[labelProp] ?? String(key))
    }
    const children = item[childrenProp]
    if (Array.isArray(children)) {
      buildLabelMap(children, map)
    }
  }
}

const labelMap = computed(() => {
  const map = new Map<any, string>()
  buildLabelMap(props.data, map)
  return map
})

// Selected display
const selectedLabel = computed(() => {
  if (props.multiple) return ''
  if (props.modelValue == null || props.modelValue === '') return ''
  return labelMap.value.get(props.modelValue) ?? String(props.modelValue)
})

const selectedTags = computed(() => {
  if (!props.multiple || !Array.isArray(props.modelValue)) return []
  return props.modelValue.map((val: any) => ({
    value: val,
    label: labelMap.value.get(val) ?? String(val),
  }))
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

const showClear = computed(() => {
  if (!props.clearable || actualDisabled.value) return false
  if (props.multiple) {
    return Array.isArray(props.modelValue) && props.modelValue.length > 0
  }
  return props.modelValue != null && props.modelValue !== ''
})

// Tree props bridge
const treePropsComputed = computed(() => ({
  label: props.props.label || 'label',
  children: props.props.children || 'children',
  disabled: props.props.disabled || 'disabled',
}))

const treeDefaultCheckedKeys = computed(() => {
  if (props.multiple && props.showCheckbox && Array.isArray(props.modelValue)) {
    return props.modelValue
  }
  return []
})

// Handlers
function openMenu() {
  if (actualDisabled.value) return
  currentZIndex.value = nextZIndex()
  menuVisible.value = true
  emit('visible-change', true)
  nextTick(() => {
    updatePopper()
    if (props.filterable) {
      inputRef.value?.focus()
    }
  })
}

function closeMenu() {
  menuVisible.value = false
  filterQuery.value = ''
  emit('visible-change', false)
}

function toggleMenu() {
  if (actualDisabled.value) return
  if (menuVisible.value) {
    closeMenu()
  } else {
    openMenu()
  }
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

  // Reset tree checked state
  nextTick(() => {
    if (treeRef.value && props.showCheckbox) {
      treeRef.value.setCheckedKeys([])
    }
  })
}

function handleNodeClick(data: any, node: TreeNode) {
  if (node.disabled) return

  if (props.multiple && props.showCheckbox) {
    // Checkbox-based multi selection is handled via check event
    return
  }

  if (!props.multiple) {
    const valueProp = props.props.value || 'value'
    const val = data[valueProp] ?? node.key
    emit('update:modelValue', val)
    emit('change', val)
    closeMenu()
  }
}

function handleTreeCheck(
  _data: any,
  checkedInfo: { checkedNodes: any[]; checkedKeys: (string | number)[] },
) {
  if (!props.multiple || !props.showCheckbox) return
  emit('update:modelValue', [...checkedInfo.checkedKeys])
  emit('change', [...checkedInfo.checkedKeys])
}

function removeTag(value: any) {
  if (actualDisabled.value) return
  if (!Array.isArray(props.modelValue)) return
  const updated = props.modelValue.filter((v: any) => v !== value)
  emit('update:modelValue', updated)
  emit('change', updated)

  nextTick(() => {
    if (treeRef.value && props.showCheckbox) {
      treeRef.value.setCheckedKeys(updated)
    }
    updatePopper()
  })
}

function onFilterInput(evt: Event) {
  const target = evt.target as HTMLInputElement
  filterQuery.value = target.value
  nextTick(() => {
    if (treeRef.value && props.filterable) {
      const filterFn = props.filterMethod
        ? (value: string, data: any) => (props.filterMethod as Function)(value, data)
        : undefined
      if (filterFn) {
        treeRef.value.filter(filterQuery.value)
      } else {
        treeRef.value.filter(filterQuery.value)
      }
    }
    updatePopper()
  })
}

// Default filter method for tree
const treeFilterMethod = computed(() => {
  if (props.filterMethod) {
    return (value: string, data: any, node: TreeNode) =>
      (props.filterMethod as Function)(value, data)
  }
  if (props.filterable) {
    const labelProp = props.props.label || 'label'
    return (value: string, data: any) => {
      if (!value) return true
      return String(data[labelProp] ?? '')
        .toLowerCase()
        .includes(value.toLowerCase())
    }
  }
  return undefined
})

defineExpose({
  toggleMenu,
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
})
</script>

<template>
  <div
    ref="rootRef"
    :class="[
      ns.b(),
      actualSize !== 'default' && ns.m(actualSize),
      ns.is('disabled', actualDisabled),
      ns.is('focus', menuVisible),
    ]"
    @click.stop="toggleMenu"
  >
    <!-- Trigger -->
    <div ref="triggerRef" :class="ns.e('trigger')">
      <!-- Multiple tags -->
      <div v-if="multiple" :class="ns.e('tags')">
        <stx-tag
          v-for="tag in selectedTags"
          :key="tag.value"
          :closable="!actualDisabled"
          size="small"
          disable-transitions
          @close="removeTag(tag.value)"
        >
          {{ tag.label }}
        </stx-tag>
      </div>

      <!-- Input -->
      <input
        ref="inputRef"
        :class="ns.e('input')"
        :value="displayInputValue"
        :placeholder="currentPlaceholder"
        :readonly="!filterable"
        :disabled="actualDisabled"
        @input="onFilterInput"
        autocomplete="off"
      />

      <!-- Suffix icons -->
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
          v-show="menuVisible"
          ref="dropdownRef"
          :class="[ns.e('dropdown'), popperClass]"
          :style="floatingStyles"
          @click.stop
        >
          <stx-scrollbar max-height="274px">
            <stx-tree
              ref="treeRef"
              :data="data"
              :node-key="nodeKey"
              :props="treePropsComputed"
              :show-checkbox="showCheckbox"
              :check-strictly="checkStrictly"
              :check-on-click-node="checkOnClickNode"
              :default-expand-all="defaultExpandAll"
              :default-checked-keys="treeDefaultCheckedKeys"
              :filter-node-method="treeFilterMethod"
              :expand-on-click-node="!showCheckbox"
              highlight-current
              @node-click="handleNodeClick"
              @check="handleTreeCheck"
            />
          </stx-scrollbar>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
