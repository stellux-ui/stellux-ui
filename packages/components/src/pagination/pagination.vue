<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '@stellux/hooks'
import { paginationProps, paginationEmits } from './pagination'
import StxSelect from '../select/select.vue'
import StxOption from '../select/option.vue'

defineOptions({ name: 'StxPagination' })

const props = defineProps(paginationProps)
const emit = defineEmits(paginationEmits)

const ns = useNamespace('pagination')

// Total pages
const totalPages = computed(() => {
  if (props.pageCount !== undefined) return props.pageCount
  return Math.max(1, Math.ceil(props.total / props.pageSize))
})

// Parse layout string into ordered parts
const layoutParts = computed(() => {
  return props.layout.split(',').map((s) => s.trim()).filter(Boolean)
})

// Pager numbers with quickprev/quicknext ellipsis
const pagers = computed<Array<number | 'quickprev' | 'quicknext'>>(() => {
  const pageCount = totalPages.value
  const pagerCountVal = props.pagerCount
  const currentPageVal = props.currentPage

  // If total pages fit within pagerCount, show them all
  if (pageCount <= pagerCountVal) {
    const result: number[] = []
    for (let i = 1; i <= pageCount; i++) {
      result.push(i)
    }
    return result
  }

  const halfPager = Math.floor(pagerCountVal / 2)
  let showQuickPrev = false
  let showQuickNext = false

  if (currentPageVal > halfPager + 1) {
    showQuickPrev = true
  }
  if (currentPageVal < pageCount - halfPager) {
    showQuickNext = true
  }

  const result: Array<number | 'quickprev' | 'quicknext'> = []

  // Always show page 1
  result.push(1)

  if (showQuickPrev) {
    result.push('quickprev')
  }

  // Calculate the range of middle pages
  let start: number
  let end: number

  if (showQuickPrev && showQuickNext) {
    // Both ellipses: show (pagerCount - 4) middle pages centered on current
    const middleCount = pagerCountVal - 4
    start = currentPageVal - Math.floor(middleCount / 2)
    end = currentPageVal + Math.ceil(middleCount / 2) - 1
  } else if (showQuickPrev) {
    // Only left ellipsis: show last (pagerCount - 2) pages
    end = pageCount - 1
    start = pageCount - (pagerCountVal - 3)
  } else {
    // Only right ellipsis: show first (pagerCount - 2) pages
    start = 2
    end = pagerCountVal - 2
  }

  for (let i = start; i <= end; i++) {
    result.push(i)
  }

  if (showQuickNext) {
    result.push('quicknext')
  }

  // Always show last page
  result.push(pageCount)

  return result
})

// --- Handlers ---
function setCurrentPage(page: number) {
  const clamped = Math.max(1, Math.min(page, totalPages.value))
  if (clamped === props.currentPage) return
  emit('update:currentPage', clamped)
  emit('current-change', clamped)
}

function handlePrev() {
  if (props.disabled || props.currentPage <= 1) return
  const newPage = props.currentPage - 1
  setCurrentPage(newPage)
  emit('prev-click', newPage)
}

function handleNext() {
  if (props.disabled || props.currentPage >= totalPages.value) return
  const newPage = props.currentPage + 1
  setCurrentPage(newPage)
  emit('next-click', newPage)
}

function handlePageClick(page: number | 'quickprev' | 'quicknext') {
  if (props.disabled) return

  if (page === 'quickprev') {
    const newPage = Math.max(1, props.currentPage - (props.pagerCount - 2))
    setCurrentPage(newPage)
    return
  }
  if (page === 'quicknext') {
    const newPage = Math.min(totalPages.value, props.currentPage + (props.pagerCount - 2))
    setCurrentPage(newPage)
    return
  }

  setCurrentPage(page)
}

function handleSizeChange(val: number) {
  emit('update:pageSize', val)
  emit('size-change', val)
  // Reset to page 1 when size changes
  setCurrentPage(1)
}

function handleJump(event: Event) {
  const target = event.target as HTMLInputElement
  const val = parseInt(target.value, 10)
  if (isNaN(val)) {
    target.value = String(props.currentPage)
    return
  }
  setCurrentPage(val)
  target.value = String(Math.max(1, Math.min(val, totalPages.value)))
}
</script>

<template>
  <div
    v-if="!(hideOnSinglePage && totalPages <= 1)"
    :class="[
      ns.b(),
      ns.is('small', small),
      ns.is('background', background),
      ns.is('disabled', disabled),
    ]"
  >
    <template v-for="part in layoutParts" :key="part">
      <!-- total -->
      <span v-if="part === 'total'" :class="ns.e('total')">
        Total {{ total }} items
      </span>

      <!-- sizes -->
      <span v-else-if="part === 'sizes'" :class="ns.e('sizes')">
        <stx-select
          :model-value="pageSize"
          :size="small ? 'small' : 'default'"
          :disabled="disabled"
          style="width: 110px;"
          @change="handleSizeChange"
        >
          <stx-option
            v-for="s in pageSizes"
            :key="s"
            :value="s"
            :label="`${s} / page`"
          />
        </stx-select>
      </span>

      <!-- prev -->
      <button
        v-else-if="part === 'prev'"
        :class="[ns.e('btn'), ns.e('prev')]"
        :disabled="disabled || currentPage <= 1"
        @click="handlePrev"
      >
        <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <!-- pager -->
      <ul v-else-if="part === 'pager'" :class="ns.e('pager')">
        <li
          v-for="page in pagers"
          :key="page"
          :class="[
            ns.e('number'),
            ns.is('active', page === currentPage),
            page === 'quickprev' ? 'is-quickprev' : '',
            page === 'quicknext' ? 'is-quicknext' : '',
          ]"
          @click="handlePageClick(page)"
        >
          <template v-if="typeof page === 'number'">{{ page }}</template>
          <template v-else>
            <span class="stx-pagination__ellipsis">&hellip;</span>
            <span class="stx-pagination__quick-arrow">
              <svg v-if="page === 'quickprev'" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M11 17l-5-5 5-5" /><path d="M18 17l-5-5 5-5" />
              </svg>
              <svg v-else viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M13 7l5 5-5 5" /><path d="M6 7l5 5-5 5" />
              </svg>
            </span>
          </template>
        </li>
      </ul>

      <!-- next -->
      <button
        v-else-if="part === 'next'"
        :class="[ns.e('btn'), ns.e('next')]"
        :disabled="disabled || currentPage >= totalPages"
        @click="handleNext"
      >
        <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      <!-- jumper -->
      <span v-else-if="part === 'jumper'" :class="ns.e('jump')">
        Go to
        <input
          :class="ns.e('editor')"
          type="number"
          :value="currentPage"
          :min="1"
          :max="totalPages"
          :disabled="disabled"
          @change="handleJump"
        />
        page
      </span>

      <!-- spacer -> -->
      <span v-else-if="part === '->'" :class="ns.e('spacer')" />
    </template>
  </div>
</template>
