'use strict'
const router = require("koa-router")();
const controller = require("./article.controller");

//前台
router.get('/',controller.getAllArticleFront);
router.get('/:sort/:page',controller.getSomeArticleFront);
router.post('/:title',controller.getOneArticleFront);
router.post('addition',controller.addArticleFront);
router.put('/:title',controller.updateArticleFront);
router.delete('/:title',controller.deleteArticleFront);

//共用
router.post('articles/oneAllTitle',controller.getOneAllArticleBoth);

//后台
router.delete('articles/deletion',controller.deleteOneArticleBack);

module.exports=router;