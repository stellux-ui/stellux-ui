<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useNamespace } from '@stellux/hooks'
import { skeletonProps } from './skeleton'
import StxSkeletonItem from './skeleton-item.vue'

defineOptions({ name: 'StxSkeleton' })

const props = defineProps(skeletonProps)

const ns = useNamespace('skeleton')

const uiLoading = ref(props.throttle > 0 ? false : props.loading)

if (props.throttle > 0) {
  let timer: ReturnType<typeof setTimeout> | null = null

  const handleThrottle = (val: boolean) => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    if (val) {
      timer = setTimeout(() => {
        uiLoading.value = true
      }, props.throttle)
    } else {
      uiLoading.value = false
    }
  }

  onMounted(() => {
    if (props.loading) {
      handleThrottle(true)
    }
  })

  watch(() => props.loading, (val) => {
    handleThrottle(val)
  })
} else {
  watch(() => props.loading, (val) => {
    uiLoading.value = val
  })
}
</script>

<template>
  <div :class="[ns.b(), ns.is('animated', animated)]">
    <template v-if="uiLoading">
      <template v-for="n in count" :key="n">
        <slot name="template">
          <stx-skeleton-item variant="h3" />
          <stx-skeleton-item v-for="r in rows" :key="r" variant="text" />
        </slot>
      </template>
    </template>
    <slot v-else />
  </div>
</template>
