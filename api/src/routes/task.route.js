/*
 * Title: task.route.js
 * Description : Route for task controller
 * Author: Tanvir Hassan Joy
 * Date: 2024-05-12 21:57:22
 */

import express from "express";
import verifyJwt from "../middlewares/verifyJwt.js";
import {
  changeStatus,
  createTask,
  deleteTask,
  getAllTask,
  getCompletedTasksCount,
  getTask,
  updateTask,
} from "../controllers/task.controller.js";

const router = express.Router();

router.post("/create", verifyJwt, createTask);

router.get("/get/:id", verifyJwt, getTask);

router.getAll("/get-all", verifyJwt, getAllTask);

router.put("/update/:id", verifyJwt, updateTask);

router.delete("/delete/:id", verifyJwt, deleteTask);

router.patch("/change-status/:id", verifyJwt, changeStatus);

router.get("/completed-count", verifyJwt, getCompletedTasksCount);

export default router;
