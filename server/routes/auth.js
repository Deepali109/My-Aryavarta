import express from "express";
import {
  forgotPassword,
  login,
  register,
  resetPassword,
  VerifyEmail,
} from "../controllers/authController.js";

const router = express.Router();

// Send OTP
router.post("/register", register);
router.post("/verify-otp", VerifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/login", login);
router.post("/reset-password/:token", resetPassword);
export default router;
