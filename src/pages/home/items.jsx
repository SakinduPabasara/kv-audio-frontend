import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../../components/productCard";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "../../utils/animations";
import { HiSearch, HiX } from "react-icons/hi";

/* ── Skeleton card ────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
      <div className="aspect-[4/3] skeleton" />
      <div className="p-5 space-y-3">
        <div className="skeleton h-3 w-20 rounded-full" />
        <div className="skeleton h-5 w-3/4 rounded-md" />
        <div className="skeleton h-3 w-full rounded-md" />
        <div className="skeleton h-3 w-2/3 rounded-md" />
        <div className="mt-4 skeleton h-10 w-full rounded-lg" />
      </div>
    </div>
  );
}

export default function Items() {
  const [state, setState] = useState("loading");
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/products`)
      .then((res) => {
        setItems(res.data);
        setState("success");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error || "Failed to fetch items");
        setState("error");
      });
  }, []);

  // Derive unique categories from items
  const categories = [
    "All",
    ...Array.from(new Set(items.map((i) => i.category).filter(Boolean))),
  ];

  // Filter logic
  const filtered = items.filter((item) => {
    const matchSearch =
      !search ||
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase()) ||
      item.category?.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      activeCategory === "All" || item.category === activeCategory;
    return matchSearch && matchCategory;
  });

  return (
    <main className="min-h-screen bg-primary dark:bg-gray-950">
      {/* ── Page header ── */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <motion.div variants={fadeUp} initial="hidden" animate="show">
            <p className="text-xs font-bold text-cta uppercase tracking-widest mb-2">Shop</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2">
              Our Collection
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              Premium audio and lighting equipment for every event.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

        {/* ── Search + filters ── */}
        {state === "success" && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center"
          >
            {/* Search bar */}
            <div className="relative w-full sm:w-72">
              <HiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search equipment…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg pl-10 pr-10 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-cta focus:ring-2 focus:ring-cta/20 transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
                >
                  <HiX className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category chips */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all duration-150 ${
                    activeCategory === cat
                      ? "bg-cta text-white border-cta"
                      : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-cta hover:text-cta dark:hover:border-cta dark:hover:text-cta bg-white dark:bg-slate-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Results count */}
            <span className="ml-auto text-sm text-slate-400 dark:text-slate-500 whitespace-nowrap shrink-0">
              {filtered.length} {filtered.length === 1 ? "item" : "items"}
            </span>
          </motion.div>
        )}

        {/* ── Loading skeletons ── */}
        {state === "loading" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* ── Error ── */}
        {state === "error" && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="border border-red-200 dark:border-red-900 bg-white dark:bg-slate-900 rounded-xl p-12 text-center max-w-sm mx-auto"
          >
            <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-4">
              <HiX className="w-6 h-6 text-red-500" />
            </div>
            <p className="text-slate-900 dark:text-white font-semibold mb-1">
              Could not load products
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Check your connection and try again.
            </p>
          </motion.div>
        )}

        {/* ── Empty (no results) ── */}
        {state === "success" && filtered.length === 0 && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-xl py-20 text-center"
          >
            <p className="font-semibold text-slate-900 dark:text-white mb-1">
              {items.length === 0 ? "No products yet" : "No results found"}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {items.length === 0
                ? "Check back soon for new arrivals."
                : `No equipment matches "${search}" in ${activeCategory === "All" ? "any category" : activeCategory}.`}
            </p>
            {items.length > 0 && (
              <button
                onClick={() => { setSearch(""); setActiveCategory("All"); }}
                className="mt-4 text-sm text-cta font-semibold hover:underline"
              >
                Clear filters
              </button>
            )}
          </motion.div>
        )}

        {/* ── Products grid ── */}
        {state === "success" && filtered.length > 0 && (
          <AnimatePresence mode="popLayout">
            <motion.div
              variants={staggerContainer(0.06)}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6"
            >
              {filtered.map((item) => (
                <ProductCard key={item.key} item={item} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </main>
  );
}
