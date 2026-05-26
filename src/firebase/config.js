import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChYi1RQosQWgM-P_yj6DVCZresxDgVXxg",
  authDomain: "inventerritory.firebaseapp.com",
  projectId: "inventerritory",
  storageBucket: "inventerritory.firebasestorage.app",
  messagingSenderId: "246917290207",
  appId: "1:246917290207:web:920ab3095628a11a85b16a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
    export const db = getFirestore(app);