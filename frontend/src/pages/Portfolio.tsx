import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryPhotos as staticGalleryPhotos } from "../data/stories";
import { api } from "../services/api";

// ==================================================
// DECORATIVE VECTOR ILLUSTRATIONS (Ink drawings)
// ==================================================

const BotanicalBranch: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 120 120" className={`stroke-current fill-none stroke-[1] ${className}`}>
    <path d="M60 110 Q50 60 60 10 M60 85 Q40 78 30 65 M60 65 Q80 58 85 45 M60 45 Q42 38 35 25 M60 25 Q78 18 80 8" strokeLinecap="round" />
    <path d="M30 65 Q23 60 25 54 Q33 58 30 65 Z" fill="currentColor" className="opacity-10" />
    <path d="M85 45 Q92 40 90 34 Q82 38 85 45 Z" fill="currentColor" className="opacity-10" />
    <path d="M35 25 Q28 20 30 14 Q38 18 35 25 Z" fill="currentColor" className="opacity-10" />
    <path d="M80 8 Q87 3 85 -3 Q77 1 80 8 Z" fill="currentColor" className="opacity-10" />
  </svg>
);

const CameraOutline: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 80" className={`stroke-current fill-none stroke-[1] ${className}`}>
    <path d="M15 25 H30 L35 15 H65 L70 25 H85 C89 25 92 28 92 32 V68 C92 72 89 75 85 75 H15 C11 75 8 72 8 68 V32 C8 28 11 25 15 25 Z" strokeLinejoin="round" />
    <circle cx="50" cy="50" r="18" />
    <circle cx="50" cy="50" r="14" strokeDasharray="2,2" />
    <circle cx="78" cy="36" r="3" fill="currentColor" className="opacity-30" />
  </svg>
);

const FilmFrame: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 120" className={`stroke-current fill-none stroke-[0.8] ${className}`}>
    <path d="M10 10 H90 V110 H10 Z M20 20 H80 V100 H20 Z" />
    <path d="M10 15 H20 M10 25 H20 M10 35 H20 M10 45 H20 M10 55 H20 M10 65 H20 M10 75 H20 M10 85 H20 M10 95 H20" />
    <path d="M80 15 H90 M80 25 H90 M80 35 H90 M80 45 H90 M80 55 H90 M80 65 H90 M80 75 H90 M80 85 H90 M80 95 H90" />
  </svg>
);

const TinyStar: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={`fill-current ${className}`}>
    <path d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z" />
  </svg>
);

const DiamondDivider: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`flex items-center space-x-3 ${className}`}>
    <div className="w-10 h-[1px] bg-charcoal/15" />
    <span className="text-[8px] text-terracotta/70 select-none">◇</span>
    <div className="w-10 h-[1px] bg-charcoal/15" />
  </div>
);

