# ld-wx-minicomponents
微信小程序组件

## component
### cropper(图片裁剪)
|属性名|类型|默认值|说明
|----|---|---|---|
|src|String|''|待裁剪图片源
|width|Number|750|裁剪宽度(单位rpx)
|height|Number|750|裁剪高度(单位rpx)
|bindcancel|EventHandle||取消裁剪，返回{src:this.properties.src,target:''}
|bindcomplete|EventHandle||完成裁剪，返回{src:this.properties.src,target:`'http://tmp/xxxx.png'`}

### cropper-img-picker(图片裁剪选择器)
依赖`cropper组件

|属性名|类型|默认值|说明
|----|---|---|---|
|cropper-class|String||外部样式
|width|Number|750|裁剪宽度(单位rpx)
|height|Number|750|裁剪高度(单位rpx)
|bindcancel|EventHandle||取消裁剪，返回{src:this.properties.src,target:''}
|bindcomplete|EventHandle||完成裁剪，返回{src:this.properties.src,target:`'http://tmp/xxxx.png'`}

### infiniteScroll(功能丰富的无限滚动组件)
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

### bottomBar(兼容iPhoneX的吸底功能容器)
|属性名|类型|默认值|说明
|----|---|---|---|
|height|String|0rpx|指定容器高度
|zIndex|String|99|指定容器的zIndex
|bgColor|String|#fff|指定容器的背景色

TODO switchTab 下禁用iPhoneX兼容，因此需要增加一个字段来手动禁用

### stickyHeader(自动吸顶的组件容器)
|属性名|类型|默认值|说明
|----|---|---|---|
|无|||

### waypoint(not command名字用法都不合适，在无限滚动中将视窗外的元素用空view代替，减少节点数)
|属性名|类型|默认值|说明
|----|---|---|---|
|list|Array|[]| child为单节点，作为list的渲染模板 |
