import React from "react";
import { Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import History from "./pages/History";
import Notes from "./pages/Notes";
import Pricing from "./pages/Pricing";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";
import Contact from "./pages/Contact";
export const serverURL = "https://exammate-aiserver.onrender.com";

function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      <Route
        path="/home"
        element={<Home />}
      />

      <Route
        path="/history"
        element={<History />}
      />

      <Route
        path="/notes"
        element={<Notes />}
      />

      <Route
        path="/pricing"
        element={<Pricing />}
      />

      <Route
        path="/payment-success"
        element={<PaymentSuccess />}
      />

      <Route
        path="/payment-failed"
        element={<PaymentFailed />}
      />
<Route
  path="/register"
  element={<Register />}
/>
<Route path="/contact" element={<Contact />} />
    </Routes>

  );
}

export default App;
