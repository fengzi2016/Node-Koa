const Router = require('koa-router')();
const user = require('./api/user');
const article = require('./api/article');
const comment = require('./api/comment');


// let router = new Router()
// router.use('/', home.routes(), home.allowedMethods())
// router.use('/page', page.routes(), page.allowedMethods())
module.exports = function(app){
    Router.use('/user',user.routes(),user.allowedMethods());
    Router.use('/article',article.routes(),article.allowedMethods());
    Router.use('/comment',comment.routes(),comment.allowedMethods());
    // Router.get('/*',(ctx,next)=>{
    //     ctx.body={status:"success",data:'这是主页面'}
    // })
    app.use(Router.routes())
    //.use(Router.allowedMethods());
}