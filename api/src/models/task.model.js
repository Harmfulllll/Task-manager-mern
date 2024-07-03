/*
 * Title: task.model.js
 * Description :
 * Author: Tanvir Hassan Joy
 * Date: 2024-07-03 19:32:06
 */

import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [50, "Title must be at most 50 characters long"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Description must be at least 10 characters long"],
      maxlength: [500, "Description must be at most 500 characters long"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
