import { utils } from '@/utils/utils-index'
import NET from '@/utils/net'

class AsyncPluginData {
  /**
   * @description: 插件安装或者升级后同步更新数据
   */
  async run() {
    this.config = await utils.getConfig()
    await this.updateSettingOldValue()
  }

  /**
   * @description: 强制更新老的配置 避免配置错误
   */
  async updateSettingOldValue() {
    const { version } = chrome.runtime.getManifest()
    if (version !== this.config.version) {
      this.config.version = version
      await utils.updateStorageData(this.config, NET.GLOBALSETTING)
    }
    // 更新完配置
    await utils.updateStorageData(this.config, NET.GLOBALSETTING)
  }
}

export default new AsyncPluginData()
