import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import {
  HiUser,
  HiMail,
  HiLockClosed,
  HiLocationMarker,
  HiPhone,
  HiEye,
  HiEyeOff,
  HiCheckCircle,
  HiArrowRight,
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
  "border-red-400 dark:border-red-500 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-900/30";

const inputOk = "border-green-400 dark:border-green-600 focus:border-green-500 focus:ring-green-200";

const features = [
  { icon: <HiMicrophone className="w-4 h-4" />, text: "Industry-standard equipment" },
  { icon: <HiCalendar className="w-4 h-4" />, text: "Flexible rental packages" },
  { icon: <HiStar className="w-4 h-4" />, text: "Trusted by 200+ events" },
];

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "",
    password: "", confirmPassword: "", address: "", phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [pwStrength, setPwStrength] = useState(0);
  const navigate = useNavigate();

  const calcStrength = (pwd) => {
    let s = 0;
    if (pwd.length >= 6) s++;
    if (pwd.length >= 8) s++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) s++;
    if (/\d/.test(pwd)) s++;
    if (/[^a-zA-Z\d]/.test(pwd)) s++;
    return s;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
    if (name === "password") setPwStrength(calcStrength(value));
  };

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "At least 6 characters";
    if (!form.confirmPassword) e.confirmPassword = "Please confirm your password";
    else if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords don't match";
    if (form.phone && !/^[\d\s+\-()]+$/.test(form.phone)) e.phone = "Enter a valid phone number";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) { toast.error("Please fix the errors below"); return; }
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/users/`, {
        email: form.email, firstName: form.firstName, lastName: form.lastName,
        password: form.password, address: form.address, phone: form.phone,
      })
      .then(() => {
        toast.success("Account created! Please sign in.", { icon: "🎉", duration: 4000 });
        navigate("/login");
      })
      .catch((err) => {
        const msg = err?.response?.data?.error || "Registration failed. Please try again.";
        toast.error(msg);
        if (msg.toLowerCase().includes("email")) setErrors({ email: "This email is already registered" });
      })
      .finally(() => setLoading(false));
  }

  async function handleGoogleSuccess(credentialResponse) {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
    try {
      const res = await axios.post(`${backendUrl}/api/users/google-auth`, {
        credential: credentialResponse.credential,
      });
      toast.success("Signed up with Google! Welcome 🎉");
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch {
      toast.error("Google sign-up failed. Please try again.");
    }
  }

  const strengthColor = pwStrength <= 2 ? "bg-red-500" : pwStrength <= 3 ? "bg-yellow-500" : "bg-green-500";
  const strengthLabel = pwStrength <= 2 ? "Weak" : pwStrength <= 3 ? "Medium" : "Strong";
  const strengthTextColor = pwStrength <= 2 ? "text-red-600" : pwStrength <= 3 ? "text-yellow-600" : "text-green-600";

  const pwMatch = form.confirmPassword && form.password === form.confirmPassword;

  return (
    <div className="min-h-screen flex">
      {/* ── Left brand panel ── */}
      <div className="hidden lg:flex lg:w-[38%] bg-slate-950 flex-col justify-between p-12">
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
          <motion.div variants={staggerContainer(0.12)} initial="hidden" animate="show">
            <motion.p variants={fadeUp} className="text-xs font-semibold text-cta uppercase tracking-widest mb-4">
              Join Waudio
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl font-bold text-white leading-tight mb-6">
              Your events,
              <br />elevated.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-400 text-sm leading-relaxed mb-10 max-w-xs">
              Create your account and get instant access to our full catalogue
              of professional audio &amp; lighting gear.
            </motion.p>
            <motion.div variants={staggerContainer(0.1)} className="space-y-3">
              {features.map((f) => (
                <motion.div key={f.text} variants={fadeUp} className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-7 h-7 rounded-full bg-cta/15 flex items-center justify-center text-cta shrink-0">{f.icon}</div>
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
        <Link to="/" className="flex items-center gap-3 mb-8 lg:hidden">
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
          variants={staggerContainer(0.08)}
          initial="hidden"
          animate="show"
          className="w-full max-w-[520px]"
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="mb-8">
            <h1 className="font-heading text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Create account
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Fill in your details to get started — it only takes a minute.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
            {/* Name row */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  First name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <HiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="John"
                    autoComplete="given-name"
                    className={`${inputBase} pl-10 ${errors.firstName ? inputError : ""}`}
                    value={form.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Last name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <HiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    autoComplete="family-name"
                    className={`${inputBase} pl-10 ${errors.lastName ? inputError : ""}`}
                    value={form.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>}
              </div>
            </motion.div>

            {/* Email */}
            <motion.div variants={fadeUp}>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Email address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <HiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={`${inputBase} pl-10 ${errors.email ? inputError : ""}`}
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.email && <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-1 text-xs text-red-600">{errors.email}</motion.p>}
            </motion.div>

            {/* Password */}
            <motion.div variants={fadeUp}>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <HiLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
                  className={`${inputBase} pl-10 pr-10 ${errors.password ? inputError : ""}`}
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                  aria-label={showPassword ? "Hide" : "Show"}>
                  {showPassword ? <HiEyeOff className="w-4 h-4" /> : <HiEye className="w-4 h-4" />}
                </button>
              </div>
              {/* Strength meter */}
              {form.password && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-300 ${strengthColor}`} style={{ width: `${(pwStrength / 5) * 100}%` }} />
                  </div>
                  <span className={`text-xs font-medium ${strengthTextColor}`}>{strengthLabel}</span>
                </div>
              )}
              {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
            </motion.div>

            {/* Confirm password */}
            <motion.div variants={fadeUp}>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Confirm password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <HiLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  className={`${inputBase} pl-10 pr-10 ${errors.confirmPassword ? inputError : pwMatch ? inputOk : ""}`}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
                {pwMatch ? (
                  <HiCheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 pointer-events-none" />
                ) : (
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                    aria-label={showConfirm ? "Hide" : "Show"}>
                    {showConfirm ? <HiEyeOff className="w-4 h-4" /> : <HiEye className="w-4 h-4" />}
                  </button>
                )}
              </div>
              {errors.confirmPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>}
            </motion.div>

            {/* Phone + Address row */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Phone
                </label>
                <div className="relative">
                  <HiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+92 300 1234567"
                    autoComplete="tel"
                    className={`${inputBase} pl-10 ${errors.phone ? inputError : ""}`}
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
                {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Address
                </label>
                <div className="relative">
                  <HiLocationMarker className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Your address"
                    autoComplete="street-address"
                    className={`${inputBase} pl-10`}
                    value={form.address}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </motion.div>

            {/* Submit */}
            <motion.div variants={fadeUp} className="pt-1">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-cta text-white font-semibold text-sm rounded-lg hover:bg-cta-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account…
                  </>
                ) : (
                  <>
                    Create Account
                    <HiArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </motion.div>

            {/* ── Google Sign-up ── */}
            <motion.div variants={fadeUp} className="relative pt-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
                <span className="text-xs text-slate-400">or sign up with</span>
                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => toast.error("Google sign-up failed.")}
                  theme="outline"
                  shape="rectangular"
                  width="460"
                  text="signup_with"
                />
              </div>
            </motion.div>

            {/* Divider + login link */}
            <motion.div variants={fadeUp} className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white dark:bg-gray-950 text-xs text-slate-400">or</span>
              </div>
            </motion.div>

            <motion.p variants={fadeUp} className="text-center text-sm text-slate-500 dark:text-slate-400">
              Already have an account?{" "}
              <Link to="/login" className="text-cta font-semibold hover:underline">
                Sign in here
              </Link>
            </motion.p>
          </form>
        </motion.div>

        <Link to="/" className="mt-8 text-sm text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
