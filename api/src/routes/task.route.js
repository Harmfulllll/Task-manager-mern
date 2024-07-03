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

router.post("/create", createTask);

router.get("/get/:id", verifyJwt, getTask);

router.get("/get-all", getAllTask);

router.put("/update/:id", verifyJwt, updateTask);

router.delete("/delete/:id", deleteTask);

router.put("/change-status/:id", changeStatus);

router.get("/completed-count", verifyJwt, getCompletedTasksCount);

export default router;
