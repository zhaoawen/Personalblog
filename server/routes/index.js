// 用户的路由模块
// 创建路由对象
var URL = require('url');
var fs = require("fs");
var express = require('express');
const { pool } = require('../conf/mysqlConf');
var router = express.Router();
const expressJoi = require('@escook/express-joi')
const {reg_schema} = require('../schems/user')

function render(path,res){
  fs.readFile(path,'utf-8',function(err,data){
    if(!err){
      res.write(data);
      res.end();
    }
  })
}
// router.get('/zw/man',function(req, res, next) {
//   res.render('manager', { title: 'Express' });
// });
// router.get('/zw/add',function(req, res, next) {
//   res.render('edit', { title: 'Express' });
// });
router.post('/:name/add/new',require("../controller/index").add);

// router.get('/zw/add/:passage',function(req, res, next) {
//   res.render('edits', { title: 'Express' });
// });

router.post('/:name/add/:passage',require("../controller/index").edit);
router.post('/:name/add/:passage/finished',require("../controller/index").finished);
// router.get('/:name',function(req, res, next) {
//   res.render('main', { title: 'Express' });
// });

router.get('/:name',require("../controller/index").login);
router.post('/:name/man',require("../controller/index").man);

router.get('/:name/:passage',function(req,res,next){
  if(req.params.name=="users"){
    if(req.params.passage=='register'){
      res.render('./register',{title: 'Express'});
    }
    if(req.params.passage=='login'){
      res.render('./login',{title: 'Express'});
    } 
  }
  res.render('./detail',{title: 'Express'});
})

router.post('/:name/shoucang',require("../controller/index").shoucang);
router.post('/:name/delcang',require("../controller/index").delcang);
router.post('/:name/dianzan',require("../controller/index").dianzan);
router.post('/:name/delzan',require("../controller/index").delzan);

router.post('/:name/:passage',require("../controller/index").detail);

router.post('/:name/:passage',function(req,res,next){
    if(req.params.passage=='register'){
      require("../controller/users").register;
    }
    if(req.params.passage=='login'){
      require("../controller/users").login;
    } 
  require("../controller/index").detail;
})
router.post('/:name/:passage/chakan',require("../controller/index").chakan);
router.post('/:name/:passage/dianzan2',require("../controller/index").dianzan2);
router.post('/:name/:passage/pinglun',require("../controller/index").pinglun);
router.post('/:name/:passage/delblog',require("../controller/index").delblog);

module.exports = router;
