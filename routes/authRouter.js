const express = require("express");
const router = express.Router();
const auth_ctrl = require("../controller/auth_ctrl");

//signIn
router.get('/sign/in', auth_ctrl.signIn);
router.post('/sign/in', auth_ctrl.checkUser);

//토큰 재발급
// router.get('/revise_check', auth_ctrl.revise_check);
router.post('/revise_check', auth_ctrl.revise_check_post);

//logOut
router.get('/logout', auth_ctrl.logOut);

module.exports = router;