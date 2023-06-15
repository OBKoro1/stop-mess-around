{
    blockSite:[],         //已阻止的网址(全局公用)
    defaultStops:[], //默认阻止的网址(全局公用) =>去掉打算 优化代码
    blockMax:5,      //阻止的最大数(全局公用)
    cheers:[
        {
            checked: false,  // 是否选中
            hide: false, // 是否隐藏
            custom: false, // 自定义
        }
    ],  // 加油格言
    blockSiteObj:{
        needRest:false  //是否需要设定阻止时间,默认不设定；表示无需休息
        restTime:'',        // 设定时间
        redirectUrl:''      // 重定向地址
    }
    todolistObj: {}
    // 白噪音资源数组
    [
        {
            audio: 'xxx.mp3', // 音源
            img: 'xxx.jpeg', // 图片
            background: 'none' // 可能需要设置背景 这个还要收集一下资源
        }
    ]
}

<!-- 页面的数据流 -->
get => config => config change => update => config (需重新获取配置)

1.事件 + provide

2.状态管理比较合理(用了这个)