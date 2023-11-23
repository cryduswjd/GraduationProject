const express = require("express");
const router = express.Router();
const arduino_ctrl = require("../controller/arduino_ctrl");

router.post("/:result", arduino_ctrl.arduinoPost);

module.exports = router;