import type { Component, InjectionKey } from 'vue'

export interface BreadcrumbContext {
  separator: string
  separatorIcon: Component | undefined
}

export const breadcrumbContextKey: InjectionKey<BreadcrumbContext> =
  Symbol('breadcrumbContext')
