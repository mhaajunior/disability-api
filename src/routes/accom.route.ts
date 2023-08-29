import express from "express";
import * as accomController from "../controllers/accom.controller";

const router = express.Router();

router.post("/", accomController.printReport);

export default router;
