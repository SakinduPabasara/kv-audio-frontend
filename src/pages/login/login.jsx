import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import {
  HiLockClosed,
  HiMail,
  HiEye,
  HiEyeOff,
  HiArrowRight,
  HiCheckCircle,
  HiMicrophone,
  HiCalendar,
  HiStar,
} from "react-icons/hi";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../utils/animations";
import { GoogleLogin } from "@react-oauth/google";

const inputBase =
  "w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-cta focus:ring-2 focus:ring-cta/20 transition-all duration-150";

const inputError =
  "border-red-400 dark:border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900/30";

const features = [
  { icon: <HiMicrophone className="w-4 h-4" />, text: "500+ pro equipment items" },
  { icon: <HiCalendar className="w-4 h-4" />, text: "Daily, weekly & event rentals" },
  { icon: <HiStar className="w-4 h-4" />, text: "Expert on-site support team" },
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const remembered = localStorage.getItem("rememberEmail");
    if (remembered) { setEmail(remembered); setRememberMe(true); }
  }, []);

  const validate = () => {
    const e = {};
    if (!email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email";
    if (!password) e.password = "Password is required";
    else if (password.length < 3) e.password = "Password must be at least 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
    setLoading(true);
    setErrors({});
    axios
      .post(`${backendUrl}/api/users/login`, { email, password })
      .then((res) => {
        toast.success("Welcome back!");
        localStorage.setItem("token", res.data.token);
        if (rememberMe) localStorage.setItem("rememberEmail", email);
        else localStorage.removeItem("rememberEmail");
        if (res.data.user?.role === "admin") navigate("/admin");
        else navigate("/");
      })
      .catch((err) => {
        const msg = err.response?.data?.error || "Login failed. Please check your credentials.";
        toast.error(msg);
        if (err.response?.status === 401) setErrors({ password: "Incorrect email or password" });
      })
      .finally(() => setLoading(false));
  }

  async function handleGoogleSuccess(credentialResponse) {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
    try {
      const res = await axios.post(`${backendUrl}/api/users/google-auth`, {
        credential: credentialResponse.credential,
      });
      toast.success("Signed in with Google!");
      localStorage.setItem("token", res.data.token);
      if (res.data.user?.role === "admin") navigate("/admin");
      else navigate("/");
    } catch {
      toast.error("Google sign-in failed. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* ── Left brand panel ── */}
      <div className="hidden lg:flex lg:w-[45%] bg-slate-950 flex-col justify-between p-12">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-cta flex items-center justify-center shrink-0">
            <svg viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-4">
              <rect x="0" y="8" width="4" height="12" rx="1" fill="white"/>
              <rect x="6" y="4" width="4" height="16" rx="1" fill="white"/>
              <rect x="12" y="0" width="4" height="20" rx="1" fill="white"/>
              <rect x="18" y="4" width="4" height="16" rx="1" fill="white"/>
              <rect x="24" y="8" width="4" height="12" rx="1" fill="white"/>
            </svg>
          </div>
          <span className="font-heading font-bold text-lg text-white tracking-tight">Waudio</span>
        </Link>

        <div>
          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            animate="show"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs font-semibold text-cta uppercase tracking-widest mb-4"
            >
              Premium Rentals
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-heading text-4xl font-bold text-white leading-tight mb-6"
            >
              Sound that moves
              <br />
              every crowd.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-slate-400 text-sm leading-relaxed mb-10 max-w-xs"
            >
              Professional audio &amp; lighting equipment for weddings, concerts,
              and corporate events across Sri Lanka.
            </motion.p>

            <motion.div variants={staggerContainer(0.1)} className="space-y-3">
              {features.map((f) => (
                <motion.div
                  key={f.text}
                  variants={fadeUp}
                  className="flex items-center gap-3 text-sm text-slate-300"
                >
                  <div className="w-7 h-7 rounded-full bg-cta/15 flex items-center justify-center text-cta shrink-0">
                    {f.icon}
                  </div>
                  {f.text}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <p className="text-slate-600 text-xs">© {new Date().getFullYear()} Waudio. All rights reserved.</p>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex-1 bg-white dark:bg-gray-950 flex flex-col justify-center items-center px-6 py-12">
        {/* Mobile logo */}
        <Link to="/" className="flex items-center gap-3 mb-10 lg:hidden">
          <div className="w-9 h-9 rounded-lg bg-cta flex items-center justify-center shrink-0">
            <svg viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-4">
              <rect x="0" y="8" width="4" height="12" rx="1" fill="white"/>
              <rect x="6" y="4" width="4" height="16" rx="1" fill="white"/>
              <rect x="12" y="0" width="4" height="20" rx="1" fill="white"/>
              <rect x="18" y="4" width="4" height="16" rx="1" fill="white"/>
              <rect x="24" y="8" width="4" height="12" rx="1" fill="white"/>
            </svg>
          </div>
          <span className="font-heading font-bold text-lg text-slate-900 dark:text-white tracking-tight">Waudio</span>
        </Link>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate="show"
          className="w-full max-w-[420px]"
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="mb-8">
            <h1 className="font-heading text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Sign in
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Welcome back — enter your details below.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <motion.div variants={fadeUp}>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <HiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={`${inputBase} pl-10 ${errors.email ? inputError : ""}`}
                  value={email}
                  onChange={(ev) => { setEmail(ev.target.value); if (errors.email) setErrors({ ...errors, email: "" }); }}
                  required
                />
              </div>
              {errors.email && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 text-xs text-red-600">
                  {errors.email}
                </motion.p>
              )}
            </motion.div>

            {/* Password */}
            <motion.div variants={fadeUp}>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs text-slate-500 hover:text-cta transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <HiLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className={`${inputBase} pl-10 pr-10 ${errors.password ? inputError : ""}`}
                  value={password}
                  onChange={(ev) => { setPassword(ev.target.value); if (errors.password) setErrors({ ...errors, password: "" }); }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <HiEyeOff className="w-4 h-4" /> : <HiEye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 text-xs text-red-600">
                  {errors.password}
                </motion.p>
              )}
            </motion.div>

            {/* Remember me */}
            <motion.div variants={fadeUp} className="flex items-center gap-2.5">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(ev) => setRememberMe(ev.target.checked)}
                className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 accent-cta cursor-pointer"
              />
              <label htmlFor="remember" className="text-sm text-slate-600 dark:text-slate-400 cursor-pointer">
                Remember me
              </label>
            </motion.div>

            {/* Submit */}
            <motion.div variants={fadeUp}>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-cta text-white font-semibold text-sm rounded-lg hover:bg-cta-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in…
                  </>
                ) : (
                  <>
                    Sign In
                    <HiArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </motion.div>

            {/* ── Google Sign-in ── */}
            <motion.div variants={fadeUp} className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
                <span className="text-xs text-slate-400">or continue with</span>
                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => toast.error("Google sign-in failed.")}
                  theme="outline"
                  shape="rectangular"
                  width="380"
                  text="signin_with"
                />
              </div>
            </motion.div>

            {/* Divider + link */}
            <motion.div variants={fadeUp} className="relative my-1">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white dark:bg-gray-950 text-xs text-slate-400">or</span>
              </div>
            </motion.div>

            <motion.p variants={fadeUp} className="text-center text-sm text-slate-500 dark:text-slate-400">
              Don't have an account?{" "}
              <Link to="/register" className="text-cta font-semibold hover:underline">
                Create one
              </Link>
            </motion.p>
          </form>
        </motion.div>

        <Link
          to="/"
          className="mt-10 text-sm text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
