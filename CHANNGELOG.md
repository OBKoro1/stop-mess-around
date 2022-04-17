# 更新日志

### 更新地址

[如何安装插件](https://github.com/OBKoro1/stop-mess-around/wiki/%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B%E4%BB%A5%E5%8F%8A%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E#%E5%AE%89%E8%A3%85%E6%8F%92%E4%BB%B6)

**更新**：

[release](https://github.com/OBKoro1/stop-mess-around/releases)卸载重新安装。
[chrome商店更新](https://chrome.google.com/webstore/detail/stop-mess-around/gbjbkekbbjbieijpebieifkmahlagncm/related?hl=zh-CN)

<!-- TODO: 文档示例图片和issue.md图片替换 -->
<!-- TODO: 摸鱼时间逻辑修改 -->

### [V2.0.0]
* BREAKING CHANGE: 破坏性更新, 插件兼容谷歌`Manifest V3`版本（否则明年将无法更新插件版本）导致数据重置，因为不能同步储存数据，只能储存在本地。
* feat: 增加插件数据与反馈问题相关功能
* feat: Firefox 暂不支持
  * Chrome插件现在是Manifest v3版本，并在明年无法更新应用，所以本插件已经升级了v3版本。
  * Firefox不支持 v3 版本并且支持时间模糊。
  * 过段时间插件将有可能, 提供支持fireFox Manifestv2版本，并上架应用市场
* fix: 修复统计摸鱼时间相关逻辑
* fix: 修复element-ui无法获取`.tff`字体文件的报错。

### [V1.3.0]

* feat: 清空励志语录信息和还原默认励志语录

![](https://github.com/OBKoro1/stop-mess-around/raw/dev/static/feat/clearList.jpeg?raw=true)

* feat: 摸鱼提醒倒计时的三种状态: `开启`、`关闭右侧休息时间展示`、`关闭`。

开启和关闭就是,是否显示下图内容：

![](https://github.com/OBKoro1/stop-mess-around/raw/dev/static/feat/restTipTime.jpg?raw=true)

`关闭右侧休息时间展示`如下图，取消了今日本站休息时间与总休息时间展示：

![](https://github.com/OBKoro1/stop-mess-around/raw/dev/static/feat/closeRestTimeStatistics.jpeg?raw=true)

* chore: 更新[插件励志语录](https://github.dev/OBKoro1/stop-mess-around/blob/8f40ff0f9138398b1199d977461e6305033d8f81/src/utils/default-setting/tip-arr.js#L8)。
* chore: 更新[摸鱼网站列表](https://github.com/OBKoro1/stop-mess-around/blob/master/src/utils/default-setting/default-list.js), 新增如下网站。
```js
  {
    site: 'https://v.huya.com/',
    labelName: '虎牙录播',
  },
```
* feat: 提供一键复制插件配置数据，方便用户反馈插件问题

<img src="https://github.com/OBKoro1/stop-mess-around/raw/dev/static/feat/getData.jpeg" alt="赞助" width="300px"/>

* feat: 更新Github仓库在线VSCode快速查看使用`github1s.com`, 因为`github1s`能够更快的访问
* docs: 提示信息改为励志信息。
* docs: 更新issue规范

### [V1.2.0]

* feat: [增加网站摸鱼时间统计](https://github.com/OBKoro1/stop-mess-around/wiki/%E5%8A%9F%E8%83%BD%E7%A4%BA%E4%BE%8B%E4%BB%A5%E5%8F%8A%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E#%E6%91%B8%E9%B1%BC%E7%BB%9F%E8%AE%A1)
![](https://github.com/OBKoro1/stop-mess-around/blob/dev/static/feat/touchFishTable.jpg?raw=true)
* feat: [增加网站右侧摸鱼倒计时](https://github.com/OBKoro1/stop-mess-around/wiki/%E5%8A%9F%E8%83%BD%E7%A4%BA%E4%BE%8B%E4%BB%A5%E5%8F%8A%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E#%E6%91%B8%E9%B1%BC%E7%BB%9F%E8%AE%A1)
![](https://github.com/OBKoro1/stop-mess-around/blob/dev/static/feat/restTipTime.jpg?raw=true)

* feat: [Github仓库使用在线VSCode快速查看仓库代码](https://github.com/OBKoro1/stop-mess-around/wiki/%E5%8A%9F%E8%83%BD%E7%A4%BA%E4%BE%8B%E4%BB%A5%E5%8F%8A%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E#github%E4%BB%93%E5%BA%93%E9%A1%B5%E9%9D%A2%E5%BF%AB%E9%80%9F%E6%9F%A5%E7%9C%8B%E4%BB%93%E5%BA%93%E4%BB%A3%E7%A0%81)

![](https://github.com/OBKoro1/stop-mess-around/raw/dev/static/feat/lookCode.jpg?raw=true)

* fix: 修复在某些网站(B站)下,摸鱼提示弹窗`z-index`不够的问题。
* fix: 修复popup的跳转问题。
* chore: 更新[摸鱼网站列表](https://github.com/OBKoro1/stop-mess-around/blob/master/src/utils/Default.js), 新增如下网站。

```js
  {
    site: 'https://v.douyu.com/',
    labelName: '斗鱼录播',
  }
```

### [V1.1.1]

* fix: 修复旧摸鱼网站新增默认值没有的问题

### [V1.1.0]


* feat: 新增休息一下功能，可自行选择休息时间
* feat:  一键清空数组和一键清空设置。
* feat: 支持励志语录的换行。
* feat: 匹配的网站弹窗提供更新励志提示的功能
* feat: 设置中新增重置功能
* chore: 新增地址栏关键词回调，快速打开选项页面
* docs: 更新励志语录
* chore: 标记为本地文件
* fix: 批量添加时，新增去重
* fix: 默认摸鱼列表一直显示的问题
* fix: 摸鱼列表限制高度
* fix: 摸鱼列表过滤选中的值

### [V1.0.6]

* chore: 更新[摸鱼网站列表](https://github.com/OBKoro1/stop-mess-around/blob/master/src/utils/Default.js), 新增如下网站。
```js
  {
    site: 'https://live.qq.com/',
    labelName: '企鹅直播',
  },
  {
    site: 'http://www.taobao.com/',
    labelName: '淘宝网',
  },
  {
    site: 'https://www.jd.com/',
    labelName: '京东',
  },
  {
    site: 'https://www.hupu.com/',
    labelName: '虎扑',
  },
  {
    site: 'https://top.baidu.com/',
    labelName: '百度热搜',
  }
```
* feat: 安装后，自动打开管理面板，方便用户进行配置。
* feat: 表格没有数据，默认打开批量添加摸鱼网站的弹窗
* chore: 插件配置面板页面提取，方便打开页面

### [V1.0.5]

* fix: 修复插件打包的参数丢失问题
* chore: 修复插件打包的环境参数问题

### [V1.0.4]

* fix: 修复不断打印console的问题。
* chore: 更新[插件励志语录](https://github.dev/OBKoro1/stop-mess-around/blob/8f40ff0f9138398b1199d977461e6305033d8f81/src/utils/default-setting/tip-arr.js#L8)。
    * 目标定在月亮之上，即使失败，也可以落在众星之间。
    * 学历代表过去、能力代表现在、学习力代表未来。
    * 坚持做自己懒得做但正确的事情，就能得到别人想得到却得不到的东西。
    * 一个人时间用在哪儿，成就就在哪儿。
    * 要想翻过一堵墙，最好的办法是先把帽子扔过去。
    * 25~35岁，是每个人最宝贵的时光，应该用在刀刃上。
    * 一身行囊离开的时候，除了一些积蓄，就是你的经历，你的态度，你的身体，还有，你的技术。
    * 每天都做那件有意义的事，做的天数多了，人生就有意义了。
    * 识别高收益，长半衰期的知识。
    * 生活由许许多多小的选择组成，每个选择都倾向于舒服的，最终将一事无成。
* chore: 本地安装插件名字加上标识，方便区分
* chore: 更新地址添加

### [V1.0.3]

* chore: 提示本地安装用户去谷歌商店安装应用，提供升级服务。
* chore: content页面日志插入控制。
* fix: 如果开启弹窗，再关闭检测，则关闭弹窗。
* chore: 更新[插件励志语录](https://github.dev/OBKoro1/stop-mess-around/blob/8f40ff0f9138398b1199d977461e6305033d8f81/src/utils/default-setting/tip-arr.js#L8)。
    * 不怕苦，苦半辈子；怕苦，苦一辈子。 - 李敖
    * 失败只有一种，那就是放弃努力, 半途而废

### [V1.0.2]

* feat: 在popup中提供添加当前网址到摸鱼列表中的功能

### [V1.0.1]

* fix: 修复了一些小细节

### [V1.0.0]

* 插件发布