export const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [galleryPhotos, setGalleryPhotos] = useState<any[]>(staticGalleryPhotos);
  const [categories, setCategories] = useState<any[]>([]);

  // Scroll to top on mount and fetch backend gallery
  useEffect(() => {
    window.scrollTo(0, 0);
    async function loadGallery() {
      try {
        const [res, portRes] = await Promise.allSettled([
          api.getPortfolios(),
          api.getCategories(),
        ]);
        
        if (res.status === 'fulfilled' && Array.isArray(res.value) && res.value.length > 0) {
          const mappedPhotos = res.value.map(p => ({
            ...p,
            src: p.image_path || p.src,
            caption: p.caption_en || p.caption,
            category: p.category?.name_en || p.category_name || p.category,
          }));
          setGalleryPhotos(mappedPhotos);
        }
        
        if (portRes.status === 'fulfilled' && Array.isArray(portRes.value)) {
          setCategories(portRes.value);
        }
      } catch {
        // Fallback to static
      }
    }
    loadGallery();
  }, []);

  const dynamicFilters = categories.map(p => (p.name_en || p.name || '').toUpperCase()).filter(Boolean);
  const filters = ["ALL", ...dynamicFilters, "OTHER"];

  // Filter photos based on selection
  const filteredPhotos = activeFilter === "ALL"
    ? galleryPhotos
    : galleryPhotos.filter((photo) => {
        const cat = (photo.category || photo.category_name || "OTHER").toUpperCase();
        if (activeFilter === "OTHER") {
          return !dynamicFilters.includes(cat);
        }
        return cat === activeFilter;
      });

  // Lightbox handlers
  const handlePrev = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  }, [lightboxIndex, filteredPhotos.length]);

  const handleNext = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
    }
  }, [lightboxIndex, filteredPhotos.length]);

  // Keyboard navigation inside lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") setLightboxIndex(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden"; // Lock screen scrolling

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset"; // Restore screen scrolling
    };
  }, [lightboxIndex, handlePrev, handleNext]);

  return (
    <div className="w-full bg-cream relative paper-texture min-h-screen overflow-x-hidden pt-28 pb-16">
      
      {/* ==================================================
          SECTION 1 — PORTFOLIO HERO (Editorial Split Collage)
          ================================================== */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 flex flex-col lg:flex-row items-center justify-between gap-16 relative">
        
        {/* Background botanical graphics behind hero */}
        <BotanicalBranch className="absolute left-[-2%] top-[10%] w-36 h-36 text-sand-dark/15 pointer-events-none" />
        <FilmFrame className="absolute right-[5%] bottom-[-5%] w-24 h-32 text-sand-dark/10 pointer-events-none -rotate-12" />

        {/* Left Side Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-[48%] flex flex-col text-left z-10"
        >
          <span className="font-handwritten text-terracotta text-2xl md:text-3xl mb-4 italic">
            OUR PORTFOLIO
          </span>
          <h1 className="font-serif text-charcoal text-4xl sm:text-5xl lg:text-[68px] leading-[1.08] font-normal tracking-tight mb-6">
            Stories We've<br />
            Captured<br />
            <span className="text-terracotta font-serif">Beautifully.</span>
          </h1>
          
          <DiamondDivider className="justify-start mb-6" />

          <p className="text-mud/85 font-sans text-base md:text-lg leading-relaxed max-w-md">
            Explore a collection of moments, emotions, celebrations and stories captured through the Footbee lens.
          </p>
        </motion.div>

        {/* Right Side Scrapbook Photography Collage */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, delay: 0.2, ease: "easeOut" }}
          className="w-full lg:w-[48%] flex justify-center items-center h-[420px] md:h-[500px] relative mt-10 lg:mt-0"
        >
          {/* Collage background decorations */}
          <BotanicalBranch className="absolute right-[5%] top-2 w-32 h-32 text-terracotta/20 pointer-events-none" />
          <BotanicalBranch className="absolute left-[5%] bottom-4 w-28 h-28 text-mud/10 pointer-events-none -rotate-90" />
          <TinyStar className="absolute top-1/3 left-6 w-3 h-3 text-terracotta/50" />
          <TinyStar className="absolute bottom-1/4 right-8 w-4 h-4 text-mud/20" />

          {/* Photo 1 (Swing - bottom left) */}
          <div className="absolute left-2 top-20 w-[190px] md:w-[220px] rotate-[-7deg] polaroid-frame shadow-md hover:z-30 hover:rotate-0 hover:scale-105 transition-all duration-500 bg-white">
            <img 
              src="/arun-priya-swing.jpg" 
              alt="Swing laughter" 
              className="w-full h-36 md:h-44 object-cover border border-sand-light" 
            />
            {/* Masking Tape */}
            <div className="absolute -top-3 left-4 w-12 h-5 bg-sand-dark/50 backdrop-blur-[1px] rotate-[18deg] border-l border-r border-dashed border-mud/10" />
            <p className="font-handwritten text-xs italic text-center text-charcoal/80 mt-3">Swing laughter, 2024</p>
          </div>

          {/* Photo 2 (Feast/Event - top right) */}
          <div className="absolute right-2 top-6 w-[200px] md:w-[230px] rotate-[5deg] polaroid-frame shadow-lg hover:z-30 hover:rotate-0 hover:scale-105 transition-all duration-500 bg-white">
            <img 
              src="https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=800" 
              alt="Feast smiles" 
              className="w-full h-36 md:h-44 object-cover border border-sand-light" 
            />
            {/* Masking Tape */}
            <div className="absolute -top-4 right-10 w-16 h-5 bg-sand-dark/50 backdrop-blur-[1px] rotate-[-10deg] border-l border-r border-dashed border-mud/10" />
            <p className="font-handwritten text-xs italic text-center text-charcoal/80 mt-3">Evening lights, Madurai</p>
          </div>

          {/* Photo 3 (Bride Portrait - centered foreground) */}
          <div className="absolute left-1/4 bottom-6 w-[200px] md:w-[230px] rotate-[-2deg] polaroid-frame shadow-[0_15px_30px_rgba(0,0,0,0.12)] z-20 hover:z-30 hover:rotate-0 hover:scale-105 transition-all duration-500 bg-white">
            <img 
              src="https://images.unsplash.com/photo-1595853035070-59a39fe84de3?q=80&w=800" 
              alt="Bridal grace" 
              className="w-full h-40 md:h-48 object-cover border border-sand-light" 
            />
            {/* Masking Tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 bg-sand-dark/50 backdrop-blur-[1px] rotate-[3deg] border-l border-r border-dashed border-mud/10" />
            <p className="font-handwritten text-xs italic text-center text-charcoal/80 mt-3">Bridal grace & shine</p>
          </div>
        </motion.div>
      </section>

      {/* ==================================================
          SECTION 2 — CATEGORY FILTER (Interactive Bar)
          ================================================== */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-8 mt-12">
        <div className="text-center mb-8">
          <span className="font-sans text-[10px] tracking-[0.3em] font-bold text-mud/60 uppercase block mb-2">
            EXPLORE OUR WORK
          </span>
          <DiamondDivider className="justify-center" />
        </div>

        {/* Category Filters row (horizontal scroll on mobile) */}
        <div className="flex items-center md:justify-center overflow-x-auto no-scrollbar gap-1.5 md:gap-3 pb-4 px-4 whitespace-nowrap scroll-smooth">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => {
                  setActiveFilter(filter);
                  setLightboxIndex(null);
                }}
                className={`px-4 py-2 text-[11px] tracking-[0.2em] uppercase font-semibold transition-all duration-300 relative focus:outline-none shrink-0 ${
                  isActive ? "text-terracotta" : "text-mud/60 hover:text-charcoal"
                }`}
              >
                <span>{filter}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeUnderline"
                    className="absolute left-4 right-4 bottom-0 h-[1.5px] bg-terracotta"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* ==================================================
          SECTION 3 — EDITORIAL PORTFOLIO GALLERY (Masonry Layout)
          ================================================== */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-8 min-h-[400px]">
        <motion.div 
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo, index) => {
              // Custom aspect ratio classes to inject an editorial layout flow
              let aspectClass = "aspect-[3/4]";
              if (index % 4 === 1) aspectClass = "aspect-[4/5]";
              if (index % 4 === 2) aspectClass = "aspect-[16/10]";
              if (index % 4 === 3) aspectClass = "aspect-square";

              return (
                <motion.div
                  key={photo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setLightboxIndex(index)}
                  className="break-inside-avoid relative overflow-hidden group border border-sand-dark/15 bg-white p-3 shadow-md cursor-pointer hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Polaroid inner frame wrapper */}
                  <div className="relative overflow-hidden w-full h-full bg-cream-light">
                    <div className={`relative w-full overflow-hidden ${aspectClass}`}>
                      <img
                        src={photo.src}
                        alt={photo.caption}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                      
                      {/* Subtle grain/paper overlay */}
                      <div className="absolute inset-0 paper-texture opacity-[0.03] pointer-events-none" />

                      {/* Editorial Hover Overlay */}
                      <div className="absolute inset-0 bg-charcoal/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-cream">
                        <span className="text-[10px] tracking-[0.25em] text-terracotta-light uppercase font-bold mb-2">
                          {photo.category}
                        </span>
                        <h4 className="font-serif italic text-base sm:text-lg text-white leading-relaxed max-w-xs">
                          {photo.caption}
                        </h4>
                        
                        <div className="flex items-center space-x-2 mt-4 text-[10px] tracking-[0.15em] text-cream/70">
                          <span>VIEW DETAILS</span>
                          <svg className="w-3.5 h-3.5 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty state if no images match */}
        {filteredPhotos.length === 0 && (
          <div className="w-full py-24 text-center">
            <p className="font-serif italic text-mud/60 text-lg">No stories matching this category yet.</p>
          </div>
        )}
      </section>

      {/* ==================================================
          SECTION 4 — FEATURED PORTFOLIO STORY (Editorial Banner)
          ================================================== */}
      <section className="bg-sand-light py-20 md:py-28 my-16 relative overflow-hidden border-y border-sand-dark/20">
        
        {/* Ink sketches on background */}
        <BotanicalBranch className="absolute right-0 top-4 w-48 h-48 text-sand-dark/20 pointer-events-none -rotate-45" />
        <FilmFrame className="absolute left-[2%] bottom-4 w-20 h-28 text-sand-dark/10 pointer-events-none rotate-[20deg]" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
          {/* Left Large Image */}
          <div className="w-full lg:w-[48%]">
            <div className="relative p-3 bg-white border border-sand-dark/25 shadow-2xl">
              <img 
                src="/chettinad-hero.png" 
                alt="Featured Story Courtyard" 
                className="w-full h-[320px] md:h-[440px] object-cover" 
              />
              <div className="absolute -top-3 -right-3 w-16 h-5 bg-sand-dark/50 backdrop-blur-[1px] rotate-[12deg] border-l border-r border-dashed border-mud/10 z-10" />
            </div>
          </div>

          {/* Right Text Box */}
          <div className="w-full lg:w-[46%] flex flex-col text-left">
            <span className="font-sans text-xs uppercase tracking-widest text-terracotta font-semibold mb-3 block">
              FEATURED STORY
            </span>
            <h2 className="font-serif text-charcoal text-3xl sm:text-4xl md:text-5xl font-normal leading-tight mb-6">
              Moments That<br />
              Stay With You.
            </h2>
            <p className="text-mud/85 font-sans text-base leading-relaxed max-w-md">
              A photograph is not just a recording of light; it is a safehouse for our deepest feelings. We capture the stolen glances, the shared laughter, and the quiet devotion that make your story unique. Our editorial style preserves these wedding canvases in their most honest, cinematic form.
            </p>
            <div className="mt-8">
              <Link 
                to="/stories" 
                className="inline-flex items-center space-x-3 px-8 py-4 bg-charcoal text-cream hover:bg-terracotta transition-colors duration-300 font-semibold tracking-[0.2em] text-xs"
              >
                <span>VIEW STORIES</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 6 — PORTFOLIO CTA
          ================================================== */}
      <section className="py-24 md:py-32 bg-cream text-center relative overflow-hidden">
        
        {/* Scattered botanical and camera elements */}
        <BotanicalBranch className="absolute left-[10%] top-1/2 -translate-y-1/2 w-44 h-44 text-sand-dark/15 pointer-events-none" />
        <BotanicalBranch className="absolute right-[8%] top-1/2 -translate-y-1/2 w-44 h-44 text-sand-dark/15 pointer-events-none -rotate-12" />
        <CameraOutline className="absolute left-[20%] top-10 w-16 h-12 text-terracotta/20 pointer-events-none rotate-6" />
        <TinyStar className="absolute top-12 left-1/3 w-3 h-3 text-terracotta/40" />
        <TinyStar className="absolute bottom-16 right-1/3 w-4 h-4 text-mud/20" />

        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <h2 className="font-serif text-charcoal text-3xl sm:text-4xl md:text-5xl font-normal leading-tight mb-6">
            Your Story Could Be<br />
            Our Next Frame.
          </h2>
          <p className="text-mud/85 font-sans text-base leading-relaxed max-w-lg mx-auto">
            Let's create photographs that feel as beautiful years from now as they did the day they were captured.
          </p>
          <div className="mt-8">
            <Link 
              to="/contact" 
              className="inline-flex items-center space-x-3 px-8 py-4 bg-charcoal text-cream hover:bg-terracotta transition-colors duration-300 font-semibold tracking-[0.2em] text-xs"
            >
              <span>BOOK YOUR DATE</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 5 — FULLSCREEN IMAGE PREVIEW (Lightbox)
          ================================================== */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-95 z-[100] flex flex-col justify-between p-6 md:p-10 select-none"
          >
            {/* Top Navigation Bar inside Lightbox */}
            <div className="flex items-center justify-between text-cream z-10 w-full max-w-7xl mx-auto">
              <span className="text-xs tracking-[0.25em] font-medium font-sans opacity-70">
                {String(lightboxIndex + 1).padStart(2, "0")} / {String(filteredPhotos.length).padStart(2, "0")}
              </span>
              <button
                onClick={() => setLightboxIndex(null)}
                className="p-2 text-cream hover:text-terracotta transition-colors focus:outline-none rounded-full bg-charcoal-light/25"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Picture Slider Area */}
            <div className="flex-grow flex items-center justify-between relative max-w-7xl mx-auto w-full h-[65vh] md:h-[75vh]">
              
              {/* Previous Image Trigger */}
              <button
                onClick={handlePrev}
                className="absolute left-2 md:left-0 p-3 text-cream/70 hover:text-terracotta bg-charcoal-light/35 md:bg-transparent transition-colors focus:outline-none z-10 rounded-full"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-7 h-7 md:w-10 md:h-10" />
              </button>

              {/* Centered Image Showcase */}
              <div className="w-full h-full flex items-center justify-center overflow-hidden px-4 md:px-14">
                <motion.img
                  key={lightboxIndex}
                  src={filteredPhotos[lightboxIndex].src}
                  alt={filteredPhotos[lightboxIndex].caption || "Editorial Gallery"}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="max-w-full max-h-full object-contain shadow-2xl border border-sand-dark/15"
                />
              </div>

              {/* Next Image Trigger */}
              <button
                onClick={handleNext}
                className="absolute right-2 md:right-0 p-3 text-cream/70 hover:text-terracotta bg-charcoal-light/35 md:bg-transparent transition-colors focus:outline-none z-10 rounded-full"
                aria-label="Next Image"
              >
                <ChevronRight className="w-7 h-7 md:w-10 md:h-10" />
              </button>
            </div>

            {/* Bottom Caption Bar */}
            <div className="text-center text-cream z-10 py-4 w-full max-w-3xl mx-auto">
              <span className="text-[10px] tracking-[0.3em] text-terracotta uppercase font-bold block mb-1">
                {filteredPhotos[lightboxIndex].category}
              </span>
              <p className="font-serif italic text-sm sm:text-base md:text-lg text-cream/90 max-w-xl mx-auto leading-relaxed">
                {filteredPhotos[lightboxIndex].caption}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
