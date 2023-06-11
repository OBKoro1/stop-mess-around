import { defaultSettingCn, defaultSettingEn } from './Default'

// 包装stops
export const packStops = (stops) => (stops.map((t) => ({ ...t, checked: false, hide: false })))

let ChromeLang = ''
export const initDefaultConfig = (lang) => {
  ChromeLang = lang
  const config = lang === 'en' ? defaultSettingEn : defaultSettingCn
  config.stops = packStops(config.stops)
  config.defaultStops = packStops(config.defaultStops)
  return { ...config, ChromeLang }
}
