<script setup lang="ts">
defineOptions({ name: 'StxCollapseTransition' })

function onBeforeEnter(el: Element) {
  const htmlEl = el as HTMLElement
  htmlEl.dataset.oldPaddingTop = htmlEl.style.paddingTop
  htmlEl.dataset.oldPaddingBottom = htmlEl.style.paddingBottom
  htmlEl.dataset.oldOverflow = htmlEl.style.overflow
  htmlEl.style.height = '0'
  htmlEl.style.paddingTop = '0'
  htmlEl.style.paddingBottom = '0'
  htmlEl.style.overflow = 'hidden'
}

function onEnter(el: Element) {
  const htmlEl = el as HTMLElement
  htmlEl.style.transition = 'height 0.25s ease, padding-top 0.25s ease, padding-bottom 0.25s ease'
  htmlEl.style.height = htmlEl.scrollHeight + 'px'
  htmlEl.style.paddingTop = htmlEl.dataset.oldPaddingTop || ''
  htmlEl.style.paddingBottom = htmlEl.dataset.oldPaddingBottom || ''
}

function onAfterEnter(el: Element) {
  const htmlEl = el as HTMLElement
  htmlEl.style.transition = ''
  htmlEl.style.height = ''
  htmlEl.style.overflow = htmlEl.dataset.oldOverflow || ''
}

function onBeforeLeave(el: Element) {
  const htmlEl = el as HTMLElement
  htmlEl.dataset.oldPaddingTop = htmlEl.style.paddingTop
  htmlEl.dataset.oldPaddingBottom = htmlEl.style.paddingBottom
  htmlEl.dataset.oldOverflow = htmlEl.style.overflow
  htmlEl.style.height = htmlEl.scrollHeight + 'px'
  htmlEl.style.overflow = 'hidden'
}

function onLeave(el: Element) {
  const htmlEl = el as HTMLElement
  if (htmlEl.scrollHeight !== 0) {
    htmlEl.style.transition = 'height 0.25s ease, padding-top 0.25s ease, padding-bottom 0.25s ease'
    htmlEl.style.height = '0'
    htmlEl.style.paddingTop = '0'
    htmlEl.style.paddingBottom = '0'
  }
}

function onAfterLeave(el: Element) {
  const htmlEl = el as HTMLElement
  htmlEl.style.transition = ''
  htmlEl.style.height = ''
  htmlEl.style.paddingTop = htmlEl.dataset.oldPaddingTop || ''
  htmlEl.style.paddingBottom = htmlEl.dataset.oldPaddingBottom || ''
  htmlEl.style.overflow = htmlEl.dataset.oldOverflow || ''
}
</script>

<template>
  <Transition
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @after-enter="onAfterEnter"
    @before-leave="onBeforeLeave"
    @leave="onLeave"
    @after-leave="onAfterLeave"
  >
    <slot />
  </Transition>
</template>
