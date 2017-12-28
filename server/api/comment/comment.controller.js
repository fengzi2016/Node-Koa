const commentTemplate = require('../../../dao/comment');
//前台
exports.addCommentFront = async(ctx,next)=>{
    //用户添加评论POST:/comment/
    try{
        let comment = ctx.request.body;
        let result = await commentTemplate.add(comment);
        ctx.response.body = "add OK";
        ctx.response.status = 200;
        console.log(result);
    }catch(err){
        ctx.response.status = 500;
        console.log(err);
    }
    

}
exports.deleteCommentFront=async(ctx,next)=>{
    //用户删除评论DELETE:/comment/
    try{
        let req = ctx.request.body;
        let comment = await commentTemplate.getById(req.comment_id);
        //if(user_id)
        //判断是否有权限
        if(user_id==comment[0].user_id){
            let result = await commentTemplate.delete(req.comment_id);
            console.log(result);
            ctx.response.body = 'delete ok'
        }else{
            ctx.response.status = 403;
            ctx.response.body = '无权限';
        }
       
    }catch(err){
        ctx.response.status = 500;
        console.log(err);
    }

}
//后台
exports.deleteSomeBack= async(ctx,next)=>{
    //后台批量删除评论DELETE:/comments/deletion
    let req = ctx.request.body;
    try{
        let result = await commentTemplate.deleteList(req);
        console.log(result);
        ctx.response.body ='删除OK';
    }catch(err){
        ctx.response.status = 500;
        console.log(err);
    }
}