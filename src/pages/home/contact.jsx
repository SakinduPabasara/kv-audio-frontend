import { useState } from "react";
import toast from "react-hot-toast";
import {
  HiMail,
  HiPhone,
  HiLocationMarker,
  HiClock,
  HiArrowRight,
} from "react-icons/hi";
import { motion } from "framer-motion";
import {
  fadeUp,
  fadeLeft,
  fadeRight,
  staggerContainer,
  viewportOnce,
} from "../../utils/animations";

const inputCls =
  "w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-cta focus:ring-2 focus:ring-cta/20 transition-all duration-150";

const contactItems = [
  {
    icon: <HiMail className="w-5 h-5" />,
    label: "Email us",
    value: "info@waudio.lk",
    sub: "We reply within 24 hours",
    link: "mailto:info@waudio.lk",
  },
  {
    icon: <HiPhone className="w-5 h-5" />,
    label: "Call us",
    value: "+94 70 342 7349",
    sub: "Mon–Sat, 9am–8pm",
    link: "tel:+94703427349",
  },
  {
    icon: <HiLocationMarker className="w-5 h-5" />,
    label: "Visit us",
    value: "Koswatta, Rathmale Road, Kekanadura, Matara, Sri Lanka",
    sub: "Open 7 days a week",
    link: null,
  },
];

const hours = [
  { days: "Monday – Saturday", time: "9:00 AM – 8:00 PM" },
  { days: "Sunday", time: "10:00 AM – 5:00 PM" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      toast.success("Message received! We'll get back to you soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
      setSending(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-primary dark:bg-gray-950">

      {/* ── Page header ── */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <motion.div variants={fadeUp} initial="hidden" animate="show">
            <p className="text-xs font-bold text-cta uppercase tracking-widest mb-2">Contact</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2">
              Get in Touch
            </h1>
            <p className="text-slate-500 dark:text-slate-400 max-w-lg">
              Have a question or ready to book? Our team is standing by to help
              you plan the perfect event.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid lg:grid-cols-5 gap-12">

          {/* ── Left column: contact info ── */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="lg:col-span-2 space-y-4"
          >
            {/* Contact cards */}
            {contactItems.map((item) =>
              item.link ? (
                <motion.a
                  key={item.label}
                  variants={fadeUp}
                  href={item.link}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.18 }}
                  className="flex items-start gap-4 p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-cta/40 hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-cta/10 flex items-center justify-center text-cta shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">
                      {item.label}
                    </p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-cta transition-colors leading-snug">
                      {item.value}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">{item.sub}</p>
                  </div>
                </motion.a>
              ) : (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  className="flex items-start gap-4 p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl"
                >
                  <div className="w-10 h-10 rounded-lg bg-cta/10 flex items-center justify-center text-cta shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">
                      {item.label}
                    </p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white leading-snug">
                      {item.value}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">{item.sub}</p>
                  </div>
                </motion.div>
              )
            )}

            {/* Business hours card */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              transition={{ delay: 0.2 }}
              className="p-5 bg-slate-950 rounded-xl"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-cta/20 flex items-center justify-center text-cta">
                  <HiClock className="w-4 h-4" />
                </div>
                <p className="font-heading text-sm font-bold text-white">Business Hours</p>
              </div>
              <div className="space-y-2.5">
                {hours.map((h) => (
                  <div key={h.days} className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">{h.days}</span>
                    <span className="text-white font-semibold">{h.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right column: form ── */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="lg:col-span-3"
          >
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 shadow-sm">
              <h2 className="font-heading text-2xl font-bold text-slate-900 dark:text-white mb-1">
                Send us a message
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-7">
                Fill in the form and we'll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Your name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className={inputCls}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className={inputCls}
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className={inputCls}
                    placeholder="Equipment rental inquiry…"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className={`${inputCls} resize-none`}
                    placeholder="Tell us about your event, dates, and equipment needs…"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3.5 bg-cta text-white font-semibold text-sm rounded-lg hover:bg-cta-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {sending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <HiArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
