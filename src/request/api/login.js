import requests from "..";
// 登录用户
export const reqLoginUser = (data)=>{
    console.log("进入reqLoginUser");
    // 发请求:返回的是Promise对象
    return requests({ method:'post',url:'/users/login',data});
}