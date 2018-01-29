const userTemplate = require('../../../dao/user');
const articleTemplate = require('../../../dao/article');
const commentTemplate = require('../../../dao/comment');
const combineTemplate = require('../../../dao/article_user_comment');
const crypto = require ('crypto');//生成不重复的激活码
const sendMailer = require('../../util/email/send_mailer');

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
    }catch(err){
        ctx.response.status = 500;
        console.log(err);
    }
   
}
exports.registerFront = async(ctx,next)=>{
    //注册POST:/user/register
    try{
        let user = ctx.request.body;
        let result = await userTemplate.add(user);
        console.log(result);
        ctx.response.body = '注册成功';
    }catch(err){
        ctx.response.status = 500;
        console.log(err);
    }
}
exports.loginFront = async(ctx,next)=>{
   
    //登录POST:/user/login

    let pwd = ctx.request.body.password;
    let email = ctx.request.body.email;
    console.log('pwd:'+pwd);
    console.log('email:'+email)
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
      
        // app.use(session({
        //     key: 'SESSION_ID',
        //     cookie:

        // }))
        let date = new Date();
        ctx.session = {
            user_id: Math.random().toString(36).substr(2)+date,
        }
        ctx.cookies.set('SESSION_ID',ctx.session,{
            maxAge:10*60*100,//cookie有效时长
            httpOnly: true,//是否只用于https请求中
            overwrite:false,//是否允许重写
            signed:true//是否有签名
        });
        // ctx.cookies
      
    //    let session = ctx.cookies.get('SESSION_ID');
    //    ctx.body = JSON.stringify(session);
       if(ctx.session.isNew){
           ctx.body = 1
       }else{
           ctx.body = 2
       }


    }
    
    
}
exports.logoutFront = async(ctx,next)=>{
    //注销GET:/user/logout
    ctx.session = null;
    
}

exports.updateMeFront = async(ctx,next)=>{
    //更新个人信息PUT:/user/{username}
    try{
        let req = ctx.request.body;
        let result = await userTemplate.update(req);
        ctx.response.body = 'update ok'

    }catch(err){
        ctx.response.status = 500;
        console.log(err);
    }
    

}
exports.updateEmailFront = async(ctx,next)=>{
    //填入新邮箱，获取验证码，验证验证码，修改邮箱
    // 更新邮箱POST:/user/{username}/email
    let req = ctx.request.body;
    let email = await userTemplate.getByEmail(req.user_email);
    if(email.length>0){
        ctx.response.status = 403 //邮箱已经注册
    }else{
        let old_info = userTemplate.getById(req.user_id)[0];
        old_info.user_email =req.user_email;
        try{
            let result = userTemplate.update(old_info);
            console.log(result);
            ctx.response.body = 'update email ok'
        }catch(err){
            ctx.response.status = 500;
        }
       
    }
   
    

}
exports.updatePasswordFront = async(ctx,next)=>{
    //填入旧密码，验证旧密码，修改密码
    // 更新密码POST:/user/{username}/pwd
    let req = ctx.request.body;
    let old_info =await userTemplate.getById(req.user_id)[0];
    if(old_info.user_password == req.old_password){
        old_info.user_password == new_password;
        try{
            let result = userTemplate.update(old_info);
            console.log(result);
            ctx.response.body = 'update password ok'
        }catch(err){
            ctx.response.status = 500;
        }
    }
    else{
        ctx.response.status = 403 //密码错误，无权限
    }

}
exports.deleteMeFront = async(ctx,next)=>{
    //前台申请删除自己DELETE:/user/{username}
    let req = ctx.response.body;
    try{
        let result = await userTemplate.delete(req.user_id);
        if(result.length === 0 ) {
            ctx.response.status = 404; //没有此用户
        }else{
            ctx.response.body = 'delete ok'
        }
    }catch(err){
        ctx.response.status = 500;
    }

}
//共用
exports.getMeBoth = async(ctx,next)=>{
    //获取某人所有信息POST:/user/{username}
    let req = ctx.request.body;
    try{
        let result = await userTemplate.getById(req.user_id);
        if(result.length == 0){
            ctx.response.status = 404 //查无此人
        }else{
            ctx.response.body = 'post information ok'
        }
    }catch(err){
        ctx.response.status = 500;
    }



    
}
//后台
exports.getAllUsersBack = async(ctx,next)=>{
    //后台获取所有用户(n>=1)GET:/users/
    try{
        let result = await userTemplate.getListAll();
        ctx.response.body = result;
    }catch(err){
        ctx.response.status = 500;
        console.log(err);
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
    }catch(err){
        ctx.response.status = 500;
        console.log(err);
    }
   
}
// exports.updateUsersBack = async(ctx,next)=>{
//     //后台更新部分用户(n>=1)
// }