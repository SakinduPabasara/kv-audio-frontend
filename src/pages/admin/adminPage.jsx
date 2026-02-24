import { BsGraphDown } from "react-icons/bs";
import { FaRegBookmark, FaRegUser } from "react-icons/fa";
import { MdOutlineSpeaker } from "react-icons/md";
import { HiMail, HiStar } from "react-icons/hi";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import AdminItemsPage from "./adminItemsPage";
import AddItemPage from "./addItemPage";
import UpdateItemPage from "./updateItemPage";
import AdminInquiriesPage from "./adminInquiriesPage";
import AdminReviewsPage from "./adminReviewsPage";
import AdminDashboardPage from "./adminDashboardPage";
import AdminUsersPage from "./adminUsersPage";

const navLinks = [
  { to: "/admin/items",     icon: <MdOutlineSpeaker className="w-5 h-5" />, label: "Items" },
  { to: "/admin/inquiries", icon: <HiMail className="w-5 h-5" />,           label: "Inquiries" },
  { to: "/admin/reviews",   icon: <HiStar className="w-5 h-5" />,           label: "Reviews" },
  { to: "/admin/bookings",  icon: <FaRegBookmark className="w-5 h-5" />,    label: "Bookings" },
  { to: "/admin/dashboard", icon: <BsGraphDown className="w-5 h-5" />,      label: "Dashboard" },
  { to: "/admin/users",     icon: <FaRegUser className="w-5 h-5" />,        label: "Users" },
];

export default function AdminPage() {
  const location = useLocation();

  const isActive = (to) =>
    location.pathname === to || location.pathname.startsWith(to + "/");

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* ── Sidebar ── */}
      <aside className="w-64 shrink-0 bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl border-r border-slate-200/80 dark:border-slate-700/80 flex flex-col shadow-soft">
        {/* Brand */}
        <div className="p-6 border-b border-slate-200/80 dark:border-slate-700/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-sm">WA</span>
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-white block">Admin</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Waudio</span>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="p-4 flex flex-col gap-1 flex-1">
          {navLinks.map(({ to, icon, label }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-150 group ${
                isActive(to)
                  ? "bg-cta/10 dark:bg-cta/15 text-cta"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <span className={`transition-transform group-hover:scale-110 ${isActive(to) ? "text-cta" : ""}`}>
                {icon}
              </span>
              {label}
              {isActive(to) && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cta shrink-0" />
              )}
            </Link>
          ))}
        </nav>

        {/* Back to site */}
        <Link
          to="/"
          className="m-4 px-4 py-3 rounded-xl text-sm text-accent font-medium hover:bg-accent/10 transition-colors text-center border border-accent/20"
        >
          ← Back to site
        </Link>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 min-w-0 overflow-auto">
        <Routes>
          <Route index element={<Navigate to="/admin/items" replace />} />
          <Route
            path="/bookings"
            element={
              <div className="p-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Bookings</h1>
                <p className="text-slate-500 dark:text-slate-400">Coming soon.</p>
              </div>
            }
          />
          <Route path="/items"           element={<AdminItemsPage />} />
          <Route path="/items/add"       element={<AddItemPage />} />
          <Route path="/items/edit"      element={<UpdateItemPage />} />
          <Route path="/inquiries"       element={<AdminInquiriesPage />} />
          <Route path="/reviews"         element={<AdminReviewsPage />} />
          <Route path="/dashboard"       element={<AdminDashboardPage />} />
          <Route path="/users"           element={<AdminUsersPage />} />
        </Routes>
      </div>
    </div>
  );
}
