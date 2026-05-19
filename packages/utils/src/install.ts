import type { App, Plugin } from 'vue'

export type SFCWithInstall<T> = T & Plugin

export function withInstall<T extends { name: string }>(component: T): SFCWithInstall<T> {
  const comp = component as SFCWithInstall<T>
  comp.install = (app: App) => {
    app.component(comp.name, comp as any)
  }
  return comp
}
