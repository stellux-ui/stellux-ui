/**
 * HSV / RGB / Hex color conversion utilities.
 * All channel ranges:
 *   H: 0-360, S: 0-100, V: 0-100, A: 0-100
 *   R/G/B: 0-255
 */

export interface HSV {
  h: number
  s: number
  v: number
  a: number
}

export interface RGB {
  r: number
  g: number
  b: number
  a: number
}

/**
 * Convert HSV to RGB.
 */
export function hsvToRgb(h: number, s: number, v: number, a = 100): RGB {
  h = ((h % 360) + 360) % 360
  const sNorm = s / 100
  const vNorm = v / 100

  const c = vNorm * sNorm
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = vNorm - c

  let r1 = 0
  let g1 = 0
  let b1 = 0

  if (h < 60) {
    r1 = c; g1 = x; b1 = 0
  } else if (h < 120) {
    r1 = x; g1 = c; b1 = 0
  } else if (h < 180) {
    r1 = 0; g1 = c; b1 = x
  } else if (h < 240) {
    r1 = 0; g1 = x; b1 = c
  } else if (h < 300) {
    r1 = x; g1 = 0; b1 = c
  } else {
    r1 = c; g1 = 0; b1 = x
  }

  return {
    r: Math.round((r1 + m) * 255),
    g: Math.round((g1 + m) * 255),
    b: Math.round((b1 + m) * 255),
    a,
  }
}

/**
 * Convert RGB to HSV.
 */
export function rgbToHsv(r: number, g: number, b: number, a = 100): HSV {
  const rNorm = r / 255
  const gNorm = g / 255
  const bNorm = b / 255

  const max = Math.max(rNorm, gNorm, bNorm)
  const min = Math.min(rNorm, gNorm, bNorm)
  const delta = max - min

  let h = 0
  if (delta !== 0) {
    if (max === rNorm) {
      h = 60 * (((gNorm - bNorm) / delta) % 6)
    } else if (max === gNorm) {
      h = 60 * ((bNorm - rNorm) / delta + 2)
    } else {
      h = 60 * ((rNorm - gNorm) / delta + 4)
    }
  }
  if (h < 0) h += 360

  const s = max === 0 ? 0 : (delta / max) * 100
  const v = max * 100

  return { h: Math.round(h), s: Math.round(s), v: Math.round(v), a }
}

/**
 * Convert RGB to hex string (#RRGGBB or #RRGGBBAA).
 */
export function rgbToHex(r: number, g: number, b: number, a = 100): string {
  const toHex = (n: number) => Math.round(n).toString(16).padStart(2, '0')
  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`
  if (a < 100) {
    return hex + toHex(Math.round((a / 100) * 255))
  }
  return hex
}

/**
 * Convert HSV directly to hex.
 */
export function hsvToHex(h: number, s: number, v: number, a = 100): string {
  const { r, g, b } = hsvToRgb(h, s, v, a)
  return rgbToHex(r, g, b, a)
}

/**
 * Convert HSV to HSL.
 */
export function hsvToHsl(h: number, s: number, v: number, a = 100): { h: number; s: number; l: number; a: number } {
  const sNorm = s / 100
  const vNorm = v / 100

  const l = vNorm * (1 - sNorm / 2)
  let sl = 0
  if (l > 0 && l < 1) {
    sl = (vNorm - l) / Math.min(l, 1 - l)
  }

  return {
    h: Math.round(h),
    s: Math.round(sl * 100),
    l: Math.round(l * 100),
    a,
  }
}

/**
 * Parse a hex color string to RGB.
 */
export function parseHex(hex: string): RGB | null {
  hex = hex.replace(/^#/, '')
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  if (hex.length === 4) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3]
  }
  if (hex.length === 6) {
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    if (isNaN(r) || isNaN(g) || isNaN(b)) return null
    return { r, g, b, a: 100 }
  }
  if (hex.length === 8) {
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    const a = parseInt(hex.substring(6, 8), 16)
    if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(a)) return null
    return { r, g, b, a: Math.round((a / 255) * 100) }
  }
  return null
}

/**
 * Parse an rgb/rgba color string.
 */
export function parseRgb(str: string): RGB | null {
  const match = str.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)/)
  if (!match) return null
  return {
    r: parseInt(match[1], 10),
    g: parseInt(match[2], 10),
    b: parseInt(match[3], 10),
    a: match[4] !== undefined ? Math.round(parseFloat(match[4]) * 100) : 100,
  }
}

/**
 * Parse an hsl/hsla color string.
 */
export function parseHsl(str: string): HSV | null {
  const match = str.match(/hsla?\(\s*(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?\s*(?:,\s*([\d.]+)\s*)?\)/)
  if (!match) return null
  const h = parseInt(match[1], 10)
  const s = parseInt(match[2], 10) / 100
  const l = parseInt(match[3], 10) / 100
  const a = match[4] !== undefined ? Math.round(parseFloat(match[4]) * 100) : 100

  // HSL to HSV conversion
  const v = l + s * Math.min(l, 1 - l)
  const sv = v === 0 ? 0 : 2 * (1 - l / v)

  return {
    h: Math.round(h),
    s: Math.round(sv * 100),
    v: Math.round(v * 100),
    a,
  }
}

/**
 * Parse any supported color string to HSV.
 */
export function parseColor(color: string): HSV | null {
  if (!color) return null
  color = color.trim()

  // Try hex
  if (color.startsWith('#')) {
    const rgb = parseHex(color)
    if (rgb) return rgbToHsv(rgb.r, rgb.g, rgb.b, rgb.a)
  }

  // Try rgb/rgba
  if (color.startsWith('rgb')) {
    const rgb = parseRgb(color)
    if (rgb) return rgbToHsv(rgb.r, rgb.g, rgb.b, rgb.a)
  }

  // Try hsl/hsla
  if (color.startsWith('hsl')) {
    return parseHsl(color)
  }

  return null
}

/**
 * Format HSV to a string in the given format.
 */
export function formatColor(
  h: number,
  s: number,
  v: number,
  a: number,
  format: 'hex' | 'rgb' | 'hsl' | 'hsv',
  showAlpha: boolean,
): string {
  switch (format) {
    case 'hex':
      return hsvToHex(h, s, v, showAlpha ? a : 100)
    case 'rgb': {
      const { r, g, b } = hsvToRgb(h, s, v, a)
      return showAlpha
        ? `rgba(${r}, ${g}, ${b}, ${(a / 100).toFixed(2)})`
        : `rgb(${r}, ${g}, ${b})`
    }
    case 'hsl': {
      const hsl = hsvToHsl(h, s, v, a)
      return showAlpha
        ? `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${(a / 100).toFixed(2)})`
        : `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
    }
    case 'hsv':
      return showAlpha
        ? `hsva(${h}, ${s}%, ${v}%, ${(a / 100).toFixed(2)})`
        : `hsv(${h}, ${s}%, ${v}%)`
    default:
      return hsvToHex(h, s, v, showAlpha ? a : 100)
  }
}
