import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./Conf/authSlice";
import taskReducer from "./Conf/taskSlice";

export const store = configureStore({
  reducer: { auth: authReducer, task: taskReducer },
});
