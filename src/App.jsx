import { useEffect, useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./firebase/config";

import { loginWithGoogle } from "./services/authService";

import LoginScreen from "./components/LoginScreen";

import Dashboard from "./pages/Dashboard";

import RegisterPage from "./pages/RegisterPage";

export default function App() {
  const [user, setUser] = useState(null);

  const [darkMode, setDarkMode] = useState(true);

  // AUTH STATE
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      // STORE USER
      if (currentUser) {
        localStorage.setItem("inventoryUser", JSON.stringify(currentUser));
      }

      // REMOVE USER ON LOGOUT
      else {
        localStorage.removeItem("inventoryUser");
      }
    });

    return () => unsubscribe();
  }, []);

  // LOGIN SCREEN
  if (!user) {
    return (
      <LoginScreen darkMode={darkMode} loginWithGoogle={loginWithGoogle} />
    );
  }

  return (
    <BrowserRouter>
      <div
        className={`min-h-screen transition-all duration-300 ${
          darkMode ? "bg-[#0f172a] text-white" : "bg-gray-100 text-black"
        }`}
      >
        <Routes>
          {/* DASHBOARD */}
          <Route
            path="/"
            element={<Dashboard user={user} darkMode={darkMode} />}
          />

          {/* REGISTER INVENTORY */}
          <Route path="/register/:registerId" element={<RegisterPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
