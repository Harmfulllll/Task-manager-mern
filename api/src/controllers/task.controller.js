/*
 * Title: task.controller.js
 * Description :
 * Author: Tanvir Hassan Joy
 * Date: 2024-07-03 19:41:39
 */
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import userModel from "../models/user.model.js";
import taskModel from "../models/task.model.js";

//create task
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.json(new apiError(400, "All fields are required"));
    }
    const task = await taskModel.create({
      title,
      description,
      owner: req.user._id,
    });

    const links = [
      {
        rel: "self",
        href: `/api/v1/task/${task._id}`,
        action: "GET",
      },
      {
        rel: "update",
        href: `/api/v1/task/${task._id}`,
        action: "PUT",
      },
      {
        rel: "delete",
        href: `/api/v1/task/${task._id}`,
        action: "DELETE",
      },
    ];
    return res.json(
      new apiResponse(201, { task, links }, "Task created successfully")
    );
  } catch (error) {
    return res.json(new apiError(400, error.message || "Error creating task"));
  }
};

// get a task by id
const getTask = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await taskModel.findById({ _id: id });
    if (!task) {
      return res.json(new apiError(404, "Task not found"));
    }
    const links = [
      {
        rel: "update",
        href: `/api/v1/task/update/${task._id}`,
        method: "PUT",
      },
      {
        rel: "delete",
        href: `/api/v1/task/delete/${task._id}`,
        method: "DELETE",
      },
    ];
    return res.json(new apiResponse(200, { task, links }, "Task found"));
  } catch (error) {
    return res.json(new apiError(400, error.message || "Error getting task"));
  }
};

//get all task of a owner by any parameter
const getAllTask = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    //Finding by id. we can find by other parameters as well

    const tasks = await taskModel
      .find({ owner: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    if (!tasks) {
      return res.json(new apiError(404, "No task found"));
    }
    const links = [
      {
        rel: "create",
        href: `/api/v1/task/create`,
        method: "POST",
      },
    ];

    return res.json(new apiResponse(200, { tasks, links }, "Tasks found"));
  } catch (error) {
    return res.json(new apiError(400, error.message || "Error getting tasks"));
  }
};
//update task ny id
const updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description } = req.body;
    if (!title || !description) {
      return res.json(new apiError(400, "All fields are required"));
    }
    const task = await taskModel.findByIdAndUpdate(
      { _id: id },
      { title, description }
    );
    if (!task) {
      return res.json(new apiError(404, "Task not found"));
    }
    const links = [
      {
        rel: "self",
        href: `/api/v1/task/${task._id}`,
        method: "GET",
      },
      {
        rel: "delete",
        href: `/api/v1/task/delete/${task._id}`,
        method: "DELETE",
      },
    ];
    return res.json(
      new apiResponse(200, { task, links }, "Task updated successfully")
    );
  } catch (error) {
    return res.json(new apiError(400, error.message || "Error updating task"));
  }
};

// change status of task
const changeStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await taskModel.findById({ _id: id });
    if (!task) {
      return res.json(new apiError(404, "Task not found"));
    }
    task.status = !task.status;
    await task.save();
    const links = [
      {
        rel: "self",
        href: `/api/v1/task/${task._id}`,
        method: "GET",
      },
      {
        rel: "delete",
        href: `/api/v1/task/delete/${task._id}`,
        method: "DELETE",
      },
    ];
    return res.json(
      new apiResponse(200, { task, links }, "Task status updated successfully")
    );
  } catch (error) {
    return res.json(new apiError(400, error.message || "Error updating task"));
  }
};

// get completed tasks count
const getCompletedTasksCount = async (req, res) => {
  try {
    const totalCompletedTasks = await taskModel.aggregate([
      {
        $match: {
          owner: req.user._id,
          completed: true,
        },
      },
      {
        $count: "totalCompletedTasks",
      },
    ]);
    return res.json(
      new apiResponse(
        200,
        { totalCompletedTasks },
        "Completed tasks count retrieved successfully"
      )
    );
  } catch (error) {
    return res.json(
      new apiError(400, error.message || "Error getting completed tasks count")
    );
  }
};
//delete task

const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await taskModel.findByIdAndDelete({ _id: id });
    if (!task) {
      return res.json(new apiError(404, "Task not found"));
    }
    return res.json(new apiResponse(200, {}, "Task deleted successfully"));
  } catch (error) {
    return res.json(new apiError(400, error.message || "Error deleting task"));
  }
};

export {
  createTask,
  getTask,
  getAllTask,
  changeStatus,
  updateTask,
  deleteTask,
  getCompletedTasksCount,
};
