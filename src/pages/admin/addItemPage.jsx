import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";

export default function AddItemPage() {
  const [productKey, setProductKey] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("audio");
  const [productDimensions, setProductDimensions] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleAddItem() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You are not authorized to add items.");
      return;
    }

    setLoading(true);
    try {
      let imageUrls = [];
      if (productImages.length > 0) {
        imageUrls = await Promise.all(
          productImages.map((file) => mediaUpload(file)),
        );
      }

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/products`,
        {
          key: productKey,
          name: productName,
          price: Number(productPrice) || 0,
          category: productCategory,
          dimensions: productDimensions,
          description: productDescription,
          image: imageUrls,
        },
        { headers: { Authorization: "Bearer " + token } },
      );
      toast.success("Item added successfully!", { icon: "✅" });
      navigate("/admin/items");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to add item");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-2xl animate-fade-in">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
        Add New Item
      </h1>

      <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-premium p-8 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Product Key *
            </label>
            <input
              type="text"
              placeholder="e.g. mic-01"
              value={productKey}
              onChange={(e) => setProductKey(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Name *
            </label>
            <input
              type="text"
              placeholder="Product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
              required
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Price
            </label>
            <input
              type="number"
              placeholder="0"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Category
            </label>
            <select
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all bg-white"
            >
              <option value="audio">Audio</option>
              <option value="lights">Lights</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Dimensions
          </label>
          <input
            type="text"
            placeholder="e.g. 10x20 cm"
            value={productDimensions}
            onChange={(e) => setProductDimensions(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Description
          </label>
          <textarea
            placeholder="Product description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all resize-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Images
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setProductImages(Array.from(e.target.files || []))}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 dark:bg-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-accent/10 file:text-accent file:font-semibold file:cursor-pointer hover:file:bg-accent/20 transition-all"
          />
        </div>
        <div className="flex gap-4 pt-4">
          <button
            onClick={handleAddItem}
            disabled={loading}
            className="flex-1 py-3.5 rounded-xl bg-accent text-white font-semibold hover:bg-accent-dark hover:shadow-glow transition-all duration-300 btn-premium disabled:opacity-70"
          >
            {loading ? "Adding…" : "Add Item"}
          </button>
          <button
            onClick={() => navigate("/admin/items")}
            className="px-8 py-3.5 rounded-xl border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold hover:border-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
