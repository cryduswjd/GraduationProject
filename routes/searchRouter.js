const express = require("express");
const router = express.Router();
const search_ctrl = require("../controller/search_ctrl");

router.get('/', search_ctrl.searchGet);
router.post('/', search_ctrl.searchPost);

module.exports = router;