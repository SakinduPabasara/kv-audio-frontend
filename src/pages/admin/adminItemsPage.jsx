import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export default function AdminItemsPage() {
  const [items, setItems] = useState([]);
  const [itemsLoaded, setItemsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!itemsLoaded) {
      const token = localStorage.getItem("token");
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/products`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setItems(res.data);
          setItemsLoaded(true);
        })
        .catch(() => setItemsLoaded(true));
    }
  }, [itemsLoaded]);

  const handleDelete = (itemKey) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    setItems((prev) => prev.filter((item) => item.key !== itemKey));
    const token = localStorage.getItem("token");
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/${itemKey}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => setItemsLoaded(false))
      .catch((err) => console.error("Delete failed:", err));
  };

  return (
    <div className="p-6 md:p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
            Items
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage your product catalog
          </p>
        </div>
        <Link
          to="/admin/items/add"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-semibold hover:bg-accent-dark hover:shadow-glow transition-all duration-300 btn-premium"
        >
          <CiCirclePlus className="w-5 h-5" />
          Add Item
        </Link>
      </div>

      {!itemsLoaded && (
        <div className="flex justify-center py-32">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
            <div
              className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-gold/30 rounded-full animate-spin"
              style={{
                animationDirection: "reverse",
                animationDuration: "1.5s",
              }}
            />
          </div>
        </div>
      )}

      {itemsLoaded && (
        <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-premium overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700/50 dark:to-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Key
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Availability
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {items.map((product, idx) => (
                  <tr
                    key={product.key}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors animate-fade-in-up"
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    <td className="px-6 py-4 text-sm font-mono text-slate-600 dark:text-slate-400">
                      {product.key}
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">
                      {product.price}
                    </td>
                    <td className="px-6 py-4 text-sm capitalize text-slate-600 dark:text-slate-400">
                      {product.category}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${product.availability ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"}`}
                      >
                        {product.availability ? "Available" : "Unavailable"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() =>
                            navigate("/admin/items/edit", { state: product })
                          }
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent/10 text-accent text-sm font-semibold hover:bg-accent/20 transition-all duration-200"
                        >
                          <FaEdit className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.key)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-semibold hover:bg-red-100 dark:hover:bg-red-900/50 transition-all duration-200"
                        >
                          <FaTrashAlt className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {itemsLoaded && items.length === 0 && (
            <div className="p-16 text-center text-slate-500 dark:text-slate-400">
              <div className="text-5xl mb-4">📦</div>
              <p>No items yet. Add your first product.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
