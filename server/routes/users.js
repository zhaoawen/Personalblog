// 用户的路由模块
var express = require('express');
// 创建路由对象
var router = express.Router();
var URL = require('url');
var fs = require("fs");
// const expressJoi = require('@escook/express-joi')
const {reg_schema} = require('../schems/user')

function render(path,res){
  fs.readFile(path,'utf-8',function(err,data){
    if(!err){
      res.write(data);
      res.end();
    }
  })
}
router.get('/register',function(req, res, next) {
  // res.send('respond with a resource');
  res.render('register', { title: 'register' });
});
// 登录
router.get('/login',(req, res, next) =>{
  res.render('login', { title: 'login' });
});
// router.post('/login',expressJoi(reg_schema),require("../controller/users").login);
router.post('/login',require("../controller/users").login);
// 注册新用户
router.post('/register',require("../controller/users").register);


module.exports = router;