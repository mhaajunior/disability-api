import express from "express";
import * as memberController from "../controllers/member.controller";

const router = express.Router();

router.get("/", memberController.fetchMembers);

router.get("/:id", memberController.fetchMemberById);

router.patch("/:id", memberController.editMember);

export default router;
