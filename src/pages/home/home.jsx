import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  HiArrowRight,
  HiMicrophone,
  HiCalendar,
  HiSupport,
  HiCheckCircle,
  HiStar,
  HiUsers,
  HiGlobe,
  HiLightningBolt,
} from "react-icons/hi";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  fadeUp,
  fadeLeft,
  fadeRight,
  fadeIn,
  staggerContainer,
  viewportOnce,
} from "../../utils/animations";

/* ── Data ───────────────────────────────────────────── */
const features = [
  {
    num: "01",
    icon: <HiMicrophone className="w-6 h-6 text-cta" />,
    title: "Pro Equipment",
    stat: "500+ Items",
    desc: "Industry-standard mics, speakers, and lighting systems trusted at events of every scale.",
  },
  {
    num: "02",
    icon: <HiCalendar className="w-6 h-6 text-cta" />,
    title: "Flexible Rental",
    stat: "Daily · Weekly · Event",
    desc: "Book by the day or the season. We build packages around your schedule, not the other way around.",
  },
  {
    num: "03",
    icon: <HiSupport className="w-6 h-6 text-cta" />,
    title: "Expert Support",
    stat: "Always On Call",
    desc: "From setup to teardown, our crew is on-site so you can focus entirely on the event.",
  },
];

const stats = [
  { icon: <HiStar className="w-5 h-5" />, value: "200+", label: "Events Served" },
  { icon: <HiLightningBolt className="w-5 h-5" />, value: "500+", label: "Equipment Items" },
  { icon: <HiUsers className="w-5 h-5" />, value: "50+", label: "Happy Clients" },
  { icon: <HiGlobe className="w-5 h-5" />, value: "10+", label: "Years Active" },
];

const eventTags = [
  "Weddings", "Corporate Events", "Concerts", "Studio Sessions",
  "Outdoor Festivals", "Private Parties", "Award Ceremonies", "Product Launches",
];

const trustedBy = [
  "Nelum Pokuna Theatre", "Cinnamon Grand", "Galle Face Hotel", "BMICH Colombo", "Shangri-La Colombo",
];

