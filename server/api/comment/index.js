'use strict'
const router = require("koa-router")();
const controller = require("./comment.controller");

//前台
router.delete('comment',controller.deleteCommentFront);

//后台
router.delete('comments',controller.deleteSomeBack);