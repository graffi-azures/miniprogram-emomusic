// pages/index/index.js
// import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:"初始化的数据",
    userInfo:{},
    bannerList:[],
    recommendList:[],
    newSongList:[],
  },
  // handlePar(){
  //   console.log("the method is no popagation");
  // },

  // handleCld(){
  //   console.log("the method is capture");
  // },
  tologs(){
    wx.redirectTo({
      url: '/pages/logs/logs',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(this.data.msg);
    // setTimeout(()=>{
    //   this.setData({
    //     msg:"更改后的数据"
    //   })
    //   console.log(this.data.msg);
    // },2000)
    
    // 请求banner
    wx.request({
        url:"http://localhost:3000/banner",
        data:{type:2},
        method:'GET',
        success:res=>{
            this.setData({
                bannerList : res.data.banners
            })
            console.log(this.data.bannerList);
        },
        fail:err=>{
            console.log("请求失败:",err);
        }
    })
    // 请求推荐歌单
    wx.request({
      url: 'http://localhost:3000/personalized',
      data:{limit:10},
      method:"GET",
      success:res=>{
          this.setData({
              recommendList:res.data.result
          })
          console.log(this.data.recommendList);
      },
    })
    // 推荐新音乐
    let index = 0;
    let newSongArray = [];
    while(index<4){
      new Promise((resolve,reject)=>{
        wx.request({
          url: 'http://localhost:3000/personalized/newsong',
          data:{limit:12},
          method:"GET",
          success:res=>{
            resolve(res.data.result);
          },
          fail:err=>{
            reject(err);
          }
        })
      }).then(value=>{
        value.splice(0,3) 
        newSongArray.push(value)
        this.setData({
            newSongList:newSongArray
        })
        console.log("newSongList",this.data.newSongList);
      })  
      index++; 
    } 
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
        
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})