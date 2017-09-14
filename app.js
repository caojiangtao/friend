//app.js
const Realtime = require('./utils/realtime.weapp.min.js').Realtime;
const AV = require('./utils/av-live-query-weapp-min');
AV.init({ 
 appId: 'GyO0UevjvEs795DCPmK1KkAe-gzGzoHsz', 
 appKey: 'Gk635O8aJWt0TJW4iweppIuk', 
});
const realtime = new Realtime({
  appId: 'GyO0UevjvEs795DCPmK1KkAe-gzGzoHsz',
  noBinary: true,
});
App({
  onLaunch: function () {
    AV.User.loginWithWeapp().then(user => {
      console.log('login success')
    }).catch(console.error);
    const user = AV.User.current();
    // 调用小程序 API，得到用户信息
    wx.getUserInfo({
      success: ({ userInfo }) => {
        // 更新当前用户的信息
        user.set(userInfo).save().then(user => {
          // 成功，此时可在控制台中看到更新后的用户信息
          this.globalData.userInfo = user.toJSON();
        }).catch(console.error);
      }
    });
  },
  globalData: {
    userInfo: null,
    _AV:AV,
    realtime: realtime
  }
})
