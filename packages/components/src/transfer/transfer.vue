<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useNamespace, useFormDisabled } from '@stellux/hooks'
import { transferProps, transferEmits } from './transfer'
import type { TransferData } from './transfer'
import StxButton from '../button/button.vue'
import StxCheckbox from '../checkbox/checkbox.vue'
import StxCheckboxGroup from '../checkbox/checkbox-group.vue'
import StxInput from '../input/input.vue'
import StxScrollbar from '../scrollbar/scrollbar.vue'

defineOptions({ name: 'StxTransfer' })

const props = defineProps(transferProps)
const emit = defineEmits(transferEmits)

const ns = useNamespace('transfer')
const actualDisabled = useFormDisabled(props)

// Property accessors
function getKey(item: TransferData): string | number {
  return props.props?.key ? item[props.props.key] : item.key
}

function getLabel(item: TransferData): string {
  return props.props?.label ? item[props.props.label] : item.label
}

function isDisabled(item: TransferData): boolean {
  if (actualDisabled.value) return true
  const disabledKey = props.props?.disabled || 'disabled'
  return !!item[disabledKey]
}

// Checked states
const leftChecked = ref<(string | number)[]>([...props.leftDefaultChecked])
const rightChecked = ref<(string | number)[]>([...props.rightDefaultChecked])

// Filter queries
const leftQuery = ref('')
const rightQuery = ref('')

// Source data: items NOT in modelValue
const leftData = computed(() => {
  return props.data.filter((item) => !props.modelValue.includes(getKey(item)))
})

// Target data: items IN modelValue (order depends on targetOrder)
const rightData = computed(() => {
  if (props.targetOrder === 'original') {
    return props.data.filter((item) => props.modelValue.includes(getKey(item)))
  }
  return props.modelValue
    .map((key) => props.data.find((item) => getKey(item) === key))
    .filter(Boolean) as TransferData[]
})

// Filtered data
const filteredLeftData = computed(() => {
  if (!props.filterable || !leftQuery.value) return leftData.value
  const query = leftQuery.value
  if (props.filterMethod) {
    return leftData.value.filter((item) => props.filterMethod!(query, item))
  }
  return leftData.value.filter((item) =>
    getLabel(item).toLowerCase().includes(query.toLowerCase())
  )
})

const filteredRightData = computed(() => {
  if (!props.filterable || !rightQuery.value) return rightData.value
  const query = rightQuery.value
  if (props.filterMethod) {
    return rightData.value.filter((item) => props.filterMethod!(query, item))
  }
  return rightData.value.filter((item) =>
    getLabel(item).toLowerCase().includes(query.toLowerCase())
  )
})

// Check-all states
const isAllLeftChecked = computed(() => {
  const checkable = filteredLeftData.value.filter((item) => !isDisabled(item))
  if (checkable.length === 0) return false
  return checkable.every((item) => leftChecked.value.includes(getKey(item)))
})

const isLeftIndeterminate = computed(() => {
  const checkable = filteredLeftData.value.filter((item) => !isDisabled(item))
  if (checkable.length === 0) return false
  const checked = checkable.filter((item) =>
    leftChecked.value.includes(getKey(item))
  )
  return checked.length > 0 && checked.length < checkable.length
})

const isAllRightChecked = computed(() => {
  const checkable = filteredRightData.value.filter((item) => !isDisabled(item))
  if (checkable.length === 0) return false
  return checkable.every((item) => rightChecked.value.includes(getKey(item)))
})

const isRightIndeterminate = computed(() => {
  const checkable = filteredRightData.value.filter((item) => !isDisabled(item))
  if (checkable.length === 0) return false
  const checked = checkable.filter((item) =>
    rightChecked.value.includes(getKey(item))
  )
  return checked.length > 0 && checked.length < checkable.length
})

// Check-all handlers
function handleCheckAllLeft(checked: any) {
  const checkable = filteredLeftData.value.filter((item) => !isDisabled(item))
  if (checked) {
    leftChecked.value = checkable.map((item) => getKey(item))
  } else {
    leftChecked.value = []
  }
}

function handleCheckAllRight(checked: any) {
  const checkable = filteredRightData.value.filter((item) => !isDisabled(item))
  if (checked) {
    rightChecked.value = checkable.map((item) => getKey(item))
  } else {
    rightChecked.value = []
  }
}

// Transfer actions
function transferToRight() {
  const movedKeys = [...leftChecked.value]
  let newModelValue: (string | number)[]

  if (props.targetOrder === 'unshift') {
    newModelValue = [...movedKeys, ...props.modelValue]
  } else {
    newModelValue = [...props.modelValue, ...movedKeys]
  }

  emit('update:modelValue', newModelValue)
  emit('change', newModelValue, 'right', movedKeys)
  leftChecked.value = []
}

