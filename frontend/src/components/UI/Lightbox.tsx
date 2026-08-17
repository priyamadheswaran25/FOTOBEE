import React, { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: { src: string; caption?: string }[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  setCurrentIndex,
}) => {
  const handlePrev = useCallback(() => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, setCurrentIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, setCurrentIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    // Lock scroll
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handlePrev, handleNext, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex flex-col justify-between p-4 md:p-8">
        {/* Top Bar (Counter & Close) */}
        <div className="flex items-center justify-between text-cream z-10 w-full">
          <span className="text-xs tracking-[0.2em] font-medium font-sans">
            {currentIndex + 1} / {images.length}
          </span>
          <button
            onClick={onClose}
            className="p-2 hover:text-terracotta transition-colors focus:outline-none"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-grow flex items-center justify-between relative max-w-7xl mx-auto w-full h-[65vh] md:h-[75vh]">
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            className="absolute left-0 md:relative p-3 bg-charcoal-light/50 md:bg-transparent text-cream hover:text-terracotta transition-colors focus:outline-none z-10"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
          </button>

          {/* Image Container with animations */}
          <div className="w-full h-full flex items-center justify-center overflow-hidden px-4 md:px-12">
            <motion.img
              key={currentIndex}
              src={images[currentIndex].src}
              alt={images[currentIndex].caption || "Exhibition photography"}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="max-w-full max-h-full object-contain shadow-2xl border border-sand-dark/10"
            />
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-0 md:relative p-3 bg-charcoal-light/50 md:bg-transparent text-cream hover:text-terracotta transition-colors focus:outline-none z-10"
            aria-label="Next Image"
          >
            <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
          </button>
        </div>

        {/* Bottom Bar (Caption) */}
        <div className="text-center text-cream-dark z-10 py-4 w-full">
          {images[currentIndex].caption && (
            <motion.p
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif italic text-sm md:text-base tracking-wide max-w-xl mx-auto"
            >
              {images[currentIndex].caption}
            </motion.p>
          )}
        </div>
      </div>
    </AnimatePresence>
  );
};
