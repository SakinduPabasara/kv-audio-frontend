import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { HiStar, HiTrash, HiCheckCircle, HiXCircle } from "react-icons/hi";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, approved, pending

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/reviews`);
      setReviews(res.data);
    } catch (err) {
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (email) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/reviews/approve/${email}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Review approved");
      loadReviews();
    } catch (err) {
      toast.error("Failed to approve review");
    }
  };

  const handleDelete = async (email) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/reviews/${email}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Review deleted");
      loadReviews();
    } catch (err) {
      toast.error("Failed to delete review");
    }
  };

  const filteredReviews = reviews.filter((review) => {
    if (filter === "approved") return review.isApproved;
    if (filter === "pending") return !review.isApproved;
    return true;
  });

  if (loading) {
    return (
      <div className="p-8 flex justify-center">
        <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Customer Reviews</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              filter === "all" ? "bg-accent text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            All ({reviews.length})
          </button>
          <button
            onClick={() => setFilter("approved")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              filter === "approved" ? "bg-accent text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Approved ({reviews.filter((r) => r.isApproved).length})
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              filter === "pending" ? "bg-accent text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Pending ({reviews.filter((r) => !r.isApproved).length})
          </button>
        </div>
      </div>

      {filteredReviews.length === 0 ? (
        <div className="text-center py-16 rounded-3xl bg-white border border-slate-200">
          <HiStar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600">No reviews found</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredReviews.map((review, idx) => (
            <div
              key={review.email}
              className="rounded-3xl bg-white border border-slate-200 shadow-card p-6 md:p-8 animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="flex items-start gap-4">
                <img
                  src={review.profilePicture}
                  alt={review.name}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-slate-200"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-slate-900">{review.name}</h3>
                      <p className="text-sm text-slate-500">{review.email}</p>
                      <p className="text-xs text-slate-400 mt-1">
                        {new Date(review.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <HiStar
                          key={star}
                          className={`w-5 h-5 ${star <= review.rating ? "text-yellow-400" : "text-slate-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-700 mb-4 leading-relaxed">{review.comment}</p>
                  <div className="flex items-center gap-2">
                    {!review.isApproved ? (
                      <button
                        onClick={() => handleApprove(review.email)}
                        className="px-4 py-2 rounded-lg bg-green-50 text-green-600 text-sm font-medium hover:bg-green-100 transition flex items-center gap-1"
                      >
                        <HiCheckCircle className="w-4 h-4" />
                        Approve
                      </button>
                    ) : (
                      <span className="px-4 py-2 rounded-lg bg-green-100 text-green-700 text-sm font-semibold flex items-center gap-1">
                        <HiCheckCircle className="w-4 h-4" />
                        Approved
                      </span>
                    )}
                    <button
                      onClick={() => handleDelete(review.email)}
                      className="px-4 py-2 rounded-lg bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition flex items-center gap-1"
                    >
                      <HiTrash className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
