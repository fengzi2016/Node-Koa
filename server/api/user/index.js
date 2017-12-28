'use strict'
const router = require("koa-router")();
const controller = require("./user.controller");
const bodyParse = require('koa-body');
//前台
router.post("/code",controller.getCodeFront);
router.post("/register",controller.registerFront);
router.post("/login",bodyParse(),controller.loginFront);
router.get("logout",controller.logoutFront);
router.put('/:username',controller.updateMeFront);
router.delete('/:username',controller.deleteMeFront);
router.post('/:username/email',controller.updateEmailFront);
router.post('/:username/pwd',controller.updatePasswordFront);
//共用
router.post('/users',controller.getMeBoth);
//后台
router.get('/users',controller.getAllUsersBack);
router.delete('/users',controller.deleteUsersBack);

module.exports=router;