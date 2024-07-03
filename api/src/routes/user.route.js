/*
 * Title: user.route.js
 * Description : Route for user controller
 * Author: Tanvir Hassan Joy
 * Date: 2024-05-12 21:57:55
 */
import express from "express";
import verifyJwt from "../middlewares/verifyJwt.js";
import {
  deleteUser,
  getProfile,
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", verifyJwt, logout);

router.get("/profile/:id", verifyJwt, getProfile);

router.put("/update-profile/:id", verifyJwt, updateProfile);

router.delete("/delete/:id", verifyJwt, deleteUser);

export default router;
