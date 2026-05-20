<script setup lang="ts">
  import { computed, nextTick, onMounted, ref, watch } from 'vue'
  import { useNamespace } from '@stellux/hooks'
  import { useZIndex } from '@stellux/hooks'
  import { imageViewerProps, imageViewerEmits } from './image-viewer'

  defineOptions({ name: 'StxImageViewer' })

  const props = defineProps(imageViewerProps)
  const emit = defineEmits(imageViewerEmits)

  const ns = useNamespace('image-viewer')
  const { nextZIndex } = useZIndex()

  const viewerRef = ref<HTMLElement>()
  const activeIndex = ref(props.initialIndex)
  const scale = ref(1)
  const rotation = ref(0)

  const zIndexVal = computed(() => props.zIndex ?? nextZIndex())

  const imageTransform = computed(() => ({
    transform: `scale(${scale.value}) rotate(${rotation.value}deg)`,
  }))

  const isSingle = computed(() => props.urlList.length <= 1)

  function close() {
    emit('close')
  }

  function prev() {
    if (props.infinite) {
      activeIndex.value = (activeIndex.value - 1 + props.urlList.length) % props.urlList.length
    } else if (activeIndex.value > 0) {
      activeIndex.value--
    }
    resetTransform()
  }

  function next() {
    if (props.infinite) {
      activeIndex.value = (activeIndex.value + 1) % props.urlList.length
    } else if (activeIndex.value < props.urlList.length - 1) {
      activeIndex.value++
    }
    resetTransform()
  }

  function zoomIn() {
    scale.value = Math.min(scale.value + 0.2, 7)
  }

  function zoomOut() {
    scale.value = Math.max(scale.value - 0.2, 0.2)
  }

  function rotateLeft() {
    rotation.value -= 90
  }

  function rotateRight() {
    rotation.value += 90
  }

  function resetTransform() {
    scale.value = 1
    rotation.value = 0
  }

  function handleKeydown(e: KeyboardEvent) {
    switch (e.key) {
      case 'Escape':
        if (props.closeOnPressEscape) close()
        break
      case 'ArrowLeft':
        prev()
        break
      case 'ArrowRight':
        next()
        break
    }
  }

  function handleWheel(e: WheelEvent) {
    e.preventDefault()
    if (e.deltaY < 0) {
      zoomIn()
    } else {
      zoomOut()
    }
  }

  function handleMaskClick() {
    if (props.hideOnClickModal) {
      close()
    }
  }

  watch(activeIndex, (val) => {
    emit('switch', val)
  })

  onMounted(() => {
    nextTick(() => {
      viewerRef.value?.focus()
    })
  })
</script>

<template>
  <Transition name="stx-fade-in-linear">
    <div
      ref="viewerRef"
      :class="ns.b()"
      :style="{ zIndex: zIndexVal }"
      tabindex="-1"
      @keydown="handleKeydown"
    >
      <!-- Mask -->
      <div :class="ns.e('mask')" @click="handleMaskClick" />

      <!-- Close button -->
      <button :class="ns.e('close')" @click="close" type="button">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <!-- Prev arrow -->
      <button
        v-if="!isSingle"
        :class="ns.e('prev')"
        :disabled="!infinite && activeIndex <= 0"
        type="button"
        @click="prev"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <!-- Next arrow -->
      <button
        v-if="!isSingle"
        :class="ns.e('next')"
        :disabled="!infinite && activeIndex >= urlList.length - 1"
        type="button"
        @click="next"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <!-- Toolbar -->
      <div :class="ns.e('actions')">
        <button type="button" @click="zoomOut" :title="'Zoom out'">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </button>
        <button type="button" @click="zoomIn" :title="'Zoom in'">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </button>
        <button type="button" @click="rotateLeft" :title="'Rotate left'">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
        </button>
        <button type="button" @click="rotateRight" :title="'Rotate right'">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 1 1-2.13-9.36L23 10" />
          </svg>
        </button>
      </div>

      <!-- Canvas -->
      <div :class="ns.e('canvas')">
        <img
          :src="urlList[activeIndex]"
          :style="imageTransform"
          @wheel.prevent="handleWheel"
        />
      </div>
    </div>
  </Transition>
</template>
