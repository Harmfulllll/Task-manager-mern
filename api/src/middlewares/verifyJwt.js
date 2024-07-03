/*
 * Title: middleware.js
 * Description :
 * Author: Tanvir Hassan Joy
 * Date: 2024-07-03 15:51:04
 */
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

const verifyJwt = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.json(new apiError(401, "Unauthorized access"));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const user = await userModel.findById(decoded.id).select("-password");
    req.user = user;
    req.user._id = user._id;

    next();
  } catch (err) {
    return res.json(new apiError(401, err?.message || "Invalid access token"));
  }
};

export default verifyJwt;
