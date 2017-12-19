
const db = require('../server/connect');

var articleTemplateDao = {};

//所有博客
articleTemplateDao.getListAll = () => {
    var sql = 'select * from article';
    return db.query(sql).then((err,result) => {
        if(err){
            console.log('[select error]:'+err);
            return;
        }else{
            return result;
        }
    })

}
//根据ID取单个博客
articleTemplateDao.getByID = (id) => {
    var sql = 'select * from article where article_id = ?';
    var param = [id];
    return db.query(sql,param).then((err,result) => {
        if(err){
            console.log('[select error]:'+err);
            return;
        }else{
            return result;
        }
    })
}
//根据用户ID取博客列表
articleTemplateDao.getListByUserId = (author_id) => {
    var sql = 'select * from article where article_author_id = ?';
    var param = [author_id];
    return db.query(sql,param).then((err,result) => {
        if(err){
            console.log('[select error]:'+err);
            return;
        }else{
            return result;
        }
    })
}
//添加博客
articleTemplateDao.add = (articleTemplate) => {
    var sql = 'insert into article(article_content,time,article_author_id,article_category) values (?,?,?,?)';
    var param = [articleTemplate.article_content,articleTemplate.time,articleTemplate.article_author_id,articleTemplate.article_category];
    return db.query(sql,param).then((err,result) => {
        if(err){
            console.log('[insert error]:'+err);
            return;
        }else{
            return result;
        }
    })
}
//删除博客
articleTemplateDao.delete = (id) => {
    var sql = 'delete from article where article_id = ?';
    var param = [id];
    return db.query(sql,param).then((err,result) => {
        if(err){
            console.log('[delete err]:'+err);
            return;
        }else{
            return result;
        }

    })
}
//更改博客
articleTemplateDao.update = (articleTemplate) => {
    //仅限更改博客内容，标题，更新时间,种类
    var sql = 'update article set article_content = ? , article_title = ?, article_category = ?,time = ? where article_id = ?';
    var param = [articleTemplate.article_content,articleTemplate.article_title,articleTemplate.article_category,articleTemplate.time,articleTemplate.article_id];
    return db.query(sql,param).then((err,result) => {
        if(err){
            console.log('[update error]:'+err);
            return;
        }else{
            return result;
        }
    })
}

module.exports = articleTemplateDao;