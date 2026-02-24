import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HiMenu,
  HiX,
  HiShoppingCart,
  HiUser,
  HiMoon,
  HiSun,
  HiArrowRight,
} from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { loadCart } from "../utils/cart";
import { useTheme } from "../utils/theme";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/items", label: "Shop" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const { dark, toggle } = useTheme();

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [location]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const update = () => {
      const cart = loadCart();
      setCartCount(cart.orderedItems.length);
    };
    update();
    window.addEventListener("storage", update);
    const id = setInterval(update, 1000);
    return () => { window.removeEventListener("storage", update); clearInterval(id); };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try { setUser(JSON.parse(atob(token.split(".")[1]))); }
      catch { setUser(null); }
    } else { setUser(null); }
  }, [location]);

  const isActive = (to) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm border-b border-slate-200/80 dark:border-slate-800/80 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">

            {/* ── Logo ── */}
            <Link to="/" className="flex items-center gap-3 shrink-0 group">
              <div className="w-9 h-9 rounded-lg bg-cta flex items-center justify-center shrink-0 group-hover:bg-cta-dark transition-colors duration-150">
                <svg viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-4">
                  <rect x="0" y="8" width="4" height="12" rx="1" fill="white"/>
                  <rect x="6" y="4" width="4" height="16" rx="1" fill="white"/>
                  <rect x="12" y="0" width="4" height="20" rx="1" fill="white"/>
                  <rect x="18" y="4" width="4" height="16" rx="1" fill="white"/>
                  <rect x="24" y="8" width="4" height="12" rx="1" fill="white"/>
                </svg>
              </div>
              <div className="leading-none">
                <span className="font-heading font-bold text-[17px] text-slate-900 dark:text-white block tracking-tight">
                  Waudio
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest hidden sm:block mt-0.5">
                  Sound &amp; Lighting
                </span>
              </div>
            </Link>

            {/* ── Desktop Nav — pill style ── */}
            <nav className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-800/60 rounded-full px-2 py-1.5">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-150 ${
                    isActive(to)
                      ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {label}
                  {isActive(to) && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white dark:bg-slate-700 shadow-sm -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* ── Actions ── */}
            <div className="flex items-center gap-1">
              {/* Dark mode toggle */}
              <button
                type="button"
                onClick={toggle}
                className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
                aria-label="Toggle dark mode"
              >
                {dark ? <HiSun className="w-4.5 h-4.5" /> : <HiMoon className="w-4.5 h-4.5" />}
              </button>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <HiShoppingCart className="w-4.5 h-4.5" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      key="badge"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-cta text-white text-[10px] font-bold flex items-center justify-center"
                    >
                      {cartCount > 9 ? "9+" : cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>

              {/* Sign in / Dashboard — CTA pill */}
              {user ? (
                <Link
                  to="/dashboard"
                  className="hidden sm:inline-flex items-center gap-1.5 ml-1 px-4 py-1.5 text-sm font-semibold bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full hover:bg-cta dark:hover:bg-cta dark:hover:text-white transition-colors duration-150"
                >
                  <HiUser className="w-3.5 h-3.5" />
                  {user.name?.split(" ")[0] || "Dashboard"}
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="hidden sm:inline-flex items-center gap-1.5 ml-1 px-4 py-1.5 text-sm font-semibold bg-cta text-white rounded-full hover:bg-cta-dark transition-colors duration-150"
                >
                  Sign in
                  <HiArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}

              {/* Mobile hamburger */}
              <button
                type="button"
                className="md:hidden p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ml-1"
                onClick={() => setMobileOpen((o) => !o)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <HiX className="w-5 h-5" /> : <HiMenu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-white dark:bg-gray-950 shadow-2xl md:hidden flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 h-16 border-b border-slate-200 dark:border-slate-800">
                <span className="font-heading font-bold text-slate-900 dark:text-white">Menu</span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <HiX className="w-5 h-5" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
                {navLinks.map(({ to, label }, i) => (
                  <motion.div
                    key={to}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.05 }}
                  >
                    <Link
                      to={to}
                      className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        isActive(to)
                          ? "bg-cta/10 text-cta font-semibold"
                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
                  <Link
                    to="/cart"
                    className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <HiShoppingCart className="w-4 h-4" />
                    Cart {cartCount > 0 && <span className="ml-auto w-5 h-5 rounded-full bg-cta text-white text-[10px] font-bold flex items-center justify-center">{cartCount}</span>}
                  </Link>
                </motion.div>
              </nav>

              {/* Bottom CTA */}
              <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                {user ? (
                  <Link
                    to="/dashboard"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-sm rounded-lg transition-colors"
                  >
                    <HiUser className="w-4 h-4" />
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-cta text-white font-semibold text-sm rounded-lg hover:bg-cta-dark transition-colors"
                  >
                    Sign in
                    <HiArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
