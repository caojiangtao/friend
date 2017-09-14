

const app = getApp();
const AV = app.globalData._AV;
Page({
  data: {
    phone: "-",
    inform: "-",
    introduce:"暂无",
    userInfo: {},
    city:""
  },
  onLoad:function(){
    wx.getStorage({
      key: 'infoId',
      success:(res)=>{
        var _this = this;
        var query = new AV.Query('userInformation');
        query.get(res.data).then(function (todo) {
          var _do = todo.toJSON();
          _this.setData({
            inform: _do.inforSelf,
            phone: _do.phone,
            age: _do.age,
            userInfo: _do.userInfo,
            introduce: _do.introduce
          });
        }, function (error) {
          _this.setData({
            phone: "-1",
            inform: "-1",
            age:"_",
            userInfo: app.globalData.userInfo
          });
        })
      },
      fail:(res)=>{
        console.log("ok");
        this.setData({
          phone: "暂无",
          inform: "暂无",
          age: "暂无",
          userInfo: app.globalData.userInfo
        });
      }
    })
    // 
    // this.loadInfo(); 
  },
  loadInfo: function(){

    wx.getLocation({
      type: 'wgs84',
      success:(res)=>{
        var latitude = res.latitude
        var longitude = res.longitude
        this.loadCity(longitude, latitude) 
      },
      fail:function(){
        console.log("get user location error")
      }
    })
  },
  loadCity: function (longitude, latitude) { 
    wx.request({ 
      url: 'https://api.map.baidu.com/geocoder/v2/?ak=您的ak &location=' + latitude + ',' + longitude + '&output=json', 
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:(res)=>{
        console.log(res.data);
        var city = res.data.result.addressComponent.city;
        this.setData({ city: city });
      }
    })

  }

})