<script setup lang="ts">
import { computed, nextTick, ref, shallowRef, toRef, watch, type CSSProperties } from 'vue'
import {
  useNamespace,
  useZIndex,
  useClickOutside,
  usePopper,
  useFormItem,
  useFormDisabled,
  useFormSize,
} from '@stellux/hooks'
import { colorPickerProps, colorPickerEmits } from './color-picker'
import {
  parseColor,
  formatColor,
  hsvToRgb,
  hsvToHex,
  type HSV,
} from './color-utils'
import StxButton from '../button/button.vue'

defineOptions({ name: 'StxColorPicker' })

const props = defineProps(colorPickerProps)
const emit = defineEmits(colorPickerEmits)

const ns = useNamespace('color-picker')
const { nextZIndex } = useZIndex()
const { formItem } = useFormItem()
const actualDisabled = useFormDisabled(props)
const actualSize = useFormSize(props)

// Refs
const pickerRef = shallowRef<HTMLElement>()
const triggerRef = shallowRef<HTMLElement>()
const panelRef = shallowRef<HTMLElement>()
const svPanelRef = shallowRef<HTMLElement>()
const hueBarRef = shallowRef<HTMLElement>()
const alphaBarRef = shallowRef<HTMLElement>()

// State
const panelVisible = ref(false)
const currentZIndex = ref(2000)

// Internal HSV state
const hue = ref(0)
const saturation = ref(100)
const value = ref(100)
const alpha = ref(100)

// Hex input
const hexInput = ref('')

// Determine output format
const outputFormat = computed(() => {
  if (props.colorFormat) return props.colorFormat
  if (props.showAlpha) return 'rgb'
  return 'hex'
})

// Parse modelValue on mount / change
function syncFromModelValue() {
  const parsed = parseColor(props.modelValue)
  if (parsed) {
    hue.value = parsed.h
    saturation.value = parsed.s
    value.value = parsed.v
    alpha.value = parsed.a
  } else if (!props.modelValue) {
    hue.value = 0
    saturation.value = 100
    value.value = 100
    alpha.value = 100
  }
  updateHexInput()
}

watch(() => props.modelValue, syncFromModelValue, { immediate: true })

function updateHexInput() {
  hexInput.value = hsvToHex(hue.value, saturation.value, value.value, props.showAlpha ? alpha.value : 100)
}

// Current color as CSS string for display
const currentColorStyle = computed(() => {
  const { r, g, b } = hsvToRgb(hue.value, saturation.value, value.value)
  return `rgba(${r}, ${g}, ${b}, ${alpha.value / 100})`
})

// Hue-only color for the SV panel background
const hueColor = computed(() => {
  const { r, g, b } = hsvToRgb(hue.value, 100, 100)
  return `rgb(${r}, ${g}, ${b})`
})

// Alpha bar gradient
const alphaGradient = computed(() => {
  const { r, g, b } = hsvToRgb(hue.value, saturation.value, value.value)
  return `linear-gradient(to right, rgba(${r},${g},${b},0) 0%, rgba(${r},${g},${b},1) 100%)`
})

// Active color string for activeChange
function getActiveColor(): string {
  return formatColor(hue.value, saturation.value, value.value, alpha.value, outputFormat.value, props.showAlpha)
}

// Popper positioning
const { x, y, update: updatePopper } = usePopper(triggerRef, panelRef, {
  placement: 'bottom-start',
  offset: 4,
})

const floatingStyles = computed<CSSProperties>(() => ({
  position: 'absolute',
  left: `${x.value}px`,
  top: `${y.value}px`,
  zIndex: currentZIndex.value,
}))

// Click outside
useClickOutside([pickerRef, panelRef], () => {
  if (panelVisible.value) {
    panelVisible.value = false
  }
})

// Toggle panel
function togglePanel() {
  if (actualDisabled.value) return
  if (panelVisible.value) {
    panelVisible.value = false
  } else {
    currentZIndex.value = nextZIndex()
    panelVisible.value = true
    nextTick(() => updatePopper())
  }
}

// --- Saturation/Value panel drag ---
function handleSvPanelMouseDown(e: MouseEvent) {
  e.preventDefault()
  updateSvFromEvent(e)
  const onMove = (ev: MouseEvent) => updateSvFromEvent(ev)
  const onUp = () => {
    document.removeEventListener('mousemove', onMove)
    document.removeEventListener('mouseup', onUp)
  }
  document.addEventListener('mousemove', onMove)
  document.addEventListener('mouseup', onUp)
}

function updateSvFromEvent(e: MouseEvent) {
  const panel = svPanelRef.value
  if (!panel) return
  const rect = panel.getBoundingClientRect()
  let xPos = e.clientX - rect.left
  let yPos = e.clientY - rect.top
  xPos = Math.max(0, Math.min(xPos, rect.width))
  yPos = Math.max(0, Math.min(yPos, rect.height))

  saturation.value = Math.round((xPos / rect.width) * 100)
  value.value = Math.round((1 - yPos / rect.height) * 100)
  updateHexInput()
  emit('activeChange', getActiveColor())
}

// SV pointer position
const svPointerStyle = computed<CSSProperties>(() => ({
  left: `${saturation.value}%`,
  top: `${100 - value.value}%`,
}))

// --- Hue bar drag ---
function handleHueMouseDown(e: MouseEvent) {
  e.preventDefault()
  updateHueFromEvent(e)
  const onMove = (ev: MouseEvent) => updateHueFromEvent(ev)
  const onUp = () => {
    document.removeEventListener('mousemove', onMove)
    document.removeEventListener('mouseup', onUp)
  }
  document.addEventListener('mousemove', onMove)
  document.addEventListener('mouseup', onUp)
}

