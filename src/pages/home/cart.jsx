import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { loadCart, removeFromCart, formatDate } from "../../utils/cart";
import { HiTrash, HiMinus, HiPlus, HiShoppingCart, HiCalendar, HiArrowRight } from "react-icons/hi";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkingOut, setCheckingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadCartData();
  }, []);

  const loadCartData = async () => {
    const cartData = loadCart();
    setCart(cartData);

    if (cartData.orderedItems.length === 0) {
      setLoading(false);
      return;
    }

    try {
      const productPromises = cartData.orderedItems.map((item) =>
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${item.key}`)
      );
      const responses = await Promise.all(productPromises);
      setProducts(responses.map((r) => r.data));
    } catch (err) {
      toast.error("Failed to load cart items");
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = (key, change) => {
    const cartData = loadCart();
    const item = cartData.orderedItems.find((i) => i.key === key);
    if (item) {
      item.qty = Math.max(1, item.qty + change);
      if (item.qty === 0) {
        removeFromCart(key);
      } else {
        localStorage.setItem("cart", JSON.stringify(cartData));
      }
      loadCartData();
    }
  };

  const updateDays = (days) => {
    const cartData = loadCart();
    cartData.days = Math.max(1, parseInt(days) || 1);
    const startDate = new Date(cartData.startingDate);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + cartData.days - 1);
    cartData.endingDate = formatDate(endDate);
    localStorage.setItem("cart", JSON.stringify(cartData));
    setCart(cartData);
  };

  const updateStartDate = (date) => {
    const cartData = loadCart();
    cartData.startingDate = date;
    const startDate = new Date(date);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + cartData.days - 1);
    cartData.endingDate = formatDate(endDate);
    localStorage.setItem("cart", JSON.stringify(cartData));
    setCart(cartData);
  };

  const calculateTotal = () => {
    if (!cart || products.length === 0) return 0;
    let total = 0;
    cart.orderedItems.forEach((item) => {
      const product = products.find((p) => p.key === item.key);
      if (product) {
        const price = typeof product.price === "number" ? product.price : parseFloat(product.price) || 0;
        total += price * item.qty * cart.days;
      }
    });
    return total;
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please sign in to checkout");
      navigate("/login");
      return;
    }

    if (cart.orderedItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setCheckingOut(true);
    try {
      const orderData = {
        orderedItems: cart.orderedItems,
        days: cart.days.toString(),
        startingDate: cart.startingDate,
        endingDate: cart.endingDate,
      };

      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(`Order placed successfully! Order ID: ${res.data.order.orderId}`, { duration: 5000 });
      localStorage.removeItem("cart");
      navigate("/orders");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to place order");
    } finally {
      setCheckingOut(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 py-12 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
      </main>
    );
  }

  if (!cart || cart.orderedItems.length === 0) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <HiShoppingCart className="w-20 h-20 text-slate-300 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Your cart is empty</h1>
            <p className="text-slate-600 mb-8">Add some items to get started</p>
            <Link
              to="/items"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-semibold hover:bg-accent-dark transition"
            >
              Browse Products
              <HiArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.orderedItems.map((item, idx) => {
              const product = products.find((p) => p.key === item.key);
              if (!product) return null;

              const price = typeof product.price === "number" ? product.price : parseFloat(product.price) || 0;
              const itemTotal = price * item.qty * cart.days;

              return (
                <div
                  key={item.key}
                  className="rounded-2xl bg-white border border-slate-200 shadow-card p-6 animate-fade-in-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="flex gap-4">
                    <Link to={`/product/${item.key}`} className="shrink-0">
                      <img
                        src={product.image?.[0]}
                        alt={product.name}
                        className="w-24 h-24 rounded-xl object-cover hover:scale-105 transition-transform"
                      />
                    </Link>
                    <div className="flex-1">
                      <Link to={`/product/${item.key}`}>
                        <h3 className="font-semibold text-slate-900 hover:text-accent transition mb-1">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-slate-600 mb-3">{product.category}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.key, -1)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition"
                          >
                            <HiMinus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center font-medium">{item.qty}</span>
                          <button
                            onClick={() => updateQuantity(item.key, 1)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition"
                          >
                            <HiPlus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-accent">Rs. {itemTotal.toLocaleString()}</p>
                          <p className="text-xs text-slate-500">Rs. {price.toLocaleString()} × {item.qty} × {cart.days} days</p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        removeFromCart(item.key);
                        loadCartData();
                        toast.success("Item removed");
                      }}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                    >
                      <HiTrash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-3xl bg-white border border-slate-200 shadow-premium p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <HiCalendar className="w-4 h-4 inline mr-1" />
                    Rental Days
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={cart.days}
                    onChange={(e) => updateDays(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border-2 border-slate-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={cart.startingDate}
                    onChange={(e) => updateStartDate(e.target.value)}
                    min={formatDate(new Date())}
                    className="w-full px-4 py-2 rounded-xl border-2 border-slate-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">End Date</label>
                  <input
                    type="date"
                    value={cart.endingDate}
                    readOnly
                    className="w-full px-4 py-2 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-600"
                  />
                </div>
                <div className="pt-4 border-t border-slate-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-600">Subtotal</span>
                    <span className="font-semibold">Rs. {calculateTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold text-slate-900">
                    <span>Total</span>
                    <span className="text-accent">Rs. {calculateTotal().toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={checkingOut}
                className="w-full py-3.5 rounded-xl bg-accent text-white font-semibold hover:bg-accent-dark hover:shadow-glow transition-all btn-premium disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {checkingOut ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Proceed to Checkout
                    <HiArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <Link
                to="/items"
                className="block mt-4 text-center text-sm text-accent hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
