/**
 * 所有运算单位均为rpx，只有输入和输出的时候才有可能转化为px
 */

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src: {
      type: String,
      value: ''
    },
    width: {
      type: Number,
      value: 750
    },
    height: {
      type: Number,
      value: 750
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    pixelRatio: 1,
    windowHeight: 1,
    windowWidth: 1,
    boxHeight: 1,
    boxWidth: 1,

    // 图片原始宽高
    originHeight: 1,
    originWidth: 1,
    // 缩放后的宽高
    ratio: 1,
    curHeight: 1,
    curWidth: 1,

    originDistance: 0,

    movingClass: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    touchstart({touches}) {
      if (touches.length < 2) {
        return;
      }
      this.setData({
        originDistance: Math.sqrt((touches[1].pageX - touches[0].pageX) * (touches[1].pageX - touches[0].pageX)
          + (touches[1].pageY - touches[0].pageY) * (touches[1].pageY - touches[0].pageY))
      });
    },
    move({touches}) {
      if (touches.length < 2) {
        return;
      }

      const distance = Math.sqrt((touches[1].pageX - touches[0].pageX) * (touches[1].pageX - touches[0].pageX)
        + (touches[1].pageY - touches[0].pageY) * (touches[1].pageY - touches[0].pageY));

      const delta = distance - this.data.originDistance;
      const factor = 0.003;
      let width = (1 + delta * factor) * this.data.curWidth;
      let height = (1 + delta * factor) * this.data.curHeight;
      this.setData({
        originDistance: distance,
        curWidth: width,
        curHeight: height
      });
    },
    touchend({touches}) {
      if (touches.length < 2) {
        this.setData({
          movingClass: ''
        });
        let width = this.data.curWidth;
        let height = this.data.curHeight;
        if (width < this.data.boxWidth) {
          width = this.data.boxWidth;
          height = width * this.data.ratio;
        }
        if (height < this.data.boxHeight) {
          height = this.data.boxHeight;
          width = height / this.data.ratio;
        }
        this.setData({
          curWidth: width,
          curHeight: height
        });
      }
    },

    cut() {
      wx.createSelectorQuery().in(this).select('#imgRect').boundingClientRect(rect => {
        this.generatePic(rect);
      }).exec();
    },
    cancel() {
      this.triggerEvent('cancel', {
        src: this.properties.src,
        target: '',
      });
    },

    generatePic(rect) {
      try {
        const ctx = wx.createCanvasContext('myCanvas_A', this);
        const {curWidth, curHeight, boxWidth, boxHeight, pixelRatio, windowHeight, windowWidth} = this.data;
        const left = rect.left - (windowWidth-boxWidth)/2/pixelRatio;
        const top = rect.top - (windowHeight-180-boxHeight)/2/pixelRatio;
        // 在canvas中画一张和放大之后的图片宽高一样的图片，并指定位移
        ctx.drawImage(this.properties.src, left*pixelRatio, top*pixelRatio, curWidth, curHeight);
        ctx.draw(false, () => {
          wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: boxWidth,
            height: boxHeight,
            destWidth: this.properties.width,
            destHeight: this.properties.height,
            canvasId: 'myCanvas_A',
            success: (res) => {
              const tmpPath = res.tempFilePath;
              this.triggerEvent('complete', {
                src: this.properties.src,
                target: tmpPath
              });
            },
            fail: err => {
              console.log(err)
            }
          }, this);
        });
      }
      catch (e) {
        console.log(e);
      }
    }
  },

  attached() {
    const sysInfo = wx.getSystemInfoSync();
    this.setData({
      windowHeight: sysInfo.windowHeight * 750 / sysInfo.windowWidth,  // 9是scrollview不知道哪里来的高度
      windowWidth: 750,
      pixelRatio: 750 / sysInfo.windowWidth
    });

    const {width,height} = this.properties;
    const {windowWidth, windowHeight} = this.data;
    const padding = 100;
    const bottom = 180;

    let boxWidth, boxHeight;
    if (width / height > windowWidth / windowHeight) {
      boxWidth = windowWidth - padding;
      boxHeight = boxWidth / width * height;
    } else {
      boxHeight = windowHeight - padding - bottom;
      boxWidth = boxHeight / height * width;
    }

    this.setData({
      boxWidth,
      boxHeight,
    });

    wx.getImageInfo({
      src: this.properties.src,
      success: (res) => {
        const {width, height} = res;
        this.setData({
          originWidth: width,
          originHeight: height,
        });

        let curWidth = width * this.data.pixelRatio;
        let curHeight = height * this.data.pixelRatio;
        const ratio = curHeight / curWidth;
        if (curWidth / curHeight < boxWidth / boxHeight) {
          curWidth = boxWidth;
          curHeight = curWidth * ratio;
        } else {
          curWidth = boxHeight / curHeight * curWidth;
          curHeight = boxHeight;
          curWidth = curHeight / ratio;
        }

        this.setData({
          ratio,
          curWidth,
          curHeight
        });
      }
    });
  }
})
