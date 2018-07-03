// components/waypoint/waypoint.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    height: '',
    isOutOfView: false
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  ready() {
    wx.createSelectorQuery().in(this).select('._waypointroot').boundingClientRect(rect => {
      if (rect) {
        this.setData({
          height: rect.height,
          isOutOfView: true,
        });
        this.createIntersectionObserver()
        .relativeToViewport()
        .observe('._waypointroot', (res) => {
          if (res) {
            if (res.intersectionRect.height <=0) {
              console.log('out view', this.data.index)
              this.setData({
                isOutOfView: true,
              });
            } else {
              console.log('in view', this.data.index)
              this.setData({
                isOutOfView: false,
              });
            }
          }
        });
      }
    }).exec();
  }
})
