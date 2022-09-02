const mysql = require("mysql") // 导入mysql模块

const pool = mysql.createPool({ // mysql采用pool连接池基础配置 （采用pool连接池与不采用配置略有不同，具体请查看文档）
    connectionLimit : 10, // 最大连接数
    host            : '127.0.0.1', // 本地搭建则本机ip,远程服务器则远程服务器ip 
    user            : 'root', // mysql 账户
    password        : 'zhaoawen', // mysql 密码
    database        : 'demo' // 要操作的数据库
})
pool.on('connection',(connection)=>{
    //logger.info("connection!");
});
pool.on('enqueue',()=>{
    //logger.info("Waiting for available connection slot");
});

// 测试链接
// pool.query('select 1',(err,result)=>{
//     if(err)console.log(err.message);
//     console.log(result);
// })

//展示
// const sqlStr = 'select * from users'
// db.query(sqlStr,(err,result)=>{
//     if(err)console.log(err.message);
//     console.log(result);
// })

// 增加
// const student = {number:'04204035',name:'吕姐',gender :'男'}
// const sqlStr = 'INSERT INTO student(number,name,gender)VALUES(?,?,?)'
// db.query(sqlStr,[student.number,student.name,student.gender],(err,result)=>{
//     if(err)console.log(err.message);
//     if(result.affectedRows===1){
//         console.log('插入成功');
//     }
// })

// 更新
// const student = {id: 5,name:'鑫宇'}
// const sqlStr = 'UPDATE student SET name=?WHERE id=?'
// // const sqlStr = 'UPDATE student SET ? WHERE id=?'
// db.query(sqlStr,[student.name,student.id],(err,result)=>{
//     if(err)return console.log(err.message);
//     if(result.affectedRows===1)console.log('更新成功');
// })

// 删除
// const sqlStr = 'DELETE FROM student WHERE id=?'
// db.query(sqlStr,4,(err,results)=>{
//     if(err)return console.log(err.message);
//     if(results.affectedRows===1){console.log('成功删除');
// }})


module.exports.getConnection = (cb)=>{
    if(typeof cb =="function"){
        pool.getConnection(function(err,connection){
            cb(err,connection);
        });
    }else{
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,connection)=>{
                if(err) {reject(err);}
                else {resolve(connection);}
            });
        });
    }
};
// module.exports.query = (sql,value,cb) => {
//     if(typeof cb == "function"){
//         pool.getConnection((err,connection)=>{
//             if(err){
//                 connection.release();
//                 cb(err);
//             }else{
//                 connection.query(sql,value,(err,rows)=>{
//                     connection.release();
//                     cb(error,rows);
//                 });
//             }
//         });
//     }else{
//         return new Promise((resolve,reject)=>{
//             pool.getConnection((err,connection)=>{
//                 if(err){
//                     connection.release();
//                     reject(err);
//                 }else{
//                     connection.query(sql,value,(err,rows)=>{
//                         connection.release();
//                         if(err)reject(error);
//                         else resolve(rows);
//                     });
//                 }
//             });
//         });
//     }
// };
module.exports.beginTransaction = (connection ,cb)=>{
    if(typeof cb =="function"){
        connection.beginTransaction(function(err){
            if(err){
                throw err;
            }
            cb(null,connection);
        });
    }else{
        return new Promise((resolve,reject)=>{
            pool.beginTransaction(function(err){
                if(err){
                    reject(err);
                }else{
                    resolve(connection);
                }
            });
        });
    }
};

module.exports.rollback = (connection ,cb)=>{
    if(typeof cb =="function"){
        connection.rollback(function(){
            connection.release();
            cb && cb();
        });
    }else{
        return new Promise((resolve,reject)=>{
            connection.rollback(function(err){
                connection.release();
                if(err){
                    reject(err);
                }else{
                    resolve();
                }
            });
        });
    }
};


module.exports.commit = (connection ,cb)=>{
    if(typeof cb =="function"){
        connection.commit(function(err){
            if(err){
                connection.rollback(function(){
                    cb && cb(err);
                    throw err;
                });
            }
            connection.release();
            cb && cb();
        });
    }else{
        return new Promise((resolve,reject)=>{
            connection.commit(function(err){
                if(err){
                    connection.rollback(function(){
                        reject(err);
                    });
                }
                connection.release();
                resolve();
            });
        });
    }
};
//检查是否链接失败
this.getConnection((err,connection)=> {
    if(err){
        throw err;
    }else{
        connection.release();
    }
})
module.exports.exec = (sql,value,cb)=>{
    if(typeof cb == "function"){
        pool.getConnection((err,connection)=>{
            if(err){
                connection.release();
                cb(err);
            }else{
                connection.query(sql,value,(err,rows)=>{
                    connection.release();
                    cb(error,rows);
                });
            }
        });
    }else{
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,connection)=>{
                if(err){
                    connection.release();
                    reject(err);
                }else{
                    connection.query(sql,value,(err,rows)=>{
                        connection.release();
                        if(err)reject(error);
                        else resolve(rows);
                    });
                }
            });
        });
    }
}
module.exports.query2 = (connection,sql,value,cb) => {
    if(typeof cb == "function"){
        connection.query(sql,value,(error,rows)=>{
            cb(error,rows);
        });
    }else{
        return new Promise((resolve,reject)=>{
            connection.query(sql,value,(error,rows)=>{
                if(error){
                    reject(error);
                }else{
                    reject(rows);
                }
            });
        });
    }
};

module.exports = pool ;