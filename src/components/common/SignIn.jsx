import React, { useState } from "react";
import Admin from "./Admin";     // adjust path if needed
import Login from "./Login";     // adjust path if needed

function SignIn() {
  const [activeTab, setActiveTab] = useState("employee"); // default view

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ===== SWITCH BUTTONS ===== */}
      <div className="flex justify-center gap-4 py-6 bg-white shadow">
        <button
          onClick={() => setActiveTab("employee")}
          className={`px-6 py-2 rounded-lg font-semibold transition
            ${activeTab === "employee"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
        >
          Employee Login
        </button>

        <button
          onClick={() => setActiveTab("admin")}
          className={`px-6 py-2 rounded-lg font-semibold transition
            ${activeTab === "admin"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
        >
          Admin Login
        </button>
      </div>

      {/* ===== RENDER COMPONENT ===== */}
      <div>
        {activeTab === "employee" && <Login />}
        {activeTab === "admin" && <Admin />}
      </div>
    </div>
  );
}

export default SignIn;
