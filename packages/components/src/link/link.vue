<script setup lang="ts">
  import { computed } from 'vue'
  import { useNamespace } from '@stellux/hooks'
  import { linkProps, linkEmits } from './link'

  defineOptions({ name: 'StxLink' })

  const props = defineProps(linkProps)
  const emit = defineEmits(linkEmits)

  const ns = useNamespace('link')

  const classes = computed(() => [
    ns.b(),
    props.type !== 'default' && ns.m(props.type),
    ns.is('disabled', props.disabled),
    ns.is('underline', props.underline && !props.disabled)
  ])

  function handleClick(evt: MouseEvent) {
    if (props.disabled) {
      evt.preventDefault()
      return
    }
    emit('click', evt)
  }
</script>

<template>
  <a
    :class="classes"
    :href="disabled ? undefined : href"
    :target="disabled ? undefined : target"
    @click="handleClick"
  >
    <span v-if="icon" :class="ns.e('icon')">
      <component :is="icon" />
    </span>
    <span :class="ns.e('inner')">
      <slot />
    </span>
  </a>
</template>
