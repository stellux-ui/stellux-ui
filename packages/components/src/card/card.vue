<script setup lang="ts">
import { useNamespace } from '@stellux/hooks'
import { cardProps } from './card'

defineOptions({ name: 'StxCard' })

const props = defineProps(cardProps)

const ns = useNamespace('card')
</script>

<template>
  <div
    :class="[
      ns.b(),
      ns.is('shadow-always', shadow === 'always'),
      ns.is('shadow-hover', shadow === 'hover'),
      ns.is('shadow-never', shadow === 'never'),
    ]"
  >
    <div v-if="header || $slots.header" :class="ns.e('header')">
      <slot name="header">{{ header }}</slot>
    </div>
    <div :class="[ns.e('body'), bodyClass]" :style="bodyStyle">
      <slot />
    </div>
    <div v-if="footer || $slots.footer" :class="ns.e('footer')">
      <slot name="footer">{{ footer }}</slot>
    </div>
  </div>
</template>
