const app = getApp();
const AV = app.globalData._AV;
const TextMessage = app.globalData.TextMessage
Page({
  data: {
    sheInfo: {},
    she:'',
    my:'',
    message:[],
    alltalk:[]
  },
  onLoad: function (options) {
    var ta = options.id;
    var query = new AV.Query('userInformation');
    query.get(ta).then(todo=>{
      var _do = todo.toJSON();
      this.setData({
        sheInfo: _do.userInfo,
        she: _do.userInfo.objectId
      });
      wx.setNavigationBarTitle({ title: _do.userInfo.nickName })
    }, function (error) {
       console.log(error)
    });
    
    app.globalData.realtime.createIMClient(app.globalData.userInfo.objectId).then(myself => {
      myself.on('message', function (message, conversation) {
        console.log(message.text);
      });
    }).catch(console.error)
    console.log("id=" + app.globalData.userInfo.objectId);
  },
  message:function(e){
    var my = app.globalData.userInfo.objectId;
    var she = this.data.she;
    var _text = e.detail.value.talk+": 我";
    app.globalData.realtime.createIMClient(my).then(my=> {
      // 创建与Jerry之间的对话
      console.log("ok");
      return my.createConversation({
        members: [she],
        name: app.globalData.userInfo.nickName + '&' + this.data.sheInfo.nickName,
      });
    }).then(conversation=> {
      // 发送消息   
      return conversation.send(new TextMessage(_text));

    }).then(message=> {
      this.data.alltalk.push(_text);
      this.setData({
        message: this.data.alltalk
      })
      console.log('Tom & Jerry', '发送成功！');
    }).catch(console.error);
  }



})
