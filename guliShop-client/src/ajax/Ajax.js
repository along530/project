//发送ajax请求模块 , 目的是为了axios进行二次封装
// 1.配置基础路径和超时限制

// 2.添加进度条信息

// 3.返回的响应不再需要从data属性当中拿数据,而是响应就是我们要的数据

// 4.统一处理请求,具体请求也可以选择或不处理
import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import store from "@/store";
const instance = axios.create({
  baseURL: "/api", //配置基础路径
  timeout: 20000, //配置请求超时时间
});
//请求和响应拦截器

//请求拦截器当中添加打开进度条的功能,config就是请求报文
instance.interceptors.request.use((config) => {
  let userTempId = store.state.user.userTempId;
  config.headers.userTempId = userTempId;

  //把登录后的标识也添加到请求头当中
  let token = store.state.user.userInfo.token;
  if (token) {
    config.headers.token = token;
  }
  
  NProgress.start();
  //处理config(请求报文)
  //添加额外的功能,使用进度条
  return config; //返回这个config , 请求继续发送,发送的报文信息就是新的config对象
  
});

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    NProgress.done();
    //3
    //默认返回的是response,也就是我们的响应报文信息,如果要拿到数据就通过response.data去获取
    //现在我们是在返回响应之前把响应直接改成了数据,以后拿数据就不需要.data了
    return response.data;
  },
  (error) => {
    //4
    alert("发送请求失败:" + error.message || "未知错误");
    //如果需要进一步处理这个错误,那么就返回一个失败的promise
    //new Error("请求失败")就是自定义错误信息
    // return Promise.reject(new Error("请求失败"));
    //如果不需要再去处理这个错误,那么就返回一个pending状态的promise(目的在于终止promise链)
    return new Promise(() => {});
  }
);
export default instance; //暴露出去我们的axios工具,给发请求用
