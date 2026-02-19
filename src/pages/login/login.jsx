import "./login.css";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { HiLockClosed, HiMail, HiEye, HiEyeOff } from "react-icons/hi";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  function handleOnSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;

    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
    setLoading(true);
    setErrors({});

    axios
      .post(`${backendUrl}/api/users/login`, { email, password })
      .then((res) => {
        toast.success("Welcome back!", { icon: "👋" });
        localStorage.setItem("token", res.data.token);
        if (rememberMe) {
          localStorage.setItem("rememberEmail", email);
        } else {
          localStorage.removeItem("rememberEmail");
        }
        if (res.data.user?.role === "admin") navigate("/admin");
        else navigate("/");
      })
      .catch((err) => {
        const errorMsg = err.response?.data?.error || "Login failed. Please check your credentials.";
        toast.error(errorMsg);
        if (err.response?.status === 401) {
          setErrors({ password: "Incorrect email or password" });
        }
      })
      .finally(() => setLoading(false));
  }

  // Load remembered email on mount
  useEffect(() => {
    const remembered = localStorage.getItem("rememberEmail");
    if (remembered) {
      setEmail(remembered);
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="bg-picture min-h-screen flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md animate-scale-in">
        <form onSubmit={handleOnSubmit} className="glass rounded-3xl shadow-premium border border-white/30 p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-accent to-accent-dark mb-4 ring-4 ring-accent/20 animate-fade-in-down">
              <img src="/logo.png" alt="Wave Audio" className="w-16 h-16 object-cover rounded-full" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
            <p className="text-slate-600">Sign in to your account</p>
          </div>

          <div className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all bg-white ${
                    errors.email
                      ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-slate-200 focus:border-accent focus:ring-2 focus:ring-accent/20"
                  } outline-none`}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: "" });
                  }}
                  required
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
              </div>
              {errors.email && (
                <p id="email-error" className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                  <span>⚠️</span> {errors.email}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-accent hover:text-accent-dark hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`w-full pl-12 pr-12 py-3 rounded-xl border-2 transition-all bg-white ${
                    errors.password
                      ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-slate-200 focus:border-accent focus:ring-2 focus:ring-accent/20"
                  } outline-none`}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: "" });
                  }}
                  required
                  autoComplete="current-password"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                  <span>⚠️</span> {errors.password}
                </p>
              )}
            </div>

            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-accent focus:ring-2 focus:ring-accent/20 cursor-pointer"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-slate-700 cursor-pointer">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-accent text-white font-semibold hover:bg-accent-dark hover:shadow-glow transition-all duration-300 btn-premium disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </>
              ) : (
                "Sign In"
              )}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-slate-500">New to Wave Audio?</span>
              </div>
            </div>

            <p className="text-center text-slate-600 text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="text-accent font-semibold hover:underline">
                Create one now
              </Link>
            </p>
          </div>
        </form>
        <Link
          to="/"
          className="block mt-6 text-center text-white/90 hover:text-white text-sm transition-colors font-medium"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
