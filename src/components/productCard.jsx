import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";

export default function ProductCard(props) {
  const item = props.item;
  return (
    <div className="group bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-card hover:shadow-premium transition-all duration-500 overflow-hidden hover:-translate-y-2">
      <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 relative">
        <img
          src={item.image?.[0]}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {item.availability && (
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-semibold shadow-lg animate-fade-in">
            In Stock
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="mb-2">
          <span className="inline-block px-2.5 py-1 rounded-lg bg-accent/10 text-accent text-xs font-semibold uppercase tracking-wider">
            {item.category}
          </span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-accent dark:group-hover:text-accent transition-colors">
          {item.name}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 min-h-[2.5rem]">
          {item.description}
        </p>
        <div className="flex justify-between items-center mb-5">
          <p className="text-2xl font-bold text-accent">
            {typeof item.price === "number"
              ? `Rs. ${item.price.toLocaleString()}`
              : item.price}
          </p>
        </div>
        <Link
          to={"/product/" + item.key}
          className="group/btn flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-accent text-white font-semibold hover:bg-accent-dark hover:shadow-glow transition-all duration-300 btn-premium"
        >
          View Details
          <HiArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
