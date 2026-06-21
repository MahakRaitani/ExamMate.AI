import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBookOpen,
  FaBrain,
  FaRobot,
  FaUserGraduate,
} from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { serverURL } from "../config";
import { setUserData } from "../redux/userSlice";

function Navbar() {
  const [active, setActive] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const { userData } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navRef = useRef(null);

  // =========================
  // LOGOUT
  // =========================
  const handleSignOut = async () => {
    try {
      if (loggingOut) return;

      setLoggingOut(true);

      await axios.get(`${serverURL}/api/auth/logout`, {
        withCredentials: true,
      });

      dispatch(setUserData(null));

      navigate("/");

    } catch (error) {

      console.log("Logout error:", error);

    } finally {

      setLoggingOut(false);

    }
  };

  // =========================
  // CLOSE ON OUTSIDE CLICK
  // =========================
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActive(null);
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <div ref={navRef} className="fixed top-0 left-0 w-full z-50">

      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="
        mx-auto mt-4
        w-[95%] max-w-7xl
        rounded-3xl
        border border-blue-200/20
        bg-white/10
        backdrop-blur-2xl
        shadow-[0_20px_60px_rgba(37,99,235,0.15)]
        "
      >

        <div className="flex items-center justify-between px-6 py-3">

          {/* LOGO */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-3 cursor-pointer"
          >

            <img
              src="/favi.png"
              alt="logo"
              className="h-12 w-12 rounded-2xl shadow-lg"
            />

            <div>

              <h1
                className="
                text-2xl font-black
                bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500
                bg-clip-text text-transparent
              "
              >
                ExamMate.AI
              </h1>

              <p className="text-[10px] text-gray-500 tracking-[4px]">
                AI STUDY PLATFORM
              </p>

            </div>

          </motion.div>

          {/* MENU */}
          <div className="hidden md:flex items-center gap-8">

            <motion.button
              whileHover={{ y: -2 }}
              onMouseEnter={() => setActive("features")}
              className="text-sm font-semibold text-gray-700 hover:text-blue-500"
            >
              Features
            </motion.button>

            <motion.button
              whileHover={{ y: -2 }}
              onMouseEnter={() => setActive("tools")}
              className="text-sm font-semibold text-gray-700 hover:text-blue-500"
            >
              AI Tools
            </motion.button>

            <motion.button
              whileHover={{ y: -2 }}
              onMouseEnter={() => setActive("pricing")}
              className="text-sm font-semibold text-gray-700 hover:text-blue-500"
            >
              Pricing
            </motion.button>

            <motion.button
              whileHover={{ y: -2 }}
              onMouseEnter={() => setActive("about")}
              className="text-sm font-semibold text-gray-700 hover:text-blue-500"
            >
              About
            </motion.button>

          </div>

          {/* PROFILE */}
          <div className="relative">

            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2"
            >

              <div
                className="
                h-11 w-11 rounded-full
                bg-gradient-to-r from-blue-500 to-cyan-400
                flex items-center justify-center
                shadow-xl border-2 border-white
              "
              >

                <span className="text-white font-bold text-lg">
                  {userData?.name
                    ? userData.name.charAt(0).toUpperCase()
                    : "U"}
                </span>

              </div>

            </motion.button>

            {/* DROPDOWN */}
            <AnimatePresence>

              {showProfile && (

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="
                  absolute right-0 mt-4 w-56
                  rounded-3xl
                  bg-[#07111f]
                  border border-blue-400/20
                  shadow-2xl
                  backdrop-blur-2xl
                  overflow-hidden
                  "
                >

                  <div className="px-5 py-4 border-b border-white/10">

                    <h3 className="text-white font-semibold">
                      {userData?.name}
                    </h3>

                    <p className="text-xs text-blue-200 mt-1">
                      {userData?.email}
                    </p>

                  </div>

                  <button
                    onClick={() => {
                      setShowProfile(false);
                      navigate("/history");
                    }}
                    className="w-full px-5 py-3 text-left text-blue-100 hover:bg-white/10"
                  >
                    History
                  </button>

                  <button
                    onClick={() => {
                      setShowProfile(false);
                      navigate("/pricing");
                    }}
                    className="w-full px-5 py-3 text-left text-blue-100 hover:bg-white/10"
                  >
                    Pricing
                  </button>

                  <div className="h-px bg-white/10" />

                  <button
                    onClick={handleSignOut}
                    disabled={loggingOut}
                    className="w-full px-5 py-3 text-left text-red-400 hover:bg-red-500/10"
                  >
                    {loggingOut
                      ? "Logging out..."
                      : "Logout"}
                  </button>

                </motion.div>

              )}

            </AnimatePresence>

          </div>

        </div>

      </motion.nav>
    </div>
  );
}

export default Navbar;