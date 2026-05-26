import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase/config";

// GET PRODUCTS
export const getProducts = async (userId) => {
  const productCollection = collection(
    db,
    "users",
    userId,
    "products"
  );

  const data = await getDocs(productCollection);

  return data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
};

// ADD PRODUCT
export const addProduct = async (userId, product) => {
  const productCollection = collection(
    db,
    "users",
    userId,
    "products"
  );

  await addDoc(productCollection, product);
};

// DELETE PRODUCT
export const deleteProduct = async (userId, productId) => {
  const productDoc = doc(
    db,
    "users",
    userId,
    "products",
    productId
  );

  await deleteDoc(productDoc);
};