
import axios from "axios";

// 1.利用axios对象的方法create，去创建一个axios案例
// 2.request就是axios，只不过稍微配置一下
const requests = axios.create({
    // 配置对象
    // 基础路径，发请求的时候，路径当中会出现api
    baseURL:"/api",
    // baseURL:'http://localhost:3007',
    // 请求超时的时间5s
    timeout:8000,
    withCredentials: true,
})
// 请求拦截器，在发请求之前，可以检测到，
requests.interceptors.request.use((config)=>{
    // config配置对象，对象里面有一个属性很重要，header请求头
    // const getCookie = ('getCookie'); // 在组件中通过inject获取挂载在全局的globalFunc方法
    // if(document.cookie){
    //     config.headers.Cookie = document.cookie;
    // }
    return config;
})

export default requests;
