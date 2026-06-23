import React, { useState } from "react";
import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { serverURL } from "../config";
import { setUserData, clearUser } from "../redux/userSlice";
import { FaGithub } from "react-icons/fa";
function Footer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loggingOut, setLoggingOut] = useState(false);

  // =========================
  // LOGOUT HANDLER
  // =========================
const handleSignOut = async () => {
  try {
    await axios.post(
      serverURL + "/api/auth/logout",
      {},
      { withCredentials: true }
    );

    dispatch(setUserData(null));
    navigate("/");
  } catch (error) {
    console.log("Logout error:", error);
  }
};
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="z-10 mx-6 mb-6 mt-24 rounded-2xl bg-gradient-to-br from-black/90 via-black/80 to-black/90 backdrop-blur-2xl border border-white/10 px-8 py-8 shadow-[0_25px_60px_rgba(0,0,0,0.7)]"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

        {/* =======================
            LOGO + DESCRIPTION
        ======================== */}
        <motion.div
          whileHover={{ rotateX: 6, rotateY: -6 }}
          className="flex flex-col gap-4 transform-gpu"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/dashboard")}
            style={{ transform: "translateZ(20px)" }}
          >
            {/* <img src={logo} alt="logo" className="h-9 w-9 object-contain" /> */}

            <span
              className="text-lg font-semibold bg-gradient-to-br from-white via-gray-300 to-white bg-clip-text text-transparent"
              style={{ textShadow: "0 6px 18px rgba(0,0,0,0.4)" }}
            >
              ExamMate <span className="text-gray-400">AI</span>
            </span>
          </div>

          <p className="text-sm text-gray-300 max-w-sm">
            ExamMate AI helps students generate exam-focused notes, revision
            material, diagrams, and printable PDFs using AI.
            
          </p>
        </motion.div>

        {/* =======================
            QUICK LINKS
        ======================== */}
        <div className="text-center">
          <h1 className="text-sm font-semibold text-white mb-4">
            Quick Links
          </h1>

          <ul className="space-y-2 text-sm">
            <li
              onClick={() => navigate("/notes")}
              className="text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              Notes
            </li>

            <li
              onClick={() => navigate("/history")}
              className="text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              History
            </li>

            <li
              onClick={() => navigate("/pricing")}
              className="text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              Add Credits
            </li>
          </ul>
        </div>

        {/* =======================
            ACCOUNT
        ======================== */}
        <div className="text-center">
          <h1 className="text-sm font-semibold text-white mb-4">
            Support & Account
          </h1>

          <ul className="space-y-2 text-sm">

            <li
              onClick={handleSignOut}
              className={`transition-colors cursor-pointer ${
                loggingOut
                  ? "text-gray-500 cursor-not-allowed"
                  : "text-red-400 hover:text-red-300"
              }`}
            >
              {loggingOut ? "Signing out..." : "Sign Out"}
            </li>

            <li className="text-gray-300 hover:text-white transition-colors">
  support@examnotes.com
</li>

<li>
  <a
    href="https://github.com/MahakRaitani"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center gap-2 text-gray-300 hover:text-white transition-colors"
  >
    <FaGithub className="text-lg" />
    <span>GitHub</span>
  </a>
</li>
            

          </ul>
        </div>
      </div>

      {/* =======================
          DIVIDER
      ======================== */}
      <div className="my-6 h-px bg-white/10" />

      {/* FOOTER TEXT */}
    <p className="text-center text-xs text-gray-500">
  © {new Date().getFullYear()} ExamMate AI. All rights reserved.
  <br />
  Created by <span className="text-gray-300 font-medium">Mahak Raitani</span>
</p>
      
    </motion.div>
  );
}

export default Footer;