const mysql=require("mysql");
let connection =mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'201606006gyf...',
    database:'news'
});
connection.connect();
module.exports=connection;