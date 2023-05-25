import express from "express";
import * as consistencyController from "../controllers/consistency.controller";

const router = express.Router();

router.get("/validate", consistencyController.consistencyCheck);

router.get("/", consistencyController.fetchErrorHousehold);

export default router;
