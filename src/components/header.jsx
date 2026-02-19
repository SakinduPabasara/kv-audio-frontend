import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiMenu, HiX, HiShoppingCart, HiUser } from "react-icons/hi";
import { loadCart } from "../utils/cart";

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
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = loadCart();
      setCartCount(cart.orderedItems.length);
    };
    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    const interval = setInterval(updateCartCount, 1000);
    return () => {
      window.removeEventListener("storage", updateCartCount);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser(payload);
      } catch (e) {
        console.error("Token decode error:", e);
      }
    } else {
      setUser(null);
    }
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white/95 backdrop-blur-xl shadow-soft py-3" : "bg-white/80 backdrop-blur-md py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center gap-3 group shrink-0 animate-fade-in"
          >
            <div className="relative">
              <img
                src="/logo.png"
                alt="Wave Audio"
                className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-full ring-2 ring-accent/10 group-hover:ring-accent/30 transition-all duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div>
              <span className="font-bold text-lg md:text-xl text-accent block leading-tight">Wave Audio</span>
              <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider hidden sm:block">Premium Sound</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            {navLinks.map(({ to, label }, idx) => (
              <Link
                key={to}
                to={to}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  location.pathname === to || (to !== "/" && location.pathname.startsWith(to))
                    ? "text-accent"
                    : "text-slate-600 hover:text-accent"
                }`}
                style={{ animationDelay: `${0.1 + idx * 0.05}s` }}
              >
                {label}
                {(location.pathname === to || (to !== "/" && location.pathname.startsWith(to))) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full animate-scale-in" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Link
              to="/cart"
              className="relative p-2 rounded-lg text-slate-700 hover:text-accent hover:bg-slate-100/50 transition-colors"
            >
              <HiShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center animate-scale-in">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>
            {user ? (
              <Link
                to="/dashboard"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 hover:text-accent transition-colors rounded-lg hover:bg-slate-100/50"
              >
                <HiUser className="w-5 h-5" />
                Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 hover:text-accent transition-colors rounded-lg hover:bg-slate-100/50"
              >
                Sign in
              </Link>
            )}
            <button
              type="button"
              className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200/80 bg-white/95 backdrop-blur-xl animate-fade-in-down">
          <nav className="px-4 py-4 space-y-1">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`block px-4 py-3 rounded-xl font-medium transition-all ${
                  location.pathname === to
                    ? "bg-accent/10 text-accent"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link
              to="/cart"
              className="block px-4 py-3 rounded-xl font-medium text-slate-700 hover:bg-slate-100 flex items-center gap-2"
              onClick={() => setMobileOpen(false)}
            >
              <HiShoppingCart className="w-5 h-5" />
              Cart {cartCount > 0 && `(${cartCount})`}
            </Link>
            {user ? (
              <Link
                to="/dashboard"
                className="block px-4 py-3 rounded-xl font-medium text-slate-700 hover:bg-slate-100"
                onClick={() => setMobileOpen(false)}
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                className="block px-4 py-3 rounded-xl font-medium text-slate-700 hover:bg-slate-100"
                onClick={() => setMobileOpen(false)}
              >
                Sign in
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
