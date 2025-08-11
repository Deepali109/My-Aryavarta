import express from "express";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import User from "../model/User.js";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/authtoken.js";
import { SendVerificationCode, SendWelcomeemail } from "../middleware/Email.js";
import { transporter } from "../middleware/Emai.config.js";

let pendingUsers = {};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const ExistUser = await User.findOne({ email });
    if (ExistUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists!" });
    }

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Temporarily store data in memory
    pendingUsers[email] = {
      name,
      email,
      password,
      verificationCode,
    };

    // Send the email
    await SendVerificationCode(email, verificationCode);
    // console.log("resssssssssss", res);
    return res.status(200).json({
      success: true,
      message: "Verification code sent to your email.",
    });
  } catch (error) {
    console.log("Register error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const VerifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;
    console.log(email, code);

    const userData = pendingUsers[email];
    console.log(userData);
    if (!userData || userData.verificationCode !== code) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or Expired Code" });
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = new User({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      isVerified: true,
    });
    await newUser.save();
    delete pendingUsers[email];
    await SendWelcomeemail(userData.email, userData.name);
    return res
      .status(200)
      .json({ success: true, message: "Email Verified Successfully" });
  } catch (error) {
    console.log("Verify error", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.isVerified)
      return res
        .status(400)
        .json({ message: "Invalid Credentials or email not registered" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentialsss" });

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);
    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({
      message: "login Successfull",
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    console.log("userrrr", user);
    const resetToken = jwt.sign(
      { id: user._id },
      process.env.RESET_TOKEN_SECRET,
      { expiresIn: process.env.RESET_TOKEN_EXPIRY || "15m" }
    );
    console.log(resetToken);
    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

    await transporter.sendMail({
      from: `"Aryavarta" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Your Password",
      html: `
        <h3>Password Reset Requested</h3>
        <p>Click the link below to reset your password. This link will expire in 15 minutes:</p>
        <a href="${resetLink}">${resetLink}</a>
      `,
    });

    return res
      .status(200)
      .json({ success: true, message: "Password reset email sent" });
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Reset Password: Handle password reset using token
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.RESET_TOKEN_SECRET);
    const user = await User.findById(decoded.id);
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired token" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.error("Reset password error:", error);
    return res
      .status(400)
      .json({ success: false, message: "Invalid or expired token" });
  }
};
