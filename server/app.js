


const Koa=require('koa');
const app=new Koa();
const connection = require('./connect');
const errorHandle = require('./util/error');
// const session = require('koa-session');//生成session的插件
// const sessionConfig = {
//     key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
//     /** (number || 'session') maxAge in ms (default is 1 days) */
//     /** 'session' will result in a cookie that expires when session/browser is closed */
//     /** Warning: If a session cookie is stolen, this cookie will never expire */
//     maxAge: 86400000,
//     overwrite: true, /** (boolean) can overwrite or not (default true) */
//     httpOnly: true, /** (boolean) httpOnly or not (default true) */
//     signed: true, /** (boolean) signed or not (default true) */
//     rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
//     renew: false /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
//   }
app.keys=['Script'];
// app.use(session(sessionConfig,app));
require('./routes')(app);




// app.use(ctx => {
//     // ignore favicon
//     if (ctx.path === '/favicon.ico') return;
  
//     let n = ctx.session.views || 0;
//     ctx.session.views = ++n;
//     ctx.body = n + ' views';
    
//   });
//根据访问时间设置cookie
//app.keys=['IM']
// app.use(async (ctx)=>{
//     let value = 'guan'
//     ctx.cookies.set('cookie',value,{
//         maxAge:10*60*100,
//         httpOnly: false,
//         overwrite:false,
//         signed:true

//     });
//     let cookie = ctx.cookies.get('cookie','IM');
//     ctx.body = 'cookie'
//     console.log('ctx.cookie:'+cookie);
// })
app.use(errorHandle());
// app.use(bodyParse());
module.exports=app;