import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase/config";

const productCollection = collection(db, "products");

// GET PRODUCTS
export const getProducts = async () => {
  const data = await getDocs(productCollection);

  return data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
};

// ADD PRODUCT
export const addProduct = async (product) => {
  await addDoc(productCollection, product);
};

// DELETE PRODUCT
export const deleteProduct = async (id) => {
  const productDoc = doc(db, "products", id);

  await deleteDoc(productDoc);
};