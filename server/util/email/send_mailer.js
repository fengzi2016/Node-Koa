var _ = require('lodash');
var nodemailer = require('nodemailer');
var config = {
    host : 'smtp.163.com',
    port: 465,
    auth:{
        user:'15779165029@163.com',
        pass: 'WU55555'
    }
};
var transporter = nodemailer.createTransport(config);
var defaultMail = {
    from: 'MuXi <15779165029@163.com>',
    text: 'test text',
};
module.exports = function(mail){
    // 应用默认配置
    mail = _.merge({}, defaultMail, mail);
    
    // 发送邮件
    transporter.sendMail(mail, function(error, info){
        if(error) return console.log(error);
        console.log('mail sent:', info.response);
    });
};