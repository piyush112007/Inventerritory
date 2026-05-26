import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

import { ArrowLeft, Moon, Sun, Package } from "lucide-react";

import {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
} from "../services/productService";

import { doc, getDoc } from "firebase/firestore";

import { db } from "../firebase/config";

export default function RegisterPage({ darkMode, setDarkMode }) {
  const { registerId } = useParams();

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("inventoryUser"));

  const [registerName, setRegisterName] = useState("");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const categories = [...new Set(products.map((product) => product.category))];

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  const [minPrice, setMinPrice] = useState("");

  const [maxPrice, setMaxPrice] = useState("");

  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
  });

  // FETCH REGISTER
  const fetchRegister = async () => {
    const registerRef = doc(db, "users", user.uid, "registers", registerId);

    const registerSnap = await getDoc(registerRef);

    if (registerSnap.exists()) {
      setRegisterName(registerSnap.data().name);
    }
  };

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    setLoading(true);

    const data = await getProducts(user.uid, registerId);

    setProducts(data);

    setLoading(false);
  };

  useEffect(() => {
    fetchRegister();
    fetchProducts();
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      ...formData,
      quantity: Number(formData.quantity),
      price: Number(formData.price),
    };

    if (editingProduct) {
      await updateProduct(user.uid, registerId, editingProduct.id, productData);

      setEditingProduct(null);
      toast.success("Product Updated");
    } else {
      await addProduct(user.uid, registerId, productData);
      toast.success("Product Added");
    }

    setFormData({
      name: "",
      category: "",
      quantity: "",
      price: "",
    });

    fetchProducts();
  };

  // DELETE
  const handleDelete = async (id) => {
    await deleteProduct(user.uid, registerId, id);
    toast.success("Product Deleted");
    fetchProducts();
  };

  // EDIT
  const handleEdit = (product) => {
    setEditingProduct(product);

    setFormData({
      name: product.name,
      category: product.category,
      quantity: product.quantity,
      price: product.price,
    });
  };

  // FILTER
  const filteredProducts = products.filter((product) => {
    // SEARCH
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    // CATEGORY
    const matchesCategory =
      categoryFilter === "" || product.category === categoryFilter;

    // STATUS
    const matchesStatus =
      statusFilter === "" ||
      // IN STOCK
      (statusFilter === "in-stock" && product.quantity >= 5) ||
      // LOW STOCK
      (statusFilter === "low-stock" &&
        product.quantity > 0 &&
        product.quantity < 5) ||
      // OUT OF STOCK
      (statusFilter === "out-of-stock" && product.quantity === 0);

    // MIN PRICE
    const matchesMinPrice =
      minPrice === "" || product.price >= Number(minPrice);

    // MAX PRICE
    const matchesMaxPrice =
      maxPrice === "" || product.price <= Number(maxPrice);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesStatus &&
      matchesMinPrice &&
      matchesMaxPrice
    );
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* HEADER */}
      <div className="flex justify-between items-start mb-10">
        <div className="flex items-center gap-4">
          {/* BACK BUTTON */}
          <button
            onClick={() => navigate("/")}
            className={`p-3 rounded-2xl transition shadow-lg ${
              darkMode
                ? "bg-slate-800 hover:bg-slate-700"
                : "bg-white hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <ArrowLeft size={22} />
          </button>

          {/* TITLE */}
          <div>
            <h1 className="text-5xl font-black text-orange-600">
              {registerName}
            </h1>

            <p
              className={`mt-2 ${
                darkMode ? "text-slate-400" : "text-gray-500"
              }`}
            >
              Inventory Register
            </p>
          </div>
        </div>

        {/* THEME TOGGLE */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-orange-600 hover:bg-orange-700 w-14 h-14 rounded-2xl transition flex items-center justify-center shadow-lg text-white"
        >
          {darkMode ? (
            <Sun size={22} strokeWidth={2.5} />
          ) : (
            <Moon size={22} strokeWidth={2.5} />
          )}
        </button>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className={`p-6 rounded-3xl border shadow-xl backdrop-blur-xl mb-8 transition ${
          darkMode
            ? "bg-slate-900 border-slate-800"
            : "bg-[#f8fafc] border-gray-200"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            name="name"
            required
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className={`p-4 rounded-2xl border outline-none transition ${
              darkMode
                ? "bg-slate-800 border-slate-700 text-white"
                : "bg-white border-gray-300 text-black shadow-sm"
            }`}
          />

          <div className="relative">
            <input
              type="text"
              name="category"
              list="categories"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full p-4 rounded-2xl border outline-none transition ${
                darkMode
                  ? "bg-slate-800 border-slate-700 text-white"
                  : "bg-white border-gray-300 text-black shadow-sm"
              }`}
            />

            <datalist id="categories">
              {categories.map((category) => (
                <option key={category} value={category} />
              ))}
            </datalist>
          </div>

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            min="0"
            value={formData.quantity}
            onChange={handleChange}
            className={`p-4 rounded-2xl border outline-none transition ${
              darkMode
                ? "bg-slate-800 border-slate-700 text-white"
                : "bg-white border-gray-300 text-black shadow-sm"
            }`}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            min="0"
            value={formData.price}
            onChange={handleChange}
            className={`p-4 rounded-2xl border outline-none transition ${
              darkMode
                ? "bg-slate-800 border-slate-700 text-white"
                : "bg-white border-gray-300 text-black shadow-sm"
            }`}
          />
        </div>

        <button className="mt-5 bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-2xl font-semibold transition text-white shadow-lg">
          {editingProduct ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* FILTERS */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`p-4 rounded-2xl border outline-none transition ${
            darkMode
              ? "bg-slate-900 border-slate-800 text-white"
              : "bg-white border-gray-300 text-black shadow-sm"
          }`}
        />

        {/* CATEGORY */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className={`p-4 rounded-2xl border outline-none transition ${
            darkMode
              ? "bg-slate-900 border-slate-800 text-white"
              : "bg-white border-gray-300 text-black shadow-sm"
          }`}
        >
          <option value="">All Categories</option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* STATUS */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={`p-4 rounded-2xl border outline-none transition ${
            darkMode
              ? "bg-slate-900 border-slate-800 text-white"
              : "bg-white border-gray-300 text-black shadow-sm"
          }`}
        >
          <option value="">All Status</option>

          <option value="in-stock">In Stock</option>

          <option value="low-stock">Low Stock</option>

          <option value="out-of-stock">Out of Stock</option>
        </select>

        {/* MIN PRICE */}
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          min="0"
          onChange={(e) => setMinPrice(e.target.value)}
          className={`p-4 rounded-2xl border outline-none transition ${
            darkMode
              ? "bg-slate-900 border-slate-800 text-white"
              : "bg-white border-gray-300 text-black shadow-sm"
          }`}
        />

        {/* MAX PRICE */}
        <input
          type="number"
          min="0"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className={`p-4 rounded-2xl border outline-none transition ${
            darkMode
              ? "bg-slate-900 border-slate-800 text-white"
              : "bg-white border-gray-300 text-black shadow-sm"
          }`}
        />
      </div>

      {/* TABLE */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-14 h-14 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div
          className={`overflow-hidden rounded-3xl border shadow-xl backdrop-blur-xl transition ${
            darkMode
              ? "bg-slate-900 border-slate-800"
              : "bg-[#f8fafc] border-gray-200"
          }`}
        >
          <table className="w-full">
            <thead className="bg-orange-600 text-white">
              <tr>
                <th className="p-4 text-left w-[30%]">Name</th>

                <th className="p-4 text-left">Category</th>

                <th className="p-4 text-left">Quantity</th>

                <th className="p-4 text-left">Price</th>

                <th className="p-4 text-left">Status</th>

                <th className="p-4 text-left w-[180px]">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className={`border-b transition ${
                    darkMode
                      ? "border-slate-800 hover:bg-slate-800/50"
                      : "border-gray-200 hover:bg-orange-50"
                  }`}
                >
                  <td className="p-4 font-semibold">{product.name}</td>

                  <td className="p-4">{product.category}</td>

                  <td className="p-4">{product.quantity}</td>

                  <td className="p-4">₹{product.price}</td>

                  <td className="p-4">
                    {product.quantity === 0 ? (
                      <span className="text-red-600 font-semibold">
                        Out of Stock
                      </span>
                    ) : product.quantity < 5 ? (
                      <span className="text-yellow-500 font-semibold">
                        Low Stock
                      </span>
                    ) : (
                      <span className="text-green-500 font-semibold">
                        In Stock
                      </span>
                    )}
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-xl transition text-white"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(product.id)}
                        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl transition text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* EMPTY STATE */}
          {filteredProducts.length === 0 && (
            <div className="p-20 text-center">
              <Package size={60} className="mx-auto text-orange-600 mb-4" />

              <h2 className="text-2xl font-bold">No Products Yet</h2>

              <p
                className={`mt-2 ${
                  darkMode ? "text-slate-400" : "text-gray-500"
                }`}
              >
                Add your first product.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
