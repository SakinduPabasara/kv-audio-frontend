import { BsGraphDown } from "react-icons/bs";
import { FaRegBookmark, FaRegUser } from "react-icons/fa";
import { MdOutlineSpeaker } from "react-icons/md";
import { HiMail, HiStar } from "react-icons/hi";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import AdminItemsPage from "./adminItemsPage";
import AddItemPage from "./addItemPage";
import UpdateItemPage from "./updateItemPage";
import AdminInquiriesPage from "./adminInquiriesPage";
import AdminReviewsPage from "./adminReviewsPage";

export default function AdminPage() {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 to-white">
      <aside className="w-64 shrink-0 bg-white/80 backdrop-blur-xl border-r border-slate-200/80 flex flex-col shadow-soft">
        <div className="p-6 border-b border-slate-200/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center">
              <span className="text-white font-bold text-sm">WA</span>
            </div>
            <div>
              <span className="font-bold text-slate-900 block">Admin</span>
              <span className="text-xs text-slate-500">Wave Audio</span>
            </div>
          </div>
        </div>
        <nav className="p-4 flex flex-col gap-1 flex-1">
          <Link
            to="/admin/items"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-accent font-medium transition-all duration-200 group"
          >
            <MdOutlineSpeaker className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Items
          </Link>
          <Link
            to="/admin/inquiries"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-accent font-medium transition-all duration-200 group"
          >
            <HiMail className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Inquiries
          </Link>
          <Link
            to="/admin/reviews"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-accent font-medium transition-all duration-200 group"
          >
            <HiStar className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Reviews
          </Link>
          <Link
            to="/admin/bookings"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-accent font-medium transition-all duration-200 group"
          >
            <FaRegBookmark className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Bookings
          </Link>
          <button
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 cursor-not-allowed"
            disabled
          >
            <BsGraphDown className="w-5 h-5" />
            Dashboard
          </button>
          <button
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 cursor-not-allowed"
            disabled
          >
            <FaRegUser className="w-5 h-5" />
            Users
          </button>
        </nav>
        <Link
          to="/"
          className="m-4 px-4 py-3 rounded-xl text-sm text-accent font-medium hover:bg-accent/10 transition-colors text-center border border-accent/20"
        >
          ← Back to site
        </Link>
      </aside>

      <div className="flex-1 min-w-0 overflow-auto">
        <Routes>
          <Route index element={<Navigate to="/admin/items" replace />} />
          <Route path="/bookings" element={<div className="p-8"><h1 className="text-2xl font-bold text-slate-900 mb-2">Bookings</h1><p className="text-slate-600">Coming soon.</p></div>} />
          <Route path="/items" element={<AdminItemsPage />} />
          <Route path="/items/add" element={<AddItemPage />} />
          <Route path="/items/edit" element={<UpdateItemPage />} />
          <Route path="/inquiries" element={<AdminInquiriesPage />} />
          <Route path="/reviews" element={<AdminReviewsPage />} />
        </Routes>
      </div>
    </div>
  );
}
