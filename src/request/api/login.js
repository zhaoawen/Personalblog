import requests from "..";
// 登录用户
export const reqLoginUser = (data)=>{
    // 发请求:返回的是Promise对象
    return requests({ method:'post',url:'/user/login',data});
}