import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Heart, 
  User, 
  Smile, 
  Gift, 
  Stars, 
  Users
} from "lucide-react";

export const TraditionalPhotography: React.FC = () => {
  const navigate = useNavigate();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const captureList = [
    {
      num: "01",
      title: "Wedding Rituals",
      desc: "Every sacred moment, captured with timeless detail.",
      icon: Sparkles
    },
    {
      num: "02",
      title: "Family Moments",
      desc: "The people who make the celebration unforgettable.",
      icon: Users
    },
    {
      num: "03",
      title: "Bridal Portraits",
      desc: "Grace, elegance and every beautiful detail.",
      icon: User
    },
    {
      num: "04",
      title: "Groom Portraits",
      desc: "Dignified profiles and authentic pre-ceremony moods.",
      icon: User
    },
    {
      num: "05",
      title: "Couple Portraits",
      desc: "Quiet moments of connection amidst the grand celebrations.",
      icon: Heart
    },
    {
      num: "06",
      title: "Candid Family Interactions",
      desc: "Pure, unposed emotional exchanges between loved ones.",
      icon: Smile
    },
    {
      num: "07",
      title: "Traditional Ceremonies",
      desc: "Honoring age-old rituals with classic editorial framing.",
      icon: Gift
    },
    {
      num: "08",
      title: "Celebration Highlights",
      desc: "Dynamic captures of grand visual spectacle and key events.",
      icon: Stars
    }
  ];

  // Gallery images with existing assets
  const galleryImages = [
    { src: "/arun-priya-hero.png", caption: "Arun & Priya Under Temple Pillars", category: "Muhurtham" },
    { src: "/arun-priya-rice.jpg", caption: "Akshata Showering Ceremony", category: "Thaali Ceremony" },
    { src: "/arun-priya-garlands.jpg", caption: "Garland Exchange Ritual", category: "Garland Exchange" },
    { src: "/arun-priya-holding.jpg", caption: "Sacred Hand-Holding Vows", category: "Muhurtham" },
    { src: "/arun-priya-swing.jpg", caption: "Traditional Oonjal Swing Portrait", category: "Bride & Groom" },
    { src: "/collage-kolam.jpg", caption: "Drawing Traditional Kolam Ritual", category: "Family Blessings" }
  ];

  const handlePrevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  const handleNextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % galleryImages.length);
    }
  };

  // Keyboard controls for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") setLightboxIndex((prev) => (prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null));
      if (e.key === "ArrowRight") setLightboxIndex((prev) => (prev !== null ? (prev + 1) % galleryImages.length : null));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, galleryImages.length]);

  return (
    <div className="w-full bg-cream relative paper-texture overflow-hidden">
      
      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-16 border-b border-sand-dark/15">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Text */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="text-[10px] tracking-[0.25em] font-bold uppercase text-mud/50">
              OUR SERVICES
            </span>
            <h1 className="font-serif text-[44px] sm:text-[54px] md:text-[62px] text-charcoal tracking-normal leading-[1.15] font-light">
              Traditional<br />
              <span className="font-serif font-normal italic text-terracotta">Photography</span>
            </h1>
            
            <p className="font-tamil font-normal text-base md:text-lg text-mud/80 border-l-2 border-terracotta/30 pl-4 py-1 leading-relaxed">
              “தருணங்களைத் தாண்டி,<br />
              நினைவுகளைப் பாதுகாக்கும் கலை.”
            </p>

            <p className="font-sans text-sm sm:text-base text-mud/85 leading-relaxed max-w-lg">
              We preserve every meaningful moment with timeless, detailed photographs — from the quiet emotions to the grand celebrations.
            </p>

            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center space-x-3 px-8 py-3 bg-terracotta hover:bg-terracotta-dark text-white font-sans text-xs tracking-[0.2em] font-medium transition-colors duration-300 rounded-none uppercase shadow-md hover:shadow-lg"
              >
                <span>BOOK YOUR DATE →</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Large Featured Image */}
          <div className="lg:col-span-6 relative flex items-center justify-center py-6">
            <div className="absolute w-[80%] aspect-[3/4] bg-[#eae5db] rotate-[-5deg] shadow-sm pointer-events-none" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.97, rotate: 1 }}
              animate={{ opacity: 1, scale: 1, rotate: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-[80%] aspect-[3/4] bg-[#fffdf8] p-3 pb-12 shadow-xl border border-sand-dark/15"
            >
              <img
                src="/arun-priya-hero.png"
                alt="Traditional Muhurtham photograph"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.25em] font-sans font-bold uppercase text-mud/40">
                TIMELESS MOMENTS
              </span>
            </motion.div>

            {/* Handwritten label */}
            <div className="absolute left-[3%] bottom-[5%] z-20">
              <span className="font-handwritten text-lg md:text-xl text-terracotta rotate-[-12deg] block">
                Timeless Moments
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Introduction / Story Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-sand-dark/15">
        <div className="lg:col-span-5 text-left space-y-2">
          <span className="text-[10px] tracking-[0.25em] font-bold text-terracotta uppercase">
            THE ART OF TRADITION
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal leading-tight">
            Every tradition<br />holds a story.
          </h2>
        </div>
        <div className="lg:col-span-7 text-left space-y-4">
          <p className="font-sans text-sm sm:text-base text-mud/85 leading-relaxed">
            Traditional photography is about preserving the complete story of your celebration. From the first rituals to the final moments, every detail, emotion, expression, and family gathering deserves to be remembered.
          </p>
          <p className="font-tamil font-normal text-base text-terracotta/80 leading-relaxed italic">
            “சடங்குகள் மாறலாம்… நினைவுகள் என்றும் மாறாது.”
          </p>
        </div>
      </section>

      {/* 3. What We Capture Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 border-b border-sand-dark/15">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal tracking-wide">
            More Than A Moment
          </h2>
          <p className="text-xs tracking-widest text-mud/60 uppercase font-sans">
            We capture the details that make your celebration yours.
          </p>
          <div className="w-12 h-[1px] bg-terracotta/30 mx-auto mt-4" />
        </div>

        {/* List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {captureList.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.num}
                className="group flex items-start space-x-6 p-4 border-b border-sand-dark/10 transition-all duration-300 hover:border-sand-dark"
              >
                <span className="font-serif text-xs font-bold text-terracotta/60 pt-1">
                  {item.num}
                </span>
                <div className="w-10 h-10 rounded-full bg-sand-dark/10 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
                  <Icon className="w-5 h-5 text-charcoal" />
                </div>
                <div className="text-left space-y-1">
                  <h4 className="font-serif text-base font-semibold text-charcoal group-hover:text-terracotta transition-colors duration-200">
                    {item.title}
                  </h4>
                  <p className="text-xs text-mud/80 font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Featured Image / Editorial Break */}
      <section className="py-12 bg-sand-light relative paper-texture border-b border-sand-dark/15">
        <div className="max-w-6xl mx-auto px-4">
          <div className="border border-sand-dark/25 p-2 bg-[#fffdf8] shadow-md">
            <div className="h-[40vh] md:h-[55vh] overflow-hidden relative">
              <img
                src="/chettinad-hero.png"
                alt="Traditional heritage pre-wedding portrait"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between mt-6 px-1 gap-4">
            <span className="font-handwritten text-lg text-terracotta">
              Captured with care
            </span>
            <p className="font-serif italic text-charcoal/80 text-xs tracking-wider">
              “Moments become memories when they are beautifully remembered.”
            </p>
          </div>
        </div>
      </section>

      {/* 5. Traditional Wedding Moments Gallery */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 border-b border-sand-dark/15">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal tracking-wide">
            From Rituals To Memories
          </h2>
          <div className="w-12 h-[1px] bg-terracotta/30 mx-auto mt-4" />
        </div>

        {/* Asymmetrical Gallery */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryImages.map((image, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxIndex(idx)}
              className="break-inside-avoid relative overflow-hidden bg-[#fffdf8] p-2 pb-6 shadow-sm border border-sand-dark/15 rounded-none cursor-pointer group transition-all duration-300 hover:shadow-md"
            >
              <div className="overflow-hidden">
                <img
                  src={image.src}
                  alt={image.caption}
                  className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              
              {/* Hover overlay text */}
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-[10px] tracking-[0.25em] font-bold border border-white/35 px-4 py-2 backdrop-blur-[1px] uppercase">
                  VIEW MOMENT
                </span>
              </div>

              <div className="mt-3 px-1 text-left flex justify-between items-center text-[10px] uppercase font-bold text-mud/60">
                <span className="font-serif italic tracking-wide">{image.caption}</span>
                <span className="text-terracotta">{image.category}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Why Traditional Photography */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 border-b border-sand-dark/15">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal tracking-wide">
            Why Traditional Photography?
          </h2>
          <div className="w-12 h-[1px] bg-terracotta/30 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {[
            { num: "01", title: "COMPLETE COVERAGE", desc: "Every important ritual and celebration is documented." },
            { num: "02", title: "TIMELESS DETAILS", desc: "Classic compositions that remain beautiful for years." },
            { num: "03", title: "FAMILY MEMORIES", desc: "Preserving the people and moments that matter most." },
            { num: "04", title: "AUTHENTIC STORY", desc: "Your celebration captured as it naturally unfolds." }
          ].map((benefit) => (
            <div key={benefit.num} className="text-left space-y-4 p-4 border-l border-sand-dark/20">
              <span className="font-serif text-3xl font-light text-terracotta/40 block leading-none">
                {benefit.num}
              </span>
              <h4 className="text-xs tracking-[0.2em] font-bold uppercase text-charcoal">
                {benefit.title}
              </h4>
              <p className="text-xs text-mud/75 font-sans leading-relaxed">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Tamil Emotional Quote Section */}
      <section className="py-20 bg-sand-light relative paper-texture border-b border-sand-dark/15">
        <div className="max-w-3xl mx-auto text-center space-y-6 px-4">
          <p className="font-tamil font-normal text-lg sm:text-xl md:text-2xl text-charcoal tracking-wide leading-relaxed">
            “ஒரு திருமணம் என்பது<br />
            ஒரு நாள் கொண்டாட்டம் அல்ல…<br />
            பல தலைமுறைகள் நினைவுகூரும்<br />
            ஒரு அழகான கதை.”
          </p>
          <span className="font-handwritten text-base text-terracotta block">
            — Footbee Storytellers
          </span>
        </div>
      </section>

      {/* 8. Final CTA Section */}
      <section className="py-24 max-w-3xl mx-auto text-center px-4 space-y-6">
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal leading-tight">
          Let’s Preserve<br />Your Beautiful Moments.
        </h2>
        <p className="text-sm text-mud/75 font-sans tracking-wide">
          Your traditions deserve to be remembered beautifully.
        </p>
        <p className="font-tamil font-normal text-base text-terracotta/90">
          “உங்கள் நினைவுகளை, எங்களுடன் அழகாகப் பாதுகாத்திடுங்கள்.”
        </p>
        <div className="pt-4">
          <button
            onClick={() => navigate("/contact", { state: { fromService: "Traditional Photography" } })}
            className="inline-flex items-center space-x-3 px-10 py-4 bg-terracotta hover:bg-terracotta-dark text-white font-sans text-xs tracking-[0.2em] font-bold uppercase transition-colors duration-300 rounded-none shadow-md hover:shadow-lg cursor-pointer"
          >
            <span>BOOK YOUR DATE →</span>
          </button>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 select-none"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors cursor-pointer z-50 p-2"
              aria-label="Close Lightbox"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Prev button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors cursor-pointer z-50 p-2"
              aria-label="Previous Image"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Image Frame */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[85vh] flex flex-col items-center bg-[#fffdf8] p-3 pb-12 shadow-2xl"
            >
              <img
                src={galleryImages[lightboxIndex].src}
                alt={galleryImages[lightboxIndex].caption}
                className="max-w-full max-h-[70vh] object-contain border border-sand/20"
              />
              
              <div className="w-full flex items-center justify-between mt-4 px-1 text-charcoal/80">
                <p className="font-serif italic text-xs">
                  {galleryImages[lightboxIndex].caption}
                </p>
                <span className="text-[10px] tracking-widest font-sans font-bold uppercase text-mud/50">
                  {lightboxIndex + 1} / {galleryImages.length}
                </span>
              </div>
            </motion.div>

            {/* Next button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors cursor-pointer z-50 p-2"
              aria-label="Next Image"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