function updateHueFromEvent(e: MouseEvent) {
  const bar = hueBarRef.value
  if (!bar) return
  const rect = bar.getBoundingClientRect()
  let xPos = e.clientX - rect.left
  xPos = Math.max(0, Math.min(xPos, rect.width))
  hue.value = Math.round((xPos / rect.width) * 360)
  updateHexInput()
  emit('activeChange', getActiveColor())
}

const hueSliderStyle = computed<CSSProperties>(() => ({
  left: `${(hue.value / 360) * 100}%`,
}))

// --- Alpha bar drag ---
function handleAlphaMouseDown(e: MouseEvent) {
  e.preventDefault()
  updateAlphaFromEvent(e)
  const onMove = (ev: MouseEvent) => updateAlphaFromEvent(ev)
  const onUp = () => {
    document.removeEventListener('mousemove', onMove)
    document.removeEventListener('mouseup', onUp)
  }
  document.addEventListener('mousemove', onMove)
  document.addEventListener('mouseup', onUp)
}

function updateAlphaFromEvent(e: MouseEvent) {
  const bar = alphaBarRef.value
  if (!bar) return
  const rect = bar.getBoundingClientRect()
  let xPos = e.clientX - rect.left
  xPos = Math.max(0, Math.min(xPos, rect.width))
  alpha.value = Math.round((xPos / rect.width) * 100)
  updateHexInput()
  emit('activeChange', getActiveColor())
}

const alphaSliderStyle = computed<CSSProperties>(() => ({
  left: `${alpha.value}%`,
}))

// --- Hex input ---
function handleHexInput(e: Event) {
  hexInput.value = (e.target as HTMLInputElement).value
}

function handleHexBlur() {
  const parsed = parseColor(hexInput.value)
  if (parsed) {
    hue.value = parsed.h
    saturation.value = parsed.s
    value.value = parsed.v
    if (props.showAlpha) alpha.value = parsed.a
    emit('activeChange', getActiveColor())
  }
  updateHexInput()
}

function handleHexKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    handleHexBlur()
  }
}

// --- Predefined color click ---
function handlePredefineClick(color: string) {
  const parsed = parseColor(color)
  if (parsed) {
    hue.value = parsed.h
    saturation.value = parsed.s
    value.value = parsed.v
    if (props.showAlpha) alpha.value = parsed.a
    updateHexInput()
    emit('activeChange', getActiveColor())
  }
}

// --- Confirm / Clear ---
function handleConfirm() {
  const colorStr = getActiveColor()
  emit('update:modelValue', colorStr)
  emit('change', colorStr)
  panelVisible.value = false
  formItem?.validate('change')
}

function handleClear() {
  emit('update:modelValue', '')
  emit('change', '')
  panelVisible.value = false
  formItem?.validate('change')
}

defineExpose({
  togglePanel,
})
</script>

<template>
  <div
    ref="pickerRef"
    :class="[
      ns.b(),
      actualSize !== 'default' && ns.m(actualSize),
      ns.is('disabled', actualDisabled),
    ]"
  >
    <!-- Trigger -->
    <div
      ref="triggerRef"
      :class="ns.e('trigger')"
      @click="togglePanel"
    >
      <span :class="ns.e('color')">
        <span
          :class="ns.e('color-inner')"
          :style="{ backgroundColor: modelValue ? currentColorStyle : 'transparent' }"
        />
      </span>
      <svg
        :class="ns.e('icon')"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>

    <!-- Panel -->
    <Teleport to="body" :disabled="!teleported">
      <Transition name="stx-zoom-in-top">
        <div
          v-show="panelVisible"
          ref="panelRef"
          :class="ns.e('panel')"
          :style="floatingStyles"
        >
          <!-- Saturation / Value panel -->
          <div
            ref="svPanelRef"
            :class="ns.e('sv-panel')"
            :style="{ backgroundColor: hueColor }"
            @mousedown="handleSvPanelMouseDown"
          >
            <div :class="ns.e('sv-white')" />
            <div :class="ns.e('sv-black')" />
            <div
              :class="ns.e('sv-pointer')"
              :style="svPointerStyle"
            />
          </div>

          <!-- Hue bar -->
          <div :class="ns.e('bar-wrap')">
            <div
              ref="hueBarRef"
              :class="ns.e('hue-bar')"
              @mousedown="handleHueMouseDown"
            >
              <div
                :class="ns.e('bar-slider')"
                :style="hueSliderStyle"
              />
            </div>
          </div>

          <!-- Alpha bar -->
          <div v-if="showAlpha" :class="ns.e('bar-wrap')">
            <div
              ref="alphaBarRef"
              :class="ns.e('alpha-bar')"
              @mousedown="handleAlphaMouseDown"
            >
              <div
                :class="ns.e('alpha-gradient')"
                :style="{ background: alphaGradient }"
              />
              <div
                :class="ns.e('bar-slider')"
                :style="alphaSliderStyle"
              />
            </div>
          </div>

          <!-- Hex input -->
          <div :class="ns.e('input-wrap')">
            <input
              :class="ns.e('hex-input')"
              :value="hexInput"
              @input="handleHexInput"
              @blur="handleHexBlur"
              @keydown="handleHexKeydown"
            />
          </div>

          <!-- Predefined colors -->
          <div v-if="predefine && predefine.length" :class="ns.e('predefine')">
            <div
              v-for="(c, i) in predefine"
              :key="i"
              :class="ns.e('predefine-color')"
              :style="{ backgroundColor: c }"
              @click="handlePredefineClick(c)"
            />
          </div>

          <!-- Buttons -->
          <div :class="ns.e('buttons')">
            <stx-button size="small" text @click="handleClear">Clear</stx-button>
            <stx-button size="small" type="primary" @click="handleConfirm">OK</stx-button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
