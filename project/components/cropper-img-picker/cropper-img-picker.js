Component({
  externalClasses: ['cropper-class'],
  /**
   * 组件的属性列表
   */
  properties: {
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
    cropperImg: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    addImg() {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: res => {
          this.setData({
            cropperImg: res.tempFilePaths[0]
          });
        }
      });
    },
    cancelCut({detail}) {
      this.setData({
        cropperImg: '',
      });
      this.triggerEvent('cancel', {src: detail.src, target: detail.src});
    },
    getCutImgInfo({detail}) {
      this.setData({
        cropperImg: '',
      });
      this.triggerEvent('complete', {src: detail.src, target: detail.target});
    },
  }
})
