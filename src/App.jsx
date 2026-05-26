import { useEffect, useState } from "react";

import {
  getProducts,
  addProduct,
  deleteProduct,
} from "./services/productService";

export default function App() {
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
  });

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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

    await addProduct({
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

    fetchProducts();
  };

  // DELETE PRODUCT
  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchProducts();
  };

  // SEARCH FILTER
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // DASHBOARD STATS
  const totalProducts = products.length;

  const lowStock = products.filter(
    (product) => product.quantity < 5
  ).length;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <h1 className="text-4xl font-bold text-center mb-8">
        Inventerritory
      </h1>

      {/* DASHBOARD */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Total Products</h2>
          <p className="text-3xl font-bold mt-2">
            {totalProducts}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Low Stock Items</h2>
          <p className="text-3xl font-bold mt-2 text-red-500">
            {lowStock}
          </p>
        </div>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
        >
          Add Product
        </button>
      </form>

      {/* SEARCH */}
      <div className="max-w-4xl mx-auto mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-3 rounded"
        />
      </div>

      {/* TABLE */}
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-black text-white">
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
              <tr key={product.id} className="border-b">
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
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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