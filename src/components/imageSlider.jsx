import { useState, useEffect } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

export default function ImageSlider(props) {
  const images = props.images || [];
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (images.length) setSelectedIndex(0);
  }, [images]);

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images.length) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl text-slate-400">
        <div className="text-center">
          <div className="text-4xl mb-2">📷</div>
          <p className="text-sm">No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative group">
      {/* Main Image */}
      <div className="w-full h-full overflow-hidden">
        <img
          src={images[selectedIndex]}
          alt={`Product view ${selectedIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
            aria-label="Previous image"
          >
            <HiChevronLeft className="w-6 h-6 text-slate-700" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
            aria-label="Next image"
          >
            <HiChevronRight className="w-6 h-6 text-slate-700" />
          </button>
        </>
      )}

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                index === selectedIndex
                  ? "border-accent ring-2 ring-accent/30 scale-110"
                  : "border-transparent hover:border-slate-300 opacity-70 hover:opacity-100"
              }`}
            >
              <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-semibold">
          {selectedIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
}
