import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import { setUserData } from "../redux/userSlice";
import { serverURL } from "../config";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const result = await axios.post(
        `${serverURL}/api/auth/register`,
        {
          name,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(setUserData(result.data.user));

      navigate("/dashboard");
    } catch (error) {
      console.log(
        "Register Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background Video */}
     <video
  autoPlay
  loop
  muted
  playsInline
  className="absolute top-0 left-0 w-full h-full object-cover"
>
  <source src="/bg_R.mp4" type="video/mp4" />
</video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Register Card */}
      <div className="relative z-10 w-96 bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/20">

        <h1 className="text-2xl font-bold text-center mb-6 text-white">
          Create Account
        </h1>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-md bg-white/20 text-white placeholder-gray-300 outline-none"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-md bg-white/20 text-white placeholder-gray-300 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-md bg-white/20 text-white placeholder-gray-300 outline-none"
          />

          <button
            onClick={handleRegister}
            className="w-full h-11 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            Register
          </button>

          <p className="text-center text-sm text-white">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/")}
              className="text-blue-300 cursor-pointer"
            >
              Login
            </span>
          </p>

        </div>

      </div>

    </div>
  );
};

export default Register;