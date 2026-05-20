<script setup lang="ts">
import { computed, ref, watch, toRef, onBeforeUnmount, type CSSProperties } from 'vue'
import { useNamespace, useZIndex, useFocusTrap, useLockscreen } from '@stellux/hooks'
import { drawerProps, drawerEmits } from './drawer'
import StxOverlay from '../overlay/overlay.vue'

defineOptions({ name: 'StxDrawer' })

const props = defineProps(drawerProps)
const emit = defineEmits(drawerEmits)

const ns = useNamespace('drawer')
const { nextZIndex } = useZIndex()

const drawerRef = ref<HTMLElement>()
const zIndexVal = ref<number>(2000)
const rendered = ref(props.modelValue)

// Focus trap
useFocusTrap(drawerRef, toRef(props, 'modelValue'))

// Lock screen
const lockScreenActive = computed(() => props.modelValue && props.lockScroll)
useLockscreen(lockScreenActive)

// Transition name based on direction
const drawerTransitionName = computed(() => `stx-drawer-${props.direction}`)

// Drawer style: width for rtl/ltr, height for ttb/btt
const drawerStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  const sizeVal = typeof props.size === 'number' ? `${props.size}px` : props.size

  if (props.direction === 'rtl' || props.direction === 'ltr') {
    style.width = sizeVal
  } else {
    style.height = sizeVal
  }
  return style
})

// Watch modelValue for open/close
watch(() => props.modelValue, (val) => {
  if (val) {
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
  emit('closed')
  if (props.destroyOnClose) {
    rendered.value = false
  }
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
</script>

<template>
  <Teleport to="body" :disabled="!appendToBody">
    <Transition name="stx-fade-in-linear" @after-enter="emit('opened')" @after-leave="onClosed">
      <div
        v-show="modelValue"
        :class="ns.e('overlay-wrapper')"
        :style="{ zIndex: zIndexVal }"
      >
        <StxOverlay v-if="modal" @click="onMaskClick" />

        <Transition :name="drawerTransitionName">
          <div
            v-show="modelValue"
            ref="drawerRef"
            :class="[ns.b(), ns.m(direction)]"
            :style="drawerStyle"
            role="dialog"
            aria-modal="true"
          >
            <div v-if="withHeader" :class="ns.e('header')">
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
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
