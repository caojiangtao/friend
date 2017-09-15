//app.js
const Realtime = require('./utils/realtime.weapp.min.js').Realtime;
const TextMessage = require('./utils/realtime.weapp.min.js').TextMessage;
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
      console.log(user);
      this.globalData.userInfo = user.toJSON();
    }).catch(console.error);
  },
  globalData: {
    userInfo: null,
    _AV:AV,
    realtime: realtime,
    TextMessage: TextMessage
  }
})
