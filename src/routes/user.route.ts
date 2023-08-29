import express from "express";
import * as userController from "../controllers/user.controller";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", userController.registerUser);

router.post("/auth", userController.authUser);

router.post("/logout", userController.logoutUser);

router.get("/profile", protect, userController.getUserProfile);

router.put("/change_password", userController.changePassword);

export default router;
