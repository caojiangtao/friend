

const app = getApp();
Page({
  data: {
    userInfo: {},
    hasUserInfo: false
  },
  onLoad: function () {
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: true
    });
  }
})