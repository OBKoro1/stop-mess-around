import { defaultSettingCn, defaultSettingEn } from './Default'
import { tipArr } from './default-setting/tip-arr-en'

// 包装stops
export const packStops = (stops) => (stops.map((t) => ({ ...t, checked: false, hide: false })))

// 包装cheers
export const packCheers = (cheers, lang) => (cheers.map((t) => ({
  tip: lang === 'en' ? t.enTip : t.cnTip, checked: false, hide: false, custom: false,
})))

let ChromeLang = ''
export const initDefaultConfig = (lang) => {
  ChromeLang = lang
  const config = lang === 'en' ? defaultSettingEn : defaultSettingCn
  config.stops = packStops(config.stops)
  config.defaultStops = packStops(config.defaultStops)
  config.cheers = packCheers(tipArr, lang)
  return { ...config, ChromeLang }
}
