import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import history from "../../components/history";
import { toast } from "react-toastify";

const initialUser = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : null;

const initialState = {
  isLoading: false,
  currentUser: initialUser,
  error: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
    },
    registerSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
    },
    registerFailure: (state, action) => {
      state.error = action.payload;
    },
    logoutSuccess: (state) => {
      state.currentUser = null;
    },
  },
});

export const {
  loginFailure,
  loginSuccess,
  registerFailure,
  registerSuccess,
  logoutSuccess,
} = authSlice.actions;

export default authSlice.reducer;

export const register = (user) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    const response = await axios.post(
      "http://localhost:5000/api/v1/user/register",
      user,
      config
    );

    if (response) {
      dispatch(registerSuccess(response.data));
      toast.success("register successfull");
      history.push("/login");
      window.location.reload();
    } else {
      dispatch(registerFailure());
      toast.error("registration failed");
    }
  } catch (error) {
    console.log(error);
    dispatch(registerFailure());
  }
};

export const login = (user) => async (dispatch) => {
  //console.log(user);

  try {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const userData = {
      email: user.email,
      password: user.password,
    };
    const response = await axios.post(
      "http://localhost:5000/api/v1/user/login",
      userData,
      config
    );
    if (response.status === 200) {
      // localStorage.setItem("auth", JSON.stringify(response.data));
      dispatch(loginSuccess(response.data));

      history.push("/task");
      toast.success("login successfull");

      window.location.reload();
    } else {
      dispatch(loginFailure());
      toast.error("login failed");
    }
  } catch (error) {
    dispatch(loginFailure());
  }
};
