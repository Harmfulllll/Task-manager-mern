import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../../components/Input/input";
import { useDispatch } from "react-redux";
import { login } from "../../redux/Conf/authSlice";

function Login() {
  const dispatch = useDispatch();
  const { register } = useForm();

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      login({
        email: state.email,
        password: state.password,
      })
    );
  };

  /*   useEffect(() => {
    if (user) {
      navigate("/tasks");
    }
  }, [user]); */
  return (
    <div className="main">
      <div className="login">
        <div className="formContainer">
          <form onSubmit={handleSubmit}>
            <h1>Welcome back</h1>
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              onChange={handleChange}
              name="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              onChange={handleChange}
              name="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
                minLength: 6,
              })}
            />
            <button>Login</button>
            {/*      {error && <span>{error}</span>} */}
            <div className="no-account">
              <Link className="link" to="/register">
                <p>{"Don't"} you have an account?</p>
              </Link>{" "}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
