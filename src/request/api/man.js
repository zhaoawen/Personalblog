import requests from "..";
// 管理页
export const reqGetMan = (data)=>{
    // 发请求:返回的是Promise对象
    return requests({ method:'post',url:`/${data.uname}/man`,data});
}