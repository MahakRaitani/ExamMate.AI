import React from "react";
import { motion } from "framer-motion";

const fonts = [
    "Poppins",
    "Montserrat",
    "Roboto",
    "Rubik",
    "Merriweather"
];

const colors = [
    "#2563eb",
    "#f97316",
    "#ec4899",
    "#22c55e",
    "#7c3aed"
];

export default function CustomizePanel({

    themeFont,
    setThemeFont,

    themeColor,
    setThemeColor,
    setOpen


}) {

    return (

        <motion.div

            initial={{
                x: 300,
                opacity: 0
            }}

            animate={{
                x: 0,
                opacity: 1
            }}

            transition={{
                duration: 0.3
            }}

            className="
fixed

right-6
top-6

w-80

bg-white

rounded-3xl

shadow-2xl

z-50

overflow-hidden
"
        >


            {/* Header */}

            <div
                className="
px-6
py-5

flex
items-center
justify-between

border-b
border-gray-200
"
            >


                <p className="text-lg font-semibold text-gray-700">

                    Customize Dashboard

                </p>



                <button

                    onClick={() => setOpen(false)}

                    className="
cursor-pointer

border
border-gray-300

rounded-md

p-2

hover:border-gray-800

transition
"

                >


                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >

                        <path

                            d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"

                            fill="#6B7280"

                        />

                    </svg>


                </button>

            </div>


            {/* Fonts */}

            <div className="px-6 pt-5">
    <h3 className="font-semibold mb-3">
        Fonts
    </h3>



            <div className="grid grid-cols-2 gap-3">

                {

                    fonts.map(item => (

                        <div

                            key={item}

                            onClick={() => setThemeFont(item)}

                            className={`

cursor-pointer
border

rounded-xl

p-3

text-center

transition


${themeFont === item
                                    ?
                                    "border-blue-500"
                                    :
                                    "border-gray-200"
                                }

`}

                        >


                            <p

                                style={{
                                    fontFamily: item
                                }}

                                className="text-3xl"

                            >

                                Aa

                            </p>



                            <p className="text-xs mt-1">

                                {item}

                            </p>



                        </div>

                    ))

                }


            </div>


</div>

            {/* Colors */}

<div className="px-6 pb-6">
    <h3 className="font-semibold mt-7 mb-3">
        Colors
    </h3>




            <div className="flex gap-3">


                {

                    colors.map(c => (

                        <div

                            key={c}

                            onClick={() => setThemeColor(c)}

                            className={`

w-10
h-10

rounded-full

cursor-pointer

border-2


${themeColor === c
                                    ?
                                    "border-black"
                                    :
                                    "border-transparent"
                                }

`}

                            style={{

                                background: c

                            }}

                        >

                        </div>

                    ))

                }


            </div>
</div>


        </motion.div>

    );

}