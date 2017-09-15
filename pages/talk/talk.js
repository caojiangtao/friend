const app = getApp();
const AV = app.globalData._AV;
const TextMessage = app.globalData.TextMessage;
const createlink = app.globalData.realtime.createIMClient;
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
      wx.setNavigationBarTitle({ title: _do.userInfo.nickName });

      createlink(app.globalData.userInfo.objectId).then(myself => {
      console.log(myself);
      var _this = this;
      myself.on('message', function (message, conversation) {
        console.log(message);
        var _text = message.from+"说: "+message.text;
        _this.data.alltalk.push(_text);
        _this.setData({
          message: _this.data.alltalk
        })
      });
    }).catch(console.error)
    }, function (error) {
       console.log(error)
    });
  },
  message:function(e){
     var she = this.data.she;
     console.log(she);
     //var she = "59ba5ef7a0bb9f0064bc388c"
    var _text = e.detail.value.talk;
    createlink(app.globalData.userInfo.nickName).then(my=> {
      // 创建与Jerry之间的对话
      console.log("ok");
      return my.createConversation({
        members: [she],
        name: app.globalData.userInfo.nickName + "&" + this.data.sheInfo.nickName,
      });
    }).then(conversation=> {
      // 发送消息   
      return conversation.send(new TextMessage(_text));
    }).then(message=> {
      this.data.alltalk.push(_text+" :我说");
      this.setData({
        message: this.data.alltalk
      })
      console.log(app.globalData.userInfo.nickName, '发送成功！');
    }).catch(console.error);
  }
})
