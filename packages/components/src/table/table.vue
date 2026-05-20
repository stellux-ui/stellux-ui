<script setup lang="ts">
import { computed, provide, ref, watch, type CSSProperties } from 'vue'
import { useNamespace } from '@stellux/hooks'
import { tableProps, tableEmits } from './table'
import { tableContextKey, type TableColumnConfig } from './constants'
import StxCheckbox from '../checkbox/checkbox.vue'
import StxScrollbar from '../scrollbar/scrollbar.vue'

defineOptions({ name: 'StxTable' })

const props = defineProps(tableProps)
const emit = defineEmits(tableEmits)

const ns = useNamespace('table')

// --- Column registry ---
const columns = ref<TableColumnConfig[]>([])

function registerColumn(column: TableColumnConfig) {
  // Use a synthetic key for special column types
  const key = column.type === 'selection' ? '__selection__'
    : column.type === 'index' ? '__index__'
    : column.type === 'expand' ? '__expand__'
    : column.prop
  // Avoid duplicates
  const idx = columns.value.findIndex((c) => getColumnKey(c) === key)
  if (idx !== -1) {
    columns.value.splice(idx, 1, { ...column })
  } else {
    columns.value.push({ ...column })
  }
}

function unregisterColumn(prop: string) {
  const idx = columns.value.findIndex((c) => getColumnKey(c) === prop)
  if (idx !== -1) {
    columns.value.splice(idx, 1)
  }
}

function getColumnKey(col: TableColumnConfig): string {
  if (col.type === 'selection') return '__selection__'
  if (col.type === 'index') return '__index__'
  if (col.type === 'expand') return '__expand__'
  return col.prop
}

provide(tableContextKey, { registerColumn, unregisterColumn })

// --- Sort state ---
const sortState = ref<{ prop: string; order: 'ascending' | 'descending' | null }>({
  prop: '',
  order: null,
})

// Initialize from defaultSort
watch(
  () => props.defaultSort,
  (val) => {
    if (val) {
      sortState.value = { prop: val.prop, order: val.order }
    }
  },
  { immediate: true }
)

const sortedData = computed(() => {
  const { prop, order } = sortState.value
  if (!prop || !order) return props.data

  const col = columns.value.find((c) => c.prop === prop)
  if (!col) return props.data

  // For custom sortable, don't sort locally
  if (col.sortable === 'custom') return props.data

  const data = [...props.data]
  const modifier = order === 'ascending' ? 1 : -1

  data.sort((a, b) => {
    const valA = a[prop]
    const valB = b[prop]
    if (valA == null && valB == null) return 0
    if (valA == null) return -1 * modifier
    if (valB == null) return 1 * modifier
    if (typeof valA === 'number' && typeof valB === 'number') {
      return (valA - valB) * modifier
    }
    return String(valA).localeCompare(String(valB)) * modifier
  })

  return data
})

function handleHeaderClick(col: TableColumnConfig, event: Event) {
  emit('header-click', col, event)

  if (!col.sortable) return

  const orders = col.sortOrders || ['ascending', 'descending', null]
  const currentOrder = sortState.value.prop === col.prop ? sortState.value.order : null
  const currentIdx = orders.indexOf(currentOrder)
  const nextIdx = (currentIdx + 1) % orders.length
  const nextOrder = orders[nextIdx]

  sortState.value = { prop: col.prop, order: nextOrder }

  emit('sort-change', {
    column: col,
    prop: col.prop,
    order: nextOrder,
  })
}

// --- Selection state ---
const selectedRows = ref<Set<any>>(new Set())

const isAllSelected = computed(() => {
  if (sortedData.value.length === 0) return false
  return sortedData.value.every((row) => selectedRows.value.has(row))
})

const isIndeterminate = computed(() => {
  if (sortedData.value.length === 0) return false
  const selectedCount = sortedData.value.filter((row) => selectedRows.value.has(row)).length
  return selectedCount > 0 && selectedCount < sortedData.value.length
})

