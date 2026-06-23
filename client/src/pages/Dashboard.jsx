import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Footer from "../components/Footer";
import CustomizePanel from "../components/CustomizePanel";
import CustomizeButton from "../components/CustomizeButton";

import {
  Sparkles,
  FileText,
  History,
  CreditCard,
  ArrowRight,
  BrainCircuit,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [themeColor, setThemeColor] = useState("#2563eb");
const [themeFont, setThemeFont] = useState("Poppins");
const [open, setOpen] = useState(false);

  const cards = [
    {
      title: "Generate Notes",
      desc: "Create smart AI-powered notes instantly for exams.",
      icon: <FileText size={28} />,
      color: "from-blue-600 to-cyan-500",
      route: "/notes",
    },
    {
      title: "History",
      desc: "Access all your previously generated study material.",
      icon: <History size={28} />,
      color: "from-violet-600 to-indigo-500",
      route: "/history",
    },
    {
      title: "Buy Credits",
      desc: "Upgrade your credits and unlock more generations.",
      icon: <CreditCard size={28} />,
      color: "from-pink-500 to-rose-500",
      route: "/pricing",
    },
  ];

  return (
    <div
className="min-h-screen bg-[#f4f8ff] flex"

style={{
fontFamily:themeFont
}}

>

      {/* =========================
          SIDEBAR
      ========================== */}
      <motion.div
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="
        hidden lg:flex
        w-72
        bg-white/80
        backdrop-blur-xl
        border-r border-blue-100
        shadow-xl
        p-6
        flex-col
        sticky top-0
        h-screen
        "
      >

        {/* LOGO */}
        <div>

          <div className="flex items-center gap-4 mb-12">

            <div
              className="
              h-14 w-14 rounded-2xl
              bg-gradient-to-r
              from-blue-600
              to-cyan-500
              flex items-center justify-center
              text-white shadow-lg
              "
            >
              <BrainCircuit size={28} />
            </div>

            <div>

             <h1
className="text-2xl font-black"
style={{
color:themeColor
}}
>
ExamMate.AI
</h1>

              <p className="text-sm text-gray-500">
                Smart Study Dashboard
              </p>

            </div>

          </div>

          {/* MENU */}
          <div className="space-y-3">

            <SidebarItem
              title="Dashboard"
              onClick={() => navigate("/dashboard")}
            />

            <SidebarItem
              title="Generate Notes"
              onClick={() => navigate("/notes")}
            />

            <SidebarItem
              title="History"
              onClick={() => navigate("/history")}
            />

            <SidebarItem
              title="Buy Credits"
              onClick={() => navigate("/pricing")}
            />

          </div>

        </div>

        {/* BOTTOM CARD */}
        <motion.div
          whileHover={{
            y: -5,
            scale: 1.02,
          }}
          className="
          mt-auto
          rounded-3xl
          p-5
          bg-gradient-to-r
          from-blue-600
          to-cyan-500
          text-white
          shadow-[0_20px_50px_rgba(59,130,246,0.35)]
          relative overflow-hidden
          "
        >

          <div className="absolute inset-0 bg-white/10 backdrop-blur-md"></div>

          <div className="relative z-10">

            <Sparkles className="mb-3" />

            <h3 className="font-bold text-lg">
              AI Study Assistant
            </h3>

            <p className="text-sm text-blue-100 mt-2 leading-relaxed">
              Generate notes, assignments and study material in seconds.
            </p>

          </div>

        </motion.div>

      </motion.div>

      {/* =========================
          MAIN CONTENT
      ========================== */}
      <div className="flex-1 flex flex-col">

        <div className="p-8 lg:p-12 relative">

          {/* BG GLOW */}
          <div className="absolute top-0 right-0 h-96 w-96 bg-cyan-300/20 blur-3xl rounded-full"></div>

          {/* HERO */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="
            relative
            rounded-[35px]
            overflow-hidden
            p-10
            bg-white
            border border-blue-100
            shadow-[0_20px_70px_rgba(59,130,246,0.12)]
            "
          >

            {/* DECORATION */}
            <div className="absolute top-0 right-0 h-52 w-52 bg-blue-500/10 blur-3xl rounded-full"></div>

            <div className="relative z-10">

              <motion.div
                whileHover={{ scale: 1.03 }}
                className="
                inline-flex items-center gap-2
                px-4 py-2 rounded-full
                bg-blue-50
                border border-blue-100
                mb-6
                "
              >

                <span className="h-2 w-2 rounded-full bg-cyan-500"></span>

            <p
className="text-sm font-medium"
style={{
color:themeColor
}}
>

Lets Learn Something New Today

</p>

              </motion.div>

              <motion.h1
                whileHover={{ y: -2 }}
                className="
                text-5xl lg:text-6xl
                font-black
                leading-tight
                bg-gradient-to-r
                from-blue-700
                via-cyan-500
                to-indigo-600
                bg-clip-text text-transparent
                "
              >

                Welcome 👋
                <br />

                Ready to Study Smarter?

              </motion.h1>

              <p
                className="
                mt-6
                text-lg
                text-gray-600
                max-w-3xl
                leading-relaxed
                "
              >
                Create high-quality AI notes, summaries,
                diagrams and revision-ready material instantly
                with ExamMate.AI.
              </p>

              <motion.button
                whileHover={{
                  scale: 1.04,
                  y: -2,
                }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate("/notes")}
                className="
                mt-8
                px-8 py-4
                rounded-2xl
                bg-gradient-to-r
                from-blue-600
                to-cyan-500
                text-white font-semibold
                flex items-center gap-2
                shadow-[0_20px_50px_rgba(59,130,246,0.3)]
                "
              >

                Start Generating

                <ArrowRight size={18} />

              </motion.button>

            </div>

          </motion.div>

          {/* ACTION CARDS */}
      {/* ACTION CARDS + CUSTOMIZER */}

<div className="grid lg:grid-cols-4 gap-8 mt-12">


{/* Left Side */}
<div className="lg:col-span-3">

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

{cards.map((card, index) => (

<motion.div
key={index}

initial={{ y: 50, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
transition={{ delay: index * 0.1 }}

whileHover={{
y:-8,
scale:1.02
}}

onClick={() => navigate(card.route)}

className="
relative
overflow-hidden
rounded-[30px]
bg-white
border border-blue-100
p-8
cursor-pointer
shadow-[0_15px_40px_rgba(59,130,246,0.08)]
"
>


<div
className={`
absolute top-0 right-0
h-40 w-40
rounded-full
blur-3xl
opacity-20
bg-gradient-to-r ${card.color}
`}
></div>


<div className="relative z-10">


<div
className={`
h-16
w-16
rounded-2xl
flex
items-center
justify-center
text-white
bg-gradient-to-r ${card.color}
shadow-lg
`}
>

{card.icon}

</div>



<h2 className="text-2xl font-bold text-gray-800 mt-6">

{card.title}

</h2>



<p className="text-gray-500 mt-3">

{card.desc}

</p>



<div

className="
flex
items-center
gap-2
mt-6
text-sm
font-semibold
"

style={{
color:themeColor
}}

>
Open

<ArrowRight size={16}/>

</div>



</div>


</motion.div>

))}

</div>

</div>






<CustomizeButton

open={open}
setOpen={setOpen}

/>
<CustomizeButton

open={open}
setOpen={setOpen}

/>


{
open && (

<CustomizePanel

themeColor={themeColor}
setThemeColor={setThemeColor}

themeFont={themeFont}
setThemeFont={setThemeFont}

setOpen={setOpen}

/>

)

}




</div>

        </div>

        {/* FOOTER */}
        <Footer />

      </div>

    </div>
  );
};

/* =========================
   SIDEBAR ITEM
========================= */
function SidebarItem({ title, onClick }) {
  return (
    <motion.div
      whileHover={{
        x: 5,
        scale: 1.02,
      }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="
      px-5 py-4
      rounded-2xl
      cursor-pointer
      bg-white
      border border-blue-100
      hover:bg-blue-50
      text-gray-700
      font-medium
      shadow-sm
      transition
      "
    >
      {title}
    </motion.div>
  );
}

export default Dashboard;