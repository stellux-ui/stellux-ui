<script setup lang="ts">
  import { computed, ref, watch } from 'vue'
  import { useNamespace } from '@stellux/hooks'
  import { imageProps, imageEmits } from './image'
  import StxImageViewer from './image-viewer.vue'

  defineOptions({ name: 'StxImage' })

  const props = defineProps(imageProps)
  const emit = defineEmits(imageEmits)

  const ns = useNamespace('image')

  const isLoading = ref(true)
  const hasError = ref(false)
  const showViewer = ref(false)
  const previewIndex = ref(props.initialIndex)

  const hasPreview = computed(() => props.previewSrcList.length > 0)

  const imageStyle = computed(() => {
    if (props.fit) {
      return { objectFit: props.fit }
    }
    return {}
  })

  function handleLoad(evt: Event) {
    isLoading.value = false
    emit('load', evt)
  }

  function handleError(evt: Event) {
    isLoading.value = false
    hasError.value = true
    emit('error', evt)
  }

  function handlePreview() {
    if (!hasPreview.value) return
    previewIndex.value = props.initialIndex
    showViewer.value = true
    emit('show')
  }

  function closeViewer() {
    showViewer.value = false
    emit('close')
  }

  watch(
    () => props.src,
    () => {
      isLoading.value = true
      hasError.value = false
    }
  )
</script>

<template>
  <div :class="ns.b()">
    <!-- Loading state -->
    <div v-if="isLoading" :class="ns.e('placeholder')">
      <slot name="placeholder">
        <div :class="ns.e('loading')">
          <svg
            :class="ns.e('loading-icon')"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          >
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
        </div>
      </slot>
    </div>

    <!-- Error state -->
    <div v-else-if="hasError" :class="ns.e('error')">
      <slot name="error">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
        <span>Failed to load</span>
      </slot>
    </div>

    <!-- Image -->
    <img
      v-else
      :src="src"
      :alt="alt"
      :style="imageStyle"
      :loading="lazy ? 'lazy' : loading"
      :class="[ns.e('inner'), hasPreview && ns.is('preview', true)]"
      @load="handleLoad"
      @error="handleError"
      @click="handlePreview"
    />

    <!-- Preview viewer -->
    <Teleport to="body" :disabled="!previewTeleported">
      <stx-image-viewer
        v-if="showViewer"
        :url-list="previewSrcList"
        :initial-index="previewIndex"
        :z-index="zIndex"
        :close-on-press-escape="closeOnPressEscape"
        :hide-on-click-modal="hideOnClickModal"
        @close="closeViewer"
        @switch="(idx: number) => emit('switch', idx)"
      />
    </Teleport>
  </div>
</template>
