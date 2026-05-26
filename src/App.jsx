import { useEffect, useState } from "react";

import { auth } from "./firebase/config";

import { loginWithGoogle, logoutUser } from "./services/authService";
import LoginScreen from "./components/LoginScreen";

import {
  getProducts,
  addProduct,
  deleteProduct,
} from "./services/productService";

import { onAuthStateChanged } from "firebase/auth";

export default function App() {
  const [user, setUser] = useState(null);

  const [products, setProducts] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
  });

  // AUTH STATE
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        fetchProducts(currentUser.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  // FETCH PRODUCTS
  const fetchProducts = async (userId) => {
    const data = await getProducts(userId);
    setProducts(data);
  };

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ADD PRODUCT
  const handleSubmit = async (e) => {
    e.preventDefault();

    await addProduct(user.uid, {
      ...formData,
      quantity: Number(formData.quantity),
      price: Number(formData.price),
    });

    setFormData({
      name: "",
      category: "",
      quantity: "",
      price: "",
    });

    fetchProducts(user.uid);
  };

  // DELETE PRODUCT
  const handleDelete = async (id) => {
    await deleteProduct(user.uid, id);

    fetchProducts(user.uid);
  };

  // LOGIN SCREEN
  if (!user) {
    return (
      <LoginScreen darkMode={darkMode} loginWithGoogle={loginWithGoogle} />
    );
  }

  // SEARCH FILTER
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  // DASHBOARD STATS
  const totalProducts = products.length;

  const lowStock = products.filter((product) => product.quantity < 5).length;

  return (
    <div
      className={`min-h-screen p-6 transition-all duration-300 ${
        darkMode ? "bg-[#0f172a] text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-5xl font-extrabold text-orange-600">
            Inventerritory
          </h1>

          <p className="mt-2 text-gray-400">Smart Inventory Management</p>
        </div>

        <div className="flex gap-3">
          {/* THEME TOGGLE */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-xl transition"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          {/* LOGOUT */}
          <button
            onClick={logoutUser}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* DASHBOARD */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mb-8">
        <div
          className={`p-6 rounded-2xl shadow-lg border ${
            darkMode
              ? "bg-slate-800 border-slate-700"
              : "bg-white border-gray-200"
          }`}
        >
          <h2 className="text-lg font-medium text-gray-400">Total Products</h2>

          <p className="text-5xl font-bold mt-4 text-orange-600">
            {totalProducts}
          </p>
        </div>
        <div
          className={`p-6 rounded-2xl shadow-lg border ${
            darkMode
              ? "bg-slate-800 border-slate-700"
              : "bg-white border-gray-200"
          }`}
        >
          <h2 className="text-lg font-medium text-gray-400">Low Stock Items</h2>

          <p className="text-5xl font-bold mt-4 text-red-500">{lowStock}</p>
        </div>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className={`p-6 rounded-2xl shadow-lg border mb-8 ${
          darkMode
            ? "bg-slate-800 border-slate-700"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className={`p-3 rounded-xl outline-none border transition ${
              darkMode
                ? "bg-slate-900 border-slate-700 text-white"
                : "bg-white border-gray-300 text-black"
            }`}
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className={`p-3 rounded-xl outline-none border transition ${
              darkMode
                ? "bg-slate-900 border-slate-700 text-white"
                : "bg-white border-gray-300 text-black"
            }`}
            required
          />

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            className={`p-3 rounded-xl outline-none border transition ${
              darkMode
                ? "bg-slate-900 border-slate-700 text-white"
                : "bg-white border-gray-300 text-black"
            }`}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className={`p-3 rounded-xl outline-none border transition ${
              darkMode
                ? "bg-slate-900 border-slate-700 text-white"
                : "bg-white border-gray-300 text-black"
            }`}
            required
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl transition"
        >
          Add Product
        </button>
      </form>

      {/* SEARCH */}
      <div
        className={`w-full p-3 rounded-xl border outline-none ${
          darkMode
            ? "bg-slate-800 border-slate-700 text-white"
            : "bg-white border-gray-700 text-black"
        }`}
      >
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-3 rounded "
        />
      </div>

      {/* TABLE */}
      <div
        className={`rounded-2xl overflow-hidden shadow-lg border my-6 ${
          darkMode
            ? "bg-slate-800 border-slate-700"
            : "bg-white border-gray-200"
        }`}
      >
        <table className="w-full">
          <thead className="bg-orange-600 text-white">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Quantity</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => (
              <tr
                key={product.id}
                className={`border-b transition hover:bg-orange-600/10 ${
                  darkMode ? "border-slate-700" : "border-gray-200"
                }`}
              >
                <td className="p-4">{product.name}</td>

                <td className="p-4">{product.category}</td>

                <td className="p-4">{product.quantity}</td>

                <td className="p-4">₹{product.price}</td>

                <td className="p-4">
                  {product.quantity < 5 ? (
                    <span className="text-red-500 font-semibold">
                      Low Stock
                    </span>
                  ) : (
                    <span className="text-green-600 font-semibold">
                      In Stock
                    </span>
                  )}
                </td>

                <td className="p-4">
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
