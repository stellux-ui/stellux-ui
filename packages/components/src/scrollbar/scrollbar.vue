<script setup lang="ts">
import { computed, nextTick, onMounted, provide, ref, shallowRef, watch } from 'vue'
import { useNamespace, useResizeObserver } from '@stellux/hooks'
import { scrollbarProps, scrollbarEmits } from './scrollbar'
import { scrollbarContextKey } from './constants'
import Bar from './bar.vue'

defineOptions({ name: 'StxScrollbar' })

const props = defineProps(scrollbarProps)
const emit = defineEmits(scrollbarEmits)

const ns = useNamespace('scrollbar')

const wrapRef = shallowRef<HTMLElement>()
const viewRef = shallowRef<HTMLElement>()
const barYRef = ref<InstanceType<typeof Bar>>()
const barXRef = ref<InstanceType<typeof Bar>>()
const hovering = ref(false)

const addUnit = (val: string | number): string | undefined => {
  if (val === '' || val === undefined) return undefined
  return typeof val === 'number' ? `${val}px` : val
}

const scrollbarStyle = computed(() => {
  const style: Record<string, string | undefined> = {}
  if (props.height) style.height = addUnit(props.height)
  if (props.maxHeight) style.maxHeight = addUnit(props.maxHeight)
  return style
})

const wrapClasses = computed(() => [
  ns.e('wrap'),
  props.wrapClass,
  { [ns.em('wrap', 'hidden-default')]: !props.native },
])

const viewClasses = computed(() => [ns.e('view'), props.viewClass])

const computedWrapStyle = computed(() => {
  const styles: any[] = []
  if (props.wrapStyle) styles.push(props.wrapStyle)
  if (props.maxHeight) {
    styles.push({ maxHeight: addUnit(props.maxHeight) })
  }
  return styles
})

const handleScroll = () => {
  const wrap = wrapRef.value
  if (!wrap) return
  emit('scroll', {
    scrollTop: wrap.scrollTop,
    scrollLeft: wrap.scrollLeft,
  })
}

const update = () => {
  nextTick(() => {
    barYRef.value?.update()
    barXRef.value?.update()
  })
}

const scrollTo = (options: ScrollToOptions | number, yCoord?: number) => {
  if (typeof options === 'number') {
    wrapRef.value?.scrollTo(options, yCoord!)
  } else {
    wrapRef.value?.scrollTo(options)
  }
}

const setScrollTop = (val: number) => {
  const wrap = wrapRef.value
  if (wrap) wrap.scrollTop = val
}

const setScrollLeft = (val: number) => {
  const wrap = wrapRef.value
  if (wrap) wrap.scrollLeft = val
}

provide(scrollbarContextKey, { wrapRef })

if (!props.noresize) {
  useResizeObserver(viewRef, () => {
    update()
  })
}

watch(
  () => [props.height, props.maxHeight],
  () => update(),
)

onMounted(() => {
  update()
})

defineExpose({ wrapRef, update, scrollTo, setScrollTop, setScrollLeft })
</script>

<template>
  <div
    :class="ns.b()"
    :style="scrollbarStyle"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <div
      ref="wrapRef"
      :class="wrapClasses"
      :style="computedWrapStyle"
      @scroll="handleScroll"
    >
      <component
        :is="tag"
        ref="viewRef"
        :class="viewClasses"
        :style="viewStyle"
      >
        <slot />
      </component>
    </div>
    <template v-if="!native">
      <Bar
        ref="barYRef"
        :always="always || hovering"
        :min-size="minSize"
        direction="vertical"
      />
      <Bar
        ref="barXRef"
        :always="always || hovering"
        :min-size="minSize"
        direction="horizontal"
      />
    </template>
  </div>
</template>
