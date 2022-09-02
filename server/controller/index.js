const db = require("../conf/mysqlConf");
const moment = require("moment");
const res = require("express/lib/response");
const jwt = require("jsonwebtoken")
const config = require("../conf/config")

class mainController{
    //post 登录用户
    async login(request,resposne,next){

        // let sqlStr = 'select * FROM blog '
        // db.query(sqlStr,(err,result)=>{
        //     if(err) return resposne.cc(err.message);
        //     resposne.cc(result);
        // })
        let params = [request.params.name];
        let rightSql = 'select * FROM users WHERE uname=?'
        db.query(rightSql,params,(err,result1)=>{
            if(err){
                return resposne.cc(err.message);
            } 
            if(result1.length != 1){
                return resposne.cc('登录用户失败！');
            }
            let sqlStr = 'select * FROM blog '
            db.query(sqlStr,(err,result2)=>{
                if(err) return resposne.cc(err.message);
                let result={result1,result2};
                resposne.cc(result);
            })
        })
    }
    //到详情页
    async detail(request,resposne,next){
        let sqlStr = 'select * FROM blog WHERE name=?'
        let params = [request.body.name];
        db.query(sqlStr,params,(err,result)=>{
            if(err)resposne.cc(err.message);
            resposne.cc(result);
        })
    }
    // 收藏
    async shoucang(request,resposne,next){ 
        const params = {
            utxt:request.body.utxt,
            uname:request.body.uname,
        }
        // const sqlStr = 'UPDATE blog SET colletion=CONCAT(colletion,"'+params.uname+',") WHERE name=?';
        const sqlStr = 'UPDATE blog SET colletion=CASE WHEN colletion is NOT null THEN CONCAT(colletion,"'+params.uname+',")ELSE "'+params.uname+'," end WHERE name=?';
        db.query(sqlStr,[params.utxt],(err,result)=>{
            if(err)return resposne.cc(err.message);
            resposne.cc(result);
        })
    }
    // 取消收藏
    async delcang(request,resposne,next){ 
        const params = {
            utxt:request.body.utxt,
            uname:request.body.uname,
        }
        const sqlStr = "UPDATE blog SET colletion=REPLACE(colletion,'"+params.uname+','+"','') WHERE name=?";
        db.query(sqlStr,[params.utxt],(err,result)=>{
            if(err)return resposne.cc(err.message);
            resposne.cc(result);
        })
    }
    // 主页面点赞
    async dianzan(request,resposne,next){
        const params = {
            utxt:request.body.utxt,
            uname:request.body.uname,
        }
        // const sqlStr = 'UPDATE blog SET great=CONCAT(great,"'+params.uname+',") WHERE name=?';
        const sqlStr = 'UPDATE blog SET great=CASE WHEN great is NOT null THEN CONCAT(great,"'+params.uname+',")ELSE "'+params.uname+'," end WHERE name=?';

        db.query(sqlStr,[params.utxt],(err,result)=>{

            if(err)return resposne.cc(err.message);
            resposne.cc(result);
        })
    }
    // 取消赞
    async delzan(request,resposne,next){ 
        const params = {
            utxt:request.body.utxt,
            uname:request.body.uname,
        }
        const sqlStr = "UPDATE blog SET great=REPLACE(great,'"+params.uname+','+"','') WHERE name=?";
        db.query(sqlStr,[params.utxt],(err,result)=>{
            if(err)return resposne.cc(err.message);
            resposne.cc(result);
        })
    }
    // 查看有没有点赞
    async chakan(request,resposne,next){ 
        const params = {
            utxt:request.body.utxt,
            uname:request.body.uname,
        }
        // let rightSql = 'select great FROM blog WHERE name=? '
        let rightSql = "select name=? FROM blog WHERE find_in_set('"+params.uname+"', great)";
        // const sqlStr = 'UPDATE blog SET great=CONCAT(great,"'+params.uname+',") WHERE name=?';
        db.query(rightSql,[params.utxt],(err,result)=>{
            if(err)return resposne.cc(err.message);
            resposne.cc(result,0);
        })
    }
    // 详情页点赞
    async dianzan2(request,resposne,next){ 
        const params = {
            utxt:request.body.utxt,
            uname:request.body.uname,
        }
        // const sqlStr = 'UPDATE blog SET great=CONCAT(great,"'+params.uname+',") WHERE name=?';
        const sqlStr = 'UPDATE blog SET great=CASE WHEN great is NOT null THEN CONCAT(great,"'+params.uname+',")ELSE "'+params.uname+'," end WHERE name=?';
        db.query(sqlStr,[params.utxt],(err,result)=>{
            if(err)return resposne.cc(err.message);
            resposne.cc(result);
        })
    }
    // 评论
    async pinglun(request,resposne,next){ 
        const params = {
            utxt:request.body.utxt,
            uname:request.body.uname,
            insert:request.body.insert,
        }
        // const sqlStr = 'UPDATE blog SET com=CONCAT(com,",'+params.insert+'") WHERE name=?';
        const sqlStr = 'UPDATE blog SET com=CASE WHEN com is NOT null THEN CONCAT(com,",'+params.insert+'")ELSE "'+params.insert+'" end WHERE name=?';
        
        db.query(sqlStr,[params.utxt],(err,result)=>{
            if(err)return resposne.cc(err.message);
            resposne.cc(result);
        })
    }
    // 删除博客
    async delblog(request,resposne,next){ 
        const params = {
            utxt:request.body.utxt,
        }
        const sqlStr = 'DELETE  FROM blog WHERE name=?';
        db.query(sqlStr,[params.utxt],(err,result)=>{
            if(err)return console.log(err.message);
            if(result.affectedRows===1){console.log('成功删除');}
        });
    }
    // 管理端
    async man(request,resposne,next){
        let sqlStr = 'select * FROM blog '
        db.query(sqlStr,(err,result)=>{
            if(err) return resposne.cc(err.message);
            resposne.cc(result);
        });
    }
    // 添加博客
    async add(request,resposne,next){
        let params = {
            name:request.body.name,
            content :request.body.content,
            type:request.body.type,
            img:request.body.img,
        }
        let sqlStr = 'INSERT INTO blog(name,type,content,img)VALUES(?,?,?,?)';
         db.query(sqlStr,[params.name,params.type,params.content,params.img],(err,result)=>{
            if(err)return resposne.cc(err);
            if(result.affectedRows===1){
                resposne.cc('插入成功',0);
            }
        })
    }
    // 获取博客信息
    async edit(request,resposne,next){
        let sqlStr = 'select * FROM blog WHERE name=?'
        let params = [request.body.name];
        db.query(sqlStr,params,(err,result)=>{
            if(err)resposne.cc(err.message);
            resposne.cc(result);
        })
    }
    // 修改博客
    async finished(request,resposne,next){
        let params={
            name:request.body.name,
            type:request.body.type,
            content:request.body.content,
            img:request.body.img,
            id:request.body.id,
        }
        
        const sqlStr = 'UPDATE blog SET name=?,type=?,content=?,img=? WHERE id=?'
        // const sqlStr = 'UPDATE student SET ? WHERE id=?'
        db.query(sqlStr,[params.name,params.type,params.content,params.img,params.id],(err,result)=>{
            if(err)return console.log(err.message);
            if(result.affectedRows===1)console.log('更新成功');
        })
    }
}

module.exports = new mainController();