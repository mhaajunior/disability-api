import express from "express";
import * as householdController from "../controllers/household.controller";

const router = express.Router();

router.get("/", householdController.fetchHouseholds);

router.post("/", householdController.addHousehold);

router.patch("/:id", householdController.editHousehold);

router.delete("/:id", householdController.deleteHousehold);

export default router;
