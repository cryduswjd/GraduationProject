const express = require("express");
const router = express.Router();
const main_ctrl = require("../controller/main_ctrl");

//main
router.get('/main', main_ctrl.main);

module.exports = router;