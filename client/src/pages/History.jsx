import axios from "axios";
import React, { useEffect, useState } from "react";
import { serverURL } from "../config";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import FinalResult from "../components/FinalResult";

function History() {
  const [topics, setTopics] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeNoteId, setActiveNoteId] = useState(null);

  const navigate = useNavigate();

  const { userData } = useSelector((state) => state.user);

  const credits = userData?.credits || 0;

  // =========================
  // GET ALL NOTES
  // =========================
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${serverURL}/api/notes/my`,
          {
            withCredentials: true,
          }
        );

        console.log("Notes API:", res.data);

        // IMPORTANT FIX
        setTopics(res.data.notes || []);
      } catch (error) {
        console.log(
          "Fetch Notes Error:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  // =========================
  // OPEN SINGLE NOTE
  // =========================
  const openNotes = async (noteId) => {
    try {
      setLoading(true);
      setActiveNoteId(noteId);

      const res = await axios.get(
        `${serverURL}/api/notes/${noteId}`,
        {
          withCredentials: true,
        }
      );

      console.log("Single Note:", res.data);

      // IMPORTANT FIX
      setSelectedNote(res.data.note?.content || "");
    } catch (error) {
      console.log(
        "Single Note Error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // OPEN SIDEBAR DESKTOP
  // =========================
  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setIsSidebarOpen(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-6 py-8">

      {/* ================= HEADER ================= */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="
          mb-10
          rounded-2xl
          bg-black/80
          backdrop-blur-xl
          border border-white/10
          px-8 py-6
          flex justify-between items-start md:items-center
          gap-4 flex-wrap
          shadow-[0_20px_45px_rgba(0,0,0,0.6)]
        "
      >

        {/* LEFT */}
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer"
        >
          <h1
            className="
              text-2xl font-bold
              bg-gradient-to-r from-white via-gray-300 to-white
              bg-clip-text text-transparent
            "
          >
            ExamMate AI
          </h1>

          <p className="text-sm text-gray-300 mt-1">
            AI-powered exam-oriented notes & revision
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          {!isSidebarOpen && (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-white text-2xl"
            >
              <GiHamburgerMenu />
            </button>
          )}

          <button
            onClick={() => navigate("/pricing")}
            className="
              flex items-center gap-2
              px-4 py-2 rounded-full
              bg-white/10
              border border-white/20
              text-white text-sm
            "
          >
            <span className="text-xl">💠</span>

            <span>{credits}</span>

            <motion.span
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              className="
                ml-2 h-5 w-5
                flex items-center justify-center
                rounded-full
                bg-white
                text-black
                text-xs
                font-bold
              "
            >
              +
            </motion.span>
          </button>
        </div>
      </motion.header>

      {/* ================= BODY ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* ================= SIDEBAR ================= */}
        <AnimatePresence>

          {isSidebarOpen && (
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 30,
              }}
              className="
                fixed lg:static
                top-0 left-0
                z-50 lg:z-auto
                w-72 lg:w-auto
                h-full lg:h-[75vh]
                lg:rounded-3xl
                lg:col-span-1
                bg-black/90 lg:bg-black/80
                backdrop-blur-xl
                border border-white/10
                shadow-[0_20px_45px_rgba(0,0,0,0.6)]
                p-5
                overflow-y-auto
              "
            >

              {/* BACK BUTTON */}
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden text-white mb-4"
              >
                ⬅ Back
              </button>

              {/* NEW NOTE BUTTON */}
              <button
                onClick={() => navigate("/notes")}
                className="
                  w-full px-3 py-2 rounded-lg
                  text-sm text-gray-200
                  bg-white/10
                  text-start
                  hover:bg-white/20
                "
              >
                ➕ New Notes
              </button>

              <hr className="border-white/10 my-4" />

              {/* TITLE */}
              <h2
                className="
                  mb-4 text-lg font-bold
                  bg-gradient-to-r from-white via-gray-300 to-white
                  bg-clip-text text-transparent
                "
              >
                📚 Your Notes
              </h2>

              {/* EMPTY */}
              {!loading && topics.length === 0 && (
                <p className="text-sm text-gray-400">
                  No notes created yet
                </p>
              )}

              {/* NOTES LIST */}
              <ul className="space-y-3">

                {topics.map((t) => (
                  <li
                    key={t._id}
                    onClick={() => openNotes(t._id)}
                    className={`
                      cursor-pointer
                      rounded-xl
                      p-3
                      border
                      transition-all

                      ${
                        activeNoteId === t._id
                          ? "bg-indigo-500/30 border-indigo-400"
                          : "bg-white/5 border-white/10 hover:bg-white/10"
                      }
                    `}
                  >

                    {/* TOPIC */}
                    <p className="text-sm font-semibold text-white">
                      {t.topic}
                    </p>

                    {/* TAGS */}
                    <div className="flex flex-wrap gap-2 mt-2 text-xs">

                      {t.classLevel && (
                        <span
                          className="
                            px-2 py-0.5 rounded-full
                            bg-indigo-500/20
                            text-indigo-300
                          "
                        >
                          {t.classLevel}
                        </span>
                      )}

                      {t.examType && (
                        <span
                          className="
                            px-2 py-0.5 rounded-full
                            bg-purple-500/20
                            text-purple-300
                          "
                        >
                          {t.examType}
                        </span>
                      )}
                    </div>

                    {/* FEATURES */}
                    <div className="flex gap-3 mt-2 text-xs text-gray-300">

                      {t.revisionMode && (
                        <span>⚡ Revision</span>
                      )}

                      {t.includeDiagram && (
                        <span>📊 Diagram</span>
                      )}

                      {t.includeChart && (
                        <span>📈 Chart</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= CONTENT ================= */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="
            lg:col-span-3
            rounded-2xl
            bg-white
            shadow-[0_15px_40px_rgba(0,0,0,0.15)]
            p-6
            min-h-[75vh]
            overflow-hidden
          "
        >

          {/* LOADING */}
          {loading && (
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-500">
                Loading Notes...
              </p>
            </div>
          )}

          {/* EMPTY */}
          {!loading && !selectedNote && (
            <div className="h-full flex items-center justify-center text-gray-400">
              Select a topic from sidebar
            </div>
          )}

          {/* RESULT */}
          {!loading && selectedNote && (
            <div className="w-full min-w-0 overflow-hidden">
              <FinalResult result={selectedNote} />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default History;