import requests from "..";
// 编辑页获取文章数据
export const reqGetEditPassage = (data)=>{
    // 发请求:返回的是Promise对象
    return requests({ method:'post',url:`/${data.uname}/add/${data.name}`,data});
}

// 编辑页修改文章数据
export const reqGetEditPassageFinished = (data)=>{
    // 发请求:返回的是Promise对象
    return requests({ method:'post',url:`/${data.uname}/add/${data.name}/finished`,data});
}

// 编辑文章数据
export const reqEditPassage = (data)=>{
    // 发请求:返回的是Promise对象
    return requests({ method:'post',url:`/${data.uname}/add/new`,data});
}