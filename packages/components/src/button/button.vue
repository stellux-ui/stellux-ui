<script setup lang="ts">
  import { computed, inject, onMounted, ref, useSlots } from 'vue'
  import { useNamespace } from '@stellux/hooks'
  import { vRipple } from '@stellux/directives'
  import { buttonProps, buttonEmits } from './button'
  import { buttonGroupContextKey } from './constants'

  defineOptions({ name: 'StxButton' })

  const props = defineProps(buttonProps)
  const emit = defineEmits(buttonEmits)
  const slots = useSlots()

  const ns = useNamespace('button')
  const groupContext = inject(buttonGroupContextKey, undefined)

  const _type = computed(() => props.type || groupContext?.type || 'default')
  const _size = computed(() => props.size || groupContext?.size || 'default')

  const classes = computed(() => [
    ns.b(),
    _type.value !== 'default' && ns.m(_type.value),
    _size.value !== 'default' && ns.m(_size.value),
    ns.is('plain', props.plain),
    ns.is('text', props.text),
    ns.is('link', props.link),
    ns.is('dashed', props.dashed),
    ns.is('round', props.round),
    ns.is('circle', props.circle),
    ns.is('disabled', props.disabled),
    ns.is('loading', props.loading)
  ])

  const rippleOptions = computed(() => {
    if (!props.ripple || props.disabled || props.loading) return false
    const isFilled = !props.plain && !props.text && !props.link && _type.value !== 'default'
    return isFilled ? { color: 'rgba(255, 255, 255, 0.25)' } : true
  })

  const colorStyle = computed(() => {
    if (!props.color) return {}
    const c = props.color
    if (props.plain || props.text || props.link) {
      return {
        '--stx-button-bg-color': 'transparent',
        '--stx-button-text-color': c,
        '--stx-button-border-color': props.text || props.link ? 'transparent' : c,
        '--stx-button-hover-bg-color': c,
        '--stx-button-hover-text-color': '#fff',
        '--stx-button-hover-border-color': c,
        '--stx-button-active-bg-color': `color-mix(in srgb, ${c} 85%, #000)`,
        '--stx-button-active-text-color': '#fff',
        '--stx-button-active-border-color': `color-mix(in srgb, ${c} 85%, #000)`
      }
    }
    return {
      '--stx-button-bg-color': c,
      '--stx-button-text-color': '#fff',
      '--stx-button-border-color': c,
      '--stx-button-hover-bg-color': `color-mix(in srgb, ${c} 85%, #fff)`,
      '--stx-button-hover-text-color': '#fff',
      '--stx-button-hover-border-color': `color-mix(in srgb, ${c} 85%, #fff)`,
      '--stx-button-active-bg-color': `color-mix(in srgb, ${c} 85%, #000)`,
      '--stx-button-active-text-color': '#fff',
      '--stx-button-active-border-color': `color-mix(in srgb, ${c} 85%, #000)`
    }
  })

  const btnRef = ref<HTMLElement | null>(null)

  function handleClick(evt: MouseEvent) {
    if (props.disabled || props.loading) return
    emit('click', evt)
  }

  onMounted(() => {
    if (props.autofocus) btnRef.value?.focus()
  })

  defineExpose({
    ref: btnRef,
    size: _size,
    type: _type,
    disabled: computed(() => props.disabled)
  })
</script>

<template>
  <component
    :is="tag"
    ref="btnRef"
    v-ripple="rippleOptions"
    :class="classes"
    :style="colorStyle"
    :type="tag === 'button' ? nativeType : undefined"
    :disabled="tag === 'button' ? disabled || loading : undefined"
    :aria-disabled="disabled || loading"
    :autofocus="autofocus"
    @click="handleClick"
  >
    <span :class="ns.e('content')">
      <template v-if="loading">
        <slot name="loading">
          <component v-if="loadingIcon" :is="loadingIcon" :class="ns.e('loading-icon')" />
          <svg
            v-else
            :class="ns.e('loading-icon')"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
          >
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
        </slot>
      </template>
      <template v-else-if="icon || slots.icon">
        <slot name="icon">
          <component :is="icon" :class="ns.e('icon')" />
        </slot>
      </template>
      <slot />
    </span>
  </component>
</template>
