import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  HiMail,
  HiPhone,
  HiCalendar,
  HiCheckCircle,
  HiXCircle,
  HiTrash,
  HiPencil,
} from "react-icons/hi";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [responseText, setResponseText] = useState("");

  useEffect(() => {
    loadInquiries();
  }, []);

  const loadInquiries = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/inquiries`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setInquiries(res.data);
    } catch (err) {
      toast.error("Failed to load inquiries");
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/inquiries/${id}`,
        { isResolved: true, response: responseText },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success("Inquiry resolved");
      setEditingId(null);
      setResponseText("");
      loadInquiries();
    } catch (err) {
      toast.error("Failed to update inquiry");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this inquiry?"))
      return;
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/inquiries/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      toast.success("Inquiry deleted");
      loadInquiries();
    } catch (err) {
      toast.error("Failed to delete inquiry");
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center">
        <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
        Customer Inquiries
      </h1>

      {inquiries.length === 0 ? (
        <div className="text-center py-16 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <HiMail className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">
            No inquiries at the moment
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {inquiries.map((inquiry, idx) => (
            <div
              key={inquiry.id}
              className="rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-card p-6 md:p-8 animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      Inquiry #{inquiry.id}
                    </h3>
                    {inquiry.isResolved ? (
                      <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold flex items-center gap-1">
                        <HiCheckCircle className="w-4 h-4" />
                        Resolved
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs font-semibold flex items-center gap-1">
                        <HiXCircle className="w-4 h-4" />
                        Pending
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <HiMail className="w-4 h-4" />
                      {inquiry.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <HiPhone className="w-4 h-4" />
                      {inquiry.phone}
                    </div>
                    <div className="flex items-center gap-1">
                      <HiCalendar className="w-4 h-4" />
                      {new Date(inquiry.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {inquiry.message}
                </p>
              </div>

              {inquiry.response && (
                <div className="mb-4 p-4 rounded-xl bg-accent/5 border border-accent/20">
                  <p className="text-sm font-semibold text-accent mb-1">
                    Response:
                  </p>
                  <p className="text-slate-700 dark:text-slate-300">
                    {inquiry.response}
                  </p>
                </div>
              )}

              {editingId === inquiry.id ? (
                <div className="space-y-3">
                  <textarea
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    placeholder="Enter response..."
                    rows={3}
                    className="w-full px-4 py-2 rounded-xl border-2 border-accent focus:ring-2 focus:ring-accent/20 outline-none dark:bg-slate-700 dark:text-white dark:placeholder-slate-400"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleResolve(inquiry.id)}
                      className="px-4 py-2 rounded-lg bg-green-50 text-green-600 text-sm font-medium hover:bg-green-100 transition"
                    >
                      Save Response
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setResponseText("");
                      }}
                      className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                  {!inquiry.isResolved && (
                    <button
                      onClick={() => {
                        setEditingId(inquiry.id);
                        setResponseText(inquiry.response || "");
                      }}
                      className="px-4 py-2 rounded-lg bg-accent/10 text-accent text-sm font-medium hover:bg-accent/20 transition"
                    >
                      <HiPencil className="w-4 h-4 inline mr-1" />
                      Add Response
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(inquiry.id)}
                    className="px-4 py-2 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/50 transition"
                  >
                    <HiTrash className="w-4 h-4 inline mr-1" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
