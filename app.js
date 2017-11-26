
const Koa=require('koa');
const router=require("koa-router")();
const mysql=require("mysql");
const app=new Koa();
let connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'201606006gyf...',
    database:'news'
});
connection.connect();
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