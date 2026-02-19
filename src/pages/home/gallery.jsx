import { useEffect, useRef } from "react";

const placeholderImages = [
  "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&h=400&fit=crop",
];

export default function Gallery() {
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, idx) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("animate-fade-in-up");
              entry.target.style.opacity = "1";
            }, idx * 100);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const cards = containerRef.current?.querySelectorAll(".gallery-card");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-down">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Gallery</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Events and setups powered by Wave Audio
          </p>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {placeholderImages.map((src, i) => (
            <div
              key={i}
              className="gallery-card group relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-200 shadow-card hover:shadow-premium transition-all duration-500 hover:-translate-y-2 opacity-0"
            >
              <img
                src={src}
                alt={`Gallery ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white font-semibold">Event #{i + 1}</p>
                <p className="text-white/80 text-sm">Professional setup</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
