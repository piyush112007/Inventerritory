import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChYi1RQosQWgM-P_yj6DVCZresxDgVXxg",
  authDomain: "inventerritory.firebaseapp.com",
  projectId: "inventerritory",
  storageBucket: "inventerritory.firebasestorage.app",
  messagingSenderId: "246917290207",
  appId: "1:246917290207:web:920ab3095628a11a85b16a"
};


const app = initializeApp(firebaseConfig);

// FIREBASE SERVICES
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);