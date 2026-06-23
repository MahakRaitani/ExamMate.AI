import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";
import axios from "axios";
import { serverURL } from "../config";
import { TypeAnimation } from "react-type-animation";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ==========================
  // GOOGLE LOGIN
  // ==========================
  const handleGoogleAuth = async () => {
    try {
      setLoading(true);

      const response = await signInWithPopup(
        auth,
        provider
      );

      const user = response.user;

      const result = await axios.post(
        `${serverURL}/api/auth/google`,
        {
          name: user.displayName,
          email: user.email,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(
        setUserData(result.data.user)
      );

      navigate("/dashboard");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        error.message
      );

    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // EMAIL LOGIN
  // ==========================
  const handleLogin = async () => {
    try {

      if (!email || !password) {
        return alert(
          "Please enter email and password"
        );
      }

      setLoading(true);

      const result = await axios.post(
        `${serverURL}/api/auth/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(
        setUserData(result.data.user)
      );

      navigate("/dashboard");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden">

   <video
  autoPlay
  muted
  loop
  playsInline
  className="absolute inset-0 w-full h-full object-cover"
>
  <source src="https://www.pexels.com/download/video/25744130/" type="video/mp4" />
</video>

     <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/5" />
<div className="absolute top-6 left-6 flex items-center gap-0 z-20">
  <img
    src="/f.png"
    alt="logo"
    className="h-16 md:h-20 w-auto"
  />

  <img
    src="/titleLogo.png"
    alt="title"
    className="h-24 md:h-29 w-auto -ml-4"
  />
</div>

  <div className="hidden lg:flex w-1/2 items-center justify-center px-16 z-10">
  <div>

    <h1 className="text-6xl font-extrabold text-white leading-tight drop-shadow-lg">
      <TypeAnimation
  sequence={[
    "Study Smarter with AI",
    2500,
    "Generate Notes Instantly",
    2500,
    "Prepare Faster for Exams",
    2500,
  ]}
  speed={70}
  repeat={Infinity}
  className="
    text-6xl
    font-extrabold
    bg-gradient-to-r
    from-violet-600
    to-blue-600
    bg-clip-text
    text-transparent
  "
/>
    </h1>

 <p
  className="
    mt-6
    max-w-xl
    text-xl
    leading-8
    font-medium
    bg-gradient-to-r
    from-white
    via-slate-200
    to-slate-300
    bg-clip-text
    text-transparent
  "
>
  Generate AI-powered notes, summaries, quizzes,
  diagrams, and PDFs designed to make exam preparation
  faster, smarter, and more effective.
</p>
  </div>
</div>
      {/* Right Side */}
 {/* Right Side */}
<div className="w-full lg:w-1/2 flex items-center justify-center z-10 px-4">

  <div
    className="
      w-full
     max-w-[520px]
      bg-white/75
      backdrop-blur-2xl
      border border-white/20
      rounded-3xl
      shadow-xl
      px-9
      py-6
    "
  >

    <h2 className="text-3xl font-bold text-center text-slate-800">
      Welcome Back
    </h2>

    <p className="text-center text-slate-500 mt-1 mb-5">
      Sign in to continue your learning journey
    </p>

    {/* Email */}
    <input
      type="email"
      placeholder="Email Address"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="
        w-full
        py-3
        px-4
        rounded-2xl
        bg-white/80
        border border-slate-200
        outline-none
        focus:ring-2
        focus:ring-indigo-500
        mb-3
      "
    />

    {/* Password */}
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="
        w-full
        py-3
        px-4
        rounded-2xl
        bg-white/80
        border border-slate-200
        outline-none
        focus:ring-2
        focus:ring-indigo-500
      "
    />

    {/* Forgot Password */}
    <div className="text-right mt-2 mb-4">
      <span className="text-sm text-indigo-600 cursor-pointer hover:underline">
        Forgot Password?
      </span>
    </div>

    {/* Login */}
    <button
      onClick={handleLogin}
      disabled={loading}
      className="
        w-full
        h-11
        rounded-2xl
        bg-gradient-to-r
        from-violet-600
        via-purple-600
        to-blue-600
        text-white
        font-semibold
        hover:scale-[1.02]
        transition-all
        duration-300
        disabled:opacity-50
      "
    >
      {loading ? "Signing In..." : "Sign In"}
    </button>

    {/* Divider */}
    <div className="flex items-center gap-3 my-4">
      <div className="flex-1 h-px bg-slate-300" />
      <span className="text-slate-400 text-sm">OR</span>
      <div className="flex-1 h-px bg-slate-300" />
    </div>

    {/* Google Login */}
    <button
      onClick={handleGoogleAuth}
      disabled={loading}
      className="
        w-full
        h-11
        rounded-2xl
        bg-white
        border border-slate-300
        flex items-center justify-center gap-3
        hover:bg-slate-50
        transition
      "
    >
      <FcGoogle size={20} />
      Continue with Google
    </button>

    {/* Register */}
    <p className="text-center text-sm text-slate-600 mt-4">
      Don't have an account?{" "}
      <span
        onClick={() => navigate("/register")}
        className="
          text-indigo-600
          font-semibold
          cursor-pointer
          hover:text-indigo-700
        "
      >
        Create Account
      </span>
    </p>

  </div>

</div>
    </div>
  );
};

export default Login;
