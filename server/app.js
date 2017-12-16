
const Koa=require('koa');
const app=new Koa();
const connection = require('./connect');
const errorHandle = require('./util/error');
require('./routes')(app);
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results[0].solution);
//   });
// app.use( async  (ctx, next) => {
//     await next();
//     ctx.response.type = 'text/html';
//     ctx.response.body = '<h1>Hello, koa2!</h1>';
// });
// router.get('/',  (ctx, next) => {
//     console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
//     ctx.response.body = '<h1>Index</h1>';
// });

//根据访问时间设置cookie
app.keys=['IM']
app.use(async (ctx)=>{
    let date= Date();
    ctx.cookies.set('cookie','A',{
        domain: 'localhost',
        path: '/',
        maxAge:10*60*100,
        expires:new Date('2017-12-15'),
        httpOnly: false,
        overwrite:false,
        signed:true

    });
    let cookie = ctx.cookies.get('cookie','IM');
    console.log('ctx.cookie:'+cookie);
})
app.use(errorHandle());
module.exports=app;