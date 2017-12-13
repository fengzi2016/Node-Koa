const mysql = require('mysql');
const _ = require('lodash');
const path = require('path');
const URL = require('url');

//前台

exports.getAllArticleFront = async (ctx,next)=>{
    //前台获取所有博客:GET:/article/{sort}/{page}
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>这是addition</h1>';
 
}
exports.getOneArticleFront = async(ctx,next)=>{
    //前台获取某篇博客:POST:/article/{title}
}
exports.addArticleFront = async(ctx,next)=>{
    //添加博客POST:/article/addition
    
}
exports.updateArticleFront = async(ctx,next)=>{
    //更新某篇博客PUT:/article/{title}
}
exports.deleteArticleFront = async(ctx,next)=>{
    //删除某篇博客DELETE:/article/{title}
}
//共用
exports.getOneAllArticleBoth= async(ctx,next)=>{
    //获取某人所有博客标题:POST:/articles/oneAllTitle

}
// 后台
exports.deleteOneArticleBack = async(ctx,next)=>{
    //删除某人部分博客DELETE:/articles/deletion
}


