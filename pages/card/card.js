//index.js
//获取应用实例

const app = getApp();
const AV = app.globalData._AV;
Page({
  data: {
    userInfo:{}
  },
  onLoad: function (options) {
    this.getUserInfo(options.id)
  },
  getUserInfo: function (id) {
    var query = new AV.Query('userInformation');
    query.get(id).then(todo=> {
      console.log(todo)
      this.setData({
        userInfo: todo.toJSON()
      })

    }, function (error) {
      // 异常处理
      console.error(error);

    })
  },


})
