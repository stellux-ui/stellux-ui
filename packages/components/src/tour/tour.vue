<script setup lang="ts">
import {
  computed,
  ref,
  watch,
  provide,
  toRef,
  onMounted,
  onBeforeUnmount,
  nextTick,
  type CSSProperties,
} from 'vue'
import { useNamespace, usePopper, useZIndex } from '@stellux/hooks'
import { tourProps, tourEmits } from './tour'
import { tourContextKey } from './constants'
import type { TourStepData } from './constants'
import StxButton from '../button/button.vue'

defineOptions({ name: 'StxTour' })

const props = defineProps(tourProps)
const emit = defineEmits(tourEmits)

const ns = useNamespace('tour')
const { nextZIndex } = useZIndex()

// ---- State ----
const steps = ref<TourStepData[]>([])
const internalCurrent = ref(props.current)
const internalVisible = ref(props.modelValue ?? false)

const current = computed({
  get: () => internalCurrent.value,
  set: (val: number) => {
    internalCurrent.value = val
    emit('update:current', val)
    emit('change', val)
  },
})

const visible = computed({
  get: () => {
    if (props.modelValue !== undefined) return props.modelValue
    return internalVisible.value
  },
  set: (val: boolean) => {
    internalVisible.value = val
    emit('update:modelValue', val)
  },
})

watch(() => props.current, (val) => {
  internalCurrent.value = val
})

watch(() => props.modelValue, (val) => {
  if (val !== undefined) internalVisible.value = val
})

// ---- Step management via provide/inject ----
provide(tourContextKey, {
  current,
  registerStep: (step: TourStepData) => {
    steps.value.push(step)
  },
  unregisterStep: (uid: number) => {
    const idx = steps.value.findIndex((s) => s.uid === uid)
    if (idx !== -1) steps.value.splice(idx, 1)
  },
  updateStep: (uid: number, step: TourStepData) => {
    const idx = steps.value.findIndex((s) => s.uid === uid)
    if (idx !== -1) steps.value[idx] = step
  },
})

// ---- Current step data ----
const currentStep = computed(() => steps.value[current.value])

const currentType = computed(
  () => currentStep.value?.type ?? props.type,
)

const currentShowArrow = computed(
  () => currentStep.value?.showArrow ?? props.showArrow,
)

const showMask = computed(() => {
  const stepMask = currentStep.value?.mask
  if (stepMask !== undefined && stepMask !== null) return !!stepMask
  return !!props.mask
})

const maskColor = computed(() => {
  const stepMask = currentStep.value?.mask
  if (stepMask && typeof stepMask === 'object' && (stepMask as any).color) {
    return (stepMask as any).color
  }
  if (props.mask && typeof props.mask === 'object' && props.mask.color) {
    return props.mask.color
  }
  return 'rgba(0, 0, 0, 0.5)'
})

// ---- Target resolution ----
const targetEl = ref<HTMLElement | null>(null)
const targetRect = ref<DOMRect | null>(null)
const popoverRef = ref<HTMLElement>()
const arrowRef = ref<HTMLElement>()
const virtualRef = ref<HTMLElement>()

function resolveTarget(target?: string | HTMLElement | (() => HTMLElement | null)): HTMLElement | null {
  if (!target) return null
  if (typeof target === 'string') return document.querySelector(target)
  if (typeof target === 'function') return target()
  return target
}

function updateTarget() {
  const step = currentStep.value
  if (!step) {
    targetEl.value = null
    targetRect.value = null
    return
  }
  const el = resolveTarget(step.target)
  targetEl.value = el
  if (el) {
    targetRect.value = el.getBoundingClientRect()
  } else {
    targetRect.value = null
  }
}

// ---- Popper positioning ----
const popperPlacement = computed(
  () => (currentStep.value?.placement ?? props.placement) as any,
)

const { x, y, placement: actualPlacement, arrowX, arrowY, update: updatePopper } = usePopper(
  targetEl as any,
  popoverRef,
  {
    placement: popperPlacement,
    offset: ref(12),
    arrowRef,
  },
)

const currentZIndex = ref(2000)

const popoverStyle = computed<CSSProperties>(() => {
  const z = props.zIndex ?? currentZIndex.value
  if (!targetEl.value || !targetRect.value) {
    // Center on screen when no target
    return {
      position: 'fixed',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: z + 1,
    }
  }
  return {
    position: 'absolute',
    left: `${x.value}px`,
    top: `${y.value}px`,
    zIndex: z + 1,
  }
})

