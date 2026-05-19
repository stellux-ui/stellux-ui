const defaultNamespace = 'stx'

export function useNamespace(block: string, ns = defaultNamespace) {
  // BEM class helpers
  const b = () => `${ns}-${block}`
  const e = (element: string) => `${ns}-${block}__${element}`
  const m = (modifier: string) => `${ns}-${block}--${modifier}`
  const em = (element: string, modifier: string) => `${ns}-${block}__${element}--${modifier}`
  const is = (state: string, value?: boolean) => (value === false ? '' : `is-${state}`)

  // CSS variable helpers — match SCSS side
  const cssVarName = (...args: string[]) => `--${ns}-${[block, ...args].filter(Boolean).join('-')}`

  const cssVar = (object: Record<string, string>) => {
    const styles: Record<string, string> = {}
    for (const key in object) {
      styles[cssVarName(key)] = object[key]
    }
    return styles
  }

  const cssVarBlock = (object: Record<string, string>) => {
    const styles: Record<string, string> = {}
    for (const key in object) {
      styles[`--${ns}-${block}-${key}`] = object[key]
    }
    return styles
  }

  return { b, e, m, em, is, cssVarName, cssVar, cssVarBlock }
}
