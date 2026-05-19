import type { Directive, DirectiveBinding } from 'vue'

export interface RippleOptions {
  disabled?: boolean
  color?: string
}

type RippleEl = HTMLElement & {
  _rippleCleanup?: () => void
}

function createRipple(el: HTMLElement, e: PointerEvent, color?: string) {
  const rect = el.getBoundingClientRect()
  const dx = Math.max(e.clientX - rect.left, rect.right - e.clientX)
  const dy = Math.max(e.clientY - rect.top, rect.bottom - e.clientY)
  const radius = Math.sqrt(dx * dx + dy * dy)
  const size = radius * 2

  const wave = document.createElement('span')
  wave.className = 'stx-ripple__wave'
  wave.style.width = `${size}px`
  wave.style.height = `${size}px`
  wave.style.left = `${e.clientX - rect.left - radius}px`
  wave.style.top = `${e.clientY - rect.top - radius}px`
  if (color) {
    wave.style.background = color
  }

  wave.addEventListener('animationend', () => wave.remove(), { once: true })
  el.appendChild(wave)
}

function onPointerDown(el: HTMLElement, e: PointerEvent, options?: RippleOptions) {
  if (options?.disabled) return
  if ((el as any).disabled) return
  createRipple(el, e, options?.color)
}

function bind(el: RippleEl, binding: DirectiveBinding<boolean | RippleOptions | undefined>) {
  const value = binding.value
  if (value === false) return

  const options: RippleOptions = typeof value === 'object' && value !== null ? value : {}

  el.classList.add('stx-ripple')

  const handler = (e: PointerEvent) => onPointerDown(el, e, options)
  el.addEventListener('pointerdown', handler)
  el._rippleCleanup = () => {
    el.removeEventListener('pointerdown', handler)
    el.classList.remove('stx-ripple')
  }
}

function unbind(el: RippleEl) {
  el._rippleCleanup?.()
  delete el._rippleCleanup
}

export const vRipple: Directive<RippleEl, boolean | RippleOptions | undefined> = {
  mounted: bind,
  updated(el, binding) {
    if (binding.value === binding.oldValue) return
    unbind(el)
    bind(el, binding)
  },
  beforeUnmount: unbind
}

export default vRipple
