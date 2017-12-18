
const db = require('../server/connect');

var userTemplateDao = {};

//获取所有用户
userTemplateDao.getListAll = (connection) => {
    var sql = 'select * from user';
    return db.query(sql,connection).then((err,result) => {
        if(err){
            console.log('[select error]:'+err);
            return;
        }else{
            return result;
        }
    })

}
//根据ID取单个用户信息
userTemplateDao.getByID = (id,connection) => {
    var sql = 'select * from user where user_id = ?';
    var param = [id];
    return db.query(sql,param,connection).then((err,result) => {
        if(err){
            console.log('[select error]:'+err);
            return;
        }else{
            return result;
        }
    })
}

//注册
userTemplateDao.add = (userTemplate,connection) => {
    var sql = 'insert into user(user_name,user_email,user_pwd,user_avatar,user_role,user_activation_code,user_status) values (?,?,?,?,?,?,?)';
    var param = [userTemplate.user_name,userTemplate.user_email,userTemplate.user_pwd,userTemplate.user_avatar,userTemplate.user_role,userTemplate.user_activation_code,userTemplate.user_status];
    return db.query(sql,param,connection).then((err,result) => {
        if(err){
            console.log('[insert error]:'+err);
            return;
        }else{
            return result;
        }
    })
}
//用户申请删除自己账号
userTemplateDao.delete = (id,connection) => {
    var sql = 'delete from user where user_id = ?';
    var param = [id];
    return db.query(sql,param,connection).then((err,result) => {
        if(err){
            console.log('[delete err]:'+err);
            return;
        }else{
            return result;
        }

    })
}
//更改用户信息
userTemplateDao.update = (userTemplate,connection) => {
    //仅限更改用户名，用户密码，用户邮箱，用户密码，用户角色，用户状态，用户头像链接
    var sql = 'update user set user_ name = ? , user_email = ?, user_pwd = ?,user_role = ?,user_status = ? ,user_avatar = ? where user_id = ?';
    var param = [userTemplate.user_name,userTemplate.user_email,userTemplate.user_pwd,userTemplate.user_role,userTemplate.user_status,userTemplate.user_id,userTemplate.user_avatar];
    return db.query(sql,param,connection).then((err,result) => {
        if(err){
            console.log('[update error]:'+err);
            return;
        }else{
            return result;
        }
    })
}

module.exports = userTemplateDao;