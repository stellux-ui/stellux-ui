<script setup lang="ts">
import {
  ref,
  toRef,
  provide,
  watch,
  nextTick,
  onMounted,
} from 'vue'
import { useNamespace } from '@stellux/hooks'
import { tabsProps, tabsEmits } from './tabs'
import { tabsContextKey, type TabPaneData } from './constants'

defineOptions({ name: 'StxTabs' })

const props = defineProps(tabsProps)
const emit = defineEmits(tabsEmits)

const ns = useNamespace('tabs')

const navRef = ref<HTMLElement>()
const panes = ref<TabPaneData[]>([])

// --- Pane registry ---
function registerPane(pane: TabPaneData) {
  const idx = panes.value.findIndex((p) => p.name === pane.name)
  if (idx === -1) {
    panes.value.push(pane)
  } else {
    panes.value.splice(idx, 1, pane)
  }
}

function unregisterPane(name: string | number) {
  const idx = panes.value.findIndex((p) => p.name === name)
  if (idx !== -1) {
    panes.value.splice(idx, 1)
  }
}

provide(tabsContextKey, {
  activeTab: toRef(props, 'modelValue'),
  registerPane,
  unregisterPane,
})

// --- Active bar ---
const activeBarStyle = ref<Record<string, string>>({})

function updateActiveBar() {
  if (props.type) {
    activeBarStyle.value = {}
    return
  }

  const nav = navRef.value
  if (!nav) return

  const items = Array.from(
    nav.querySelectorAll(`.${ns.e('item')}`),
  ) as HTMLElement[]
  const activeItem = items.find((el) =>
    el.classList.contains('is-active'),
  )

  if (!activeItem) {
    activeBarStyle.value = { width: '0px' }
    return
  }

  const isVertical =
    props.tabPosition === 'left' || props.tabPosition === 'right'

  if (isVertical) {
    activeBarStyle.value = {
      top: `${activeItem.offsetTop}px`,
      height: `${activeItem.offsetHeight}px`,
    }
  } else {
    activeBarStyle.value = {
      left: `${activeItem.offsetLeft}px`,
      width: `${activeItem.offsetWidth}px`,
    }
  }
}

onMounted(() => {
  nextTick(updateActiveBar)
})

watch(
  () => props.modelValue,
  () => {
    nextTick(updateActiveBar)
  },
)

watch(
  () => panes.value.length,
  () => {
    nextTick(updateActiveBar)
  },
)

// --- Handlers ---
async function handleTabClick(pane: TabPaneData, evt: Event) {
  if (pane.disabled) return

  if (props.beforeLeave) {
    const result = await props.beforeLeave(pane.name, props.modelValue)
    if (!result) return
  }

  emit('update:modelValue', pane.name)
  emit('tab-click', pane, evt)
  emit('tab-change', pane.name)
}

function handleTabRemove(name: string | number) {
  emit('tab-remove', name)
  emit('edit', name, 'remove')
}

function handleAdd() {
  emit('tab-add')
  emit('edit', undefined, 'add')
}
</script>

<template>
  <div
    :class="[
      ns.b(),
      ns.m(tabPosition),
      ns.m(type || 'default'),
      ns.is('stretch', stretch),
    ]"
  >
    <div :class="ns.e('header')">
      <div :class="ns.e('nav-wrap')">
        <div ref="navRef" :class="ns.e('nav')">
          <!-- Active bar indicator (for default type) -->
          <div
            v-if="!type"
            :class="ns.e('active-bar')"
            :style="activeBarStyle"
          />

          <!-- Tab items -->
          <div
            v-for="pane in panes"
            :key="pane.name"
            :class="[
              ns.e('item'),
              ns.is('active', pane.name === modelValue),
              ns.is('disabled', pane.disabled),
              ns.is('closable', pane.closable || closable),
            ]"
            @click="handleTabClick(pane, $event)"
          >
            <span>{{ pane.label }}</span>
            <span
              v-if="(pane.closable || closable) && !pane.disabled"
              :class="ns.e('close')"
              @click.stop="handleTabRemove(pane.name)"
            >
              <svg
                viewBox="0 0 24 24"
                width="12"
                height="12"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </span>
          </div>

          <!-- Add button -->
          <div
            v-if="addable || editable"
            :class="ns.e('add')"
            @click="handleAdd"
          >
            +
          </div>
        </div>
      </div>
    </div>

    <div :class="ns.e('content')">
      <slot />
    </div>
  </div>
</template>
