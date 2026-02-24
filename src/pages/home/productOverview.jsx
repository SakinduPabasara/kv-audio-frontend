import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import ImageSlider from "../../components/imageSlider";
import Reviews from "../../components/reviews";
import { addToCart } from "../../utils/cart";
import {
  HiArrowLeft,
  HiShoppingCart,
  HiCheckCircle,
  HiHome,
  HiChevronRight,
  HiArrowRight,
} from "react-icons/hi";
import { motion } from "framer-motion";
import {
  fadeUp,
  fadeLeft,
  fadeRight,
  staggerContainer,
  viewportOnce,
} from "../../utils/animations";

const included = [
  "Professional setup & teardown",
  "On-site technical support available",
  "Delivery island-wide, Sri Lanka",
  "Quality checked before every rental",
];

export default function ProductOverview() {
  const { key } = useParams();
  const [status, setStatus] = useState("loading");
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${key}`)
      .then((res) => {
        setProduct(res.data);
        setStatus("loaded");
      })
      .catch(() => setStatus("error"));
  }, [key]);

  return (
    <main className="min-h-screen bg-primary dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14">

        {/* ── Loading ── */}
        {status === "loading" && (
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 mb-12 animate-pulse">
            <div className="aspect-square rounded-xl bg-slate-200 dark:bg-slate-800" />
            <div className="space-y-4 py-4">
              <div className="h-3 w-24 rounded-full skeleton" />
              <div className="h-8 w-3/4 rounded-lg skeleton" />
              <div className="h-8 w-1/3 rounded-lg skeleton" />
              <div className="h-4 rounded-md skeleton" />
              <div className="h-4 w-4/5 rounded-md skeleton" />
              <div className="h-4 w-3/4 rounded-md skeleton" />
            </div>
          </div>
        )}

        {/* ── Error ── */}
        {status === "error" && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="border border-red-200 dark:border-red-900 bg-white dark:bg-slate-900 rounded-xl p-12 text-center max-w-sm mx-auto"
          >
            <h1 className="font-heading text-lg font-bold text-slate-900 dark:text-white mb-3">
              Could not load this product
            </h1>
            <Link
              to="/items"
              className="inline-flex items-center gap-1.5 text-sm text-cta font-medium hover:underline"
            >
              <HiArrowLeft className="w-4 h-4" />
              Back to shop
            </Link>
          </motion.div>
        )}

        {/* ── Loaded ── */}
        {status === "loaded" && (
          <>
            {/* Breadcrumb */}
            <motion.nav
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 mb-8"
            >
              <Link to="/" className="flex items-center gap-1 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
                <HiHome className="w-3.5 h-3.5" />
                Home
              </Link>
              <HiChevronRight className="w-3.5 h-3.5" />
              <Link to="/items" className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
                Shop
              </Link>
              <HiChevronRight className="w-3.5 h-3.5" />
              <span className="text-slate-700 dark:text-slate-300 font-medium line-clamp-1">
                {product.name}
              </span>
            </motion.nav>

            {/* Main grid */}
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 mb-16">

              {/* Image panel */}
              <motion.div variants={fadeLeft} initial="hidden" animate="show">
                <div className="rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-lg aspect-square max-h-[580px]">
                  <ImageSlider images={product.image} />
                </div>
              </motion.div>

              {/* Details panel */}
              <motion.div
                variants={staggerContainer(0.1)}
                initial="hidden"
                animate="show"
                className="flex flex-col"
              >
                {/* Category + availability */}
                <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold text-cta uppercase tracking-widest">
                    {product.category}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
                      product.availability
                        ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${product.availability ? "bg-emerald-500" : "bg-slate-400"}`} />
                    {product.availability ? "In Stock" : "Currently Unavailable"}
                  </span>
                </motion.div>

                {/* Name */}
                <motion.h1
                  variants={fadeUp}
                  className="font-heading text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 leading-tight"
                >
                  {product.name}
                </motion.h1>

                {/* Price */}
                <motion.div variants={fadeUp} className="flex items-baseline gap-2 mb-6">
                  <p className="font-heading text-3xl font-bold text-slate-900 dark:text-white">
                    {typeof product.price === "number"
                      ? `Rs. ${product.price.toLocaleString()}`
                      : product.price}
                  </p>
                  <span className="text-sm text-slate-400">/ day</span>
                </motion.div>

                {/* Description */}
                <motion.p
                  variants={fadeUp}
                  className="text-slate-500 dark:text-slate-400 mb-6 leading-relaxed"
                >
                  {product.description}
                </motion.p>

                {/* Dimensions */}
                {product.dimensions && (
                  <motion.div
                    variants={fadeUp}
                    className="mb-6 px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center gap-3"
                  >
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest shrink-0">
                      Dimensions
                    </p>
                    <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                      {product.dimensions}
                    </p>
                  </motion.div>
                )}

                {/* What's included */}
                <motion.div variants={fadeUp} className="mb-8">
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">
                    What's included
                  </p>
                  <ul className="space-y-2">
                    {included.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                        <HiCheckCircle className="w-4 h-4 text-cta shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Actions */}
                <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mt-auto">
                  <button
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-cta text-white font-bold text-sm rounded-lg hover:bg-cta-dark transition-colors shadow-lg shadow-cta/20"
                    onClick={() => {
                      addToCart(product.key, 1);
                      toast.success("Added to cart!");
                    }}
                  >
                    <HiShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                  <Link
                    to="/contact"
                    className="flex items-center justify-center gap-2 px-6 py-3.5 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold text-sm rounded-lg hover:border-cta hover:text-cta dark:hover:border-cta dark:hover:text-cta transition-colors"
                  >
                    Inquire
                    <HiArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* Reviews */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="mt-8 pt-12 border-t border-slate-200 dark:border-slate-800"
            >
              <Reviews productKey={key} showAddForm={true} />
            </motion.div>
          </>
        )}
      </div>
    </main>
  );
}
