

const mysql = require('mysql');
const _ = require('lodash');
const path = require('path');
const URL = require('url');
const connection = require('../../connect')

//前台

exports.getAllArticleFront = async (ctx,next)=>{
    //前台获取所有博客:GET:/article/{sort}/{page}
   
    const path = ctx.request.path;
    const page = path.split('/')[2];
    const sort = path.split('/')[3];
    let sql;
    if(page===undefined&&sort===undefined){
        sql='SELECT * FROM article,user WHERE article_author_id = user_id';
    }else{
       
        sql='SELECT article_id,article_title,article_content,article_author_id,article_category,time,user_id,user_name,user_avatar FROM article,user WHERE article_category = ?';
        
    }
    let sqlparams=sort;
    connection.query(sql,sqlparams, function(err,result){
        if(err){
            console.log('[SELECT ERROR]-',err.message);
            return;
        }
        let res = {};
        if(page===undefined){
           res.page = 1;
        }else{
            res.page = page;     
        }
        res.allpage_count = result.length;
        /**可填补 */
        //后台分页，每页10条
        
        res.articles = result;
        ctx.response.body = res;
        console.log(ctx.response.body);

    })


 
    
    
 
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
    // const id = ctx.request.body;

}


