Page({

  /**
   * 页面的初始数据
   */
  data: {
    showCropper: false,
    testimg: '',
    pic1: '',
    cutimg: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  chooseImg() {
    let me = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        me.setData({
          showCropper: true,
          testimg: res.tempFilePaths[0]
        });
      },
      fail: function () {
        console.log('fail to get video')
        console.log(arguments)
      }
    });
  },
  uploadImg() {
    wx.uploadFile({
      url: 'API.imgupload', //仅为示例，非真实的接口地址
      filePath: this.data.cutimg,
      name: 'pic1',
      formData: {
        'user': 'test'
      },
      success: res => {
        var data = res.data
        this.setData({
          pic1: JSON.parse(data).data.pic1,
        })
      }
    });
  },
  cancelCut({detail}) {
    this.setData({
      showCropper: false
    });
  },
  getCutImgInfo({detail}) {
    this.setData({
      showCropper: false,
      cutimg: detail.target
    });
  }
})
