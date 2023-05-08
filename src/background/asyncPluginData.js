import { utils } from '@/utils/index'
import { defaultTableAdd, initDefaultTableList } from '@/utils/tableListUtils'
import { defaultList, defaultSetting, itemProto } from '@/utils/Default'
import NET from '@/utils/net'
import { versionStringCompare } from '@/utils/utils-func'

class AsyncPluginData {
  /**
   * @description: 插件安装或者升级后同步更新数据
   */
  async run() {
    ({ setting: this.setting, statisticsTime: this.statisticsTime, listArr: this.listArr } = await utils.getData())
    await this.updateSettingOldValue()
    await this.initTableList()
    await this.asyncSettingData()
    await this.updateItemPrototype()
  }

  /**
   * @description: 强制更新老的配置 避免配置错误
   */
  async updateSettingOldValue() {
    const { version } = chrome.runtime.getManifest()
    if (version !== this.setting.version) {
      await this.updateVersionData(version)
      this.setting.version = version
      await utils.updateStorageData(this.setting, NET.GLOBALSETTING)
    }

    // 更新完配置
    this.setting.versionUpdate = true
    await utils.updateStorageData(this.setting, NET.GLOBALSETTING)
  }

  async updateVersionData(newVersion) {
    // 版本小于2.0.7
    if (versionStringCompare(newVersion, '2.0.7') > 0) {
      console.log('do something', this)
    }
  }

  // 更新摸鱼网站的属性
  async updateListItemVersion(callBack) {
    let change = false
    const newList = this.listArr.map((item) => {
      itemProto.forEach((ele) => {
        const { newItem, isChange } = callBack(item, ele)
        if (isChange) {
          change = true
          return newItem
        }
      })
      return item
    })
    if (change) {
      this.listArr = newList
      await utils.updateStorageData(newList, NET.TABLELIST)
    }
  }

  /**
   * @description: 初始化添加所有默认摸鱼列表
   */
  async initTableList() {
    const options = await initDefaultTableList(this.setting)
    if (options.init) {
      ({ setting: this.setting, listArr: this.tableData } = options)
    }
  }

  /**
   * @description: 同步新增配置
   * @return {type}
   */
  async asyncSettingData() {
    const { setting } = this
    let obj = JSON.parse(JSON.stringify(setting))
    obj = await this.syncTipDefault(obj)
    let isChange = false
    for (const key in defaultSetting) {
      // 新增配置同步
      if (obj[key] === undefined) {
        isChange = true
        obj[key] = defaultSetting[key]
      }
    }
    // 同步配置
    if (isChange) {
      await utils.updateStorageData(obj, NET.GLOBALSETTING)
      this.setting = setting
    }
  }

  /**
   * @description: 更新默认语录、标题、按钮数组
   */
  // eslint-disable-next-line class-methods-use-this
  async syncTipDefault(obj) {
    let isChange = false
    const newDefaultList = [] // 新增的摸鱼网站
    Object.keys(obj.defaultNum).forEach((key) => {
      // 数据中的语录比默认语录小的时候，默认添加。
      if (obj.defaultNum[key] < defaultSetting.defaultNum[key]) {
        for (let i = obj.defaultNum[key]; defaultSetting.defaultNum[key] > i; i += 1) {
          isChange = true
          if (key !== 'defaultList') {
            // 添加新的默认值
            obj[key].push(defaultSetting[key][i])
          } else {
            // 新增的摸鱼网站
            newDefaultList.push(defaultList[i])
          }
        }

        obj.defaultNum[key] = defaultSetting.defaultNum[key] // 更新默认值数量
      }
    })
    if (isChange) {
      await utils.updateStorageData(obj, NET.GLOBALSETTING)
    }
    return obj
  }

  /**
   * @description: 同步摸鱼列表网站
   */
  async syncDefaultList() {
    let isChange = false
    const newDefaultList = []
    const settingDefaultListNum = this.setting.defaultNum.defaultList
    const newDefaultListNum = defaultSetting.defaultNum.defaultList
    if (settingDefaultListNum < newDefaultListNum) {
      for (let i = settingDefaultListNum; newDefaultListNum > i; i += 1) {
        isChange = true
        newDefaultList.push(defaultList[i])
      }
    }
    if (isChange) {
      const { listArr } = await utils.getData()
      this.setting.defaultNum.defaultList = newDefaultListNum // 更新默认值数量
      const newArr = await defaultTableAdd(newDefaultList, this.setting)
      await utils.updateStorageData(this.setting, NET.GLOBALSETTING)
      await utils.updateStorageData([...listArr, ...newArr], NET.TABLELIST)
    }
  }

  /**
   * @description: 查看数组默认元素是否有更新
   */
  async updateItemPrototype() {
    let change = false
    const newList = this.listArr.map((item) => {
      itemProto.forEach((ele) => {
        if (item[ele] === undefined) {
          change = true
          item[ele] = defaultSetting[ele]
        }
      })
      return item
    })
    if (change) {
      this.listArr = newList
      await utils.updateStorageData(newList, NET.TABLELIST)
    }
  }
}

export default new AsyncPluginData()
