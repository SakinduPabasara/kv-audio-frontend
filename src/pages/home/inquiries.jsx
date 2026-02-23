import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  HiMail,
  HiPhone,
  HiCalendar,
  HiCheckCircle,
  HiXCircle,
  HiPencil,
  HiTrash,
} from "react-icons/hi";

export default function Inquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please sign in to view inquiries");
      navigate("/login");
      return;
    }
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser({ email: payload.email, role: payload.role });
    } catch (e) {
      console.error("Token decode error:", e);
    }
    loadInquiries();
  }, [navigate]);

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
      console.error("Failed to load inquiries:", err);
      toast.error("Failed to load inquiries");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }

    setSubmitting(true);
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/inquiries`,
        { message },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success("Inquiry submitted successfully!");
      setMessage("");
      setShowForm(false);
      loadInquiries();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit inquiry");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (id, newMessage) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/inquiries/${id}`,
        { message: newMessage },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success("Inquiry updated");
      setEditingId(null);
      loadInquiries();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update inquiry");
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
      toast.error(err.response?.data?.message || "Failed to delete inquiry");
    }
  };

  const handleResolve = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/inquiries/${id}`,
        { isResolved: true },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success("Inquiry marked as resolved");
      loadInquiries();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update inquiry");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 py-12 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
      </main>
    );
  }

  const isAdmin = user?.role === "admin";

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            {isAdmin ? "All Inquiries" : "My Inquiries"}
          </h1>
          {!isAdmin && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-6 py-3 rounded-xl bg-accent text-white font-semibold hover:bg-accent-dark transition"
            >
              {showForm ? "Cancel" : "+ New Inquiry"}
            </button>
          )}
        </div>

        {showForm && (
          <div className="rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-card p-6 md:p-8 mb-8 animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Create New Inquiry
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your inquiry..."
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3 rounded-xl bg-accent text-white font-semibold hover:bg-accent-dark transition disabled:opacity-70"
              >
                {submitting ? "Submitting..." : "Submit Inquiry"}
              </button>
            </form>
          </div>
        )}

        {inquiries.length === 0 ? (
          <div className="text-center py-20 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-card">
            <HiMail className="w-20 h-20 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              No inquiries yet
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              {isAdmin
                ? "No customer inquiries at the moment"
                : "Create your first inquiry"}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {inquiries.map((inquiry, idx) => (
              <div
                key={inquiry.id}
                className="rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-card p-6 md:p-8 animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        Inquiry #{inquiry.id}
                      </h3>
                      {inquiry.isResolved ? (
                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold flex items-center gap-1">
                          <HiCheckCircle className="w-4 h-4" />
                          Resolved
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold flex items-center gap-1">
                          <HiXCircle className="w-4 h-4" />
                          Pending
                        </span>
                      )}
                    </div>
                    {isAdmin && (
                      <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                        <div className="flex items-center gap-1">
                          <HiMail className="w-4 h-4" />
                          {inquiry.email}
                        </div>
                        <div className="flex items-center gap-1">
                          <HiPhone className="w-4 h-4" />
                          {inquiry.phone}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                    <HiCalendar className="w-4 h-4" />
                    {new Date(inquiry.date).toLocaleDateString()}
                  </div>
                </div>

                {editingId === inquiry.id ? (
                  <div className="space-y-3">
                    <textarea
                      defaultValue={inquiry.message}
                      rows={3}
                      className="w-full px-4 py-2 rounded-xl border-2 border-accent dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-accent/20 outline-none"
                      ref={(el) => {
                        if (el) el.focus();
                      }}
                      onBlur={(e) => {
                        if (e.target.value !== inquiry.message) {
                          handleUpdate(inquiry.id, e.target.value);
                        } else {
                          setEditingId(null);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && e.ctrlKey) {
                          handleUpdate(inquiry.id, e.target.value);
                        }
                        if (e.key === "Escape") {
                          setEditingId(null);
                        }
                      }}
                    />
                  </div>
                ) : (
                  <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
                    {inquiry.message}
                  </p>
                )}

                {inquiry.response && (
                  <div className="mt-4 p-4 rounded-xl bg-accent/5 dark:bg-accent/10 border border-accent/20">
                    <p className="text-sm font-semibold text-accent mb-1">
                      Response:
                    </p>
                    <p className="text-slate-700 dark:text-slate-300">
                      {inquiry.response}
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-2 pt-4 border-t border-slate-200">
                  {!isAdmin && editingId !== inquiry.id && (
                    <>
                      <button
                        onClick={() => setEditingId(inquiry.id)}
                        className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200 transition"
                      >
                        <HiPencil className="w-4 h-4 inline mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(inquiry.id)}
                        className="px-4 py-2 rounded-lg bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition"
                      >
                        <HiTrash className="w-4 h-4 inline mr-1" />
                        Delete
                      </button>
                    </>
                  )}
                  {isAdmin && !inquiry.isResolved && (
                    <button
                      onClick={() => handleResolve(inquiry.id)}
                      className="px-4 py-2 rounded-lg bg-green-50 text-green-600 text-sm font-medium hover:bg-green-100 transition"
                    >
                      <HiCheckCircle className="w-4 h-4 inline mr-1" />
                      Mark Resolved
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
