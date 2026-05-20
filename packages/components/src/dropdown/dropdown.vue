<script setup lang="ts">
import { computed, provide, ref, toRef, watch, onBeforeUnmount, type CSSProperties } from 'vue'
import { useNamespace, usePopper, useClickOutside, useZIndex } from '@stellux/hooks'
import { dropdownProps, dropdownEmits } from './dropdown'
import { dropdownContextKey } from './constants'

defineOptions({ name: 'StxDropdown' })

const props = defineProps(dropdownProps)
const emit = defineEmits(dropdownEmits)

const ns = useNamespace('dropdown')
const { nextZIndex } = useZIndex()

const triggerRef = ref<HTMLElement>()
const contentRef = ref<HTMLElement>()
const visible = ref(false)
const currentZIndex = ref(2000)

let showTimer: ReturnType<typeof setTimeout> | undefined
let hideTimer: ReturnType<typeof setTimeout> | undefined

const { x, y } = usePopper(triggerRef, contentRef, {
  placement: toRef(props, 'placement') as any,
  offset: 4,
})

const floatingStyles = computed<CSSProperties>(() => ({
  position: 'absolute',
  left: `${x.value}px`,
  top: `${y.value}px`,
  zIndex: currentZIndex.value,
}))

const maxHeightStyle = computed<CSSProperties | undefined>(() => {
  if (!props.maxHeight) return undefined
  const val = typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight
  return { maxHeight: val, overflow: 'auto' }
})

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
  if (props.showTimeout > 0) {
    showTimer = setTimeout(() => {
      visible.value = true
    }, props.showTimeout)
  } else {
    visible.value = true
  }
}

function doHide() {
  clearTimers()
  if (props.hideTimeout > 0) {
    hideTimer = setTimeout(() => {
      visible.value = false
    }, props.hideTimeout)
  } else {
    visible.value = false
  }
}

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
  if (visible.value) {
    doHide()
  } else {
    doShow()
  }
}

function onContextMenu(e: MouseEvent) {
  if (props.trigger !== 'contextmenu') return
  e.preventDefault()
  if (visible.value) {
    doHide()
  } else {
    doShow()
  }
}

function onContentEnter() {
  if (props.trigger !== 'hover') return
  clearTimers()
}

function onContentLeave() {
  if (props.trigger !== 'hover') return
  doHide()
}

function handleCommand(command: any) {
  emit('command', command)
  if (props.hideOnClick) {
    visible.value = false
  }
}

function close() {
  visible.value = false
}

useClickOutside([triggerRef, contentRef], () => {
  if (props.trigger === 'click' || props.trigger === 'contextmenu') {
    if (visible.value) {
      visible.value = false
    }
  }
})

watch(visible, (val) => {
  emit('visible-change', val)
})

provide(dropdownContextKey, {
  handleCommand,
  hideOnClick: props.hideOnClick,
  close,
})

onBeforeUnmount(() => {
  clearTimers()
})

defineExpose({ close, visible })
</script>

<template>
  <div
    :class="ns.b()"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div
      ref="triggerRef"
      :class="ns.e('trigger')"
      :tabindex="tabindex"
      @click="onClick"
      @contextmenu="onContextMenu"
    >
      <slot />
    </div>
    <Teleport to="body" :disabled="!teleported">
      <Transition name="stx-fade-in-linear">
        <div
          v-show="visible"
          ref="contentRef"
          :class="[ns.e('popper'), popperClass]"
          :style="floatingStyles"
          @mouseenter="onContentEnter"
          @mouseleave="onContentLeave"
        >
          <div :class="ns.e('menu-wrap')" :style="maxHeightStyle">
            <slot name="dropdown" />
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
