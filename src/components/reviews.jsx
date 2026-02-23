import { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  HiStar,
  HiOutlineStar,
  HiTrash,
  HiCheckCircle,
  HiXCircle,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function Reviews({ productKey, showAddForm = true }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const formRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser({ email: payload.email, role: payload.role });
      } catch (e) {
        console.error("Token decode error:", e);
      }
    }
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/reviews`,
      );
      const approved = res.data.filter((r) => r.isApproved);
      setReviews(approved);
    } catch (err) {
      console.error("Failed to load reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please sign in to leave a review");
      navigate("/login");
      return;
    }

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write a comment");
      return;
    }

    setSubmitting(true);
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/reviews`,
        { rating, comment },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success("Review submitted! It will appear after approval.");
      setRating(0);
      setComment("");
      formRef.current?.reset();
      loadReviews();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (email) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/reviews/${email}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      toast.success("Review deleted");
      loadReviews();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to delete review");
    }
  };

  const handleApprove = async (email) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/reviews/approve/${email}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success("Review approved");
      loadReviews();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to approve review");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {showAddForm && (
        <div className="rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-card p-6 md:p-8 animate-fade-in">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Write a Review
          </h3>
          {!user ? (
            <div className="text-center py-8">
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Sign in to leave a review
              </p>
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-2 rounded-xl bg-accent text-white font-semibold hover:bg-accent-dark transition"
              >
                Sign In
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  Your Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="text-3xl transition-transform hover:scale-110"
                    >
                      {star <= (hoverRating || rating) ? (
                        <HiStar className="text-yellow-400" />
                      ) : (
                        <HiOutlineStar className="text-slate-300 dark:text-slate-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label
                  htmlFor="comment"
                  className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                >
                  Your Review
                </label>
                <textarea
                  id="comment"
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience..."
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3 rounded-xl bg-accent text-white font-semibold hover:bg-accent-dark hover:shadow-glow transition-all disabled:opacity-70"
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          )}
        </div>
      )}

      <div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
          Customer Reviews ({reviews.length})
        </h3>
        {reviews.length === 0 ? (
          <div className="text-center py-12 rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <p className="text-slate-600 dark:text-slate-400">
              No reviews yet. Be the first to review!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review, idx) => (
              <div
                key={review.email}
                className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-card p-6 animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <img
                    src={review.profilePicture}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-200"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white">
                          {review.name}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {new Date(review.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <HiStar
                            key={star}
                            className={`w-5 h-5 ${star <= review.rating ? "text-yellow-400" : "text-slate-300 dark:text-slate-600"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {review.comment}
                    </p>
                    {user?.role === "admin" && (
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => handleApprove(review.email)}
                          className="px-3 py-1.5 rounded-lg bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm font-medium hover:bg-green-100 dark:hover:bg-green-900/50 transition"
                        >
                          <HiCheckCircle className="w-4 h-4 inline mr-1" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleDelete(review.email)}
                          className="px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/50 transition"
                        >
                          <HiTrash className="w-4 h-4 inline mr-1" />
                          Delete
                        </button>
                      </div>
                    )}
                    {user?.email === review.email && user?.role !== "admin" && (
                      <button
                        onClick={() => handleDelete(review.email)}
                        className="mt-4 px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/50 transition"
                      >
                        <HiTrash className="w-4 h-4 inline mr-1" />
                        Delete My Review
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
