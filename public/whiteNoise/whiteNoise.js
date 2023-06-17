// TODO: 注意开发时，audio和img的文件路径需要拼接一下~
// TODO: 提示未来使用https链接时：可参考潮汐开发，提前加载多张背景图片。

// 以下内容在该链接中
// https://www.yuque.com/obkoro1/py4mta/uwffyuodqyam6tup
// TODO: 阿保：休息遮罩层 背景
// transition: opacity .3s ease-out .15s
// background: linear-gradient(180deg,rgba(171,231,170,.33),#67bd7c),linear-gradient(180deg,rgba(171,231,170,.33),#53a166)
// TODO: 阿保：动画效果偷取
// 已偷，随时沟通

// 白噪音数组
export const whiteNoiseArr = [
  {
    cnLabelName: '海浪',
    enLabelName: 'Sea wave',
    audio: 'ocean.mp3',
    img: 'ocean.jpeg',
    background: 'linear-gradient(rgba(170, 170, 170, 0.56), rgba(8, 8, 8, 0.56))',
  },
  {
    cnLabelName: '雨天',
    enLabelName: 'Rainy day',
    audio: 'rain.mp3',
    img: 'rain.jpeg',
    background: 'linear-gradient(rgba(157, 211, 255, 0.56), rgba(0, 40, 80, 0.56))',
  },
  {
    cnLabelName: '森林',
    enLabelName: 'Forest',
    audio: 'forest.mp3',
    img: 'forest.jpeg',
    background: 'linear-gradient(rgba(145, 255, 199, 0.56), rgba(0, 60, 0, 0.56))',
  },
  {
    cnLabelName: '冥想',
    enLabelName: 'Meditation',
    audio: 'meditation.mp3',
    img: 'meditation.jpeg',
    background: 'linear-gradient(rgba(234, 189, 255, 0.56), rgba(33, 2, 63, 0.56))',
  },
  {
    cnLabelName: '咖啡店',
    enLabelName: 'Coffee shop',
    audio: 'coffee.mp3',
    img: 'coffee.jpeg',
    background: 'linear-gradient(rgba(255, 158, 128, 0.56), rgba(123, 29, 0, 0.56))',
  },
  {
    cnLabelName: '流水',
    enLabelName: 'Flowing water',
    audio: 'stream.mp3',
    img: 'stream.jpeg',
    background: 'linear-gradient(rgba(93, 97, 186, 0.56), rgba(3, 33, 69, 0.56))',
  },
  {
    cnLabelName: '图书馆',
    enLabelName: 'Library',
    audio: 'library.mp3',
    img: 'library.jpeg',
    background: 'linear-gradient(rgba(204, 184, 170, 0.56), rgba(114, 78, 66, 0.56))',
  },
  {
    cnLabelName: '旅程',
    enLabelName: 'Journey',
    audio: 'journey.mp3',
    img: 'journey.jpeg',
    background: 'linear-gradient(rgba(106, 168, 170, 0.56), rgba(129, 99, 53, 0.56))',
  },
  {
    cnLabelName: '她的城市',
    enLabelName: 'Her city',
    audio: 'her_city.mp3',
    img: 'her_city.jpeg',
    background: 'linear-gradient(rgba(173, 63, 122, 0.56), rgba(175, 123, 91, 0.56))',
  },
  {
    cnLabelName: '雷雨',
    enLabelName: 'Thunderstorm',
    audio: 'thunderstorm.mp3',
    img: 'thunderstorm.jpeg',
    background: 'linear-gradient(rgba(150, 167, 171, 0.56), rgba(106, 132, 158, 0.56))',
  },
  {
    cnLabelName: '猫的午后',
    enLabelName: 'Cat\'s Afternoon',
    audio: 'cat_afternoon.mp3',
    img: 'cat_afternoon.jpeg',
    background: 'linear-gradient(rgba(86, 67, 0, 0.56), rgba(41, 41, 41, 0.56))',
  },
  {
    cnLabelName: '夜宵',
    enLabelName: 'Supper',
    audio: 'supper.mp3',
    img: 'supper.jpeg',
    background: 'linear-gradient(rgba(94, 42, 113, 0.56), rgba(255, 89, 0, 0.56))',
  },
  {
    cnLabelName: '键盘',
    enLabelName: 'Keyboard',
    audio: 'keyboard.mp3',
    img: 'keyboard.jpeg',
    background: 'linear-gradient(rgba(1, 9, 77, 0.56), rgba(40, 90, 112, 0.56))',
  },
  {
    cnLabelName: '夏夜',
    enLabelName: 'Summer night',
    audio: 'summer_night.mp3',
    img: 'summer_night.jpeg',
    background: 'linear-gradient(rgba(20, 26, 72, 0.56), rgba(101, 133, 183, 0.56))',
  },
  {
    cnLabelName: '瀑布',
    enLabelName: 'Waterfall',
    audio: 'waterfall.mp3',
    img: 'waterfall.jpeg',
    background: 'linear-gradient(rgba(11, 14, 23, 0.56), rgba(164, 177, 179, 0.56))',
  },
  {
    cnLabelName: '林风',
    enLabelName: 'Forest wind',
    audio: 'forest_wind.mp3',
    img: 'forest_wind.jpeg',
    background: 'linear-gradient(rgba(159, 209, 131, 0.56), rgba(71, 64, 37, 0.56))',
  },
  {
    cnLabelName: '屋檐听雨',
    enLabelName: 'Eave Rain',
    audio: 'eave_rain.mp3',
    img: 'eave_rain.jpeg',
    background: 'linear-gradient(rgba(185, 208, 255, 0.56), rgba(0, 22, 81, 0.56))',
  },
  {
    cnLabelName: '风扇',
    enLabelName: 'fan',
    audio: 'fan.mp3',
    img: 'fan.jpeg',
    background: 'linear-gradient(rgba(164, 191, 209, 0.56), rgba(60, 125, 140, 0.56))',
  },
]
