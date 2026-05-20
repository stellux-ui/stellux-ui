<script lang="ts">
import {
  defineComponent,
  h,
  Fragment,
  type VNode,
} from 'vue'
import { useNamespace } from '@stellux/hooks'
import { descriptionsProps } from './descriptions'

interface DescItem {
  label: string
  span: number
  width: string | number
  minWidth: string | number
  align: string
  labelAlign: string
  labelWidth: string | number
  className: string
  labelClassName: string
  slots: VNode[] | undefined
  labelSlots: VNode[] | undefined
}

export default defineComponent({
  name: 'StxDescriptions',
  props: descriptionsProps,
  setup(props, { slots }) {
    const ns = useNamespace('descriptions')

    function flattenChildren(vnodes: VNode[]): VNode[] {
      const result: VNode[] = []
      for (const vnode of vnodes) {
        if (vnode.type === Fragment) {
          if (Array.isArray(vnode.children)) {
            result.push(...flattenChildren(vnode.children as VNode[]))
          }
        } else {
          result.push(vnode)
        }
      }
      return result
    }

    function getItems(): DescItem[] {
      const defaultSlot = slots.default?.()
      if (!defaultSlot) return []

      const children = flattenChildren(defaultSlot)
      const items: DescItem[] = []

      for (const child of children) {
        if (
          typeof child.type === 'object' &&
          (child.type as any).name === 'StxDescriptionsItem'
        ) {
          const childProps = child.props || {}
          items.push({
            label: (childProps.label as string) || '',
            span: Number(childProps.span) || 1,
            width: (childProps.width as string | number) || '',
            minWidth: (childProps.minWidth as string | number) || '',
            align: (childProps.align as string) || 'left',
            labelAlign: (childProps['label-align'] as string) || (childProps.labelAlign as string) || '',
            labelWidth: (childProps['label-width'] as string | number) || (childProps.labelWidth as string | number) || '',
            className: (childProps.className as string) || (childProps['class-name'] as string) || '',
            labelClassName: (childProps['label-class-name'] as string) || (childProps.labelClassName as string) || '',
            slots: child.children
              ? (child.children as any).default?.()
              : undefined,
            labelSlots: child.children
              ? (child.children as any).label?.()
              : undefined,
          })
        }
      }

      return items
    }

    function buildRows(items: DescItem[]): DescItem[][] {
      const rows: DescItem[][] = []
      let currentRow: DescItem[] = []
      let currentSpan = 0

      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        const isLast = i === items.length - 1
        const span = isLast
          ? props.column - currentSpan
          : Math.min(item.span, props.column - currentSpan)

        currentRow.push({ ...item, span })
        currentSpan += span

        if (currentSpan >= props.column) {
          rows.push(currentRow)
          currentRow = []
          currentSpan = 0
        }
      }

      if (currentRow.length > 0) {
        rows.push(currentRow)
      }

      return rows
    }

    function toStyleValue(val: string | number): string {
      if (typeof val === 'number') return `${val}px`
      return val
    }

    function renderBorderedTable(rows: DescItem[][]) {
      const tableRows: VNode[] = []

      for (const row of rows) {
        if (props.direction === 'vertical') {
          // Label row
          const labelCells = row.map((item) => {
            const style: Record<string, string> = {}
            if (item.labelWidth) style.width = toStyleValue(item.labelWidth)
            if (item.labelAlign || item.align)
              style.textAlign = item.labelAlign || item.align
            return h(
              'th',
              {
                class: [ns.e('label'), ns.is('bordered', true), item.labelClassName],
                colspan: item.span,
                style,
              },
              item.labelSlots || item.label
            )
          })
          // Content row
          const contentCells = row.map((item) => {
            const style: Record<string, string> = {}
            if (item.width) style.width = toStyleValue(item.width)
            if (item.minWidth) style.minWidth = toStyleValue(item.minWidth)
            if (item.align) style.textAlign = item.align
            return h(
              'td',
              {
                class: [ns.e('content'), ns.is('bordered', true), item.className],
                colspan: item.span,
                style,
              },
              item.slots
            )
          })
          tableRows.push(h('tr', null, labelCells))
          tableRows.push(h('tr', null, contentCells))
        } else {
          // Horizontal: alternating th/td pairs
          const cells: VNode[] = []
          for (const item of row) {
            const labelStyle: Record<string, string> = {}
            if (item.labelWidth) labelStyle.width = toStyleValue(item.labelWidth)
            if (item.labelAlign) labelStyle.textAlign = item.labelAlign

            const contentStyle: Record<string, string> = {}
            if (item.width) contentStyle.width = toStyleValue(item.width)
            if (item.minWidth) contentStyle.minWidth = toStyleValue(item.minWidth)
            if (item.align) contentStyle.textAlign = item.align

            cells.push(
              h(
                'th',
                {
                  class: [ns.e('label'), ns.is('bordered', true), item.labelClassName],
                  style: labelStyle,
                },
                item.labelSlots || item.label
              )
            )
            cells.push(
              h(
                'td',
                {
                  class: [ns.e('content'), ns.is('bordered', true), item.className],
                  colspan: item.span > 1 ? item.span * 2 - 1 : 1,
                  style: contentStyle,
                },
                item.slots
              )
            )
          }
          tableRows.push(h('tr', null, cells))
        }
      }

      return h(
        'table',
        { class: ns.e('table') },
        [h('tbody', null, tableRows)]
      )
    }

    function renderNonBorderedBody(rows: DescItem[][]) {
      const tableRows: VNode[] = []

      for (const row of rows) {
        if (props.direction === 'vertical') {
          const labelCells = row.map((item) => {
            const style: Record<string, string> = {}
            if (item.labelAlign || item.align)
              style.textAlign = item.labelAlign || item.align
            return h(
              'td',
              {
                class: [ns.e('label'), item.labelClassName],
                colspan: item.span,
                style,
              },
              item.labelSlots || item.label
            )
          })
          const contentCells = row.map((item) => {
            const style: Record<string, string> = {}
            if (item.align) style.textAlign = item.align
            return h(
              'td',
              {
                class: [ns.e('content'), item.className],
                colspan: item.span,
                style,
              },
              item.slots
            )
          })
          tableRows.push(h('tr', null, labelCells))
          tableRows.push(h('tr', null, contentCells))
        } else {
          const cells: VNode[] = []
          for (const item of row) {
            cells.push(
              h('td', { class: ns.e('cell'), colspan: item.span }, [
                h(
                  'span',
                  { class: [ns.e('label'), item.labelClassName] },
                  item.labelSlots || item.label
                ),
                h(
                  'span',
                  { class: [ns.e('content'), item.className] },
                  item.slots
                ),
              ])
            )
          }
          tableRows.push(h('tr', null, cells))
        }
      }

      return h(
        'table',
        { class: ns.e('table') },
        [h('tbody', null, tableRows)]
      )
    }

    return () => {
      const items = getItems()
      const rows = buildRows(items)

      const headerChildren: VNode[] = []
      const hasTitle = props.title || slots.title
      const hasExtra = props.extra || slots.extra

      if (hasTitle || hasExtra) {
        headerChildren.push(
          h('div', { class: ns.e('header') }, [
            h(
              'div',
              { class: ns.e('title') },
              slots.title?.() || props.title
            ),
            h(
              'div',
              { class: ns.e('extra') },
              slots.extra?.() || props.extra
            ),
          ])
        )
      }

      const body = props.border
        ? renderBorderedTable(rows)
        : renderNonBorderedBody(rows)

      return h(
        'div',
        {
          class: [
            ns.b(),
            ns.m(props.size),
            ns.is('bordered', props.border),
          ],
        },
        [...headerChildren, h('div', { class: ns.e('body') }, [body])]
      )
    }
  },
})
</script>
