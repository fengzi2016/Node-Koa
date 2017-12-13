'use strict'
const router = require("koa-router")();
const controller = require("./comment.controller");

//前台
router.delete('',controller.deleteCommentFront);

//后台
router.delete('comments',controller.deleteSomeBack);
module.exports = router;