const db = require("../conf/mysqlConf");
const moment = require("moment");
const res = require("express/lib/response");
const jwt = require("jsonwebtoken")
const config = require("../conf/config")

class AccoutController{
    //post 注册新用户
    async register(request,resposne,next){
        const info = request.body;
        // 对数据进行检验
        if(!info.username||!info.userpwd||!info.userdel){
            return resposne.cc('用户名或密码不合法！');
        }

        const sqlStr = 'select * from users where uname=?'
        db.query(sqlStr,info.username ||info.userdel,(err,results)=>{
            if(err){
                // return resposne.send({
                //     status:1,
                //     message:err.message
                // })
                return resposne.cc(err);
            }

            //判断用户名是否被占用
            if(results.length!=0){
                return resposne.cc('用户名或者电话被占用，请更换其他用户名');
            }
            let insertSql = 'INSERT INTO users(uname,upwd,ucreat,udel,uquanxian)VALUES(?,?,?,?,?)';
            let params = [
                info.username,
                info.userpwd,
                moment().format("YYYY-MM-DD HH:mm:ss"),
                info.userdel,
                '0',
            ];
            db.query(insertSql,params,(err,results)=>{
                if(err){
                    return resposne.cc(err);
                }
                if(results.affectedRows != 1){
                    return resposne.cc('注册用户失败！');
                }
                resposne.cc('注册用户成功',0);
            });
            // try {
            //     let res = async()=>{
            //         let result1 = await db.query(insertSql,params);
            //     }
            //     let results = res();

            //     if(results && results.affectedRows == 1){
            //         resposne.send({
            //             code:200,
            //             msg:"注册成功",
            //         })
            //     }else{
            //         resposne.send({
            //             code:200,
            //             msg:"注册失败",
            //         })
            //     }
            // } catch (error) {
            //     resposne.send({
            //         code:-200,
            //         msg:"服务器异常",
            //         error
            //     })
            // }
        })
    }

    //post 登录用户
    async login(request,resposne,next){

        let loginSql = "select * FROM users WHERE udel=?  "
        let params=[
            request.body.userdel,
            request.body.userpwd,
        ]
        db.query(loginSql,params,(err,results)=>{
            // 执行SQL语句失败
            if(err){
                return resposne.cc(err.message);
            }
            // resposne.send(results);
            if(results.length != 1){
                return resposne.cc('登录用户失败！');
            }
            // 判断密码是否正确

            if(results[0].upwd !== request.body.userpwd){
                return resposne.cc('密码错误！');
            }
            //剔除密码和头像的语句
            const user = {...results[0],userpwd:''}

            //生成Token的字符串
            const tokenStr = jwt.sign(user,config.jwtSecretKey,{
                expiresIn:config.expiresIn,//有效期为10h
            })

            resposne.send({
                data:results[0].uname,
                status:0,
                message:'登录成功！',
                token:'Bearer' + tokenStr,

            })
        });   
    }
    async location(request,resposne,next){
            resposne.send({
                data:{"id":1,"num":13333},
                status:0,
                message:'登录成功！',
            })
    }
}
module.exports = new AccoutController();