import express from "express";
import * as disableController from "../controllers/disable.controller";

const router = express.Router();

router.post("/", disableController.importDisable);

router.get("/", disableController.fetchDisables);

router.delete("/:id", disableController.deleteDisable);

export default router;
