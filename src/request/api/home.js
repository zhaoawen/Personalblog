import requests from "..";
// 获取首页的文章内容
export const reqGetPassage = ()=>{
    // 发请求:返回的是Promise对象
    return requests({ method:'get',url:'/zw'});
}

// 在首页对文章进行点赞
export const reqGetPassageGreat = (data)=>{
    // 发请求:返回的是Promise对象
    return requests({ method:'post',url:'/zw/dianzan',data});
}
// 在首页对文章进行取赞
export const reqGetPassageDelGreat = (data)=>{
    // 发请求:返回的是Promise对象
    return requests({ method:'post',url:'/zw/delzan',data});
}

// 在首页对文章进行收藏
export const reqGetPassageCol = (data)=>{
    // 发请求:返回的是Promise对象
    return requests({ method:'post',url:'/zw/shoucang',data});
}

// 在首页对文章进行取藏
export const reqGetPassageDelCol = (data)=>{
    // 发请求:返回的是Promise对象
    return requests({ method:'post',url:'/zw/delcang',data});
}

// 在首页进入文章详情
export const reqGetPassageDetail = (data)=>{
    // 发请求:返回的是Promise对象
    return requests({ method:'post',url:`/${data.name}/${data.txt}`,data});
}