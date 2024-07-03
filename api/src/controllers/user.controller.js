/*
 * Title: user.controller.js
 * Description :
 * Author: Tanvir Hassan Joy
 * Date: 2024-07-03 19:40:40
 */
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import userModel from "../models/user.model.js";

// Register a user
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    [username, email, password].forEach((field) => {
      if (!field) {
        return res.json(new apiError(400, "All fields are required"));
      }
    });
    const userExists = await userModel.findOne({
      $or: [{ username }, { email }],
    });
    if (userExists) {
      return res.json(new apiError(400, "User already exists"));
    }
    const user = await userModel.create({ username, email, password });
    user.password = undefined;
    return res.json(
      new apiResponse(201, { user }, "User created successfully")
    );
  } catch (err) {
    return res.json(new apiError(400, err.message));
  }
};

// Login a user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    [(email, password)].forEach((field) => {
      if (!field) {
        return res.json(new apiError(400, "All fields are required"));
      }
    });
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json(new apiError(404, "User not found"));
    }
    const isMatch = await user.checkPassword(password);
    if (!isMatch) {
      return res.status(401).json(new apiError(401, "Invalid credentials"));
    }
    const token = user.generateToken();
    user.password = undefined;
    return res
      .status(200)
      .json(new apiResponse(200, { user, token }, "User logged in"));
  } catch (err) {
    return res.json(new apiError(400, err.message));
  }
};

// Logout a user
const logout = async (req, res) => {
  try {
    req.user.token = req.user.token.filter(
      (token) => token.token !== req.token
    );
    return res.json(new apiResponse(200, {}, "User logged out"));
  } catch (err) {
    return res.json(new apiError(400, err.message));
  }
};
// Get user profile
const getProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findById({ _id: id });
    if (!user) {
      return res.json(new apiError(404, "User not found"));
    }
    user.password = undefined;
    const links = [
      {
        rel: "update",
        href: `/user/update-profile/${user._id}`,
        method: "PUT",
      },
    ];
    user.links = links;

    return res.json(new apiResponse(200, { user, links }, "User profile"));
  } catch (err) {
    return res.json(new apiError(400, err.message || "Something went wrong"));
  }
};
// Update user profile
const updateProfile = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await userModel.findById({ _id: id });
    if (!user) {
      return res.json(new apiError(404, "User not found"));
    }
    const { username, email, password } = req.body;

    user.username = username;
    user.email = email;
    user.password = password;

    await user.save({ validateBeforeSave: false });

    user.password = undefined;

    const links = [
      {
        rel: "profile",
        href: `/user/profile/${user._id}`,
        method: "GET",
      },
    ];
    return res.json(
      new apiResponse(200, { user, links }, "User updated successfully")
    );
  } catch (err) {
    return res.json(new apiError(400, err.message || "Something went wrong"));
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.deleteOne({
      _id: id,
    });
    if (!user) {
      return res.json(new apiError(404, "User not found"));
    }
    const links = [
      {
        rel: "register",
        href: `/user/register`,
        method: "POST",
      },
    ];
    return res.json(
      new apiResponse(200, { links }, "User deleted successfully")
    );
  } catch (err) {
    return res.json(new apiError(400, err.message || "Something went wrong"));
  }
};

export { register, login, logout, getProfile, updateProfile, deleteUser };
