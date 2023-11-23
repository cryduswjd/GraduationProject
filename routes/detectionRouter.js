const express = require("express");
const router = express.Router();
const detection_ctrl = require("../controller/detection_ctrl");

router.get('/detection', detection_ctrl.detectionGet);

router.get('/detection_Count', detection_ctrl.detectionCountGet);

module.exports = router;