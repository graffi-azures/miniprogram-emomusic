export default new Promise((resolve,reject)=>{
    wx.request({
        url:"http://localhost:3000"+url,
        data:{},
        method:'GET',
        success:res=>{
            console.log("请求成功:",res);
            resolve(res.data);
        },
        fail:err=>{
            console.log("请求失败:",err);
            reject(err);
        }
        })
})