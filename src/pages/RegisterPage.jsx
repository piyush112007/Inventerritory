import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
} from "../services/productService";

export default function RegisterPage() {
  const { registerId } = useParams();

  const user = JSON.parse(localStorage.getItem("inventoryUser"));

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
  });

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    const data = await getProducts(user.uid, registerId);

    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // INPUT CHANGE
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

    // UPDATE
    if (editingProduct) {
      await updateProduct(user.uid, registerId, editingProduct.id, productData);

      setEditingProduct(null);
    }

    // ADD
    else {
      await addProduct(user.uid, registerId, productData);
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
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-6">
      {/* TITLE */}
      <h1 className="text-5xl font-black text-orange-600 mb-10">
        Register Inventory
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 border border-slate-700 p-6 rounded-3xl mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className="bg-slate-800 border border-slate-700 p-4 rounded-2xl"
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="bg-slate-800 border border-slate-700 p-4 rounded-2xl"
          />

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="bg-slate-800 border border-slate-700 p-4 rounded-2xl"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="bg-slate-800 border border-slate-700 p-4 rounded-2xl"
          />
        </div>

        <button className="mt-5 bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-2xl font-semibold">
          {editingProduct ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-slate-900 border border-slate-700 p-4 rounded-2xl mb-8"
      />

      {/* TABLE */}
      <div className="overflow-hidden rounded-3xl border border-slate-700">
        <table className="w-full">
          <thead className="bg-orange-600">
            <tr>
              <th className="p-4 text-left w-[30%]">Name</th>

              <th className="p-4 text-left">Category</th>

              <th className="p-4 text-left">Quantity</th>

              <th className="p-4 text-left">Price</th>

              <th className="p-4 text-left">Status</th>

              <th className="p-4 text-left w-45">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => (
              <tr
                key={product.id}
                className="border-b border-slate-700 hover:bg-orange-600/10 transition"
              >
                <td className="p-4 font-semibold">{product.name}</td>

                <td className="p-4">{product.category}</td>

                <td className="p-4">{product.quantity}</td>

                <td className="p-4">₹{product.price}</td>

                <td className="p-4">
                  {product.quantity < 5 ? (
                    <span className="text-red-500 font-semibold">
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
                      className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-xl"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
