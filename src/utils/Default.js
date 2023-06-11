import { cnTitleArr, enTitleArr } from './default-setting/title-arr'
import { confirmArrCn, confirmArrEn } from './default-setting/confirm-arr'
import { defaultCnList } from './default-setting/default-list'
import { defaultEnList } from './default-setting/en-default-list'
import { restTimeArr } from './default-setting/rest-time-arr'
import { itemProto } from './default-setting/item-proto-arr'
import { tipArrCn } from './default-setting/tip-arr'
import { enTipArr } from './default-setting/tip-arr-en'

const tipArrEn = enTipArr.map((t) => t.enTip)

// const manifestData = chrome.runtime.getManifest() || {}
// const { version = '' } = manifestData

// 中文默认全局设置
export const defaultSettingCn = {
  stops: [],
  defaultStops: defaultCnList,
  stopMax: 5,
  cheers: [],
  defaultCheers: [],
  stopObj: {
    needStopTime: false,
    stopTime: '',
    redirectUrl: '',
  },
}

export const defaultSettingEn = {
  stops: [],
  defaultStops: defaultCnList,
  stopMax: 5,
  cheers: [],
  defaultCheers: [],
  stopObj: {
    needStopTime: false,
    stopTime: '',
    redirectUrl: '',
  },
}

let ChromeLang = ''

export const initDefaultConfig = (lang) => {
  ChromeLang = lang
  if (lang === 'en') {
    return {
      ...defaultSettingEn,
    }
  }
  return {
    ...defaultSettingCn,
  }
}

const defaultListCn = {
  titleArr: cnTitleArr,
  tipArr: tipArrCn,
  confirmArr: confirmArrCn,
  defaultList: defaultCnList,
  restTimeArr,
  itemProto,
}

const defaultListEn = {
  titleArr: enTitleArr,
  tipArr: tipArrEn,
  confirmArr: confirmArrEn,
  defaultList: defaultEnList,
  restTimeArr,
  itemProto,
}

export const useDefalutList = () => {
  if (ChromeLang === 'en') {
    return {
      ...defaultListEn,
    }
  }
  return {
    ...defaultListCn,
  }
}
