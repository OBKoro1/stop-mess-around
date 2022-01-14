# 更新日志

### 更新地址

[如何安装插件](https://github.com/OBKoro1/stop-mess-around/wiki/%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B%E4%BB%A5%E5%8F%8A%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E#%E5%AE%89%E8%A3%85%E6%8F%92%E4%BB%B6)

**更新**：

[release](https://github.com/OBKoro1/stop-mess-around/releases)卸载重新安装。
[chrome商店更新](https://chrome.google.com/webstore/detail/stop-mess-around/gbjbkekbbjbieijpebieifkmahlagncm/related?hl=zh-CN)

### [V1.2.0]

<!-- TODO: 修改readme文档以及github快手上手文档。 -->
<!-- TODO:  添加浪费时间的弹窗提示 -->
<!-- TODO: 三个月内摸鱼时间统计 -->
<!-- TODO: gif图 -->
<!-- TODO: 关闭设置 -->
<!-- TODO: 每天休息一下点击次数统计 -->
<!-- TODO: 查看点击摸鱼时长详情 具体点击哪些摸鱼时长 -->
<!-- TODO: 记录当天时间 每天运行到零点后 第二天清零 -->
<!-- TODO: 旁边有摸鱼时间再流动  -->

* feat: 增加网站摸鱼时间统计
  * 统计每天各个网站的休息时间。
    * 提前关闭摸鱼网站可以返回剩余的摸鱼时间，做到精准统计摸鱼时间。
    * 对消耗最多时间的网站进行排序
    * 记录每次点击休息一下的点击次数、与点击事件。
  * 统计近百日的摸鱼时间，超过百日的数据将会自动删除。
  * 在设置中新增清楚摸鱼统计的功能。

* 摸鱼网站右侧摸鱼时长统计与摸鱼倒计时提醒
  * 本设置可以在插件的设置页面关闭。 
  * 可以直接停止摸鱼时间。
  * 直接打开每日摸鱼时间统计
  

* feat: 添加github1s直接浏览代码的按钮
    * 优势在于显示在Github仓库名旁边
    * 在别的插件看到这个小功能，因为确实蛮实用的，也不想再装插件了，想着把它也集成进来
    * 以前用的`Octotree`也可以卸载了，直接用GitHub官方提供的`github1s`是最香的 哈哈
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
* chore: 更新[插件励志语录](https://github.com/OBKoro1/stop-mess-around/blob/master/src/utils/Default.js)。
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
* chore: 更新[插件励志语录](https://github.com/OBKoro1/stop-mess-around/blob/master/src/utils/Default.js)。
    * 不怕苦，苦半辈子；怕苦，苦一辈子。 - 李敖
    * 失败只有一种，那就是放弃努力, 半途而废

### [V1.0.2]

* feat: 在popup中提供添加当前网址到摸鱼列表中的功能

### [V1.0.1]

* fix: 修复了一些小细节

### [V1.0.0]

* 插件发布