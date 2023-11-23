const express = require("express");
const router = express.Router();
const addinfo_ctrl = require("../controller/addinfo_ctrl");

router.post('/', addinfo_ctrl.addPost);

module.exports = router;