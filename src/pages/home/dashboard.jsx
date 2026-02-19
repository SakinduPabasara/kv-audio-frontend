import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiShoppingBag, HiMail, HiStar, HiUser, HiArrowRight } from "react-icons/hi";
import axios from "axios";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ orders: 0, inquiries: 0, reviews: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser(payload);
    } catch (e) {
      console.error("Token decode error:", e);
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const quickLinks = [
    {
      title: "My Orders",
      description: "View order history",
      icon: <HiShoppingBag className="w-8 h-8" />,
      to: "/orders",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "My Inquiries",
      description: "Manage your inquiries",
      icon: <HiMail className="w-8 h-8" />,
      to: "/inquiries",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "My Reviews",
      description: "View your reviews",
      icon: <HiStar className="w-8 h-8" />,
      to: "/reviews",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      title: "Shopping Cart",
      description: "View cart items",
      icon: <HiShoppingBag className="w-8 h-8" />,
      to: "/cart",
      color: "from-green-500 to-green-600",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">My Dashboard</h1>
              <p className="text-slate-600">Welcome back, {user?.firstName || "User"}!</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 font-medium hover:bg-red-100 transition"
            >
              <HiArrowRight className="w-5 h-5" />
              Logout
            </button>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-accent to-accent-dark text-white p-8 md:p-12">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl font-bold">
                {user?.firstName?.[0] || "U"}
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-white/80">{user?.email}</p>
                <p className="text-sm text-white/60 mt-1 capitalize">{user?.role || "Customer"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickLinks.map((link, idx) => (
            <Link
              key={link.to}
              to={link.to}
              className="group rounded-3xl bg-white border border-slate-200 shadow-card p-6 hover:shadow-premium hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${link.color} text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                {link.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">{link.title}</h3>
              <p className="text-sm text-slate-600">{link.description}</p>
            </Link>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="rounded-3xl bg-white border border-slate-200 shadow-card p-6 md:p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                to="/items"
                className="block p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition text-slate-900 font-medium"
              >
                Browse Products
              </Link>
              <Link
                to="/contact"
                className="block p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition text-slate-900 font-medium"
              >
                Contact Support
              </Link>
              <Link
                to="/gallery"
                className="block p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition text-slate-900 font-medium"
              >
                View Gallery
              </Link>
            </div>
          </div>

          <div className="rounded-3xl bg-white border border-slate-200 shadow-card p-6 md:p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Account Information</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-600 mb-1">Email</p>
                <p className="font-medium text-slate-900">{user?.email}</p>
              </div>
              {user?.phone && (
                <div>
                  <p className="text-sm text-slate-600 mb-1">Phone</p>
                  <p className="font-medium text-slate-900">{user.phone}</p>
                </div>
              )}
              {user?.address && (
                <div>
                  <p className="text-sm text-slate-600 mb-1">Address</p>
                  <p className="font-medium text-slate-900">{user.address}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
