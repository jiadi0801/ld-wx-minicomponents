# ld-wx-minicomponents
微信小程序组件

## component
### infiniteScroll
|属性名|类型|默认值|说明
|----|---|---|---|
|height|String|0rpx|必须值，指定容器高度
|loading|Boolean|false|是否初始loading，true时展示loading界面，false展示数据列表|
|is-end|Boolean|false|数据是否加载到底，已无更多数据|
|more-slot|Boolean|false|是否自定义底部加载中的样式。如果声明了`<view slot="more"></view>`，那么就需要置true|
|loading-slot|Boolean|false|是否自定义初始加载界面。如果声明了`<view slot="loading"></view>`,那么就需要置true|
|bindrefreshing|EventHandle||下拉刷新触发事件。组件使用者必须在回调函数里调用`e.detail.resolve()`来通知组件刷新事件已结束。
|bindscrollend|EventHandle||滚动到底部触发事件。

TODO 自定义上拉加载loading容器

### bottomBar(兼容iPhoneX)
|属性名|类型|默认值|说明
|----|---|---|---|
|height|String|0rpx|指定容器高度
|zIndex|String|99|指定容器的zIndex
|bgColor|String|#fff|指定容器的背景色

