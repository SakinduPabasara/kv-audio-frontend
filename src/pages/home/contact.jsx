import { useState } from "react";
import toast from "react-hot-toast";
import {
  HiMail,
  HiPhone,
  HiLocationMarker,
  HiPaperAirplane,
} from "react-icons/hi";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      toast.success("Message received! We'll get back to you soon.", {
        icon: "✉️",
      });
      setForm({ name: "", email: "", subject: "", message: "" });
      setSending(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-down">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Have a question or want to book gear? We're here to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info Cards */}
          <div className="space-y-6 animate-slide-in-left">
            {[
              {
                icon: <HiMail className="w-6 h-6" />,
                label: "Email",
                value: "info@waveaudio.com",
                link: "mailto:info@waveaudio.com",
                color: "from-blue-500 to-blue-600",
              },
              {
                icon: <HiPhone className="w-6 h-6" />,
                label: "Phone",
                value: "+92 300 1234567",
                link: "tel:+923001234567",
                color: "from-emerald-500 to-emerald-600",
              },
              {
                icon: <HiLocationMarker className="w-6 h-6" />,
                label: "Address",
                value: "Wave Audio, City Plaza, Lahore",
                link: null,
                color: "from-purple-500 to-purple-600",
              },
            ].map((item, idx) => (
              <a
                key={item.label}
                href={item.link || undefined}
                className={`block p-6 rounded-3xl bg-gradient-to-br ${item.color} text-white shadow-premium hover:shadow-glow hover:-translate-y-1 transition-all duration-300 animate-fade-in-up`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold opacity-90 uppercase tracking-wider mb-1">
                      {item.label}
                    </p>
                    <p className="text-lg font-medium">{item.value}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Contact Form */}
          <div className="animate-slide-in-right">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-premium p-8 md:p-10"
            >
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                    placeholder="Booking / Inquiry"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all resize-none"
                    placeholder="How can we help?"
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="group w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-accent text-white font-semibold hover:bg-accent-dark hover:shadow-glow transition-all duration-300 btn-premium disabled:opacity-70"
                >
                  {sending ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <HiPaperAirplane className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
