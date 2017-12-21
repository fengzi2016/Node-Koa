const db = require('../server/connect');

 
var combineTemplateDao = {};

//获取文章和用户联合信息


combineTemplateDao.getAllArticleFront = () =>{
    var sql = 'SELECT article_id,article_title,article_content,article_author_id,article_category,time,user_id,user_name,user_avatar FROM article,user';
    return db.query(sql).then((err,result)=>{
        if(err){
            console.log('[select error]:'+err);
            return;
        }else{
            return result;
        }
    })
}

combineTemplateDao.getSomeArticleFront = (article_category) =>{
    var sql = 'SELECT article_id,article_title,article_content,article_author_id,article_category,time,user_id,user_name,user_avatar FROM article,user WHERE article_category = ?';
    return db.query(sql,article_category).then((err,result)=>{
        if(err){
            console.log('[select error]:'+err);
            return;
        }else{
            return result;
        }
    })
}

combineTemplateDao.getOneArticleFront = (article_id) =>{
    var sql = 'SELECT article_id,article_title,article_content,user_name,user_avatar,article_category from article,user WHERE article_id = ? and article_author_id = user_id';
    return db.query(sql,article_id).then((err,result)=>{
        if(err){
            console.log('[select error]:'+err);
            return;
        }else{
            return result;
        }
    })
}