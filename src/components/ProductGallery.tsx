import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ProductGallery({ 
  images, 
  name, 
  isOutOfStock 
}: { 
  images: string[]; 
  name: string; 
  isOutOfStock?: boolean 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square bg-muted flex items-center justify-center">
        <span className="text-muted-foreground">Aucune image</span>
      </div>
    );
  }

  const goPrev = () => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  const goNext = () => setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));

  return (
    <div className="flex flex-col gap-3">
      {/* Image principale */}
      <div className="relative w-full aspect-square overflow-hidden bg-muted group">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${name} - image ${currentIndex + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`w-full h-full object-cover ${isOutOfStock ? "opacity-50 grayscale" : ""}`}
          />
        </AnimatePresence>

        {/* Flèches si plusieurs images */}
        {images.length > 1 && (
          <>
            <button
              onClick={goPrev}
              aria-label="Image précédente"
              className="absolute start-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={goNext}
              aria-label="Image suivante"
              className="absolute end-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            
            {/* Compteur */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
              {currentIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Miniatures */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`aspect-square overflow-hidden border-2 transition-colors ${
                idx === currentIndex ? "border-primary" : "border-transparent hover:border-muted-foreground/30"
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}