//index.js
//获取应用实例

const app = getApp();
const AV = app.globalData._AV;
Page({
  data: {
    cancel:false,
    choose:11,
    userInfo: {},
    array:[],
    name:"",
    hasUserInfo: false,
    len:1,
  },
  onLoad: function () {
    
      wx.getUserInfo({
        success: res => {
          var _gender = res.userInfo.gender;
      
          if (_gender === 0) {
            this.getUseList(1)
          }
          if (_gender === 1) {
            this.getUseList(1)
          }
          if (_gender === 2) {
            this.getUseList(1)
          }
          this.setData({
            userInfo: res.userInfo,
          })
        }
      });


    
  },
  getUseList:function(sex){
    var cql = 'select * from userInformation where gender=' + sex +' limit 100 order by updatedAt';

    AV.Query.doCloudQuery(cql).then(todo=> {
      var _array = [];
   
      var randomList = this.random(todo.results);
      var len = randomList.length;
      for (var i = 0; i < len; i++) {
        var _do = randomList[i].toJSON();
        if(i<=11){
          _array.push(_do);
        }    
      }    
      console.log(_array);
      this.setData({
        array: _array
      })
    })
  },
  random:function(arr){ //随机抽取返回的数据
        var temp= [];    //temp存放生成的随机数组
        var count= arr.length;    
        for(var i = 0;i<count;i++)
    {
      var num = Math.floor(Math.random() * arr.length); //生成随机数num
      temp.push(arr[num]);    //获取arr[num]并放入temp
      arr.splice(num, 1);
    }
    return temp;
  },
  tapName: function (event) {

    wx.getStorage({
      key: 'infoId',
      success:res=> { 
        console.log(res.data);
        var type = event.currentTarget.dataset.type;
        console.log(type);
        this.setData({
          choose: type
        })

       },fail:function(){
        console.log("没设置呢");
        wx.showModal({
          title: '设置提醒',
          content: '您需要先设置自己的信息',
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({url:"/pages/set/set"});
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
       }
    });


    
  },
  cancel:function(event){
    this.setData({
      choose: 11
    })
  }

})
