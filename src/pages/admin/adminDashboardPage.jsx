import { useEffect, useState } from "react";
import axios from "axios";
import {
  HiUsers,
  HiCube,
  HiMail,
  HiStar,
  HiTrendingUp,
  HiCheckCircle,
  HiXCircle,
} from "react-icons/hi";
import { FaRegBookmark } from "react-icons/fa";

function StatCard({ icon, label, value, sub, color }) {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 flex items-start gap-4 shadow-sm">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-3xl font-bold text-slate-900 dark:text-white leading-none mb-1">
          {value ?? <span className="skeleton h-8 w-16 inline-block rounded" />}
        </p>
        {sub && <p className="text-xs text-slate-400">{sub}</p>}
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const [products, setProducts] = useState(null);
  const [users, setUsers] = useState(null);
  const [inquiries, setInquiries] = useState(null);
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`, { headers })
      .then((r) => setProducts(r.data))
      .catch(() => setProducts([]));

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users`, { headers })
      .then((r) => setUsers(r.data))
      .catch(() => setUsers([]));

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/inquiries`, { headers })
      .then((r) => setInquiries(r.data))
      .catch(() => setInquiries([]));

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/reviews`, { headers })
      .then((r) => setReviews(r.data))
      .catch(() => setReviews([]));
  }, []);

  const availableProducts = products?.filter((p) => p.availability).length;
  const unavailableProducts = products?.filter((p) => !p.availability).length;
  const adminCount = users?.filter((u) => u.role === "admin").length;
  const customerCount = users?.filter((u) => u.role !== "admin").length;

  return (
    <div className="p-6 md:p-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400">Overview of your store at a glance</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
        <StatCard
          icon={<HiCube className="w-6 h-6 text-white" />}
          label="Total Products"
          value={products?.length}
          sub={`${availableProducts ?? "—"} available`}
          color="bg-indigo-500"
        />
        <StatCard
          icon={<HiUsers className="w-6 h-6 text-white" />}
          label="Registered Users"
          value={users?.length}
          sub={`${customerCount ?? "—"} customers`}
          color="bg-emerald-500"
        />
        <StatCard
          icon={<HiMail className="w-6 h-6 text-white" />}
          label="Inquiries"
          value={inquiries?.length}
          sub="All time"
          color="bg-cta"
        />
        <StatCard
          icon={<HiStar className="w-6 h-6 text-white" />}
          label="Reviews"
          value={reviews?.length}
          sub="All time"
          color="bg-amber-500"
        />
      </div>

      {/* Lower panels */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Product breakdown */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
            <HiTrendingUp className="w-5 h-5 text-cta" />
            Product Availability
          </h2>
          {products === null ? (
            <div className="space-y-3">
              {[1, 2].map((i) => <div key={i} className="skeleton h-10 rounded-lg" />)}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                <div className="flex items-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-400">
                  <HiCheckCircle className="w-4 h-4" />
                  Available
                </div>
                <span className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
                  {availableProducts}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-xl">
                <div className="flex items-center gap-2 text-sm font-medium text-red-600 dark:text-red-400">
                  <HiXCircle className="w-4 h-4" />
                  Unavailable
                </div>
                <span className="text-lg font-bold text-red-600 dark:text-red-400">
                  {unavailableProducts}
                </span>
              </div>
              {/* Progress bar */}
              {products.length > 0 && (
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Availability rate</span>
                    <span>{Math.round((availableProducts / products.length) * 100)}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-700"
                      style={{ width: `${(availableProducts / products.length) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* User breakdown */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
            <HiUsers className="w-5 h-5 text-cta" />
            User Breakdown
          </h2>
          {users === null ? (
            <div className="space-y-3">
              {[1, 2].map((i) => <div key={i} className="skeleton h-10 rounded-lg" />)}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
                <span className="text-sm font-medium text-indigo-700 dark:text-indigo-400">Customers</span>
                <span className="text-lg font-bold text-indigo-700 dark:text-indigo-400">{customerCount}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-xl">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Admins</span>
                <span className="text-lg font-bold text-slate-700 dark:text-slate-300">{adminCount}</span>
              </div>
              {users.length > 0 && (
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Customer ratio</span>
                    <span>{Math.round((customerCount / users.length) * 100)}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full transition-all duration-700"
                      style={{ width: `${(customerCount / users.length) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