function transferToLeft() {
  const movedKeys = [...rightChecked.value]
  const newModelValue = props.modelValue.filter(
    (key) => !movedKeys.includes(key)
  )

  emit('update:modelValue', newModelValue)
  emit('change', newModelValue, 'left', movedKeys)
  rightChecked.value = []
}

// Emit check change events
watch(leftChecked, (val) => {
  emit('left-check-change', val, [])
})

watch(rightChecked, (val) => {
  emit('right-check-change', val, [])
})

// Clean up checked values when data moves
watch(
  () => props.modelValue,
  () => {
    // Remove checked items that no longer belong to a panel
    const leftKeys = leftData.value.map((item) => getKey(item))
    leftChecked.value = leftChecked.value.filter((key) =>
      leftKeys.includes(key)
    )

    const rightKeys = rightData.value.map((item) => getKey(item))
    rightChecked.value = rightChecked.value.filter((key) =>
      rightKeys.includes(key)
    )
  }
)
</script>

<template>
  <div :class="[ns.b(), ns.is('disabled', actualDisabled)]">
    <!-- Left panel -->
    <div :class="ns.e('panel')">
      <div :class="ns.e('panel-header')">
        <stx-checkbox
          :model-value="isAllLeftChecked"
          :indeterminate="isLeftIndeterminate"
          :disabled="actualDisabled"
          @change="handleCheckAllLeft"
        >
          {{ (titles as [string, string])[0] }}
        </stx-checkbox>
        <span :class="ns.e('panel-count')">
          {{ leftChecked.length }}/{{ leftData.length }}
        </span>
      </div>
      <div v-if="filterable" :class="ns.e('filter')">
        <stx-input
          v-model="leftQuery"
          :placeholder="filterPlaceholder"
          clearable
          size="small"
        />
      </div>
      <div :class="ns.e('panel-body')">
        <stx-scrollbar>
          <stx-checkbox-group v-model="leftChecked">
            <stx-checkbox
              v-for="item in filteredLeftData"
              :key="getKey(item)"
              :value="getKey(item)"
              :label="getLabel(item)"
              :disabled="isDisabled(item)"
            />
          </stx-checkbox-group>
          <p
            v-if="filteredLeftData.length === 0"
            :class="ns.e('empty')"
          >
            No data
          </p>
        </stx-scrollbar>
      </div>
    </div>

    <!-- Transfer buttons -->
    <div :class="ns.e('buttons')">
      <stx-button
        type="primary"
        :disabled="rightChecked.length === 0 || actualDisabled"
        size="small"
        @click="transferToLeft"
      >
        <svg
          viewBox="0 0 24 24"
          width="12"
          height="12"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        <span v-if="(buttonTexts as [string, string])[0]" style="margin-left: 4px">
          {{ (buttonTexts as [string, string])[0] }}
        </span>
      </stx-button>
      <stx-button
        type="primary"
        :disabled="leftChecked.length === 0 || actualDisabled"
        size="small"
        @click="transferToRight"
      >
        <span v-if="(buttonTexts as [string, string])[1]" style="margin-right: 4px">
          {{ (buttonTexts as [string, string])[1] }}
        </span>
        <svg
          viewBox="0 0 24 24"
          width="12"
          height="12"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </stx-button>
    </div>

    <!-- Right panel -->
    <div :class="ns.e('panel')">
      <div :class="ns.e('panel-header')">
        <stx-checkbox
          :model-value="isAllRightChecked"
          :indeterminate="isRightIndeterminate"
          :disabled="actualDisabled"
          @change="handleCheckAllRight"
        >
          {{ (titles as [string, string])[1] }}
        </stx-checkbox>
        <span :class="ns.e('panel-count')">
          {{ rightChecked.length }}/{{ rightData.length }}
        </span>
      </div>
      <div v-if="filterable" :class="ns.e('filter')">
        <stx-input
          v-model="rightQuery"
          :placeholder="filterPlaceholder"
          clearable
          size="small"
        />
      </div>
      <div :class="ns.e('panel-body')">
        <stx-scrollbar>
          <stx-checkbox-group v-model="rightChecked">
            <stx-checkbox
              v-for="item in filteredRightData"
              :key="getKey(item)"
              :value="getKey(item)"
              :label="getLabel(item)"
              :disabled="isDisabled(item)"
            />
          </stx-checkbox-group>
          <p
            v-if="filteredRightData.length === 0"
            :class="ns.e('empty')"
          >
            No data
          </p>
        </stx-scrollbar>
      </div>
    </div>
  </div>
</template>
