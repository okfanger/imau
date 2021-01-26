// index.js
// 获取应用实例
const app = getApp()
//80*x=300
//y*x=640
Page({
  data: {
    motto: 'Hello World',
    imgExist: false,
    imgList:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18] ,
    imgUrl: null,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  headimgHD(imageUrl) {        //console.log('原来的头像', imageUrl);
  imageUrl = imageUrl.split('/');        //把头像的路径切成数组
  
  //把大小数值为 46 || 64 || 96 || 132 的转换为0
  if (imageUrl[imageUrl.length - 1] && (imageUrl[imageUrl.length - 1] == 46 || imageUrl[imageUrl.length - 1] == 64 || imageUrl[imageUrl.length - 1] == 96 || imageUrl[imageUrl.length - 1] == 132)) {
      imageUrl[imageUrl.length - 1] = 0;
  }
 
  imageUrl = imageUrl.join('/');   //重新拼接为字符串

  //console.log('高清的头像', imageUrl);
  return imageUrl;
},
justdoit: function(e) {
  var imgIde=e.currentTarget.dataset.chooseId;
  this.doit(imgIde);
}
,
imgUpload: function(e) {
  wx.chooseImage({
    count: 1,
    sizeType: ["original", "compressed"],
    sourceType: ["album"],
    success:(res)=> {
      var tempFilePaths = res.tempFilePaths;
      this.setData({
        imgUrl:res.tempFilePaths[0],
        imgHasUpload: true
      });
      this.doit("1");
    },
    fail: (res)=>{

      },
    complete: (res)=>{

      },
  })
}
,
doit: function(imgId) {
  wx.getImageInfo({
    src: this.data.imgUrl,
    success: (ress) => {
        let ctx = wx.createCanvasContext('myCanvas')
        //console.log(ress);
        ctx.drawImage(ress.path, 0, 0,300,300) // 绘制图像到画布

        // 图片那拼接

        //ctx.drawImage('../../images/1.png', 220, 220,80,80); // 绘制图像到原有画布，
        ctx.drawImage('../../images/_'+imgId+'.png', 0, 0,300,300);
        //也就是图片拼接

       // 图片加水印
        ctx.draw(false);

    }

})
    var that=this;
wx.canvasToTempFilePath({
  x: 0,
  y: 0,
  width: 300,
  height: 300,
  destWidth: 300,
  destHeight: 300,
  canvasId: 'myCanvas',
  success(res) {
  }
})
}

,
savePic() {
  const windowWidth = wx.getSystemInfoSync().windowWidth;
  wx.canvasToTempFilePath({
    x: 0,
    y: 0,
    width: 300,
    height: 300,
    destWidth: 640,
    destHeight: 640,
    canvasId: 'myCanvas',
    success: (res) => {
      wx.saveImageToPhotosAlbum({
        filePath: res.tempFilePath,
        success: (res) => {
          /*
          wx.navigateTo({
            url: '../index/index',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
          console.log("success:" + res);
          */
         this.setData({
           imgUrl: null,
           imgHasUpload: false,
           imgExist: false
         });
        }, fail(e) {
          console.log("err:" + e);
        }
      })
    }
  });
}
  ,
  chooseOwn() {
    if (app.globalData.userInfo) {
      this.setData({
        imgHasUpload: true,
        imgUrl: this.headimgHD(app.globalData.userInfo.avatarUrl),
      });
this.doit("1");

    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            imgUrl: this.headimgHD(res.userInfo.avatarUrl)
          });
        }
      })
    }
  },

  getUserInfo(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
