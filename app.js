
const Koa=require('koa');
const app=new Koa();
const connection = require('./connect')
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
  });
app.use( async  (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2!</h1>';
});
// router.get('/',  (ctx, next) => {
//     console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
//     ctx.response.body = '<h1>Index</h1>';
// });

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');