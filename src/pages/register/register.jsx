import "./register.css";
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
} from "react-icons/hi";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const checkPasswordStrength = (pwd) => {
    let strength = 0;
    if (pwd.length >= 6) strength++;
    if (pwd.length >= 8) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/\d/.test(pwd)) strength++;
    if (/[^a-zA-Z\d]/.test(pwd)) strength++;
    return strength;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Check password strength
    if (name === "password") {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (formData.phone && !/^[\d\s\+\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  function handleOnSubmit(e) {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors below");
      return;
    }

    setLoading(true);
    setErrors({});

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/users/`, {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        password: formData.password,
        address: formData.address,
        phone: formData.phone,
      })
      .then(() => {
        toast.success("Account created successfully! Please sign in.", {
          icon: "🎉",
          duration: 4000,
        });
        navigate("/login");
      })
      .catch((err) => {
        const errorMsg =
          err?.response?.data?.error ||
          "Registration failed. Please try again.";
        toast.error(errorMsg);
        if (err.response?.data?.error?.toLowerCase().includes("email")) {
          setErrors({ email: "This email is already registered" });
        }
      })
      .finally(() => setLoading(false));
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return "bg-red-500";
    if (passwordStrength <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return "Weak";
    if (passwordStrength <= 3) return "Medium";
    return "Strong";
  };

  return (
    <div className="bg-picture min-h-screen flex flex-col justify-center items-center p-4 py-8 md:py-12">
      <div className="w-full max-w-2xl animate-scale-in">
        <form
          onSubmit={handleOnSubmit}
          autoComplete="off"
          className="glass rounded-3xl shadow-premium border border-white/30 p-6 md:p-10"
        >
          <div className="text-center mb-6 md:mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-accent to-accent-dark mb-3 ring-4 ring-accent/20">
              <img
                src="/logo.png"
                alt="Wave Audio"
                className="w-14 h-14 md:w-16 md:h-16 object-cover rounded-full"
              />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-1">
              Create Your Account
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">
              Join Wave Audio and get started today
            </p>
          </div>

          <div className="space-y-4 md:space-y-5">
            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                >
                  First Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <HiUser className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="John"
                    autoComplete="given-name"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all bg-white dark:bg-slate-700/80 dark:text-white dark:placeholder-slate-400 ${
                      errors.firstName
                        ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                        : "border-slate-200 dark:border-slate-600 focus:border-accent focus:ring-2 focus:ring-accent/20"
                    } outline-none`}
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    aria-invalid={!!errors.firstName}
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                    <span>⚠️</span> {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                >
                  Last Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <HiUser className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    autoComplete="family-name"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all bg-white dark:bg-slate-700/80 dark:text-white dark:placeholder-slate-400 ${
                      errors.lastName
                        ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                        : "border-slate-200 dark:border-slate-600 focus:border-accent focus:ring-2 focus:ring-accent/20"
                    } outline-none`}
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    aria-invalid={!!errors.lastName}
                  />
                </div>
                {errors.lastName && (
                  <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                    <span>⚠️</span> {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
              ></label>
              <div className="relative">
                <HiMail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all bg-white dark:bg-slate-700/80 dark:text-white dark:placeholder-slate-400 ${
                    errors.email
                      ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-slate-200 dark:border-slate-600 focus:border-accent focus:ring-2 focus:ring-accent/20"
                  } outline-none`}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  aria-invalid={!!errors.email}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                  <span>⚠️</span> {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
              ></label>
              <div className="relative">
                <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
                  className={`w-full pl-10 pr-12 py-3 rounded-xl border-2 transition-all bg-white dark:bg-slate-700/80 dark:text-white dark:placeholder-slate-400 ${
                    errors.password
                      ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-slate-200 dark:border-slate-600 focus:border-accent focus:ring-2 focus:ring-accent/20"
                  } outline-none`}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  aria-invalid={!!errors.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <HiEyeOff className="w-5 h-5" />
                  ) : (
                    <HiEye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      />
                    </div>
                    <span
                      className={`text-xs font-medium ${passwordStrength <= 2 ? "text-red-600" : passwordStrength <= 3 ? "text-yellow-600" : "text-green-600"}`}
                    >
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                </div>
              )}
              {errors.password && (
                <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                  <span>⚠️</span> {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
              ></label>
              <div className="relative">
                <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  className={`w-full pl-10 pr-12 py-3 rounded-xl border-2 transition-all bg-white dark:bg-slate-700/80 dark:text-white dark:placeholder-slate-400 ${
                    errors.confirmPassword
                      ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      : formData.confirmPassword &&
                          formData.password === formData.confirmPassword
                        ? "border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                        : "border-slate-200 dark:border-slate-600 focus:border-accent focus:ring-2 focus:ring-accent/20"
                  } outline-none`}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  aria-invalid={!!errors.confirmPassword}
                />
                {formData.confirmPassword &&
                  formData.password === formData.confirmPassword && (
                    <HiCheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500 pointer-events-none" />
                  )}
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors ${
                    formData.confirmPassword &&
                    formData.password === formData.confirmPassword
                      ? "hidden"
                      : ""
                  }`}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <HiEyeOff className="w-5 h-5" />
                  ) : (
                    <HiEye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                  <span>⚠️</span> {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Address */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
              ></label>
              <div className="relative">
                <HiLocationMarker className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                <input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Your address"
                  autoComplete="street-address"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 dark:bg-slate-700/80 dark:text-white dark:placeholder-slate-400 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all bg-white"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
              ></label>
              <div className="relative">
                <HiPhone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+92 300 1234567"
                  autoComplete="tel"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all bg-white dark:bg-slate-700/80 dark:text-white dark:placeholder-slate-400 ${
                    errors.phone
                      ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-slate-200 dark:border-slate-600 focus:border-accent focus:ring-2 focus:ring-accent/20"
                  } outline-none`}
                  value={formData.phone}
                  onChange={handleChange}
                  aria-invalid={!!errors.phone}
                />
              </div>
              {errors.phone && (
                <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                  <span>⚠️</span> {errors.phone}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-accent text-white font-semibold hover:bg-accent-dark hover:shadow-glow transition-all duration-300 btn-premium disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account…
                </>
              ) : (
                "Create Account"
              )}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                  Already have an account?
                </span>
              </div>
            </div>

            <p className="text-center text-slate-600 dark:text-slate-400 text-sm">
              {" "}
              <Link
                to="/login"
                className="text-accent font-semibold hover:underline"
              >
                Sign in here
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
