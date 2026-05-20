<script setup lang="ts">
import { computed, ref, watch, toRef, onBeforeUnmount, type CSSProperties } from 'vue'
import { useNamespace, useZIndex, useFocusTrap, useLockscreen } from '@stellux/hooks'
import { dialogProps, dialogEmits } from './dialog'
import StxOverlay from '../overlay/overlay.vue'

defineOptions({ name: 'StxDialog' })

const props = defineProps(dialogProps)
const emit = defineEmits(dialogEmits)

const ns = useNamespace('dialog')
const { nextZIndex } = useZIndex()

const dialogRef = ref<HTMLElement>()
const zIndexVal = ref<number>(2000)
const closed = ref(false)
const rendered = ref(props.modelValue)

// Drag state
const dragState = ref({ dragging: false, startX: 0, startY: 0, dx: 0, dy: 0 })

// Focus trap
useFocusTrap(dialogRef, toRef(props, 'modelValue'))

// Lock screen
const lockScreenActive = computed(() => props.modelValue && props.lockScroll)
useLockscreen(lockScreenActive)

// Computed styles
const dialogStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  if (!props.fullscreen) {
    if (typeof props.width === 'number') {
      style.width = `${props.width}px`
    } else {
      style.width = props.width
    }
    style.marginTop = props.top
  }
  if (dragState.value.dx !== 0 || dragState.value.dy !== 0) {
    style.transform = `translate(${dragState.value.dx}px, ${dragState.value.dy}px)`
  }
  return style
})

// Watch modelValue for open/close
watch(() => props.modelValue, (val) => {
  if (val) {
    closed.value = false
    rendered.value = true
    zIndexVal.value = nextZIndex()
    emit('open')
  } else {
    emit('close')
  }
})

function handleClose() {
  if (props.beforeClose) {
    props.beforeClose(() => {
      doClose()
    })
  } else {
    doClose()
  }
}

function doClose() {
  emit('update:modelValue', false)
}

function onMaskClick() {
  if (props.closeOnClickModal) {
    handleClose()
  }
}

function onClosed() {
  closed.value = true
  emit('closed')
  if (props.destroyOnClose) {
    rendered.value = false
  }
  // Reset drag position
  dragState.value.dx = 0
  dragState.value.dy = 0
}

// Escape key handler
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.closeOnPressEscape) {
    handleClose()
  }
}

watch(() => props.modelValue, (val) => {
  if (val) {
    document.addEventListener('keydown', onKeydown)
  } else {
    document.removeEventListener('keydown', onKeydown)
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
})

// Draggable logic
function onHeaderMouseDown(e: MouseEvent) {
  if (!props.draggable) return
  e.preventDefault()

  const state = dragState.value
  state.dragging = true
  state.startX = e.clientX - state.dx
  state.startY = e.clientY - state.dy

  const onMouseMove = (ev: MouseEvent) => {
    state.dx = ev.clientX - state.startX
    state.dy = ev.clientY - state.startY
  }

  const onMouseUp = () => {
    state.dragging = false
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }

  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}
</script>

<template>
  <Teleport to="body" :disabled="!appendToBody">
    <Transition name="stx-fade-in-linear" @after-enter="emit('opened')" @after-leave="onClosed">
      <div
        v-show="modelValue"
        :class="ns.e('overlay-wrapper')"
        :style="{ zIndex: zIndexVal }"
      >
        <StxOverlay v-if="modal" :z-index="zIndexVal" @click="onMaskClick" />

        <div
          ref="dialogRef"
          :class="[
            ns.b(),
            ns.is('fullscreen', fullscreen),
            ns.is('center', center),
            ns.is('draggable', draggable),
          ]"
          :style="dialogStyle"
          role="dialog"
          aria-modal="true"
          :aria-label="title"
        >
          <div
            :class="ns.e('header')"
            @mousedown="onHeaderMouseDown"
          >
            <slot name="header">
              <span :class="ns.e('title')">{{ title }}</span>
            </slot>
            <button
              v-if="showClose"
              :class="ns.e('close')"
              aria-label="Close"
              @click="handleClose"
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
            </button>
          </div>

          <div :class="ns.e('body')">
            <template v-if="destroyOnClose">
              <slot v-if="rendered" />
            </template>
            <slot v-else />
          </div>

          <div v-if="$slots.footer" :class="ns.e('footer')">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
