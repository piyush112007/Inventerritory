import {
  signInWithPopup,
  signOut,
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

import {
  auth,
  provider,
  db,
} from "../firebase/config";

// GOOGLE LOGIN
export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);

  const user = result.user;

  // USER DOCUMENT REFERENCE
  const userRef = doc(db, "users", user.uid);

  // CHECK IF USER EXISTS
  const userSnap = await getDoc(userRef);

  // CREATE USER DOC IF NOT EXISTS
  if (!userSnap.exists()) {
    await setDoc(userRef, {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      createdAt: new Date(),
    });
  }

  return user;
};

// LOGOUT
export const logoutUser = async () => {
  await signOut(auth);
};