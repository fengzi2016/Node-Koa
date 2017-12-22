
const db = require('../server/connect');

var commentTemplateDao = {};

//获取所有评论
commentTemplateDao.getListAll = () => {
    var sql = 'select * from comment';
    return db.query(sql).then((err,result) => {
        if(err){
            console.log('[select error]:'+err);
            return;
        }else{
            return result;
        }
    })

}
//根据博客ID获取评论列表
commentTemplateDao.getListByArticleId = (article_id) => {
    var sql = 'select  * from comment where article_id = ? ';
    var param = [article_id];
    return db.query(sql,param).then((err,result) => {
        if(err){
            console.log('[select error]:'+err);
            return;
        }else{
            return result;
        }
    })
}
//根据评论ID获取ID
commentTemplateDao.getById = (id) => {
    var sql = 'select * from comment where comment_id = ?';
    var param = [id];
    return db.query(sql,param,connection).then((err,result) => {
        if(err){
            console.log('[select error]:'+err);
            return;
        }else{
            return result;
        }
    })
}
//添加评论
commentTemplateDao.add = (commentTemplate) => {
    var sql = 'insert into comment(comment_content,comment_time,comment_author_id,article_id) values (?,?,?,?)';
    var param = [commentTemplate.comment_content,commentTemplate.comment_time,commentTemplate.comment_author_id,commentTemplate.article_id];
    return db.query(sql,param).then((err,result) => {
        if(err){
            console.log('[insert error]:'+err);
            return;
        }else{
            return result;
        }
    })
}
//删除评论
commentTemplateDao.delete = (id) => {
    var sql = 'delete from comment where comment_id = ?';
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
//批量删除评论
commentTemplateDao.deleteList = (srting) =>{
    var sql = 'delete from comment where comment_content like ?'
    var param = [string];
    return db.query(sql,param).then((err,result) => {
        if(err){
            console.log('[delete err]:'+err);
            return;
        }else{
            return result;
        }
    })
}

// commentTemplateDao.update = (commentTemplate,connection) => {
//     //仅限更改内容，标题，更新时间,种类
//     var sql = 'update comment set comment_content = ? , comment_title = ?, comment_category = ?,time = ? where comment_id = ?';
//     var param = [commentTemplate.comment_content,commentTemplate.comment_title,commentTemplate.comment_category,commentTemplate.time,commentTemplate.comment_id];
//     return db.query(sql,param,connection).then((err,result) => {
//         if(err){
//             console.log('[insert error]:'+err);
//             return;
//         }else{
//             return result;
//         }
//     })
// }

module.exports = commentTemplateDao;