import React, { useEffect, useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../../components/Input/input";
import { register } from "../../redux/Conf/authSlice";
import { useDispatch, useSelector } from "react-redux";

function Register() {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      register({
        username: state.username,
        password: state.password,
        email: state.email,
      })
    );
  };
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="main">
      <div className="login">
        <div className="formContainer">
          <form onSubmit={handleSubmit}>
            <h1>Welcome back</h1>
            <Input
              label="Username: "
              placeholder="Enter your username"
              type="text"
              onChange={handleChange}
              name="username"
              {...register("text", {
                required: true,
                validate: {
                  required: true,
                  minLength: 6,
                },
              })}
            />
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
            <button>Register</button>
            {/*     {error && <span>{error}</span>} */}
            <div className="no-account">
              <Link className="link" to="/login">
                <p>Already have an account?</p>
              </Link>{" "}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
