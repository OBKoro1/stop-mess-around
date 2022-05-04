# 开发相关

<!-- 

TODO: firfox兼容 v2
# TODO: 本地id获取 获取本地火狐id链接 getUrl
let fullURL = browser.extension.getURL("beasts/frog.html");
// -> something like:
// moz-extension://2c127fa4-62c7-7e4f-90e5-472b45eecfdc/beasts/frog.html

fireFox直接上传到商店，如果有问题，则解决问题。
否则本地貌似无法调试。 因为上次可以调试，这次只是被禁用以后就无法调试。
测试本地element-ui的链接与ui
测试本地的管理面板跳转是否成功

# 兼容英文版本
索要英文打赏
设置英文版本
设置英文励志言语
英文wiki文档


整理读书名言（可选）：
更新语录，更新读书笔记中的语录
删除语录

架构（可选）:
梳理环境变量: 删除env文件、或者根据env设置环境变量。
commit相关、eslint相关
更新scripts的脚本使用。
webpack设置，打包压缩。
文件架构梳理
代码质量相关：重复代码检测等

 -->

## 统计相关逻辑

* 有道云笔记

## 环境变量

* NODE_ENV --mode 环境 传递
* VUE_APP_MODE .env.版本 传递
* argv: node deploy.js 参数1 参数2

### 开发
* 写代码
    * 清空issue
    * 清空todo
    * 可选更新架构和工程
    * 可选更新名人名言
* 提交代码
* 写changelog
* 写文档，写功能描述。

## 打包

* 打包各浏览器的应用商店版本
    * 是否修改文档描述
    * 是否修改图片演示
* 打包各浏览器的release版本，通过actions上传到release中。

## tag

* 打tag

### 上传到应用商店。

* 谷歌
* edge
* 火狐