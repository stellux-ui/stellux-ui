<script setup lang="ts">
import { ref } from 'vue'
import { useNamespace } from '@stellux/hooks'
import StxPopover from '../popover/popover.vue'
import { popconfirmProps, popconfirmEmits } from './popconfirm'

defineOptions({ name: 'StxPopconfirm' })

const props = defineProps(popconfirmProps)
const emit = defineEmits(popconfirmEmits)

const ns = useNamespace('popconfirm')
const popoverVisible = ref(false)

function handleConfirm() {
  popoverVisible.value = false
  emit('confirm')
}

function handleCancel() {
  popoverVisible.value = false
  emit('cancel')
}
</script>

<template>
  <stx-popover
    v-model:visible="popoverVisible"
    trigger="click"
    :width="width"
    :teleported="teleported"
    :persistent="persistent"
    :hide-after="hideAfter"
  >
    <template #default>
      <slot />
    </template>
    <template #content>
      <div :class="ns.b()">
        <div :class="ns.e('main')">
          <span
            v-if="!hideIcon"
            :class="ns.e('icon')"
            :style="{ color: iconColor }"
          >
            <component v-if="icon" :is="icon" />
            <svg
              v-else
              viewBox="0 0 24 24"
              width="1em"
              height="1em"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </span>
          <span :class="ns.e('title')">{{ title }}</span>
        </div>
        <div :class="ns.e('action')">
          <button
            :class="ns.e('cancel')"
            type="button"
            @click="handleCancel"
          >
            {{ cancelButtonText }}
          </button>
          <button
            :class="ns.e('confirm')"
            type="button"
            @click="handleConfirm"
          >
            {{ confirmButtonText }}
          </button>
        </div>
      </div>
    </template>
  </stx-popover>
</template>
