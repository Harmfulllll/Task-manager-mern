/*
 * Title: index.js
 * Description :
 * Author: Tanvir Hassan Joy
 * Date: 2024-07-03 15:40:23
 */
import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import xss from "xss";
//

//
import connectDB from "./src/database/db.js";
import userRoute from "./src/routes/user.route.js";
import taskRoute from "./src/routes/task.route.js";

// Create an express application
const app = express();

// Safety Middlewares
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.use(cors());

dotenv.config();
app.use(express.json());

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/task", taskRoute);

/**
 * The port number for the server.
 */
const port = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
