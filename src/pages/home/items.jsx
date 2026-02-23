import axios from "axios";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import ProductCard from "../../components/productCard";

export default function Items() {
  const [state, setState] = useState("loading");
  const [items, setItems] = useState([]);
  const containerRef = useRef(null);

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

  useEffect(() => {
    if (state === "success" && items.length > 0) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, idx) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                entry.target.classList.add("animate-scale-in");
                entry.target.style.opacity = "1";
              }, idx * 100);
            }
          });
        },
        { threshold: 0.1 },
      );

      const cards = containerRef.current?.querySelectorAll(".product-card");
      cards?.forEach((card) => observer.observe(card));

      return () => observer.disconnect();
    }
  }, [state, items]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in-down">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3">
            Our Collection
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Premium audio and lighting equipment for every need
          </p>
        </div>

        {state === "loading" && (
          <div className="flex justify-center items-center py-32">
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

        {state === "error" && (
          <div className="rounded-3xl bg-white dark:bg-slate-800 border-2 border-red-200 dark:border-red-900/50 p-12 text-center max-w-md mx-auto animate-scale-in">
            <div className="text-5xl mb-4">⚠️</div>
            <p className="text-red-600 dark:text-red-400 font-semibold text-lg mb-2">
              Could not load products
            </p>
            <p className="text-slate-600 dark:text-slate-400">
              Check your connection and try again
            </p>
          </div>
        )}

        {state === "success" && items.length === 0 && (
          <div className="rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-16 text-center animate-fade-in">
            <div className="text-5xl mb-4">📦</div>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              No products available yet. Check back soon.
            </p>
          </div>
        )}

        {state === "success" && items.length > 0 && (
          <div
            ref={containerRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
          >
            {items.map((item, idx) => (
              <div key={item.key} className="product-card opacity-0">
                <ProductCard item={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
