'use strict'
const router = require("koa-router")();
const controller = require("./user.controller");

//前台
router.post("user/code",controller.getCodeFront);
router.post("user/register",controller.registerFront);
router.post("user/login",controller.loginFront);
router.get("user/logout",controller.logoutFront);
router.put('user/:username',controller.updateMeFront);
router.delete('user/:username',controller.deleteMeFront);
router.post('user/:username/email',controller.updateEmailFront);
router.post('user/:username/pwd',controller.updatePasswordFront);
//共用
router.post('users',controller.getMeBoth);
//后台
router.get('users',controller.getAllUsersBack);
router.delete('users',controller.deleteUsersBack);