const arrowStyle = computed<CSSProperties>(() => {
  const styles: CSSProperties = {}
  if (arrowX.value != null) styles.left = `${arrowX.value}px`
  if (arrowY.value != null) styles.top = `${arrowY.value}px`
  const side = actualPlacement.value.split('-')[0]
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

// ---- Mask hole style ----
const holeStyle = computed<CSSProperties>(() => {
  if (!targetRect.value) return { display: 'none' }
  const padding = 4
  const rect = targetRect.value
  return {
    position: 'fixed',
    left: `${rect.left - padding}px`,
    top: `${rect.top - padding}px`,
    width: `${rect.width + padding * 2}px`,
    height: `${rect.height + padding * 2}px`,
    borderRadius: '4px',
    boxShadow: `0 0 0 9999px ${maskColor.value}`,
    zIndex: props.zIndex ?? currentZIndex.value,
    pointerEvents: 'none' as const,
    transition: 'all 0.3s ease',
  }
})

const maskOverlayStyle = computed<CSSProperties>(() => {
  if (targetRect.value) return { display: 'none' }
  return {
    position: 'fixed',
    inset: '0',
    backgroundColor: maskColor.value,
    zIndex: props.zIndex ?? currentZIndex.value,
  }
})

// ---- Navigation ----
function prev() {
  if (current.value > 0) {
    current.value = current.value - 1
  }
}

function next() {
  if (current.value < steps.value.length - 1) {
    current.value = current.value + 1
  }
}

function finish() {
  emit('finish')
  handleClose()
}

function handleClose() {
  emit('close', current.value)
  visible.value = false
}

// ---- Keyboard ----
function handleKeydown(evt: KeyboardEvent) {
  if (props.closeOnPressEscape && evt.key === 'Escape') {
    handleClose()
  }
}

// ---- Scroll target into view ----
function scrollTargetIntoView() {
  if (targetEl.value && props.scrollIntoViewOptions !== false) {
    const opts =
      typeof props.scrollIntoViewOptions === 'object'
        ? props.scrollIntoViewOptions
        : { behavior: 'smooth' as const, block: 'center' as const }
    targetEl.value.scrollIntoView(opts)
  }
}

// ---- Watch step changes ----
watch(
  [current, visible, () => steps.value.length],
  async () => {
    if (!visible.value) return
    await nextTick()
    updateTarget()
    scrollTargetIntoView()
    await nextTick()
    updatePopper()
  },
  { immediate: true },
)

// ---- Lifecycle ----
onMounted(() => {
  currentZIndex.value = nextZIndex()
  document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <slot />
  <Teleport to="body" v-if="visible">
    <!-- Mask with hole (when target exists) -->
    <div
      v-if="showMask && targetRect"
      :class="ns.e('hole')"
      :style="holeStyle"
    />
    <!-- Full mask overlay (when no target) -->
    <div
      v-if="showMask && !targetRect"
      :class="ns.e('mask')"
      :style="maskOverlayStyle"
    />

    <!-- Step popover -->
    <div
      ref="popoverRef"
      :class="[ns.b(), ns.m(currentType)]"
      :style="popoverStyle"
    >
      <div
        v-if="currentShowArrow && targetEl"
        ref="arrowRef"
        :class="ns.e('arrow')"
        :style="arrowStyle"
      />
      <button :class="ns.e('close')" @click="handleClose">
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
      <div :class="ns.e('header')">
        <span :class="ns.e('title')">{{ currentStep?.title }}</span>
      </div>
      <div :class="ns.e('body')">
        <slot :name="'step-' + current">
          {{ currentStep?.description }}
        </slot>
      </div>
      <div :class="ns.e('footer')">
        <div :class="ns.e('indicators')">
          <span
            v-for="(_, i) in steps.length"
            :key="i"
            :class="[ns.e('indicator'), ns.is('active', i === current)]"
          />
        </div>
        <div :class="ns.e('actions')">
          <stx-button
            v-if="current > 0"
            size="small"
            v-bind="currentStep?.prevButtonProps"
            @click="prev"
          >
            {{ currentStep?.prevButtonProps?.text ?? 'Prev' }}
          </stx-button>
          <stx-button
            v-if="current < steps.length - 1"
            size="small"
            type="primary"
            v-bind="currentStep?.nextButtonProps"
            @click="next"
          >
            {{ currentStep?.nextButtonProps?.text ?? 'Next' }}
          </stx-button>
          <stx-button
            v-else
            size="small"
            type="primary"
            @click="finish"
          >
            Finish
          </stx-button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
