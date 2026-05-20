<script setup lang="ts">
import {
  computed,
  nextTick,
  ref,
  shallowRef,
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
import { timePickerProps, timePickerEmits } from './time-picker'
import StxScrollbar from '../scrollbar/scrollbar.vue'
import StxButton from '../button/button.vue'

defineOptions({ name: 'StxTimePicker' })

const props = defineProps(timePickerProps)
const emit = defineEmits(timePickerEmits)

const ns = useNamespace('time-picker')
const { nextZIndex } = useZIndex()
const { formItem } = useFormItem()
const actualDisabled = useFormDisabled(props)
const actualSize = useFormSize(props)

// Refs
const pickerRef = shallowRef<HTMLElement>()
const triggerRef = shallowRef<HTMLElement>()
const panelRef = shallowRef<HTMLElement>()
const inputRef = shallowRef<HTMLInputElement>()
const hourScrollRef = shallowRef<InstanceType<typeof StxScrollbar>>()
const minuteScrollRef = shallowRef<InstanceType<typeof StxScrollbar>>()
const secondScrollRef = shallowRef<InstanceType<typeof StxScrollbar>>()

// State
const panelVisible = ref(false)
const currentZIndex = ref(2000)

// Internal time state
const selectedHour = ref(0)
const selectedMinute = ref(0)
const selectedSecond = ref(0)

// Cell height constant for scroll calculations
const CELL_HEIGHT = 32

// --- Helpers ---
function parseTime(val: any): { h: number; m: number; s: number } | null {
  if (!val) return null

  if (val instanceof Date) {
    if (isNaN(val.getTime())) return null
    return { h: val.getHours(), m: val.getMinutes(), s: val.getSeconds() }
  }

  if (typeof val === 'string') {
    // Try parsing HH:mm:ss or HH:mm
    const match = val.match(/^(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?$/)
    if (match) {
      return {
        h: parseInt(match[1], 10),
        m: parseInt(match[2], 10),
        s: match[3] ? parseInt(match[3], 10) : 0,
      }
    }
    // Try as Date string
    const d = new Date(val)
    if (!isNaN(d.getTime())) {
      return { h: d.getHours(), m: d.getMinutes(), s: d.getSeconds() }
    }
  }

  return null
}

function formatTime(h: number, m: number, s: number, fmt: string): string {
  return fmt
    .replace(/HH/g, String(h).padStart(2, '0'))
    .replace(/H/g, String(h))
    .replace(/mm/g, String(m).padStart(2, '0'))
    .replace(/m/g, String(m))
    .replace(/ss/g, String(s).padStart(2, '0'))
    .replace(/s/g, String(s))
}

// Whether format includes seconds
const showSeconds = computed(() => props.format.includes('s'))

// Sync from model value
function syncFromModelValue() {
  const parsed = parseTime(Array.isArray(props.modelValue) ? props.modelValue[0] : props.modelValue)
  if (parsed) {
    selectedHour.value = parsed.h
    selectedMinute.value = parsed.m
    selectedSecond.value = parsed.s
  }
}

watch(() => props.modelValue, syncFromModelValue, { immediate: true })

// Display value
const displayValue = computed(() => {
  const parsed = parseTime(Array.isArray(props.modelValue) ? props.modelValue[0] : props.modelValue)
  if (!parsed) return ''
  return formatTime(parsed.h, parsed.m, parsed.s, props.format)
})

// Disabled checks
function isHourDisabled(h: number): boolean {
  if (!props.disabledHours) return false
  return props.disabledHours().includes(h)
}

function isMinuteDisabled(m: number): boolean {
  if (!props.disabledMinutes) return false
  return props.disabledMinutes(selectedHour.value).includes(m)
}

function isSecondDisabled(s: number): boolean {
  if (!props.disabledSeconds) return false
  return props.disabledSeconds(selectedHour.value, selectedMinute.value).includes(s)
}

// Popper
const { x, y, update: updatePopper } = usePopper(triggerRef, panelRef, {
  placement: 'bottom-start',
  offset: 4,
})

const floatingStyles = computed<CSSProperties>(() => ({
  position: 'absolute',
  left: `${x.value}px`,
  top: `${y.value}px`,
  zIndex: currentZIndex.value,
}))

// Click outside
useClickOutside([pickerRef, panelRef], () => {
  if (panelVisible.value) {
    panelVisible.value = false
    emit('visible-change', false)
  }
})

// Scroll selected item into view
function scrollToSelected() {
  nextTick(() => {
    scrollColumnTo(hourScrollRef.value, selectedHour.value)
    scrollColumnTo(minuteScrollRef.value, selectedMinute.value)
    if (showSeconds.value) {
      scrollColumnTo(secondScrollRef.value, selectedSecond.value)
    }
  })
}

function scrollColumnTo(scrollbar: InstanceType<typeof StxScrollbar> | undefined, index: number) {
  if (!scrollbar) return
  const el = (scrollbar as any)?.$el as HTMLElement | undefined
  if (!el) return
  const wrap = el.querySelector('.stx-scrollbar__wrap') as HTMLElement
  if (wrap) {
    wrap.scrollTop = index * CELL_HEIGHT
  }
}

// Toggle
function togglePanel() {
  if (actualDisabled.value || props.readonly) return
  if (panelVisible.value) {
    panelVisible.value = false
    emit('visible-change', false)
  } else {
    syncFromModelValue()
    currentZIndex.value = nextZIndex()
    panelVisible.value = true
    emit('visible-change', true)
    nextTick(() => {
      updatePopper()
      scrollToSelected()
    })
  }
}

// Selection handlers
function selectHour(h: number) {
  if (isHourDisabled(h)) return
  selectedHour.value = h
}

function selectMinute(m: number) {
  if (isMinuteDisabled(m)) return
  selectedMinute.value = m
}

function selectSecond(s: number) {
  if (isSecondDisabled(s)) return
  selectedSecond.value = s
}

// Confirm / Cancel
function handleConfirm() {
  const timeStr = formatTime(
    selectedHour.value,
    selectedMinute.value,
    selectedSecond.value,
    props.format,
  )
  emit('update:modelValue', timeStr)
  emit('change', timeStr)
  panelVisible.value = false
  emit('visible-change', false)
  formItem?.validate('change')
}

function handleCancel() {
  syncFromModelValue()
  panelVisible.value = false
  emit('visible-change', false)
}

function handleClear() {
  emit('update:modelValue', undefined)
  emit('change', undefined)
  emit('clear')
  formItem?.validate('change')
}

function handleFocus(evt: FocusEvent) {
  emit('focus', evt)
}

function handleBlur(evt: FocusEvent) {
  emit('blur', evt)
  formItem?.validate('blur')
}

function handleInput(e: Event) {
  if (!props.editable) return
  const val = (e.target as HTMLInputElement).value
  const parsed = parseTime(val)
  if (parsed) {
    selectedHour.value = parsed.h
    selectedMinute.value = parsed.m
    selectedSecond.value = parsed.s
  }
}

defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  togglePanel,
})
</script>

