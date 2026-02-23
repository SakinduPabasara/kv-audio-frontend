import { Link } from "react-router-dom";
import { HiHome } from "react-icons/hi";

export default function ErrorNotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 flex items-center justify-center px-4">
      <div className="text-center max-w-md animate-scale-in">
        <div className="text-8xl md:text-9xl font-bold text-accent/10 dark:text-white/10 mb-4">
          404
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
          Page not found
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-10">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-accent text-white font-semibold hover:bg-accent-dark hover:shadow-glow transition-all duration-300 btn-premium"
        >
          <HiHome className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </main>
  );
}
