import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initalTask = localStorage.getItem("task")
  ? JSON.parse(localStorage.getItem("task"))
  : null;

const initialState = {
  TaskData: initalTask,
  AllTasks: {},
};
export const taskSlice = createSlice({
  name: "Task",
  initialState,

  reducers: {
    taskAddedSuccessfully: (state, action) => {
      state.TaskData = action.payload;
    },
    taskAddFailure: (state) => {
      return state;
    },
    getAllTaskSuccess: (state, action) => {
      state.AllTasks = action.payload;
    },
    getAllTaskFailure: (state) => {
      return state;
    },

    editTaskSuccess: (state, action) => {
      state.TaskData = action.payload;
    },

    deleteSuccess: (state, action) => {
      state.TaskData = action.payload;
    },
    deletefail: (state) => {
      return state;
    },
  },
});

export const {
  taskAddFailure,
  taskAddedSuccessfully,
  getAllTaskFailure,
  getAllTaskSuccess,
  deleteSuccess,
  deletefail,
  editTaskSuccess,
} = taskSlice.actions;

export default taskSlice.reducer;

export const addTask = (title, description, id) => async (dispatch) => {
  const taskData = {
    title,
    description,
    id,
  };
  const response = await axios.post(
    "http://localhost:5000/api/v1/task/create",
    taskData
  );
  if (response) {
    localStorage.setItem("task", JSON.stringify(response.data));

    dispatch(taskAddedSuccessfully(response.data));
    toast.success("task added successfully");
    window.location.reload();
  } else {
    dispatch(taskAddFailure());
  }
};

export const getAllTasks = (token, id) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      id,
    },
  };

  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/task/get-all",
      config
    );
    if (response) {
      dispatch(getAllTaskSuccess(response.data));
    }
  } catch (error) {
    if (error.response.status === 400) {
      dispatch(getAllTaskFailure());
    }
  }
};

export const changeStatus = (item) => async () => {
  let taskData = {
    id: item._id,
  };

  try {
    let response = await axios.put(
      `http://localhost:5000/api/v1/task/change-status/${taskData.id}`,
      taskData
    );
    console.log(response);

    if (response) {
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteItem = (id) => async (dispatch) => {
  let res = await axios.delete(
    `http://localhost:5000/api/v1/task/delete/${id}`
  );
  console.log(res);
  if (res) {
    dispatch(deleteSuccess());
    toast.success("task deleted successfully");

    window.location.reload();
  } else {
    dispatch(deletefail());
  }
};
