import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Contact() {
   const navigate = useNavigate();
   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-900 to-gray-800 p-6">

      {/* CARD */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* TOP BAR */}
        <div className="flex items-center justify-between bg-gray-100 px-4 py-3">
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>

          <div className="flex gap-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          </div>
        </div>

        {/* BODY */}
        <div className="grid md:grid-cols-2">

          {/* LEFT */}
          <div className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white p-10 flex flex-col justify-center">
            <h1 className="text-4xl font-bold">
              CONTACT <br /> US
            </h1>

            <p className="mt-6 text-sm opacity-90">
              We are here to help you anytime. Feel free to reach out.
            </p>

            <div className="mt-6 text-sm">
              📞 +91 201 555 0124 <br />
              ✉ support@example.com
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="p-10 bg-white">
            <h2 className="text-2xl font-semibold mb-6">Send Message</h2>

            <form className="space-y-4">
              <input className="w-full border-b p-2 outline-none" placeholder="NAME" />
              <input className="w-full border-b p-2 outline-none" placeholder="EMAIL" />
              <input className="w-full border-b p-2 outline-none" placeholder="CONTACT NO" />
              <textarea className="w-full border-b p-2 outline-none" placeholder="MESSAGE" rows="4" />

              <div className="flex gap-4 pt-4">
               <button
  type="button"
  onClick={() => navigate("/dashboard")}
  className="px-4 py-2 border rounded-lg hover:bg-gray-100"
>
  CANCEL
</button>

                <button
  type="submit"
  onClick={() => alert("We will contact you soon. Thank you!")}
  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
>
  SEND
</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* MAP SECTION */}
      <div className="w-full max-w-4xl mt-6 rounded-2xl overflow-hidden shadow-2xl">
        <iframe
          title="google-map"
          className="w-full h-80"
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.2256!2d80.9462!3d26.8467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd5a7c3b3b6b%3A0x8f5a1a7c9b8c2d!2sLucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v0000000000"
        ></iframe>
      </div>

    </div>
  );
}