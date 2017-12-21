import { error } from 'util';
import { createHash } from 'crypto';
import { resolve } from 'dns';



const mysql = require('mysql');
const _ = require('lodash');
const path = require('path');
const URL = require('url');
const combineTemplate = require('../../../dao/article_user_comment');
const commentTemplate = require('../../../dao/comment');
const articleTemplate = require('../../../dao/article');
const userTemplate  = require('../../../dao/user');

//前台
exports.getAllArticleFront = async (ctx, next) => {
    //前台获取所有博客:GET:/article
    // let sql='SELECT article_id,article_title,article_content,article_author_id,article_category,time,user_id,user_name,user_avatar FROM article,user';
    //页数：10=>作为业务的某个对象？
    try{
        let result = await combineTemplate.getAllArticleFront();
    let res = {};
    res.page = ctx.request.body;
    res.allpage_count = result.length;

    if (result.length >= 10 && result.length - page * 10 >= 0) {
        result = result.slice((page - 1) * 10 + 1, page * 10);
    } else if (result.length - page * 10 < 0) {
        result = result.slice((page - 1) * 10 + 1);
    }
    res.articles = result;
    ctx.response.body = res;
    
    console.log(ctx.response.body);
    }catch{
        ctx.response.status = 500;
    }
    

}
exports.getSomeArticleFront = async (ctx, next) => {
    //前台获取部分博客:GET:/article/{sort}/{page}
    try{
        let path = ctx.request.path;
        let page = path.split('/')[2];
        let sort = path.split('/')[3];
        // let sql='SELECT article_id,article_title,article_content,article_author_id,article_category,time,user_id,user_name,user_avatar FROM article,user WHERE article_category = ?';
        let result = await combineTemplate.getSomeArticleFront(sort);
    
        let res = {};
        res.page = page;
        res.allpage_count = result.length;
        /**可填补 */
        //后台分页，每页10条
        if (result.length >= 10 && result.length - page * 10 >= 0) {
            result = result.slice((page - 1) * 10 + 1, page * 10);
        } else if (result.length - page * 10 < 0) {
            result = result.slice((page - 1) * 10 + 1);
        }
    
        res.articles = result;
        ctx.response.body = res;
        console.log(ctx.response.body);
    }catch{
        ctx.response.status = 500;
    }
   
}
exports.getOneArticleFront = async (ctx, next) => {
    // let sql = 'SELECT article_id,article_title,article_content,user_name,user_avatar,article_category from article,user WHERE article_id = ? and article_author_id = user_id';
    // let sqlparams = article_id;
    //前台根据博客ID获取博客和作者信息POST: /:title
    try{
        let req = ctx.request.body;
        let article_id = req.article_id;
        let result = {};
        result.article = await combineTemplate.getOneArticleFront(article_id);
        result.comment = await commentTemplate.getListByArticle(article_id);
        result.aritcle.comment_num = result.comment.length;
        ctx.response.body = result;

        console.log(result);
     
    }catch{
        ctx.response.status = 500;
    }
    

}
exports.addArticleFront = async (ctx, next) => {
    //添加博客POST:/article/addition
    // if (req.article_author_id === undefined) {
    //     ctx.response.status = 403;//无权限
    // }
    try{
        let req = ctx.request.body;
        let result = await articleTemplate.add(req);
        ctx.response.status = 200;
        ctx.response.body = 'add ok';

        console.log(result);
    }catch{
        ctx.response.status = 500;
    }
    
    

}
exports.updateArticleFront = async (ctx, next) => {
    //更新某篇博客PUT:/article/{title}
    try{
        let req = ctx.request.body;
        let result = await articleTemplate.update(req);
        ctx.response.status = 200;
        ctx.response.body = 'update ok';

        console.log(result);
    }catch{
        ctx.response.status = 500;
    }
   
    



}
exports.deleteArticleFront = async (ctx, next) => {
    //删除某篇博客DELETE:/article/{title}
    try{
        let article_id = ctx.request.body.article_id;
        let result = await articleTemplate.delete(article_id);
        ctx.response.status = 200;
        ctx.response.body = 'delete ok';

        console.log(result);


    }catch{
        ctx.response.status = 500;
    }
}
//共用
exports.getOneAllArticleBoth = async (ctx, next) => {
    //获取某人所有博客标题:POST:/articles/oneAllTitle
    try{
        let user_id =  ctx.request.body.user_id;
        let result = await articleTemplate.getTitleById(user_id);
        ctx.response.body = result;
    }catch{
        ctx.response.status = 500;
    }
}
// 后台
exports.deleteOneArticleBack = async (ctx, next) => {
    //删除某人部分博客DELETE:/articles/deletion
    // const id = ctx.request.body;

}


