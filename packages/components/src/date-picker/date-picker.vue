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
import { datePickerProps, datePickerEmits } from './date-picker'

defineOptions({ name: 'StxDatePicker' })

const props = defineProps(datePickerProps)
const emit = defineEmits(datePickerEmits)

const ns = useNamespace('date-picker')
const { nextZIndex } = useZIndex()
const { formItem } = useFormItem()
const actualDisabled = useFormDisabled(props)
const actualSize = useFormSize(props)

// Refs
const pickerRef = shallowRef<HTMLElement>()
const triggerRef = shallowRef<HTMLElement>()
const panelRef = shallowRef<HTMLElement>()
const inputRef = shallowRef<HTMLInputElement>()

// State
const panelVisible = ref(false)
const currentZIndex = ref(2000)
const currentView = ref<'date' | 'month' | 'year'>('date')

// The year/month being displayed in the panel
const viewYear = ref(new Date().getFullYear())
const viewMonth = ref(new Date().getMonth())

const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const monthNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

// --- Helpers ---
function toDate(val: any): Date | null {
  if (!val) return null
  if (val instanceof Date) return isNaN(val.getTime()) ? null : val
  if (typeof val === 'string' || typeof val === 'number') {
    const d = new Date(val)
    return isNaN(d.getTime()) ? null : d
  }
  return null
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function formatDate(date: Date, fmt: string): string {
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()

  if (fmt) {
    return fmt
      .replace(/YYYY/g, String(y))
      .replace(/YY/g, String(y).slice(-2))
      .replace(/MM/g, String(m).padStart(2, '0'))
      .replace(/M/g, String(m))
      .replace(/DD/g, String(d).padStart(2, '0'))
      .replace(/D/g, String(d))
  }

  return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

// --- Selected date ---
const selectedDate = computed(() => {
  if (Array.isArray(props.modelValue)) return null
  return toDate(props.modelValue)
})

// Initialize view from selected or today
function initView() {
  const d = selectedDate.value ?? (props.defaultValue instanceof Date ? props.defaultValue : new Date())
  viewYear.value = d.getFullYear()
  viewMonth.value = d.getMonth()

  // Set initial view based on type
  if (props.type === 'year') {
    currentView.value = 'year'
  } else if (props.type === 'month') {
    currentView.value = 'month'
  } else {
    currentView.value = 'date'
  }
}

watch(() => props.modelValue, initView, { immediate: true })

// --- Display value ---
const displayValue = computed(() => {
  const d = selectedDate.value
  if (!d) return ''

  if (props.type === 'year') return String(d.getFullYear())
  if (props.type === 'month') return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`

  const fmt = props.format || 'YYYY-MM-DD'
  return formatDate(d, fmt)
})

// --- Date grid (42 cells = 6 weeks) ---
interface DateCell {
  date: Date
  isToday: boolean
  isSelected: boolean
  isCurrentMonth: boolean
  isDisabled: boolean
}

const dateRows = computed(() => {
  const today = new Date()
  const year = viewYear.value
  const month = viewMonth.value
  const firstDay = new Date(year, month, 1)
  const startOffset = firstDay.getDay() // 0 = Sunday

  const cells: DateCell[] = []
  const startDate = new Date(year, month, 1 - startOffset)

  for (let i = 0; i < 42; i++) {
    const d = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i)
    const isCurrentMonth = d.getMonth() === month
    const isToday = isSameDay(d, today)
    const isSelected = selectedDate.value ? isSameDay(d, selectedDate.value) : false
    const isDisabled = props.disabledDate ? props.disabledDate(d) : false

    cells.push({ date: d, isToday, isSelected, isCurrentMonth, isDisabled })
  }

  // Chunk into weeks
  const rows: DateCell[][] = []
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7))
  }
  return rows
})

// --- Year range for year view ---
const yearRange = computed(() => {
  const startYear = Math.floor(viewYear.value / 10) * 10 - 1
  const years: number[] = []
  for (let i = 0; i < 12; i++) {
    years.push(startYear + i)
  }
  return years
})

// Selected year / month for highlighting
const selectedYear = computed(() => selectedDate.value?.getFullYear())
const selectedMonth = computed(() => {
  if (!selectedDate.value) return -1
  if (selectedDate.value.getFullYear() !== viewYear.value) return -1
  return selectedDate.value.getMonth()
})

// --- Navigation ---
function prevYear() {
  if (currentView.value === 'year') {
    viewYear.value -= 10
  } else {
    viewYear.value--
  }
}

function nextYear() {
  if (currentView.value === 'year') {
    viewYear.value += 10
  } else {
    viewYear.value++
  }
}

function prevMonth() {
  if (viewMonth.value === 0) {
    viewMonth.value = 11
    viewYear.value--
  } else {
    viewMonth.value--
  }
}

function nextMonth() {
  if (viewMonth.value === 11) {
    viewMonth.value = 0
    viewYear.value++
  } else {
    viewMonth.value++
  }
}

// --- Popper ---
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

// --- Handlers ---
function togglePanel() {
  if (actualDisabled.value || props.readonly) return
  if (panelVisible.value) {
    panelVisible.value = false
    emit('visible-change', false)
  } else {
    initView()
    currentZIndex.value = nextZIndex()
    panelVisible.value = true
    emit('visible-change', true)
    nextTick(() => updatePopper())
  }
}

function handleDatePick(date: Date) {
  if (props.disabledDate?.(date)) return

  const output = props.valueFormat ? formatDate(date, props.valueFormat) : date
  emit('update:modelValue', output)
  emit('change', output)
  panelVisible.value = false
  emit('visible-change', false)
  formItem?.validate('change')
}

function handleMonthPick(monthIdx: number) {
  if (props.type === 'month') {
    const date = new Date(viewYear.value, monthIdx, 1)
    const output = props.valueFormat ? formatDate(date, props.valueFormat) : date
    emit('update:modelValue', output)
    emit('change', output)
    panelVisible.value = false
    emit('visible-change', false)
    formItem?.validate('change')
  } else {
    viewMonth.value = monthIdx
    currentView.value = 'date'
  }
}

function handleYearPick(year: number) {
  if (props.type === 'year') {
    const date = new Date(year, 0, 1)
    const output = props.valueFormat ? formatDate(date, props.valueFormat) : date
    emit('update:modelValue', output)
    emit('change', output)
    panelVisible.value = false
    emit('visible-change', false)
    formItem?.validate('change')
  } else {
    viewYear.value = year
    currentView.value = props.type === 'month' ? 'month' : 'month'
  }
}

function handleShortcut(shortcut: { text: string; value: Date | (() => Date | Date[]) }) {
  const val = typeof shortcut.value === 'function' ? shortcut.value() : shortcut.value
  if (val instanceof Date) {
    handleDatePick(val)
  }
}

function handleClear() {
  emit('update:modelValue', undefined)
  emit('change', undefined)
  emit('clear')
  formItem?.validate('change')
}

function handleInput(e: Event) {
  if (!props.editable) return
  const val = (e.target as HTMLInputElement).value
  if (!val) return
  const parsed = toDate(val)
  if (parsed) {
    handleDatePick(parsed)
  }
}

function handleFocus(evt: FocusEvent) {
  emit('focus', evt)
}

function handleBlur(evt: FocusEvent) {
  emit('blur', evt)
  formItem?.validate('blur')
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
    <!-- Input trigger -->
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
        <!-- Calendar icon -->
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
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
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
          <div :class="ns.e('panel-layout')">
            <!-- Shortcuts sidebar -->
            <div
              v-if="shortcuts && shortcuts.length"
              :class="ns.e('sidebar')"
            >
              <button
                v-for="shortcut in shortcuts"
                :key="shortcut.text"
                :class="ns.e('shortcut')"
                @click="handleShortcut(shortcut)"
              >
                {{ shortcut.text }}
              </button>
            </div>

            <div :class="ns.e('body')">
              <!-- Header -->
              <div :class="ns.e('header')">
                <button :class="ns.e('nav-btn')" @click="prevYear">&laquo;</button>
                <button
                  v-if="currentView === 'date'"
                  :class="ns.e('nav-btn')"
                  @click="prevMonth"
                >&lsaquo;</button>
                <span :class="ns.e('header-label')">
                  <button
                    :class="ns.e('label-btn')"
                    @click="currentView = 'year'"
                  >{{ viewYear }}</button>
                  <button
                    v-if="currentView === 'date'"
                    :class="ns.e('label-btn')"
                    @click="currentView = 'month'"
                  >{{ monthNames[viewMonth] }}</button>
                </span>
                <button
                  v-if="currentView === 'date'"
                  :class="ns.e('nav-btn')"
                  @click="nextMonth"
                >&rsaquo;</button>
                <button :class="ns.e('nav-btn')" @click="nextYear">&raquo;</button>
              </div>

              <!-- Date view -->
              <table
                v-if="currentView === 'date'"
                :class="ns.e('table')"
              >
                <thead>
                  <tr>
                    <th v-for="d in weekDays" :key="d">{{ d }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(week, wi) in dateRows"
                    :key="wi"
                  >
                    <td
                      v-for="cell in week"
                      :key="cell.date.getTime()"
                      :class="[
                        ns.e('cell'),
                        ns.is('today', cell.isToday),
                        ns.is('selected', cell.isSelected),
                        ns.is('current-month', cell.isCurrentMonth),
                        ns.is('disabled', cell.isDisabled),
                      ]"
                      @click="handleDatePick(cell.date)"
                    >
                      <span>{{ cell.date.getDate() }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <!-- Month view -->
              <div
                v-else-if="currentView === 'month'"
                :class="ns.e('month-table')"
              >
                <span
                  v-for="(m, i) in monthNames"
                  :key="i"
                  :class="[
                    ns.e('month-cell'),
                    ns.is('selected', i === selectedMonth),
                  ]"
                  @click="handleMonthPick(i)"
                >{{ m }}</span>
              </div>

              <!-- Year view -->
              <div
                v-else-if="currentView === 'year'"
                :class="ns.e('year-table')"
              >
                <span
                  v-for="y in yearRange"
                  :key="y"
                  :class="[
                    ns.e('year-cell'),
                    ns.is('selected', y === selectedYear),
                  ]"
                  @click="handleYearPick(y)"
                >{{ y }}</span>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
