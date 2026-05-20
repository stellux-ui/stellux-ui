<script setup lang="ts">
import { computed, ref } from 'vue'
import { useNamespace } from '@stellux/hooks'
import { tagProps, tagEmits } from './tag'

defineOptions({ name: 'StxTag' })

const props = defineProps(tagProps)
const emit = defineEmits(tagEmits)

const ns = useNamespace('tag')
const visible = ref(true)

const classes = computed(() => [
  ns.b(),
  props.type && ns.m(props.type),
  props.size !== 'default' && ns.m(props.size),
  ns.is('hit', props.hit),
  ns.is('round', props.round),
  ns.m(props.effect),
])

const tagStyle = computed(() => {
  if (!props.color) return {}
  const isDark = props.effect === 'dark'
  return {
    backgroundColor: props.color,
    borderColor: props.color,
    color: isDark ? '#fff' : props.color,
  }
})

function handleClick(evt: MouseEvent) {
  emit('click', evt)
}

function handleClose(evt: MouseEvent) {
  visible.value = false
  emit('close', evt)
}
</script>

<template>
  <Transition v-if="!disableTransitions" name="stx-zoom-in-center">
    <span
      v-show="visible"
      :class="classes"
      :style="tagStyle"
      @click="handleClick"
    >
      <slot />
      <span
        v-if="closable"
        :class="ns.e('close')"
        @click.stop="handleClose"
      >
        <svg
          viewBox="0 0 24 24"
          width="14"
          height="14"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </span>
    </span>
  </Transition>
  <span
    v-else
    v-show="visible"
    :class="classes"
    :style="tagStyle"
    @click="handleClick"
  >
    <slot />
    <span
      v-if="closable"
      :class="ns.e('close')"
      @click.stop="handleClose"
    >
      <svg
        viewBox="0 0 24 24"
        width="14"
        height="14"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
      >
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </span>
  </span>
</template>
