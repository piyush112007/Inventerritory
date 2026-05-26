import { collection, addDoc, getDocs } from "firebase/firestore";

import { db } from "../firebase/config";

// GET REGISTERS
export const getRegisters = async (userId) => {
  const registerCollection = collection(db, "users", userId, "registers");

  const data = await getDocs(registerCollection);

  return data.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// CREATE REGISTER
export const createRegister = async (userId, registerData) => {
  const registerCollection = collection(db, "users", userId, "registers");

  await addDoc(registerCollection, registerData);
};
