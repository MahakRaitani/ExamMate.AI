import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen flex relative">

      {/* Background */}
      <img
        src="/bgImage.png"
        alt="bg"
        className="absolute top-0 left-0 -z-10 w-full h-full object-cover"
      />

      {/* Logo */}
      <div className="absolute top-6 left-6 flex items-center">
        <img src="/logo.png" alt="Logo" className="h-10 md:h-14" />
        <img src="/titleLogo.png" alt="Title" className="h-10 md:h-16 -ml-4" />
      </div>

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 flex-col justify-center px-12">

        <h1 className="text-3xl md:text-4xl font-bold text-indigo-700 leading-snug">
          More than just notes,
          <br /> truly understand concepts
        </h1>

        <p className="mt-4 text-lg text-blue-500 max-w-md">
          Learn smarter with AI-powered study tools built for real exam success.
        </p>

      </div>

      {/* RIGHT SIDE LOGIN */}
      <div className="w-full md:w-1/2 flex items-center justify-center">

        <div className="w-80 bg-white p-6 rounded-xl shadow-lg">

          <h1 className="text-2xl font-bold text-center mb-4">
            Welcome Back!
          </h1>

          {/* Inputs */}
          <div className="space-y-3">
            <input
              type="email"
              placeholder="Email address"
              className="w-full p-2 rounded-md bg-gray-100 outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 rounded-md bg-gray-100 outline-none"
            />
          </div>

          {/* Forgot */}
          <div className="text-right mt-2">
            <span className="text-xs text-blue-500 cursor-pointer hover:underline">
              Forgot Password?
            </span>
          </div>

          {/* Button */}
          <button className="w-full mt-4 h-9 rounded-md bg-gradient-to-r from-purple-600 to-blue-500 text-white">
            Sign In
          </button>

          {/* Signup */}
          <div className="text-center text-gray-500 mt-4 text-sm">
            Don’t have an account?
            <span className="text-purple-600 ml-1 cursor-pointer hover:underline">
              Sign up
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;