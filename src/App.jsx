import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./firebase/config";

import { loginWithGoogle } from "./services/authService";

import LoginScreen from "./components/LoginScreen";

import Dashboard from "./pages/Dashboard";

import RegisterPage from "./pages/RegisterPage";

export default function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [darkMode, setDarkMode] = useState(true);

  // AUTH STATE
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        localStorage.setItem("inventoryUser", JSON.stringify(currentUser));
      }

      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // LOGIN SCREEN
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>

          <h1 className="mt-6 text-2xl font-bold text-white">Inventerritory</h1>

          <p className="text-slate-400 mt-2">Loading your workspace...</p>
        </div>
      </div>
    );
  }
  if (!user) {
    return (
      <LoginScreen darkMode={darkMode} loginWithGoogle={loginWithGoogle} />
    );
  }

  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1e293b",
            color: "#fff",
            border: "1px solid #334155",
            padding: "16px",
            borderRadius: "16px",
          },
        }}
      />
      <div
        className={`min-h-screen transition-all duration-300 ${
          darkMode
            ? "bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] text-white"
            : "bg-gray-100 text-black"
        }`}
      >
        <Routes>
          {/* DASHBOARD */}
          <Route
            path="/"
            element={
              <Dashboard
                user={user}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />

          {/* REGISTER INVENTORY */}
          <Route
            path="/register/:registerId"
            element={
              <RegisterPage darkMode={darkMode} setDarkMode={setDarkMode} />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
