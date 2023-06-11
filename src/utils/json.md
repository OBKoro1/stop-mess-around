{
    stops:[],         //已阻止的网址(全局公用)
    defaultStops:[], //默认阻止的网址(全局公用)
    stopMax:5,      //阻止的最大数(全局公用)
    cheers:[],      //加油格言
    defaultCheers:[]    //默认加油格言
    stopObj:{
        needStopTime:false  //是否需要设定阻止时间,默认不设定；表示无需休息
        stopTime:'',        //设定时间
        redirectUrl:''      //重定向地址
    }
}

<!-- 页面的数据流 -->
get => config => config change => update => config (需重新获取配置)

1.事件 + provide

2.状态管理比较合理(用了这个)