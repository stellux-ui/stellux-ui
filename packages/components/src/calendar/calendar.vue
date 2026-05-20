<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useNamespace } from '@stellux/hooks'
import { calendarProps, calendarEmits } from './calendar'
import StxButton from '../button/button.vue'

defineOptions({ name: 'StxCalendar' })

const props = defineProps(calendarProps)
const emit = defineEmits(calendarEmits)

const ns = useNamespace('calendar')

const now = new Date()
const currentYear = ref(props.modelValue ? props.modelValue.getFullYear() : now.getFullYear())
const currentMonth = ref(props.modelValue ? props.modelValue.getMonth() : now.getMonth())

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// Build a 6-row grid of dates for the current month view
const dateRows = computed(() => {
  const year = currentYear.value
  const month = currentMonth.value

  // First day of the month
  const firstDay = new Date(year, month, 1)
  const startDay = firstDay.getDay() // 0 = Sunday

  // Start from the Sunday of the week containing the 1st
  const start = new Date(year, month, 1 - startDay)

  const rows: Date[][] = []
  const current = new Date(start)

  for (let week = 0; week < 6; week++) {
    const row: Date[] = []
    for (let day = 0; day < 7; day++) {
      row.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }
    rows.push(row)
  }

  return rows
})

function isToday(date: Date): boolean {
  const today = new Date()
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  )
}

function isSelected(date: Date): boolean {
  if (!props.modelValue) return false
  return (
    date.getFullYear() === props.modelValue.getFullYear() &&
    date.getMonth() === props.modelValue.getMonth() &&
    date.getDate() === props.modelValue.getDate()
  )
}

function isCurrentMonth(date: Date): boolean {
  return date.getMonth() === currentMonth.value
}

function isInRange(date: Date): boolean {
  if (!props.range || !Array.isArray(props.range) || props.range.length !== 2) {
    return false
  }
  const [start, end] = props.range
  const time = date.getTime()
  return time >= start.getTime() && time <= end.getTime()
}

function handleDateClick(date: Date) {
  emit('update:modelValue', date)
  emit('input', date)
}

function prevMonth() {
  if (currentMonth.value === 0) {
    currentYear.value--
    currentMonth.value = 11
  } else {
    currentMonth.value--
  }
}

function nextMonth() {
  if (currentMonth.value === 11) {
    currentYear.value++
    currentMonth.value = 0
  } else {
    currentMonth.value++
  }
}

function selectToday() {
  const today = new Date()
  currentYear.value = today.getFullYear()
  currentMonth.value = today.getMonth()
  emit('update:modelValue', today)
  emit('input', today)
}

// When modelValue changes externally, update the displayed month
watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      currentYear.value = val.getFullYear()
      currentMonth.value = val.getMonth()
    }
  },
)
</script>

<template>
  <div :class="ns.b()">
    <div :class="ns.e('header')">
      <div :class="ns.e('title')">
        {{ currentYear }} / {{ currentMonth + 1 }}
      </div>
      <div :class="ns.e('button-group')">
        <stx-button size="small" @click="prevMonth">Prev Month</stx-button>
        <stx-button size="small" @click="selectToday">Today</stx-button>
        <stx-button size="small" @click="nextMonth">Next Month</stx-button>
      </div>
    </div>
    <div :class="ns.e('body')">
      <table :class="ns.e('table')" cellspacing="0" cellpadding="0">
        <thead>
          <tr>
            <th v-for="d in dayNames" :key="d">{{ d }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(week, wIdx) in dateRows" :key="wIdx">
            <td
              v-for="date in week"
              :key="date.getTime()"
              :class="[
                ns.e('day'),
                ns.is('today', isToday(date)),
                ns.is('selected', isSelected(date)),
                ns.is('current-month', isCurrentMonth(date)),
                ns.is('range', isInRange(date)),
              ]"
              @click="handleDateClick(date)"
            >
              <div :class="ns.e('day-inner')">
                <span :class="ns.e('day-number')">{{ date.getDate() }}</span>
                <slot name="date-cell" :date="date" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
