const express = require("express");
const disableController = require("../controllers/disable.controller");

const router = express.Router();

router.post("/", disableController.importDisable);

export default router;
