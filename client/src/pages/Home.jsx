import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  return (

    <div className="min-h-screen overflow-hidden bg-[#f5f9ff] text-black">

      {/* Navbar */}
      <Navbar />

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-36 pb-24">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div>

            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >

              {/* Badge */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="
                inline-flex items-center gap-2
                px-4 py-2 rounded-full
                bg-white
                border border-blue-100
                shadow-md mb-6
                "
              >

                <span className="h-2 w-2 rounded-full bg-cyan-500"></span>

                <p className="text-sm font-medium text-gray-700">
                  AI Powered Study Platform
                </p>

              </motion.div>

              {/* Heading */}
              <motion.h1
                whileHover={{ y: -3 }}
                className="
                text-5xl lg:text-7xl
                font-black leading-tight
                bg-gradient-to-r
                from-blue-600
                via-cyan-500
                to-indigo-600
                bg-clip-text text-transparent
                "
              >

                Create Smart
                <br />

                AI Notes
                <br />

                in Seconds

              </motion.h1>

              {/* Paragraph */}
              <motion.p
                whileHover={{ y: -2 }}
                className="
                mt-8 max-w-xl
                text-lg leading-relaxed
                text-gray-600
                "
              >

                ExamMate.AI helps students generate
                exam-focused notes, assignments,
                diagrams, project documentation,
                summaries and revision-ready study
                material using powerful AI tools.

              </motion.p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4 mt-10">

                <motion.button
                  onClick={() => navigate("/notes")}
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="
                  px-10 py-3 rounded-2xl
                  bg-gradient-to-r
                  from-blue-600
                  to-cyan-500
                  text-white font-semibold
                  shadow-[0_15px_40px_rgba(59,130,246,0.35)]
                  "
                >

                  Get Started

                </motion.button>

                <motion.button
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="
                  px-10 py-3 rounded-2xl
                  bg-white
                  border border-blue-100
                  text-gray-700 font-semibold
                  shadow-md
                  "
                >

                  Explore Features

                </motion.button>

              </div>

            </motion.div>

          </div>

          {/* RIGHT SIDE BOX */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            whileHover={{
              y: -10,
              scale: 1.03,
            }}
          >

            <div
              className="
              relative
              rounded-3xl
              p-10
              bg-white
              border border-blue-100
              shadow-[0_20px_60px_rgba(59,130,246,0.15)]
              overflow-hidden
              "
            >

              {/* Glow */}
              <div
                className="
                absolute inset-0
                bg-gradient-to-r
                from-blue-500/10
                to-cyan-400/10
                blur-3xl
                "
              ></div>

              <div className="relative z-10">

                <div className="flex items-center gap-4 mb-6">

                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-2xl shadow-lg">
                    🤖
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      ExamMate.AI
                    </h2>

                    <p className="text-sm text-gray-500">
                      Your AI Study Assistant
                    </p>
                  </div>

                </div>

                <div className="space-y-4">

                  <div className="bg-blue-50 rounded-2xl p-4">
                    <h3 className="font-semibold text-blue-700">
                      Smart Notes
                    </h3>

                    <p className="text-sm text-gray-600 mt-1">
                      Generate instant notes for exams & assignments.
                    </p>
                  </div>

                  <div className="bg-cyan-50 rounded-2xl p-4">
                    <h3 className="font-semibold text-cyan-700">
                      AI Diagrams
                    </h3>

                    <p className="text-sm text-gray-600 mt-1">
                      Create visual diagrams and flowcharts automatically.
                    </p>
                  </div>

                  <div className="bg-indigo-50 rounded-2xl p-4">
                    <h3 className="font-semibold text-indigo-700">
                      PDF Export
                    </h3>

                    <p className="text-sm text-gray-600 mt-1">
                      Download clean and printable PDFs instantly.
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </motion.div>

        </div>

      </section>

      {/* FEATURES */}
      <section
        className="
        max-w-6xl mx-auto
        px-6 lg:px-10
        pb-28
        grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4
        gap-8
        "
      >

        <Feature
          icon="📘"
          title="Exam Notes"
          des="Generate high-yield exam notes with revision points instantly."
        />

        <Feature
          icon="📂"
          title="Project Notes"
          des="Create well-structured documentation for assignments and projects."
        />

        <Feature
          icon="📊"
          title="AI Diagrams"
          des="Generate flowcharts and visual diagrams using AI."
        />

        <Feature
          icon="⬇️"
          title="PDF Download"
          des="Download clean and printable PDF notes in one click."
        />

      </section>

      {/* Footer */}
      <Footer />

    </div>

  );
}

/* FEATURE CARD */
function Feature({ icon, title, des }) {

  return (

    <motion.div
      whileHover={{
        y: -10,
        scale: 1.03,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 18,
      }}
      className="
      rounded-3xl p-7
      bg-white
      border border-blue-100
      shadow-lg
      "
    >

      <div className="text-5xl mb-4">
        {icon}
      </div>

      <h3 className="text-xl font-bold text-gray-800 mb-3">
        {title}
      </h3>

      <p className="text-gray-500 text-sm leading-relaxed">
        {des}
      </p>

    </motion.div>

  );
}

export default Home;