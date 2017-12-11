'use strict'
const router = require("koa-router")();
const controller = require("./article.controller");

//前台
router.get('article/:sort/:page',controller.getAllArticleFront);
router.post('article/:title',controller.getOneArticleFront);
router.post('article/addition',controller.addArticleFront);
router.put('article/:title',controller.updateArticleFront);
router.delete('article/:title',controller.deleteArticleFront);

//共用
router.post('articles/oneAllTitle',controller.getOneAllArticleBoth);

//后台
router.deleteArticleFront('articles/deletion',controller.deleteOneArticleBack);