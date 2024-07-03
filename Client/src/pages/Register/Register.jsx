import React, { useEffect, useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../../components/Input/input";

function Register() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const user = "";
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const login = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/register", {
        username,
        email,
        password,
      });

      navigate("/login");
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/tasks");
    }
  }, [user]);
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit(login)}>
          <h1>Welcome back</h1>
          <Input
            label="Username: "
            placeholder="Enter your username"
            type="text"
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
            placeholder="Enter your password"
            {...register("password", {
              required: true,
              minLength: 6,
            })}
          />
          <button disabled={isLoading}>Login</button>
          {error && <span>{error}</span>}
          <div className="no-account">
            <Link className="link" to="/login">
              <p>Already have an account?</p>
            </Link>{" "}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
