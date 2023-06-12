import { defaultCnList } from './default-setting/default-list'
import { defaultEnList } from './default-setting/en-default-list'

const manifestData = chrome.runtime.getManifest() || {}
const { version = '' } = manifestData

// 中文默认全局设置
export const defaultSettingCn = {
  version,
  blockSite: [],
  defaultStops: defaultCnList,
  blockMax: 50,
  cheers: [],
  blockSiteObj: {
    needRest: false,
    restTime: '',
    redirectUrl: '',
  },
}

export const defaultSettingEn = {
  version,
  blockSite: [],
  defaultStops: defaultEnList,
  blockMax: 50,
  cheers: [],
  blockSiteObj: {
    needRest: false,
    restTime: '',
    redirectUrl: '',
  },
}

// const defaultListCn = {
//   titleArr: cnTitleArr,
//   tipArr: tipArrCn,
//   confirmArr: confirmArrCn,
//   defaultList: defaultCnList,
//   restTimeArr,
//   itemProto,
// }

// const defaultListEn = {
//   titleArr: enTitleArr,
//   tipArr: tipArrEn,
//   confirmArr: confirmArrEn,
//   defaultList: defaultEnList,
//   restTimeArr,
//   itemProto,
// }

// export const useDefalutList = () => {
//   if (ChromeLang === 'en') {
//     return {
//       ...defaultListEn,
//     }
//   }
//   return {
//     ...defaultListCn,
//   }
// }
