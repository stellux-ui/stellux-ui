<script lang="ts">
let tooltipIdCounter = 0
</script>

<script setup lang="ts">
import { computed, ref, watch, toRef, onBeforeUnmount, type CSSProperties } from 'vue'
import { useNamespace, useZIndex, useClickOutside, usePopper } from '@stellux/hooks'
import { tooltipProps, tooltipEmits } from './tooltip'

defineOptions({ name: 'StxTooltip' })

const props = defineProps(tooltipProps)
const emit = defineEmits(tooltipEmits)

const ns = useNamespace('tooltip')
const { nextZIndex } = useZIndex()

// Unique ID for ARIA
const tooltipId = `stx-tooltip-${++tooltipIdCounter}`

// Refs
const triggerRef = ref<HTMLElement>()
const contentRef = ref<HTMLElement>()
const arrowRef = ref<HTMLElement>()

// State
const internalOpen = ref(false)
let showTimer: ReturnType<typeof setTimeout> | undefined
let hideTimer: ReturnType<typeof setTimeout> | undefined
const currentZIndex = ref(2000)

// Controlled vs uncontrolled
const open = computed(() => {
  if (props.disabled) return false
  if (props.visible !== undefined) return props.visible
  return internalOpen.value
})

// Popper
const { x, y, placement, arrowX, arrowY } = usePopper(triggerRef, contentRef, {
  placement: toRef(props, 'placement'),
  offset: toRef(props, 'offset'),
  arrowRef,
})

// Styles
const floatingStyles = computed<CSSProperties>(() => {
  const styles: CSSProperties = {
    position: 'absolute',
    left: `${x.value}px`,
    top: `${y.value}px`,
    zIndex: currentZIndex.value,
  }
  if (props.popperStyle) {
    if (typeof props.popperStyle === 'string') {
      return styles
    } else if (Array.isArray(props.popperStyle)) {
      return Object.assign(styles, ...props.popperStyle)
    } else {
      return Object.assign(styles, props.popperStyle)
    }
  }
  return styles
})

const arrowStyles = computed<CSSProperties>(() => {
  const styles: CSSProperties = {}
  if (arrowX.value != null) {
    styles.left = `${arrowX.value}px`
  }
  if (arrowY.value != null) {
    styles.top = `${arrowY.value}px`
  }
  // Position arrow on the opposite side of placement
  const side = placement.value.split('-')[0]
  if (side === 'top') {
    styles.bottom = '-4px'
    delete styles.top
  } else if (side === 'bottom') {
    styles.top = '-4px'
  } else if (side === 'left') {
    styles.right = '-4px'
    delete styles.left
  } else if (side === 'right') {
    styles.left = '-4px'
  }
  return styles
})

// Timer management
function clearTimers() {
  if (showTimer) {
    clearTimeout(showTimer)
    showTimer = undefined
  }
  if (hideTimer) {
    clearTimeout(hideTimer)
    hideTimer = undefined
  }
}

function doShow() {
  clearTimers()
  if (props.disabled) return
  currentZIndex.value = nextZIndex()
  if (props.showAfter > 0) {
    showTimer = setTimeout(() => {
      setOpen(true)
    }, props.showAfter)
  } else {
    setOpen(true)
  }
}

function doHide() {
  clearTimers()
  if (props.hideAfter > 0) {
    hideTimer = setTimeout(() => {
      setOpen(false)
    }, props.hideAfter)
  } else {
    setOpen(false)
  }
}

function setOpen(val: boolean) {
  if (props.visible !== undefined) {
    emit('update:visible', val)
  } else {
    internalOpen.value = val
  }
}

// Trigger handlers
function onMouseEnter() {
  if (props.trigger !== 'hover') return
  doShow()
}

function onMouseLeave() {
  if (props.trigger !== 'hover') return
  doHide()
}

function onClick() {
  if (props.trigger !== 'click') return
  if (open.value) {
    doHide()
  } else {
    doShow()
  }
}

function onFocusIn() {
  if (props.trigger !== 'focus') return
  doShow()
}

function onFocusOut() {
  if (props.trigger !== 'focus') return
  doHide()
}

function onContextMenu(e: MouseEvent) {
  if (props.trigger !== 'contextmenu') return
  e.preventDefault()
  if (open.value) {
    doHide()
  } else {
    doShow()
  }
}

// Content hover (for enterable)
function onContentEnter() {
  if (props.trigger !== 'hover' || !props.enterable) return
  clearTimers()
}

function onContentLeave() {
  if (props.trigger !== 'hover' || !props.enterable) return
  doHide()
}

// Click outside for click/contextmenu triggers
useClickOutside([triggerRef, contentRef], () => {
  if (props.trigger === 'click' || props.trigger === 'contextmenu') {
    if (open.value) {
      setOpen(false)
    }
  }
})

// Emit on open change
watch(open, (val) => {
  if (props.visible !== undefined) return
  emit('update:visible', val)
})

// Cleanup
onBeforeUnmount(() => {
  clearTimers()
})
</script>

<template>
  <div
    ref="triggerRef"
    :class="ns.e('trigger')"
    :aria-describedby="open ? tooltipId : undefined"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @click="onClick"
    @focusin="onFocusIn"
    @focusout="onFocusOut"
    @contextmenu="onContextMenu"
  >
    <slot />
  </div>
  <Teleport to="body" :disabled="!teleported">
    <Transition :name="transition">
      <div
        v-if="persistent ? true : open"
        v-show="open"
        ref="contentRef"
        role="tooltip"
        :id="tooltipId"
        :class="[
          ns.e('content'),
          ns.is('dark', effect === 'dark'),
          ns.is('light', effect === 'light'),
          popperClass,
        ]"
        :style="floatingStyles"
        :aria-label="ariaLabel"
        @mouseenter="onContentEnter"
        @mouseleave="onContentLeave"
      >
        <slot name="content">
          <span v-if="!rawContent">{{ content }}</span>
          <span v-else v-html="content" />
        </slot>
        <div
          v-if="showArrow"
          ref="arrowRef"
          :class="ns.e('arrow')"
          :style="arrowStyles"
        />
      </div>
    </Transition>
  </Teleport>
</template>
