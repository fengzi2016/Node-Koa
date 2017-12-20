const db = require('../server/connect');

 
var combineTemplateDao = {};

//获取文章和用户联合信息


CombineTemplateDao.getListAll = () =>{
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

