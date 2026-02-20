import { useState, useCallback, useMemo } from 'react'

function hexToRgb(hex) {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const n = parseInt(full, 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

function rgbToHex({ r, g, b }) {
  return '#' + [r, g, b].map((v) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, '0')).join('')
}

function rgbToHsl({ r, g, b }) {
  const rn = r / 255, gn = g / 255, bn = b / 255
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn)
  const l = (max + min) / 2
  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) }
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h = 0
  if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6
  else if (max === gn) h = ((bn - rn) / d + 2) / 6
  else h = ((rn - gn) / d + 4) / 6
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

function hslToRgb({ h, s, l }) {
  const sn = s / 100, ln = l / 100
  if (sn === 0) { const v = Math.round(ln * 255); return { r: v, g: v, b: v } }
  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1; if (t > 1) t -= 1
    if (t < 1/6) return p + (q - p) * 6 * t
    if (t < 1/2) return q
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
    return p
  }
  const hn = h / 360
  const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn
  const p = 2 * ln - q
  return {
    r: Math.round(hue2rgb(p, q, hn + 1/3) * 255),
    g: Math.round(hue2rgb(p, q, hn) * 255),
    b: Math.round(hue2rgb(p, q, hn - 1/3) * 255),
  }
}

export default function useColorConverter() {
  const [hex, setHex] = useState('#6366f1')
  const [source, setSource] = useState('hex')

  const rgb = useMemo(() => {
    try { return hexToRgb(hex) } catch { return { r: 0, g: 0, b: 0 } }
  }, [hex])

  const hsl = useMemo(() => rgbToHsl(rgb), [rgb])

  const updateFromHex = useCallback((val) => {
    setHex(val)
    setSource('hex')
  }, [])

  const updateFromRgb = useCallback((key, val) => {
    const num = parseInt(val) || 0
    const newRgb = { ...rgb, [key]: Math.max(0, Math.min(255, num)) }
    setHex(rgbToHex(newRgb))
    setSource('rgb')
  }, [rgb])

  const updateFromHsl = useCallback((key, val) => {
    const num = parseInt(val) || 0
    const maxVal = key === 'h' ? 360 : 100
    const newHsl = { ...hsl, [key]: Math.max(0, Math.min(maxVal, num)) }
    const newRgb = hslToRgb(newHsl)
    setHex(rgbToHex(newRgb))
    setSource('hsl')
  }, [hsl])

  const formats = {
    hex: hex.toUpperCase(),
    rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
    hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
  }

  return { hex, rgb, hsl, source, updateFromHex, updateFromRgb, updateFromHsl, formats }
}
