import { Link } from "react-router-dom";
import { HiArrowRight, HiCheckCircle } from "react-icons/hi";
import { motion } from "framer-motion";
import { fadeUp } from "../utils/animations";

export default function ProductCard({ item }) {
  const price =
    typeof item.price === "number"
      ? `Rs. ${item.price.toLocaleString()}`
      : item.price;

  return (
    <motion.div
      variants={fadeUp}
      className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/8"
    >
      {/* ── Image ── */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={item.image?.[0]}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Availability badge */}
        <div
          className={`absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide backdrop-blur-sm ${
            item.availability
              ? "bg-emerald-500/90 text-white"
              : "bg-slate-800/80 text-slate-300"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              item.availability ? "bg-white" : "bg-slate-400"
            }`}
          />
          {item.availability ? "In Stock" : "Unavailable"}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="p-5 flex flex-col flex-1">
        {/* Category */}
        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">
          {item.category}
        </p>

        {/* Name */}
        <h2 className="font-heading text-base font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-cta transition-colors duration-150">
          {item.name}
        </h2>

        {/* Description */}
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed flex-1 mb-4">
          {item.description}
        </p>

        {/* Price row */}
        <div className="flex items-baseline justify-between mb-4">
          <p className="font-heading text-xl font-bold text-slate-900 dark:text-white">
            {price}
          </p>
          <span className="text-xs text-slate-400 dark:text-slate-500">/ day</span>
        </div>

        {/* CTA */}
        <Link
          to={"/product/" + item.key}
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-sm font-semibold rounded-lg hover:bg-cta dark:hover:bg-cta dark:hover:text-white transition-colors duration-200"
        >
          View Details
          <HiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}
