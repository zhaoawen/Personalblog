// <!--导入相关使用模块-->
var createError = require('http-errors');// 处理错误（框架生成）
var express = require('express');// （框架生成）
var path = require('path');// 路径 （框架生成）
var cookieParser = require('cookie-parser');// cookie （框架生成）
var logger = require('morgan');// 日志 （框架生成）
const cors = require("cors")
// 引入websoket
const Ws = require("ws");
const Joi = require('joi')
const expressJoi = require('@escook/express-joi')
const expressJWT = require('express-jwt')
const config = require("./conf/config")
// var pool = require("pool");
// 导入路由模块

var usersRouter = require('./routes/users');// users 路由 // （自行添加）
var indexRouter = require('./routes/index');// index 路由 （框架生成）

const res = require('express/lib/response');
const { join } = require('path');
//创建服务器的实例对象
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));// 设置视图根目录（框架生成）
app.set('view engine', 'ejs');// 使用 pug 模板（框架生成）

// 声明使用中间件
//使用.unless指定哪些接口不需要进行Token的身份认证
// app.use(expressJWT({secret:config.jwtSecretKey}).unless({ path: [/^\/users\//] }));


app.use((req,res,next)=>{
  res.cc = function (err,status = 1){
    res.send({
      status,
      message:err instanceof Error ? err.message : err,
    })
  }
  next()
})
app.use(logger('dev'));// （框架生成）
app.use(express.json());// （框架生成）
//下面的中间件是解析表单数据的，只能解析application/x-www-form-urlencoded格式的表单数据
app.use(express.urlencoded({ extended: false }));// （框架生成）
app.use(cookieParser());// （框架生成）
app.use(express.static(path.join(__dirname, 'public')
  //maxage: 30*24*60*60*1000       指定静态资源在浏览器中的缓存时间
));//（框架生成）



var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// <!-- 解决请求跨越 -->
app.all('/*',function (req, res, next) { // （自行添加）
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (req.method == 'OPTIONS') {
    res.sendStatus(200);
  }
  else {
    next();
  }
});
app.use(cors());


// 注册路由模块
//一般一个js文件对应一个route
app.use('/users', usersRouter);
//因为个人博客页面可能与登录注册的url格式一致，故有个先后次序的关系，要先将users的放在前面
app.use('/', indexRouter);
// app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// 错误中间件
// app.use((err,req,res,next)=>{
//   //捕获身份认证失败的错误
//   if(err.name === 'UnauthorizedError')return res.cc('身份认证失败！')
//   if(err instanceof joi.ValidationError) return res.cc(err)
//   res.cc(err)
// })

// 配置websoket，实现一个聊天室
((Ws) => {
  // ws:localhost:8000
  const server = new Ws.Server({ port: 8000 });

  const init = () => {
    bindEvent();
  };

  function bindEvent() {
    server.on("open", handleOpen);
    server.on("close", handleClose);
    server.on("error", handleError);
    server.on("connection", handleConnection);
  }

  function handleOpen() {
    console.log("Websocket open");
  }
  function handleClose() {
    console.log("Websocket close");
  }
  function handleError() {
    console.log("Websocket error");
  }
  function handleConnection(ws) {
    console.log("Websocket connected");
    ws.on("message", handleMessage);
  }
  function handleMessage(msg) {
    // 接受前端发送过来的message
    msg = msg.toString("utf-8");
    console.log("msg---", msg);

    // 把消息广播出去，凡是连接这个websocket地址的都能收到
    server.clients.forEach((c) => {
      c.send(msg);
    });
  }
  init();
})(Ws);


module.exports = app;
app.listen(3007,()=>{
  console.log("api server running at http://127.0.0.1:3007");
})