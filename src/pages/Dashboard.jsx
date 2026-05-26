import { useEffect, useState } from "react";

import { getRegisters, createRegister } from "../services/registerService";

import { useNavigate } from "react-router-dom";

export default function Dashboard({ user, darkMode }) {
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
    <div className="p-6">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-5xl font-black text-orange-600">Inventerritory</h1>

        <p className="text-gray-400 mt-2">Welcome back, {user.displayName}</p>
      </div>

      {/* CREATE REGISTER */}
      <form
        onSubmit={handleCreateRegister}
        className={`p-6 rounded-3xl border mb-10 ${
          darkMode
            ? "bg-slate-900 border-slate-700"
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
            className={`flex-1 p-4 rounded-2xl border outline-none ${
              darkMode
                ? "bg-slate-800 border-slate-700"
                : "bg-gray-100 border-gray-300"
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
              className={`p-6 rounded-3xl cursor-pointer border transition hover:scale-[1.02] ${
                darkMode
                  ? "bg-slate-900 border-slate-700 hover:border-orange-600"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-orange-600 mb-4"></div>

              <h3 className="text-2xl font-bold">{register.name}</h3>

              <p className="text-gray-400 mt-2">Inventory Register</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