function toggleAllSelection(checked: boolean | any) {
  const isChecked = typeof checked === 'boolean' ? checked : !isAllSelected.value
  if (isChecked) {
    sortedData.value.forEach((row) => selectedRows.value.add(row))
  } else {
    selectedRows.value.clear()
  }
  const selection = Array.from(selectedRows.value)
  emit('select-all', selection)
  emit('selection-change', selection)
}

function toggleRowSelection(row: any, selected?: boolean) {
  const shouldSelect = selected !== undefined ? selected : !selectedRows.value.has(row)
  if (shouldSelect) {
    selectedRows.value.add(row)
  } else {
    selectedRows.value.delete(row)
  }
  const selection = Array.from(selectedRows.value)
  emit('select', selection, row)
  emit('selection-change', selection)
}

function isRowSelected(row: any): boolean {
  return selectedRows.value.has(row)
}

function clearSelection() {
  selectedRows.value.clear()
  emit('selection-change', [])
}

// --- Expand state ---
const expandedRows = ref<Set<any>>(new Set())

watch(
  () => props.defaultExpandAll,
  (val) => {
    if (val) {
      props.data.forEach((row) => expandedRows.value.add(row))
    }
  },
  { immediate: true }
)

function toggleExpand(row: any) {
  if (expandedRows.value.has(row)) {
    expandedRows.value.delete(row)
  } else {
    expandedRows.value.add(row)
  }
  emit('expand-change', row, Array.from(expandedRows.value))
}

function isRowExpanded(row: any): boolean {
  return expandedRows.value.has(row)
}

// --- Current row (highlight) ---
const currentRow = ref<any>(null)

function setCurrentRow(row: any) {
  const old = currentRow.value
  currentRow.value = row
  if (old !== row) {
    emit('current-change', row, old)
  }
}

function handleRowClick(row: any, column: TableColumnConfig, event: Event) {
  emit('row-click', row, column, event)
  if (props.highlightCurrentRow) {
    setCurrentRow(row)
  }
}

function handleCellClick(row: any, column: TableColumnConfig, cell: any, event: Event) {
  emit('cell-click', row, column, cell, event)
}

// --- Row key helper ---
function getRowKey(row: any, index: number): string | number {
  if (typeof props.rowKey === 'function') return props.rowKey(row)
  if (typeof props.rowKey === 'string' && props.rowKey) return row[props.rowKey]
  return index
}

// --- Style helpers ---
const tableStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  if (props.fit) {
    style.width = '100%'
  }
  return style
})

const bodyStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  if (props.height !== undefined) {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  if (props.maxHeight !== undefined) {
    style.maxHeight = typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight
  }
  return style
})

function colStyle(col: TableColumnConfig): CSSProperties {
  const style: CSSProperties = {}
  if (col.width !== undefined) {
    style.width = typeof col.width === 'number' ? `${col.width}px` : col.width
  }
  if (col.minWidth !== undefined) {
    style.minWidth = typeof col.minWidth === 'number' ? `${col.minWidth}px` : col.minWidth
  }
  return style
}

function headerCellClass(col: TableColumnConfig, colIndex: number): (string | undefined)[] {
  const classes: (string | undefined)[] = [
    ns.e('cell'),
    col.headerAlign ? ns.is(`align-${col.headerAlign}`) : ns.is(`align-${col.align || 'left'}`),
    col.labelClassName || undefined,
    col.sortable ? ns.is('sortable') : undefined,
  ]
  if (typeof props.headerCellClassName === 'function') {
    const cls = props.headerCellClassName({ column: col, columnIndex: colIndex })
    if (cls) classes.push(cls)
  } else if (props.headerCellClassName) {
    classes.push(props.headerCellClassName)
  }
  return classes
}

function getRowClass(row: any, rowIndex: number): (string | undefined)[] {
  const classes: (string | undefined)[] = [
    ns.e('row'),
    props.highlightCurrentRow && currentRow.value === row ? ns.is('current') : undefined,
  ]
  if (typeof props.rowClassName === 'function') {
    const cls = props.rowClassName({ row, rowIndex })
    if (cls) classes.push(cls)
  } else if (props.rowClassName) {
    classes.push(props.rowClassName)
  }
  return classes
}

