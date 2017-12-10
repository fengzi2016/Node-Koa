const mysql = require('mysql');
const _ = require('lodash');
const path = require('path');
const URL = require('url');

//前台

exports.getCodeFront = async (ctx,next)=>{
    //获取验证码POST:/user/code
}
exports.registerFront = async(ctx,next)=>{
    //注册POST:/user/register
}
exports.loginFront = async(ctx,next)=>{
    //登录POST:/user/login
}
exports.logoutFront = async(ctx,next)=>{
    //注销GET:/user/logout
}

exports.updateMeFront = async(ctx,next)=>{
    //更新个人信息PUT:/user/{username}
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
} 
// exports.addUsersBack = async(ctx,next)=>{
//     //后台添加部分用户(n>=1)POST:/users/
//     //注意：未激活的用户，没有邮箱
// }
exports.deleteUsersBack = async(ctx,next)=>{
    //后台删除部分用户(n>=1)DELETE:/users/
}
// exports.updateUsersBack = async(ctx,next)=>{
//     //后台更新部分用户(n>=1)
// }