<template>
  <div
    ref="pickerRef"
    :class="[
      ns.b(),
      actualSize !== 'default' && ns.m(actualSize),
      ns.is('disabled', actualDisabled),
    ]"
  >
    <!-- Trigger -->
    <div
      ref="triggerRef"
      :class="ns.e('trigger')"
      @click="togglePanel"
    >
      <input
        ref="inputRef"
        :class="ns.e('input')"
        :value="displayValue"
        :placeholder="placeholder"
        :readonly="!editable"
        :disabled="actualDisabled"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        autocomplete="off"
      />
      <span :class="ns.e('suffix')">
        <span
          v-if="clearable && modelValue"
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
        <!-- Clock icon -->
        <svg
          :class="ns.e('icon')"
          viewBox="0 0 24 24"
          width="1em"
          height="1em"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      </span>
    </div>

    <!-- Panel -->
    <Teleport to="body" :disabled="!teleported">
      <Transition name="stx-zoom-in-top">
        <div
          v-show="panelVisible"
          ref="panelRef"
          :class="[ns.e('panel'), popperClass]"
          :style="floatingStyles"
        >
          <div :class="ns.e('spinner')">
            <!-- Hours column -->
            <stx-scrollbar
              ref="hourScrollRef"
              :class="ns.e('column')"
            >
              <ul :class="ns.e('list')">
                <li
                  v-for="h in 24"
                  :key="h - 1"
                  :class="[
                    ns.e('cell'),
                    ns.is('active', h - 1 === selectedHour),
                    ns.is('disabled', isHourDisabled(h - 1)),
                  ]"
                  @click="selectHour(h - 1)"
                >
                  {{ String(h - 1).padStart(2, '0') }}
                </li>
              </ul>
            </stx-scrollbar>

            <!-- Minutes column -->
            <stx-scrollbar
              ref="minuteScrollRef"
              :class="ns.e('column')"
            >
              <ul :class="ns.e('list')">
                <li
                  v-for="m in 60"
                  :key="m - 1"
                  :class="[
                    ns.e('cell'),
                    ns.is('active', m - 1 === selectedMinute),
                    ns.is('disabled', isMinuteDisabled(m - 1)),
                  ]"
                  @click="selectMinute(m - 1)"
                >
                  {{ String(m - 1).padStart(2, '0') }}
                </li>
              </ul>
            </stx-scrollbar>

            <!-- Seconds column -->
            <stx-scrollbar
              v-if="showSeconds"
              ref="secondScrollRef"
              :class="ns.e('column')"
            >
              <ul :class="ns.e('list')">
                <li
                  v-for="s in 60"
                  :key="s - 1"
                  :class="[
                    ns.e('cell'),
                    ns.is('active', s - 1 === selectedSecond),
                    ns.is('disabled', isSecondDisabled(s - 1)),
                  ]"
                  @click="selectSecond(s - 1)"
                >
                  {{ String(s - 1).padStart(2, '0') }}
                </li>
              </ul>
            </stx-scrollbar>
          </div>

          <div :class="ns.e('footer')">
            <stx-button size="small" text @click="handleCancel">Cancel</stx-button>
            <stx-button size="small" type="primary" @click="handleConfirm">OK</stx-button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
