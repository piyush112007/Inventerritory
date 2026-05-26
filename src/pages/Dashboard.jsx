import { useEffect, useState } from "react";

import { getRegisters, createRegister } from "../services/registerService";
import { logoutUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Moon, Sun } from "lucide-react";

export default function Dashboard({ user, darkMode, setDarkMode }) {
  const [registers, setRegisters] = useState([]);

  const [registerName, setRegisterName] = useState("");

  const navigate = useNavigate();

  // FETCH REGISTERS
  const fetchRegisters = async () => {
    const data = await getRegisters(user.uid);
    setRegisters(data);
  };

  useEffect(() => {
    fetchRegisters();
  }, []);

  // CREATE REGISTER
  const handleCreateRegister = async (e) => {
    e.preventDefault();

    if (!registerName.trim()) return;

    await createRegister(user.uid, {
      name: registerName,
      createdAt: new Date(),
    });

    setRegisterName("");

    fetchRegisters();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-5xl font-black text-orange-600">
            InvenTerritory
          </h1>

          <p
            className={`mt-2 ${darkMode ? "text-slate-400" : "text-gray-500"}`}
          >
            Welcome back, {user.displayName}
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3">
          {/* THEME TOGGLE */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-orange-600 hover:bg-orange-700 w-14 h-14 rounded-2xl transition flex items-center justify-center shadow-lg"
          >
            {darkMode ? (
              <Sun size={22} strokeWidth={2.5} />
            ) : (
              <Moon size={22} strokeWidth={2.5} />
            )}
          </button>

          {/* LOGOUT */}
          <button
            onClick={logoutUser}
            className="bg-red-500 hover:bg-red-600 px-5 py-3 rounded-2xl font-semibold transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* CREATE REGISTER */}
      <form
        onSubmit={handleCreateRegister}
        className={`p-6 rounded-3xl border mb-10 ${
          darkMode
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-gray-200"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">Create Register</h2>

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Register Name"
            value={registerName}
            onChange={(e) => setRegisterName(e.target.value)}
            className={`flex-1 p-4 rounded-2xl border outline-none transition ${
              darkMode
                ? "bg-slate-800 border-slate-700 text-white"
                : "bg-gray-100 border-gray-300 text-black"
            }`}
          />

          <button className="bg-orange-600 hover:bg-orange-700 px-6 rounded-2xl text-white font-semibold">
            Create
          </button>
        </div>
      </form>

      {/* REGISTERS */}
      <div>
        <h2 className="text-3xl font-bold mb-6">Your Registers</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {registers.map((register) => (
            <div
              key={register.id}
              onClick={() => navigate(`/register/${register.id}`)}
              className={`p-6 rounded-3xl cursor-pointer border shadow-lg transition-all duration-300 hover:scale-[1.02] ${
                darkMode
                  ? "bg-slate-900 border-slate-800 hover:border-orange-600"
                  : "bg-white border-gray-200 hover:border-orange-400"
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-orange-600 mb-4"></div>

              <h3 className="text-2xl font-bold">{register.name}</h3>

              <p
                className={`mt-2 text-sm ${
                  darkMode ? "text-slate-400" : "text-gray-500"
                }`}
              >
                Inventory Register
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
