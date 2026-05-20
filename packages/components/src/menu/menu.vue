<script setup lang="ts">
import { computed, provide, ref, toRef, watch, type CSSProperties } from 'vue'
import { useNamespace } from '@stellux/hooks'
import { menuProps, menuEmits } from './menu'
import { menuContextKey, type MenuContext } from './constants'

defineOptions({ name: 'StxMenu' })

const props = defineProps(menuProps)
const emit = defineEmits(menuEmits)

const ns = useNamespace('menu')

const activeIndex = ref(props.defaultActive)
const openedMenus = ref<string[]>([...props.defaultOpeneds])

watch(
  () => props.defaultActive,
  (val) => {
    activeIndex.value = val
  }
)

watch(
  () => props.defaultOpeneds,
  (val) => {
    openedMenus.value = [...val]
  }
)

// When collapse changes, close all sub-menus
watch(
  () => props.collapse,
  (val) => {
    if (val) {
      openedMenus.value = []
    }
  }
)

function handleSelect(index: string) {
  activeIndex.value = index
  emit('select', index, [index])
}

function handleOpen(index: string) {
  if (openedMenus.value.includes(index)) return
  if (props.uniqueOpened) {
    // Close all other opened sub-menus
    const closedMenus = [...openedMenus.value]
    openedMenus.value = []
    closedMenus.forEach((i) => {
      emit('close', i, [i])
    })
  }
  openedMenus.value.push(index)
  emit('open', index, [index])
}

function handleClose(index: string) {
  const idx = openedMenus.value.indexOf(index)
  if (idx !== -1) {
    openedMenus.value.splice(idx, 1)
    emit('close', index, [index])
  }
}

const menuContext: MenuContext = {
  mode: toRef(props, 'mode'),
  isCollapsed: toRef(props, 'collapse'),
  activeIndex,
  openedMenus,
  handleSelect,
  handleOpen,
  handleClose,
}

provide(menuContextKey, menuContext)

const menuStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  if (props.backgroundColor) {
    style.backgroundColor = props.backgroundColor
  }
  if (props.textColor) {
    style.color = props.textColor
  }
  return style
})

function open(index: string) {
  handleOpen(index)
}

function close(index: string) {
  handleClose(index)
}

defineExpose({ open, close })
</script>

<template>
  <ul
    :class="[
      ns.b(),
      ns.m(mode),
      ns.is('collapse', collapse),
    ]"
    :style="menuStyle"
    role="menubar"
  >
    <slot />
  </ul>
</template>
