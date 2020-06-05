# yiyan_spider
一言的爬虫

一言网（hitokoto.cn）创立于 2016 年，隶属于萌创团队，目前网站主要提供一句话服务。


一言共有**动画**,**漫画**,**游戏**,**文学**,**原创**,**来自网络**,**其他**,**影视**,**诗词**,**网易云**,**哲学**,**抖机灵**,几个大类

里面的内容很棒,但官方没有公开数据库,于是我写了一个爬虫,将以上几个大类,实时写到一个JSON文件中, 并将JSON实时展示到以下url中

```
https://v2fy.com/yiyan_spider/yiyan_data.json
```

你可以在浏览器中安装前端助手扩展工具,对以上页面进行查看

```
https://www.baidufe.com/fehelper
```

![https://www.v2fy.com/yiyan_spider/yiyan_data.json](https://www.v2fy.com/asset/0i/yiyan_data.png)



## 简易版查看《一言数据库可视化1.0》

```
https://www.v2fy.com/yiyan_spider/yiyan.html
```

## 折叠网页查看《一言数据库可视化2.0》

```
https://www.v2fy.com/yiyan_spider/yy.html
```



## 使用方法:

#### 安装依赖

```
npm i
```

#### 运行

- 开启

```
npm start
```

- 后台守护进程运行

```
npm run yiyan_start
```
- 查看后台守护进程

```
npm run yiyan_list
```

- 关闭后台守护进程

```
yiyan_stop
```