/* ── Marquee component ─────────────────────────────── */
function Marquee({ items }) {
  return (
    <div className="relative overflow-hidden">
      <div className="flex gap-8 animate-marquee whitespace-nowrap">
        {[...items, ...items].map((tag, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cta shrink-0" />
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Main Component ────────────────────────────────── */
export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">

      {/* ════════════════════════════════
          HERO
      ════════════════════════════════ */}
      <section className="relative pt-28 pb-16 md:pt-40 md:pb-24 bg-primary dark:bg-gray-950 overflow-hidden">
        {/* Background grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#0F172A 1px, transparent 1px), linear-gradient(90deg, #0F172A 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Warm gradient wash — right half */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-orange-50/60 to-transparent dark:from-orange-950/10 dark:to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-cta/10 dark:bg-cta/15 rounded-full mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cta animate-pulse" />
              <span className="text-xs font-semibold text-cta uppercase tracking-widest">
                Audio &amp; Lighting Rentals — Sri Lanka
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.06 }}
              className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-slate-900 dark:text-white leading-[1.0] tracking-tight mb-6"
            >
              Sound that
              <br />
              <motion.span
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.28, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="text-cta"
              >
                moves the room.
              </motion.span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.16 }}
              className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-xl mb-10 leading-relaxed"
            >
              Professional audio equipment and stage lighting for events, studios,
              and venues — delivered and set up by our expert crew.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.24 }}
              className="flex flex-wrap gap-3 mb-14"
            >
              <Link
                to="/items"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-cta text-white font-semibold text-sm rounded-lg hover:bg-cta-dark transition-colors duration-150 shadow-lg shadow-cta/20"
              >
                Browse Collection
                <HiArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-7 py-3.5 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold text-sm rounded-lg hover:border-slate-900 dark:hover:border-white hover:text-slate-900 dark:hover:text-white transition-colors duration-150"
              >
                Get a Quote
              </Link>
            </motion.div>

            {/* Stat ticker */}
            <motion.div
              variants={staggerContainer(0.1)}
              initial="hidden"
              animate="show"
              className="flex flex-wrap gap-x-8 gap-y-4"
            >
              {stats.map((s) => (
                <motion.div key={s.label} variants={fadeUp} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-cta shadow-sm">
                    {s.icon}
                  </div>
                  <div>
                    <p className="font-heading text-xl font-bold text-slate-900 dark:text-white leading-none">
                      {s.value}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          TRUSTED BY — scrolling marquee
      ════════════════════════════════ */}
      <div className="border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 py-4 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest whitespace-nowrap shrink-0">
            Trusted by
          </p>
          <div className="flex-1 overflow-hidden relative">
            <div className="flex gap-10 animate-marquee whitespace-nowrap">
              {[...trustedBy, ...trustedBy].map((name, i) => (
                <span key={i} className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════
          FEATURES
      ════════════════════════════════ */}
      <section className="py-20 md:py-32 bg-primary dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mb-16 max-w-xl"
          >
            <p className="text-xs font-bold text-cta uppercase tracking-widest mb-3">
              Why Waudio
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
              Everything you need,
              <br />nothing you don't.
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.13)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid sm:grid-cols-3 gap-6"
          >
            {features.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="group relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-8 flex flex-col gap-6 cursor-default transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 overflow-hidden"
              >
                {/* Number watermark */}
                <span className="absolute -top-3 -right-1 font-heading text-8xl font-black text-slate-100 dark:text-slate-700 select-none leading-none pointer-events-none">
                  {item.num}
                </span>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center shrink-0 relative">
                  {item.icon}
                </div>

                {/* Content */}
                <div className="flex-1 relative">
                  <p className="text-xs font-bold text-cta uppercase tracking-widest mb-2">
                    {item.stat}
                  </p>
                  <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom orange accent rule */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cta to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════
          STATS BAND (dark full-width)
      ════════════════════════════════ */}
      <section className="bg-slate-950 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-slate-800"
          >
            {stats.map((s) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                className="flex flex-col items-center text-center md:px-8"
              >
                <div className="w-10 h-10 rounded-lg bg-cta/10 flex items-center justify-center text-cta mb-4">
                  {s.icon}
                </div>
                <p className="font-heading text-4xl md:text-5xl font-black text-white mb-1 tracking-tight">
                  {s.value}
                </p>
                <p className="text-xs text-slate-400 uppercase tracking-widest font-medium">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════
          EVENT TYPES — marquee ticker
      ════════════════════════════════ */}
      <section className="py-14 bg-primary dark:bg-gray-950 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="text-xs font-semibold text-slate-400 uppercase tracking-widest"
          >
            Events we serve
          </motion.p>
        </div>
        <div className="overflow-hidden">
          <Marquee items={eventTags} />
        </div>
      </section>

      {/* ════════════════════════════════
          CTA BANNER
      ════════════════════════════════ */}
      <section className="relative bg-slate-900 dark:bg-gray-900 py-20 md:py-28 overflow-hidden">
        {/* Grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Orange glow blob */}
        <div className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full bg-cta/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="max-w-xl"
            >
              <p className="text-xs font-bold text-cta uppercase tracking-widest mb-4">
                Get started today
              </p>
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
                Ready to elevate
                <br />your next event?
              </h2>
              <p className="text-slate-400 leading-relaxed">
                Explore our full catalogue or get in touch for a custom quote
                tailored to your event — we'll handle the rest.
              </p>
            </motion.div>

            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="flex flex-col sm:flex-row gap-3 shrink-0"
            >
              <Link
                to="/items"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-cta text-white font-bold text-sm rounded-lg hover:bg-cta-dark transition-colors shadow-lg shadow-cta/25"
              >
                View Collection
                <HiArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border border-slate-600 text-slate-300 font-semibold text-sm rounded-lg hover:border-white hover:text-white transition-colors"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
