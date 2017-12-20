

const mysql = require('mysql');
const _ = require('lodash');
const path = require('path');
const URL = require('url');
const articleUserTemplate = require('../../../dao/article_user_comment');


//前台
exports.getAllArticleFront = async (ctx,next)=>{
//前台获取所有博客:GET:/article
// let sql='SELECT article_id,article_title,article_content,article_author_id,article_category,time,user_id,user_name,user_avatar FROM article,user';
//页数：10=>作为业务的某个对象？

    let result = await articleUserTemplate.getListAll();
    let res = {};
    res.page = ctx.request.body;     
    res.allpage_count = result.length;
   
    if(result.length>=10 && result.length-page*10>=0){
        result = result.slice((page-1)*10+1,page*10);
    }else if(result.length-page*10<0){
        result = result.slice((page-1)*10+1);
    }
    res.articles = result;
    ctx.response.body = res;
    console.log(ctx.response.body);

}
exports.getSomeArticleFront = async (ctx,next)=>{
    //前台获取部分博客:GET:/article/{sort}/{page}
   
    const path = ctx.request.path;
    const page = path.split('/')[2];
    const sort = path.split('/')[3];
    let sql='SELECT article_id,article_title,article_content,article_author_id,article_category,time,user_id,user_name,user_avatar FROM article,user WHERE article_category = ?';
    let sqlparams=sort;
    connection.query(sql,sqlparams, function(err,result){
        if(err){
            console.log('[SELECT ERROR]-',err.message);
            return;
        }
        let res = {};
        res.page = page;     
        res.allpage_count = result.length;
        /**可填补 */
        //后台分页，每页10条
        if(result.length>=10 && result.length-page*10>=0){
            result = result.slice((page-1)*10+1,page*10);
        }else if(result.length-page*10<0){
            result = result.slice((page-1)*10+1);
        }
        
        res.articles = result;
        ctx.response.body = res;
        console.log(ctx.response.body);

    })


 
    
    
 
}
exports.getOneArticleFront = async(ctx,next)=>{
    const req = ctx.request.body;
    const article_id = req.article_id;
    let sql = 'SELECT article_id,article_title,article_content,user_name,user_avatar,article_category from article,user WHERE article_id = ? and article_author_id = user_id';
    let sqlparams = article_id;
    let res={};
    connection.query(sql,sqlparams,function(err,result){
        if(err){
            console.log('[SELECT ERROR]-',err.message);
            return;
        }
        res.article = result;
    });
    




    //前台获取某篇博客:POST:/article/{title}
}
exports.addArticleFront = async(ctx,next)=>{
    //添加博客POST:/article/addition
   
    const req = ctx.request.body;
    if(req.article_author_id === undefined){
        ctx.response.status = 403;//无权限
    }
    let sql = 'INSERT INTO article(article_content,time,article_author_id,article_category) VALUES(?,?,?,?)'
    let sqlparams = [req.article_content,req.time,req.article_author_id,article_category];
    connection.query(sql,sqlparams,function(err,result){
        if(err){
            console.log('[INSERT ERROR]-',err.message);
            return;
        }
        console.log('result:'+result);
        ctx.response.status = 200;
    })
    
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
    // const id = ctx.request.body;

}


