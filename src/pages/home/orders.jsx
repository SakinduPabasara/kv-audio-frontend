import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { HiShoppingBag, HiCalendar, HiCheckCircle, HiXCircle, HiClock } from "react-icons/hi";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please sign in to view orders");
      navigate("/login");
      return;
    }
    loadOrders();
  }, [navigate]);

  const loadOrders = async () => {
    const token = localStorage.getItem("token");
    try {
      // Note: Backend doesn't have GET /api/orders endpoint, so we'll need to add it
      // For now, showing a message
      toast.error("Order history feature coming soon");
      setOrders([]);
    } catch (err) {
      console.error("Failed to load orders:", err);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 py-12 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-20 rounded-3xl bg-white border border-slate-200 shadow-card">
            <HiShoppingBag className="w-20 h-20 text-slate-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">No orders yet</h2>
            <p className="text-slate-600 mb-8">Start shopping to see your orders here</p>
            <button
              onClick={() => navigate("/items")}
              className="px-6 py-3 rounded-xl bg-accent text-white font-semibold hover:bg-accent-dark transition"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, idx) => (
              <div
                key={order.orderId}
                className="rounded-3xl bg-white border border-slate-200 shadow-card p-6 md:p-8 animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">Order {order.orderId}</h3>
                    <p className="text-sm text-slate-600">
                      Placed on {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div
                    className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ${
                      order.isApproved
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.isApproved ? (
                      <>
                        <HiCheckCircle className="w-5 h-5" />
                        Approved
                      </>
                    ) : (
                      <>
                        <HiClock className="w-5 h-5" />
                        Pending
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  {order.orderedItems.map((item, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-xl bg-slate-50">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900">{item.product.name}</h4>
                        <p className="text-sm text-slate-600">
                          Quantity: {item.quantity} × Rs. {item.product.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <HiCalendar className="w-4 h-4" />
                      <span>
                        {new Date(order.startingDate).toLocaleDateString()} -{" "}
                        {new Date(order.endingDate).toLocaleDateString()}
                      </span>
                    </div>
                    <span>•</span>
                    <span>{order.days} day{order.days !== 1 ? "s" : ""}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-600">Total Amount</p>
                    <p className="text-2xl font-bold text-accent">Rs. {order.totalAmount}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
