<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useNamespace } from '@stellux/hooks'
import { watermarkProps } from './watermark'

defineOptions({ name: 'StxWatermark' })

const props = defineProps(watermarkProps)

const ns = useNamespace('watermark')

const containerRef = ref<HTMLElement>()
const watermarkRef = ref<HTMLDivElement>()
let observer: MutationObserver | undefined

const watermarkStyle = computed(() => ({
  zIndex: props.zIndex,
  position: 'absolute' as const,
  inset: '0',
  pointerEvents: 'none' as const,
  backgroundRepeat: 'repeat',
}))

function getMarkSize(): [number, number] {
  return [props.width + props.gap[0], props.height + props.gap[1]]
}

function renderWatermark() {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const dpr = window.devicePixelRatio || 1
  const [markWidth, markHeight] = getMarkSize()

  const canvasWidth = markWidth * dpr
  const canvasHeight = markHeight * dpr
  canvas.width = canvasWidth
  canvas.height = canvasHeight
  canvas.style.width = `${markWidth}px`
  canvas.style.height = `${markHeight}px`

  ctx.translate(canvasWidth / 2, canvasHeight / 2)
  ctx.rotate((props.rotate * Math.PI) / 180)

  if (props.image) {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      ctx.drawImage(
        img,
        (-props.width * dpr) / 2,
        (-props.height * dpr) / 2,
        props.width * dpr,
        props.height * dpr,
      )
      applyBackground(canvas.toDataURL(), markWidth, markHeight)
    }
    img.src = props.image
  } else {
    const {
      color = 'rgba(0, 0, 0, 0.15)',
      fontSize = 16,
      fontFamily = 'sans-serif',
      fontWeight = 'normal',
      fontStyle = 'normal',
    } = props.font

    ctx.font = `${fontStyle} ${fontWeight} ${fontSize * dpr}px ${fontFamily}`
    ctx.fillStyle = color
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    const lines = Array.isArray(props.content)
      ? props.content
      : [props.content]
    lines.forEach((line, i) => {
      ctx.fillText(
        line,
        0,
        (i - (lines.length - 1) / 2) * fontSize * dpr * 1.5,
      )
    })
    applyBackground(canvas.toDataURL(), markWidth, markHeight)
  }
}

function applyBackground(url: string, markWidth: number, markHeight: number) {
  if (!watermarkRef.value) {
    createWatermarkDiv()
  }
  const el = watermarkRef.value!
  el.style.backgroundImage = `url(${url})`
  el.style.backgroundSize = `${markWidth}px ${markHeight}px`

  if (props.offset) {
    el.style.backgroundPosition = `${props.offset[0]}px ${props.offset[1]}px`
  }
}

function createWatermarkDiv() {
  if (!containerRef.value) return
  const div = document.createElement('div')
  div.setAttribute('data-watermark', '')
  div.style.position = 'absolute'
  div.style.inset = '0'
  div.style.pointerEvents = 'none'
  div.style.zIndex = String(props.zIndex)
  div.style.backgroundRepeat = 'repeat'
  containerRef.value.appendChild(div)
  watermarkRef.value = div
}

function destroyWatermarkDiv() {
  if (watermarkRef.value && watermarkRef.value.parentNode) {
    watermarkRef.value.parentNode.removeChild(watermarkRef.value)
  }
  watermarkRef.value = undefined
}

function setupObserver() {
  if (!containerRef.value) return

  observer = new MutationObserver((mutations) => {
    let needRerender = false
    for (const mutation of mutations) {
      // Check if watermark div was removed
      if (mutation.type === 'childList') {
        for (const node of Array.from(mutation.removedNodes)) {
          if (
            node === watermarkRef.value ||
            (node as HTMLElement).hasAttribute?.('data-watermark')
          ) {
            needRerender = true
            break
          }
        }
      }
      // Check if watermark div was modified
      if (
        mutation.type === 'attributes' &&
        mutation.target === watermarkRef.value
      ) {
        needRerender = true
      }
    }
    if (needRerender) {
      watermarkRef.value = undefined
      renderWatermark()
    }
  })

  observer.observe(containerRef.value, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['style', 'class'],
  })
}

// ---- Lifecycle ----
onMounted(() => {
  createWatermarkDiv()
  renderWatermark()
  setupObserver()
})

onBeforeUnmount(() => {
  observer?.disconnect()
  destroyWatermarkDiv()
})

// ---- Watch for prop changes ----
watch(
  () => [
    props.width,
    props.height,
    props.rotate,
    props.image,
    props.content,
    props.font,
    props.gap,
    props.offset,
    props.zIndex,
  ],
  () => {
    renderWatermark()
  },
  { deep: true },
)
</script>

<template>
  <div ref="containerRef" :class="ns.b()">
    <slot />
  </div>
</template>
