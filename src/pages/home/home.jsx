import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { HiArrowRight, HiSparkles } from "react-icons/hi";

export default function Home() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up");
          entry.target.style.opacity = "1";
        }
      });
    }, observerOptions);

    [heroRef, featuresRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div
          ref={heroRef}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center opacity-0"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 mb-8 animate-fade-in-down">
            <HiSparkles className="w-4 h-4 text-gold" />
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Premium Audio Solutions
            </span>
          </div>

          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="block text-slate-900 dark:text-white">
              Sound that
            </span>
            <span className="block gradient-text mt-2">moves the room</span>
          </h1>

          <p
            className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Professional audio equipment and lighting for events, studios, and
            venues. Rent or buy — we deliver excellence.
          </p>

          <div
            className="flex flex-wrap justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Link
              to="/items"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-accent text-white font-semibold shadow-premium hover:shadow-glow hover:scale-105 transition-all duration-300 btn-premium"
            >
              Browse Collection
              <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 rounded-2xl border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold hover:border-accent hover:text-accent hover:bg-accent/5 dark:hover:border-accent dark:hover:text-white transition-all duration-300"
            >
              Get in Touch
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-slate-400 dark:border-slate-600 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-slate-400 dark:bg-slate-600 rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={featuresRef}
        className="py-24 md:py-32 bg-white dark:bg-slate-900 opacity-0"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Why Wave Audio?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Excellence in every detail
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🎚️",
                title: "Pro Equipment",
                desc: "Industry-standard mics, speakers, and lighting systems for any scale.",
                delay: "0.1s",
              },
              {
                icon: "📅",
                title: "Flexible Rental",
                desc: "Daily, weekly, or event-based — we adapt to your schedule seamlessly.",
                delay: "0.2s",
              },
              {
                icon: "🛠️",
                title: "Expert Support",
                desc: "Setup advice and on-site support when you need it most.",
                delay: "0.3s",
              },
            ].map((item, idx) => (
              <div
                key={item.title}
                className="group p-8 rounded-3xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200/80 dark:border-slate-700/80 shadow-card hover:shadow-premium transition-all duration-500 hover:-translate-y-2"
                style={{ animationDelay: item.delay }}
              >
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
                <div className="mt-6 h-1 w-0 bg-gradient-to-r from-accent to-gold group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-accent via-accent-light to-accent-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to elevate your event?
          </h2>
          <p className="text-xl text-slate-200 mb-10 max-w-2xl mx-auto">
            Explore our catalog or reach out for a personalized quote.
          </p>
          <Link
            to="/items"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-accent font-semibold shadow-premium hover:shadow-glow hover:scale-105 transition-all duration-300"
          >
            View Collection
            <HiArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
