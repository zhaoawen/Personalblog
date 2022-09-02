import requests from "..";
// 详情页查看是否点过赞
export const reqGetIsGreat = (data)=>{
    // 发请求:返回的是Promise对象
    return requests({ method:'post',url:`/${data.uname}/${data.utxt}/chakan`,data});
}

// 详情页查看是否点过赞
export const reqDetailGreat = (data)=>{
    // 发请求:返回的是Promise对象
    return requests({ method:'post',url:`/${data.uname}/${data.utxt}/dianzan2`,data});
}

// 详情页删除文章
export const reqDetailDel = (data)=>{
    // 发请求:返回的是Promise对象
    return requests({ method:'post',url:`/${data.uname}/${data.utxt}/delblog`,data});
}

// 详情页评论文章
export const reqDetailPinglun = (data)=>{
    // 发请求:返回的是Promise对象
    return requests({ method:'post',url:`/${data.uname}/${data.utxt}/pinglun`,data});
}

