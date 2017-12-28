
const db = require('../server/connect');

var userTemplateDao = {};

//获取所有用户
userTemplateDao.getListAll = () => {
    var sql = 'select * from user';
    return db.query(sql,(err,result) => {
        if(err){
            console.log('[select error]:'+err);
            return;
        }else{
            return result;
        }
    })

}
//根据ID取单个用户信息
userTemplateDao.getByID = (id) => {
    var sql = 'select * from user where user_id = ?';
    var param = [id];
    return db.query(sql,param,(err,result) => {
        if(err){
            console.log('[select error]:'+err);
            return;
        }else{
            return result;
        }
    })
}
//根据邮箱获取用户信息
userTemplateDao.getByEmail = (user_email) => {
    var sql = 'select * from user  where user_email = ?';
    var param = [user_email];
    return db.query(sql,param,(err,result) => {
        if(err){
            console.log('[select error]:'+err);
            return;
        }else{
            return result;
        }
    })
}
//登录
userTemplateDao.login =　(user_email,user_pwd) => {
    var sql  = 'select * from user where user_email = ? && user_pwd = ?'
    var param = [user_email,user_pwd];
    return db.query(sql,param,(err,result) => {
        if(err){
            console.log('[select error]:'+err);
            return;
        }else{
            return result;
        }
    })

}
//注册
userTemplateDao.add = (userTemplate) => {
    
    var sql = 'insert into user(user_name,user_email,user_pwd,user_role,user_activation_code,user_status) values (?,?,?,?,?,?,?)';
    var param = [userTemplate.user_name,userTemplate.user_email,userTemplate.user_pwd,userTemplate.user_role,userTemplate.user_activation_code,'已激活'];
    return db.query(sql,param,(err,result) => {
        if(err){
            console.log('[insert error]:'+err);
            return;
        }else{
            return result;
        }
    })
}
//用户申请删除自己账号
userTemplateDao.delete = (id) => {
    var sql = 'delete from user where user_id = ?';
    var param = [id];
    return db.query(sql,param,(err,result) => {
        if(err){
            console.log('[delete err]:'+err);
            return;
        }else{
            return result;
        }

    })
}
//更改用户信息
userTemplateDao.update = (userTemplate) => {
    //仅限更改用户名，用户密码，用户邮箱，用户密码，用户角色，用户状态，用户头像链接
    var sql = 'update user set user_ name = ? , user_email = ?, user_pwd = ?,user_role = ?,user_status = ? ,user_avatar = ? where user_id = ?';
    var param = [userTemplate.user_name,userTemplate.user_email,userTemplate.user_pwd,userTemplate.user_role,userTemplate.user_status,userTemplate.user_id,userTemplate.user_avatar];
    return db.query(sql,param,(err,result) => {
        if(err){
            console.log('[update error]:'+err);
            return;
        }else{
            return result;
        }
    })
}
//后台批量删除部分用户
userTemplateDao.deleteList = (ids) =>{
    let sql = 'delete from user where user_id in ?'
    let param = [ids];
    return db.query(sql,param,(err,result) => {
        if(err){
            console.log('[delete err]:'+err);
            return;
        }else{
            return result;
        }

    })
}
module.exports = userTemplateDao;