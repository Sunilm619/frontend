import React, { useState } from "react";
import axios from "axios";
import { Base_Url } from "../utils/constants";
import { add_user } from "../store/UserSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email_Id, setEmail_Id] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    // client-side validation
    const valid = validate();
    if (!valid) return;

    try {
      setLoading(true);
      const response = await axios.post(
        Base_Url + "/login",
        {
          email_Id,
          password,
        },
        {
          withCredentials: true,
        },
      );
      dispatch(add_user(response.data.User));
      navigate("/myTrips");
    } catch (err) {
      console.log(err);
      setErrors((prev) => ({
        ...prev,
        server:
          err?.response?.data?.message || "Login failed. Please try again.",
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    const valid = validate();
    if (!valid) return;

    try {
      setLoading(true);
      const response = await axios.post(
        Base_Url + "/register",
        {
          name,
          email_Id,
          password,
        },
        {
          withCredentials: true,
        },
      );

      console.log(response.data);
      dispatch(add_user(response.data.User));
      navigate("/myTrips");
    } catch (err) {
      console.log(err);
      setErrors((prev) => ({
        ...prev,
        server:
          err?.response?.data?.message ||
          "Registration failed. Please try again.",
      }));
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!email_Id || !email_Id.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email_Id)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!isLogin) {
      if (!name || !name.trim()) {
        newErrors.name = "Name is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearServerError = () =>
    setErrors((prev) => ({ ...prev, server: null }));

  return (
    <div className="flex justify-center mt-10">
      <div className="card w-96 bg-white shadow-md rounded-md">
        <div className="card-body p-6">
          <h2 className="card-title text-2xl font-semibold mb-4">
            {isLogin ? "Login" : "Register"}
          </h2>

          {errors.server && (
            <div className="mb-3 text-sm text-red-600">{errors.server}</div>
          )}

          {!isLogin && (
            <div className="mb-3">
              <input
                className="input input-bordered w-full"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  clearServerError();
                  setName(e.target.value);
                }}
                aria-label="Name"
              />
              {errors.name && (
                <div className="text-sm text-red-500 mt-1">{errors.name}</div>
              )}
            </div>
          )}

          <div className="mb-3">
            <input
              className="input input-bordered w-full"
              placeholder="Email"
              value={email_Id}
              onChange={(e) => {
                clearServerError();
                setEmail_Id(e.target.value);
              }}
              aria-label="Email"
            />
            {errors.email && (
              <div className="text-sm text-red-500 mt-1">{errors.email}</div>
            )}
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                clearServerError();
                setPassword(e.target.value);
              }}
              aria-label="Password"
            />
            {errors.password && (
              <div className="text-sm text-red-500 mt-1">{errors.password}</div>
            )}
          </div>

          <button
            className="btn btn-primary w-full mt-2"
            onClick={isLogin ? handleLogin : handleSignup}
            disabled={loading}
          >
            {loading
              ? isLogin
                ? "Logging in..."
                : "Creating account..."
              : isLogin
                ? "Login"
                : "Register"}
          </button>

          <p
            className="cursor-pointer text-blue-500 mt-3 text-center"
            onClick={() => {
              setIsLogin(!isLogin);
              setErrors({});
            }}
          >
            {isLogin
              ? "New user? Register here"
              : "Already registered? Login here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
