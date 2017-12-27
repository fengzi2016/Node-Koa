const userTemplate = require('../../../dao/user');
const articleTemplate = require('../../../dao/article');
const commentTemplate = require('../../../dao/comment');
const combineTemplate = require('../../../dao/article_user_comment');
const crypto = require ('crypto');//生成不重复的激活码
const sendMailer = require('../../util/email/send_mailer');
const session = require('koa-session-minimal');
const koa = require('koa');
const app = new koa();

//前台

exports.getCodeFront = async (ctx,next)=>{
    //获取验证码POST:/user/code
    //验证码验证以及有效期验证码在前台用js完成
    try{
        let email = ctx.request.email;
        let result = await  userTemplate.getByEmail(email);
        let response = {};
        if(result.length==0||result[0].status == '未激活'){
            //生成4位激活码
            crypto.randomBytes(10,(err,buf) => {
                response.user_activation_code = email + buf.toString('hex');
                //设置有效期为24小时
                response.code_expires = new Date(Date.now()+24 * 3600 * 1000);
                //发送激活邮件
                sendMailer({
                    to:email,
                    subject:'MuXi',
                    html:'感谢您注册木犀koa博客系统，您的验证码如下:'+ ctx.request.body.user_activation_code +'/n'+'请在24小时内激活，验证码有效期至：'+ctx.request.code_expires
                });
            });
            console.log(response);
            ctx.response.body = response;
            
        }
    }catch{
        ctx.response.status = 500;
    }
   
}
exports.registerFront = async(ctx,next)=>{
    //注册POST:/user/register
    try{
        let user = ctx.request.body;
        let result = await userTemplate.add(user);
        console.log(result);
        ctx.response.body = '注册成功';
    }catch{
        ctx.response.status = 500;
    }
}
exports.loginFront = async(ctx,next)=>{
    //登录POST:/user/login
    let pwd = ctx.request.body.password;
    let email = ctx.request.body.email;
    let emailresult = await userTemplate.getByEmail(email);
    let result = await userTemplate.login(email,pwd);
    if(emailresult.length === 0){
        ctx.response.status = 404 ;
        ctx.response.body = '用户未注册'
    }
    if(result.length === 0){
        ctx.response.status = 403;
        ctx.response.body ='密码错误'
    }else{
        app.use(session({
            key: 'SESSION_ID',
        }))
    }
    
    
}
exports.logoutFront = async(ctx,next)=>{
    //注销GET:/user/logout
}

exports.updateMeFront = async(ctx,next)=>{
    //更新个人信息PUT:/user/{username}
    try{
        let req = ctx.request.body;
        let result = await userTemplate.update(req);
        ctx.response.body = 'update ok'

    }catch{
        ctx.response.status = 500;
    }
    

}
exports.updateEmailFront = async(ctx,next)=>{
    // 更新邮箱POST:/user/{username}/email
}
exports.updatePasswordFront = async(ctx,next)=>{
    // 更新密码POST:/user/{username}/pwd
}
exports.deleteMeFront = async(ctx,next)=>{
    //前台申请删除自己DELETE:/user/{username}
}
//共用
exports.getMeBoth = async(ctx,next)=>{
    //获取某人所有信息POST:/user/{username}
}
//后台
exports.getAllUsersBack = async(ctx,next)=>{
    //后台获取所有用户(n>=1)GET:/users/
    try{
        let result = await userTemplate.getListAll();
        ctx.response.body = result;
    }catch{
        ctx.response.status = 500;
    }
    

} 
// exports.addUsersBack = async(ctx,next)=>{
//     //后台添加部分用户(n>=1)POST:/users/
//     //注意：未激活的用户，没有邮箱
// }
exports.deleteUsersBack = async(ctx,next)=>{
    //后台删除部分用户(n>=1)DELETE:/users/
    try{
        let ids = ctx.response.body;
        ids.map((value)=>{
            value = value.user_id;
            return value;
        })
        let result = userTemplate.deleteList(ids);
        ctx.response.body = 'delete ok'
    }catch{
        ctx.response.status = 500;
    }
   
}
// exports.updateUsersBack = async(ctx,next)=>{
//     //后台更新部分用户(n>=1)
// }