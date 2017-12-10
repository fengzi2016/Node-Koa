const mysql = require('mysql');
const _ = require('lodash');
const path = require('path');
const URL = require('url');
//前台
exports.deleteCommentFront=async(ctx,next)=>{
    //用户删除评论DELETE:/comment/
}
//后台
exports.deleteSomeBack= async(ctx,next)=>{
    //后台批量删除评论DELETE:/comments/
}