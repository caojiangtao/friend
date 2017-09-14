const app = getApp();
const AV = app.globalData._AV;

Page({
  data: {
    cancel: false,
    choose: 11,
    userInfo: {},
    array: [],
    name: "",
    hasUserInfo: false,
    len: 1,
  },
  onLoad: function (options) {
    console.log("ok");
    var she = options.id;
    var my = app.globalData.userInfo.objectId;
    console.log(she);
    console.log(my);

    app.globalData.realtime.createIMClient(my).then(function (my) {
      // 创建与Jerry之间的对话
      console.log("ok");
      return my.createConversation({
        members: [she],
        name: 'Tom & Jerry',
      });
    }).then(function (conversation) {
      // 发送消息
      console.log(AV);
       return conversation.send([{"1":"sdsd"}]);
    }).then(function (message) {
      console.log('Tom & Jerry', '发送成功！');
    }).catch(console.error);


  }



})
