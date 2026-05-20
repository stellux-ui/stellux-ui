<script setup lang="ts">
import { computed, inject, onBeforeUnmount, provide, ref } from 'vue'
import { useNamespace, useZIndex } from '@stellux/hooks'
import { subMenuProps } from './sub-menu'
import { menuContextKey, subMenuContextKey, type SubMenuContext } from './constants'
import StxCollapseTransition from '../collapse-transition/collapse-transition.vue'

defineOptions({ name: 'StxSubMenu' })

const props = defineProps(subMenuProps)

const ns = useNamespace('sub-menu')
const { nextZIndex } = useZIndex()

const menuCtx = inject(menuContextKey)!
const parentSubMenuCtx = inject(subMenuContextKey, undefined)

const currentLevel = parentSubMenuCtx ? parentSubMenuCtx.level + 1 : 1
const subMenus = ref<string[]>([])

let showTimer: ReturnType<typeof setTimeout> | undefined
let hideTimer: ReturnType<typeof setTimeout> | undefined

const isOpened = computed(() => menuCtx.openedMenus.value.includes(props.index!))

const isActive = computed(() => {
  // Active if any child is the current active index
  return menuCtx.activeIndex.value.startsWith(props.index!)
})

const isVerticalInline = computed(
  () => menuCtx.mode.value === 'vertical' && !menuCtx.isCollapsed.value
)

const isPopupMode = computed(
  () =>
    menuCtx.mode.value === 'horizontal' ||
    (menuCtx.mode.value === 'vertical' && menuCtx.isCollapsed.value)
)

const titlePaddingStyle = computed(() => {
  if (!isVerticalInline.value) return {}
  return { paddingLeft: `${20 + (currentLevel - 1) * 20}px` }
})

const popupStyle = computed(() => {
  const zIndex = nextZIndex()
  if (menuCtx.mode.value === 'horizontal' && currentLevel === 1) {
    return {
      zIndex,
      top: `${props.popperOffset}px`,
    }
  }
  return {
    zIndex,
    left: '100%',
    top: '0',
    marginLeft: `${props.popperOffset}px`,
  }
})

function clearTimers() {
  if (showTimer) {
    clearTimeout(showTimer)
    showTimer = undefined
  }
  if (hideTimer) {
    clearTimeout(hideTimer)
    hideTimer = undefined
  }
}

function handleTitleClick() {
  if (props.disabled) return
  if (isPopupMode.value) return
  // Vertical inline: toggle on click
  if (isOpened.value) {
    menuCtx.handleClose(props.index!)
  } else {
    menuCtx.handleOpen(props.index!)
  }
}

function handleMouseEnter() {
  if (props.disabled) return
  if (!isPopupMode.value) return
  clearTimers()
  showTimer = setTimeout(() => {
    menuCtx.handleOpen(props.index!)
  }, props.showTimeout)
}

function handleMouseLeave() {
  if (props.disabled) return
  if (!isPopupMode.value) return
  clearTimers()
  hideTimer = setTimeout(() => {
    menuCtx.handleClose(props.index!)
  }, props.hideTimeout)
}

// Provide sub-menu context for nested sub-menus
const subMenuContext: SubMenuContext = {
  level: currentLevel,
  addSubMenu: (uid: string) => {
    subMenus.value.push(uid)
  },
  removeSubMenu: (uid: string) => {
    const idx = subMenus.value.indexOf(uid)
    if (idx !== -1) subMenus.value.splice(idx, 1)
  },
}

provide(subMenuContextKey, subMenuContext)

// Register with parent sub-menu if nested
if (parentSubMenuCtx) {
  parentSubMenuCtx.addSubMenu(props.index!)
}

onBeforeUnmount(() => {
  clearTimers()
  if (parentSubMenuCtx) {
    parentSubMenuCtx.removeSubMenu(props.index!)
  }
})
</script>

<template>
  <li
    :class="[
      ns.b(),
      ns.is('opened', isOpened),
      ns.is('active', isActive),
      ns.is('disabled', disabled),
    ]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div
      :class="ns.e('title')"
      :style="titlePaddingStyle"
      @click="handleTitleClick"
    >
      <slot name="title" />
      <svg
        :class="[ns.e('arrow'), ns.is('open', isOpened)]"
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>

    <!-- Vertical inline mode -->
    <stx-collapse-transition v-if="isVerticalInline">
      <ul v-show="isOpened" :class="ns.e('list')" role="menu">
        <slot />
      </ul>
    </stx-collapse-transition>

    <!-- Horizontal or collapsed popup mode -->
    <Transition v-else name="stx-zoom-in-top">
      <ul
        v-show="isOpened"
        :class="ns.e('popup')"
        :style="popupStyle"
        role="menu"
      >
        <slot />
      </ul>
    </Transition>
  </li>
</template>