function getRowStyle(row: any, rowIndex: number): object | undefined {
  if (typeof props.rowStyle === 'function') {
    return props.rowStyle({ row, rowIndex })
  }
  return props.rowStyle
}

function getCellClass(row: any, col: TableColumnConfig, rowIndex: number, colIndex: number): (string | undefined)[] {
  const classes: (string | undefined)[] = [
    ns.e('cell'),
    col.align ? ns.is(`align-${col.align}`) : undefined,
    col.className || undefined,
    col.showOverflowTooltip ? ns.is('tooltip') : undefined,
  ]
  if (typeof props.cellClassName === 'function') {
    const cls = props.cellClassName({ row, column: col, rowIndex, columnIndex: colIndex })
    if (cls) classes.push(cls)
  } else if (props.cellClassName) {
    classes.push(props.cellClassName)
  }
  return classes
}

function getCellStyle(row: any, col: TableColumnConfig, rowIndex: number, colIndex: number): object | undefined {
  if (typeof props.cellStyle === 'function') {
    return props.cellStyle({ row, column: col, rowIndex, columnIndex: colIndex })
  }
  return props.cellStyle as object | undefined
}

// --- Summary ---
const summaryData = computed(() => {
  if (!props.showSummary) return []
  if (props.summaryMethod) {
    return props.summaryMethod({ columns: columns.value, data: sortedData.value })
  }
  // Default summary: sum numeric columns
  return columns.value.map((col, index) => {
    if (index === 0) return props.sumText
    if (!col.prop) return ''
    const values = sortedData.value.map((row) => Number(row[col.prop]))
    if (values.some((v) => isNaN(v))) return ''
    return values.reduce((sum, v) => sum + v, 0)
  })
})

// --- Span method helper ---
function getSpan(row: any, col: TableColumnConfig, rowIndex: number, colIndex: number): { rowspan: number; colspan: number } {
  if (!props.spanMethod) return { rowspan: 1, colspan: 1 }
  const result = props.spanMethod({ row, column: col, rowIndex, columnIndex: colIndex })
  if (!result) return { rowspan: 1, colspan: 1 }
  if (Array.isArray(result)) return { rowspan: result[0], colspan: result[1] }
  return result
}

// --- Public API ---
function clearSort() {
  sortState.value = { prop: '', order: null }
}

function sort(prop: string, order: 'ascending' | 'descending') {
  sortState.value = { prop, order }
  const col = columns.value.find((c) => c.prop === prop)
  if (col) {
    emit('sort-change', { column: col, prop, order })
  }
}

defineExpose({
  clearSelection,
  toggleRowSelection,
  toggleAllSelection,
  setCurrentRow,
  clearSort,
  sort,
})
</script>

