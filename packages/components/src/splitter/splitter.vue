<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  provide,
  toRef,
  onBeforeUnmount,
  h,
  Fragment,
  type VNode,
} from 'vue'
import { useNamespace } from '@stellux/hooks'
import { splitterProps, splitterEmits } from './splitter'
import { splitterContextKey } from './constants'

export default defineComponent({
  name: 'StxSplitter',
  props: splitterProps,
  emits: splitterEmits,
  setup(props, { emit, slots }) {
    const ns = useNamespace('splitter')
    const containerRef = ref<HTMLElement>()

    // --- Panel registry ---
    interface PanelEntry {
      id: string
      size: number
      min: number
      max: number
      initialSize?: number
      collapsed: boolean
      sizeBeforeCollapse: number
    }

    const panels = reactive<PanelEntry[]>([])

    function distributeFreeSizes() {
      const withSize = panels.filter((p) => p.initialSize !== undefined)
      const withoutSize = panels.filter((p) => p.initialSize === undefined)
      const usedSpace = withSize.reduce((sum, p) => sum + p.size, 0)
      const remaining = 100 - usedSpace
      const each = withoutSize.length > 0 ? remaining / withoutSize.length : 0
      withoutSize.forEach((p) => {
        p.size = Math.max(p.min, Math.min(p.max, each))
      })
    }

    function registerPanel(
      id: string,
      size?: number,
      min: number = 0,
      max: number = 100,
    ) {
      const entry: PanelEntry = {
        id,
        size: size !== undefined ? size : 0,
        min,
        max,
        initialSize: size,
        collapsed: false,
        sizeBeforeCollapse: size !== undefined ? size : 0,
      }
      panels.push(entry)
      distributeFreeSizes()
    }

    function unregisterPanel(id: string) {
      const idx = panels.findIndex((p) => p.id === id)
      if (idx !== -1) {
        panels.splice(idx, 1)
        distributeFreeSizes()
      }
    }

    function getPanelStyle(id: string): Record<string, string> {
      const panel = panels.find((p) => p.id === id)
      if (!panel) return {}
      return {
        flexBasis: `${panel.size}%`,
        flexGrow: '0',
        flexShrink: '0',
        overflow: 'auto',
      }
    }

    provide(splitterContextKey, {
      direction: toRef(props, 'direction'),
      registerPanel,
      unregisterPanel,
      getPanelStyle,
    })

    // --- Drag logic ---
    const draggingIndex = ref(-1)
    let dragStartPos = 0
    let dragStartSizes: number[] = []
    let leftPanelIdx = 0
    let rightPanelIdx = 0
    let savedUserSelect = ''

    function getSizes(): number[] {
      return panels.map((p) => p.size)
    }

    function getContainerSize(): number {
      if (!containerRef.value) return 1
      return props.direction === 'horizontal'
        ? containerRef.value.offsetWidth
        : containerRef.value.offsetHeight
    }

    function startDrag(event: MouseEvent, gutterIdx: number) {
      event.preventDefault()
      draggingIndex.value = gutterIdx
      leftPanelIdx = gutterIdx
      rightPanelIdx = gutterIdx + 1

      dragStartPos =
        props.direction === 'horizontal' ? event.clientX : event.clientY
      dragStartSizes = getSizes()

      savedUserSelect = document.body.style.userSelect
      document.body.style.userSelect = 'none'

      emit('resize-start', getSizes())

      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
    }

    function onMouseMove(event: MouseEvent) {
      if (draggingIndex.value === -1) return

      const currentPos =
        props.direction === 'horizontal' ? event.clientX : event.clientY
      const containerSize = getContainerSize()
      const deltaPx = currentPos - dragStartPos
      const deltaPercent = (deltaPx / containerSize) * 100

      const leftPanel = panels[leftPanelIdx]
      const rightPanel = panels[rightPanelIdx]
      if (!leftPanel || !rightPanel) return

      const leftStart = dragStartSizes[leftPanelIdx]
      const rightStart = dragStartSizes[rightPanelIdx]

      let newLeft = leftStart + deltaPercent
      let newRight = rightStart - deltaPercent

      // Clamp to min/max
      if (newLeft < leftPanel.min) {
        newLeft = leftPanel.min
        newRight = leftStart + rightStart - newLeft
      }
      if (newLeft > leftPanel.max) {
        newLeft = leftPanel.max
        newRight = leftStart + rightStart - newLeft
      }
      if (newRight < rightPanel.min) {
        newRight = rightPanel.min
        newLeft = leftStart + rightStart - newRight
      }
      if (newRight > rightPanel.max) {
        newRight = rightPanel.max
        newLeft = leftStart + rightStart - newRight
      }

      leftPanel.size = newLeft
      rightPanel.size = newRight

      emit('resize', getSizes())
    }

    function onMouseUp() {
      if (draggingIndex.value === -1) return
      draggingIndex.value = -1

      document.body.style.userSelect = savedUserSelect

      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)

      emit('resize-end', getSizes())
    }

    function toggleCollapse(gutterIdx: number) {
      const leftPanel = panels[gutterIdx]
      const rightPanel = panels[gutterIdx + 1]

      // Try collapsing the left panel first, then the right
      let target: PanelEntry | undefined
      if (leftPanel) {
        target = leftPanel
      } else if (rightPanel) {
        target = rightPanel
      }

      if (target) {
        if (target.collapsed) {
          // Expand
          const other = target === leftPanel ? rightPanel : leftPanel
          const restoreSize = target.sizeBeforeCollapse
          const delta = restoreSize - target.size
          other.size = Math.max(other.min, other.size - delta)
          target.size = restoreSize
          target.collapsed = false
        } else {
          // Collapse
          const other = target === leftPanel ? rightPanel : leftPanel
          target.sizeBeforeCollapse = target.size
          const freed = target.size - target.min
          target.size = target.min
          other.size = Math.min(other.max, other.size + freed)
          target.collapsed = true
        }
        emit('resize', getSizes())
      }
    }

    onBeforeUnmount(() => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
      if (draggingIndex.value !== -1) {
        document.body.style.userSelect = savedUserSelect
      }
    })

    // --- Render ---
    function flattenSlotChildren(vnodes: VNode[]): VNode[] {
      const result: VNode[] = []
      for (const vnode of vnodes) {
        if (vnode.type === Fragment) {
          if (Array.isArray(vnode.children)) {
            result.push(...flattenSlotChildren(vnode.children as VNode[]))
          }
        } else {
          result.push(vnode)
        }
      }
      return result
    }

    return () => {
      const defaultSlot = slots.default?.()
      const children: VNode[] = defaultSlot
        ? flattenSlotChildren(defaultSlot)
        : []

      // Filter out text and comment nodes
      const validChildren = children.filter(
        (c) => typeof c.type === 'object' || typeof c.type === 'string',
      )

      const content: VNode[] = []
      validChildren.forEach((child, index) => {
        content.push(child)
        if (index < validChildren.length - 1) {
          content.push(
            h(
              'div',
              {
                class: [
                  ns.e('gutter'),
                  draggingIndex.value === index ? 'is-dragging' : '',
                ],
                onMousedown: (e: MouseEvent) => startDrag(e, index),
                onDblclick: () => toggleCollapse(index),
              },
              [h('div', { class: ns.e('gutter-icon') })],
            ),
          )
        }
      })

      return h(
        'div',
        {
          ref: containerRef,
          class: [ns.b(), ns.m(props.direction)],
        },
        content,
      )
    }
  },
})
</script>
