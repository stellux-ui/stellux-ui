import { ref, watch, onBeforeUnmount, type Ref } from 'vue'
import {
  computePosition,
  autoUpdate,
  flip,
  shift,
  offset as offsetMiddleware,
  arrow as arrowMiddleware,
  type Placement,
  type Middleware,
} from '@floating-ui/dom'

export interface UsePopperOptions {
  placement?: Ref<Placement> | Placement
  offset?: Ref<number> | number
  arrowRef?: Ref<HTMLElement | undefined>
  middleware?: Middleware[]
}

export function usePopper(
  referenceRef: Ref<HTMLElement | undefined>,
  floatingRef: Ref<HTMLElement | undefined>,
  options: UsePopperOptions = {},
) {
  const x = ref(0)
  const y = ref(0)
  const actualPlacement = ref<Placement>(
    typeof options.placement === 'object' ? options.placement.value : options.placement ?? 'bottom',
  )
  const arrowX = ref<number | undefined>()
  const arrowY = ref<number | undefined>()

  let cleanupAutoUpdate: (() => void) | undefined

  const update = async () => {
    const reference = referenceRef.value
    const floating = floatingRef.value
    if (!reference || !floating) return

    const placementVal =
      typeof options.placement === 'object' ? options.placement.value : options.placement ?? 'bottom'
    const offsetVal =
      typeof options.offset === 'object' ? options.offset.value : options.offset ?? 8

    const middleware: Middleware[] = [
      offsetMiddleware(offsetVal),
      flip(),
      shift({ padding: 8 }),
    ]

    if (options.arrowRef?.value) {
      middleware.push(arrowMiddleware({ element: options.arrowRef.value }))
    }

    if (options.middleware) {
      middleware.push(...options.middleware)
    }

    const result = await computePosition(reference, floating, {
      placement: placementVal,
      middleware,
    })

    x.value = result.x
    y.value = result.y
    actualPlacement.value = result.placement

    if (result.middlewareData.arrow) {
      arrowX.value = result.middlewareData.arrow.x
      arrowY.value = result.middlewareData.arrow.y
    }
  }

  const startAutoUpdate = () => {
    cleanupAutoUpdate?.()
    const reference = referenceRef.value
    const floating = floatingRef.value
    if (reference && floating) {
      cleanupAutoUpdate = autoUpdate(reference, floating, update)
    }
  }

  watch([referenceRef, floatingRef], () => {
    startAutoUpdate()
  }, { flush: 'post' })

  onBeforeUnmount(() => {
    cleanupAutoUpdate?.()
  })

  return {
    x,
    y,
    placement: actualPlacement,
    arrowX,
    arrowY,
    update,
  }
}