<template>
  <div
    :class="[
      ns.b(),
      ns.m(size),
      ns.is('stripe', stripe),
      ns.is('border', border),
      ns.is('fit', fit),
    ]"
    :style="tableStyle"
  >
    <!-- Hidden slot for StxTableColumn registration -->
    <div style="display: none;">
      <slot />
    </div>

    <!-- Header -->
    <div v-if="showHeader" :class="ns.e('header-wrapper')">
      <table :class="ns.e('header')" cellspacing="0" cellpadding="0">
        <colgroup>
          <col
            v-for="col in columns"
            :key="getColumnKey(col)"
            :style="colStyle(col)"
          />
        </colgroup>
        <thead>
          <tr>
            <th
              v-for="(col, colIndex) in columns"
              :key="getColumnKey(col)"
              :class="headerCellClass(col, colIndex)"
              @click="handleHeaderClick(col, $event)"
            >
              <div :class="ns.e('cell-content')">
                <template v-if="col.type === 'selection'">
                  <stx-checkbox
                    :model-value="isAllSelected"
                    :indeterminate="isIndeterminate"
                    @change="toggleAllSelection"
                  />
                </template>
                <template v-else>
                  <span>{{ col.label }}</span>
                  <span
                    v-if="col.sortable"
                    :class="[ns.e('sort-caret-group')]"
                  >
                    <i
                      :class="[
                        ns.e('sort-caret'),
                        ns.is('ascending', sortState.prop === col.prop && sortState.order === 'ascending'),
                      ]"
                    >
                      <svg viewBox="0 0 10 6" width="10" height="6" fill="currentColor">
                        <path d="M5 0L10 6H0z" />
                      </svg>
                    </i>
                    <i
                      :class="[
                        ns.e('sort-caret'),
                        ns.is('descending', sortState.prop === col.prop && sortState.order === 'descending'),
                      ]"
                    >
                      <svg viewBox="0 0 10 6" width="10" height="6" fill="currentColor">
                        <path d="M5 6L0 0h10z" />
                      </svg>
                    </i>
                  </span>
                </template>
              </div>
            </th>
          </tr>
        </thead>
      </table>
    </div>

    <!-- Body -->
    <stx-scrollbar :style="bodyStyle">
      <table :class="ns.e('body')" cellspacing="0" cellpadding="0">
        <colgroup>
          <col
            v-for="col in columns"
            :key="getColumnKey(col)"
            :style="colStyle(col)"
          />
        </colgroup>
        <tbody>
          <template v-if="sortedData.length">
            <template v-for="(row, rowIndex) in sortedData" :key="getRowKey(row, rowIndex)">
              <tr
                :class="getRowClass(row, rowIndex)"
                :style="getRowStyle(row, rowIndex)"
                @click="handleRowClick(row, columns[0], $event)"
              >
                <template v-for="(col, colIndex) in columns" :key="getColumnKey(col)">
                  <td
                    v-if="getSpan(row, col, rowIndex, colIndex).rowspan !== 0 && getSpan(row, col, rowIndex, colIndex).colspan !== 0"
                    :class="getCellClass(row, col, rowIndex, colIndex)"
                    :style="getCellStyle(row, col, rowIndex, colIndex)"
                    :rowspan="getSpan(row, col, rowIndex, colIndex).rowspan"
                    :colspan="getSpan(row, col, rowIndex, colIndex).colspan"
                    @click="handleCellClick(row, col, $el, $event)"
                  >
                    <div :class="ns.e('cell-content')">
                      <template v-if="col.type === 'selection'">
                        <stx-checkbox
                          :model-value="isRowSelected(row)"
                          @change="toggleRowSelection(row)"
                        />
                      </template>
                      <template v-else-if="col.type === 'index'">
                        {{ rowIndex + 1 }}
                      </template>
                      <template v-else-if="col.type === 'expand'">
                        <button
                          :class="[ns.e('expand-icon'), ns.is('expanded', isRowExpanded(row))]"
                          @click.stop="toggleExpand(row)"
                        >
                          <svg viewBox="0 0 10 10" width="10" height="10" fill="currentColor">
                            <path d="M3 1l5 4-5 4z" />
                          </svg>
                        </button>
                      </template>
                      <template v-else>
                        {{ col.formatter ? col.formatter(row, col, row[col.prop], rowIndex) : row[col.prop] }}
                      </template>
                    </div>
                  </td>
                </template>
              </tr>
              <!-- Expand row content -->
              <tr v-if="columns.some(c => c.type === 'expand') && isRowExpanded(row)" :class="ns.e('expanded-row')">
                <td :colspan="columns.length">
                  <div :class="ns.e('expanded-cell')">
                    <!-- Expand content slot would be handled by the parent -->
                  </div>
                </td>
              </tr>
            </template>
          </template>
          <tr v-else>
            <td :colspan="columns.length" :class="ns.e('empty')">
              <span :class="ns.e('empty-text')">{{ emptyText }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </stx-scrollbar>

    <!-- Summary / Footer -->
    <div v-if="showSummary && sortedData.length" :class="ns.e('footer-wrapper')">
      <table :class="ns.e('footer')" cellspacing="0" cellpadding="0">
        <colgroup>
          <col
            v-for="col in columns"
            :key="getColumnKey(col)"
            :style="colStyle(col)"
          />
        </colgroup>
        <tfoot>
          <tr>
            <td
              v-for="(col, colIndex) in columns"
              :key="getColumnKey(col)"
              :class="[ns.e('cell'), col.align ? ns.is(`align-${col.align}`) : '']"
            >
              <div :class="ns.e('cell-content')">
                {{ summaryData[colIndex] }}
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>
