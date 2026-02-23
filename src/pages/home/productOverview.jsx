import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import ImageSlider from "../../components/imageSlider";
import Reviews from "../../components/reviews";
import { addToCart } from "../../utils/cart";
import { HiArrowLeft, HiShoppingCart } from "react-icons/hi";

export default function ProductOverview() {
  const { key } = useParams();
  const [loadingStatus, setLoadingStatus] = useState("loading");
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${key}`)
      .then((res) => {
        setProduct(res.data);
        setLoadingStatus("loaded");
      })
      .catch(() => setLoadingStatus("error"));
  }, [key]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loadingStatus === "loading" && (
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

        {loadingStatus === "error" && (
          <div className="rounded-3xl bg-white dark:bg-slate-800 border-2 border-red-200 dark:border-red-900/50 p-12 text-center max-w-md mx-auto animate-scale-in">
            <div className="text-5xl mb-4">⚠️</div>
            <h1 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
              Could not load this product
            </h1>
            <Link
              to="/items"
              className="inline-flex items-center gap-2 mt-4 text-accent font-semibold hover:underline"
            >
              <HiArrowLeft className="w-4 h-4" />
              Back to shop
            </Link>
          </div>
        )}

        {loadingStatus === "loaded" && (
          <>
            <Link
              to="/items"
              className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-accent dark:hover:text-accent mb-8 transition-colors group"
            >
              <HiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to shop
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
              {/* Image Section */}
              <div className="animate-slide-in-left">
                <div className="rounded-3xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-premium aspect-square max-h-[600px]">
                  <ImageSlider images={product.image} />
                </div>
              </div>

              {/* Details Section */}
              <div className="flex flex-col justify-center animate-slide-in-right">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1.5 rounded-xl bg-accent/10 text-accent text-sm font-semibold uppercase tracking-wider">
                    {product.category}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                  {product.name}
                </h1>
                <div className="flex items-baseline gap-3 mb-6">
                  <p className="text-4xl font-bold text-accent">
                    {typeof product.price === "number"
                      ? `Rs. ${product.price.toLocaleString()}`
                      : product.price}
                  </p>
                </div>
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                  {product.description}
                </p>

                {product.dimensions && (
                  <div className="mb-8 p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600">
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Dimensions
                    </p>
                    <p className="text-slate-600 dark:text-slate-400">
                      {product.dimensions}
                    </p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    className="group flex-1 flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-accent text-white font-semibold hover:bg-accent-dark hover:shadow-glow transition-all duration-300 btn-premium"
                    onClick={() => {
                      addToCart(product.key, 1);
                      toast.success("Added to cart!", { icon: "🛒" });
                    }}
                  >
                    <HiShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                  <Link
                    to="/contact"
                    className="px-8 py-4 rounded-2xl border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-300 text-center"
                  >
                    Inquire
                  </Link>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-16">
              <Reviews productKey={key} showAddForm={true} />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
