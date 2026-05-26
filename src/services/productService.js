import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/config";

// GET PRODUCTS
export const getProducts = async (userId, registerId) => {
  const productCollection = collection(
    db,
    "users",
    userId,
    "registers",
    registerId,
    "products",
  );

  const data = await getDocs(productCollection);

  return data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
};

// ADD PRODUCT
export const addProduct = async (userId, registerId, product) => {
  const productCollection = collection(
    db,
    "users",
    userId,
    "registers",
    registerId,
    "products",
  );

  await addDoc(productCollection, product);
};

// DELETE PRODUCT
export const deleteProduct = async (userId, registerId, productId) => {
  const productDoc = doc(
    db,
    "users",
    userId,
    "registers",
    registerId,
    "products",
    productId,
  );

  await deleteDoc(productDoc);
};

// UPDATE PRODUCT
export const updateProduct = async (
  userId,
  registerId,
  productId,
  updatedData,
) => {
  const productDoc = doc(
    db,
    "users",
    userId,
    "registers",
    registerId,
    "products",
    productId,
  );

  await updateDoc(productDoc, updatedData);
};
