

const app = getApp();
const AV = app.globalData._AV;
Page({
  data: {
    userInfo: {},
    avatarUrl:'',
    hasUserInfo: false,
    infoId:''
  },
  onLoad: function () {

            this.setData({
              phone: "",
              info: "",
              userInfo: app.globalData.userInfo,
              hasUserInfo: true,
              avatarUrl: app.globalData.userInfo.avatarUrl
            });
  },
  choosephoto:function(){
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], 
      sourceType: ['album', 'camera'], 
      success:  (res)=>{
        this.setData({
          avatarUrl:res.tempFilePaths
        });
      }
    })
  },
  formSubmit:function(e){
 
    var _type = typeof this.data.avatarUrl;
    if (_type == "object") {
      var avatarUrl = this.data.avatarUrl;
    } else {
      var avatarUrl = this.data.avatarUrl.split();
    }
    var _textarea = e.detail.value.textarea;
    var _input = e.detail.value.input;
    var _age = e.detail.value.age;
    var _introduce = e.detail.value.introduce;

    wx.getStorage({
      key: 'infoId',
      success: function (res) {      
        var todo = AV.Object.createWithoutData('userInformation', res.data);
        // // 修改属性
        todo.set('userId', app.globalData.userInfo.objectId);
        todo.set('inforSelf', _textarea);
        todo.set('userInfo', app.globalData.userInfo)
        todo.set('phone', _input);
        todo.set('age', _age);
        todo.set('avatarUrl', avatarUrl);
        // 保存到云端
        todo.save().then(function(){
          wx.showToast({
            title: '设置成功',
            icon: 'success',
            duration: 2000
          })
        });

      },
      fail:(res)=>{    
        var Todo = AV.Object.extend('userInformation');
        // 新建一个 Todo 对象
        var todo = new Todo();
        // todo.set('userId', app.globalData.userInfo.objectId);
        todo.set('inforSelf', _textarea);
        todo.set('age', _age);
        todo.set('userInfo', app.globalData.userInfo)
        todo.set('phone', _input);
        todo.set('introduce', _introduce);
        todo.set('avatarUrl', avatarUrl);
        todo.save().then(function (todo) {
          // 成功保存之后，执行其他逻辑.
          console.log('New object created with objectId: ' + todo.id);
          wx.setStorage({
            key: "infoId",
            data: todo.id
          });
          wx.showToast({
            title: '设置成功',
            icon: 'success',
            duration: 2000
          })
        }, function (error) {
          wx.showToast({
            title: '设置失败,请重试!',
            icon: 'success',
            duration: 2000
          })
          // 异常处理
          console.error('Failed to create new object, with error message: ' + error.message);
        });
      }
    })

  }
})