import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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

const TinyHeart: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={`fill-current ${className}`}>
    <path d="M12 21.35 l-1.45-1.32 C5.4 15.36 2 12.28 2 8.5 C2 5.42 4.42 3 7.5 3 c1.74 0 3.41 0.81 4.5 2.09 C13.09 3.81 14.76 3 16.5 3 C19.58 3 22 5.42 22 8.5 c 0 3.78-3.4 6.86-8.55 11.54 L12 21.35 Z" />
  </svg>
);

const QuoteMark: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 32 24" className={`fill-current ${className}`}>
    <path d="M10 0 C4.5 0 0 4.5 0 10 C0 16.5 5 21.5 10 21.5 C10.8 21.5 11.5 21.3 12 21 C9.5 17 8 13.5 8 10 H12 V0 H10 Z M28 0 C22.5 0 18 4.5 18 10 C18 16.5 23 21.5 28 21.5 C28.8 21.5 29.5 21.3 30 21 C27.5 17 26 13.5 26 10 H30 V0 H28 Z" />
  </svg>
);

const DiamondDivider: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`flex items-center space-x-3 ${className}`}>
    <div className="w-10 h-[1px] bg-charcoal/15" />
    <span className="text-[8px] text-terracotta/70 select-none">◇</span>
    <div className="w-10 h-[1px] bg-charcoal/15" />
  </div>
);

// Structured data for Testimonial cards
const testimonialsData = [
  {
    id: 1,
    name: "Rahul & Divya",
    photo: "https://images.unsplash.com/photo-1595853035070-59a39fe84de3?q=80&w=800",
    event: "Destination Wedding",
    review: "Every frame they captured is like poetry in motion. Their team blended in like family, framing emotions we didn't even realize were visible. Absolute artists.",
    rating: 5,
    location: "Madurai"
  },
  {
    id: 2,
    name: "Sanjay & Harini",
    photo: "/chettinad-hero.png",
    event: "Pre-Wedding Session",
    review: "The Chettinad session was pure magic. Footbee played with shadows, light, and heritage corridors to tell our story in a way that feels incredibly cinematic.",
    rating: 5,
    location: "Karaikudi"
  },
  {
    id: 3,
    name: "Karthik & Meena",
    photo: "/pollachi-hero.jpg",
    event: "Traditional Engagement",
    review: "Under the groves of Pollachi, they turned a simple ceremony into a beautiful memory journal. The natural lighting and focus on traditional moments are stunning.",
    rating: 5,
    location: "Pollachi"
  },
  {
    id: 4,
    name: "Vignesh & Swetha",
    photo: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=800",
    event: "Reception Party",
    review: "Footbee captured the high-energy celebrations and guest laughter without interrupting the fun. The photo strip and lighting are absolutely perfect.",
    rating: 5,
    location: "Chennai"
  }
];

// Asymmetric Testimonial Wall config (scrapbook tiles)
const wallItems = [
  {
    type: "quote-text",
    content: "A photograph is the pause button of life. It is the only way to hold onto a smile, a tear, and a heartbeat forever.",
    author: "Footbee Philosophy"
  },
  {
    type: "review-card",
    name: "Kavin & Archana",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800",
    event: "Outdoor Reception",
    review: "Footbee views weddings as motion canvases. They worked with natural lighting and details beautifully, making our memories feel timeless.",
    rating: 5,
    rotation: "rotate-[2deg]",
    location: "Ooty"
  },
  {
    type: "photo-overlay",
    src: "/arun-priya-swing.jpg",
    label: "RAW CHEMISTRY",
    caption: "The stolen glances are the most honest stories."
  },
  {
    type: "review-card",
    name: "Abhilash & Sowmya",
    photo: "/welcome-hero.png",
    event: "Muhurtham Ceremony",
    review: "Professional, warm, and highly detailed. They didn't just document the day; they framed our nervous laughs and quiet moments of love.",
    rating: 5,
    rotation: "rotate-[-2deg]",
    location: "Coimbatore"
  },
  {
    type: "quote-text",
    content: "We look at the photographs and we are instantly transported to the scent of jasmine, the heat of the fire, and the warmth of hands holding tight.",
    author: "Arun & Priya"
  }
];

export const Testimonials: React.FC = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-cream relative paper-texture min-h-screen overflow-x-hidden pt-28 pb-16">
      
      {/* ==================================================
          SECTION 1 — HERO SECTION (Editorial Layout)
          ================================================== */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 flex flex-col lg:flex-row items-center justify-between gap-16 relative">
        {/* Background decorative vectors */}
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
            WORDS FROM OUR CLIENTS
          </span>
          <h1 className="font-serif text-charcoal text-4xl sm:text-5xl lg:text-[68px] leading-[1.08] font-normal tracking-tight mb-6">
            Stories Told<br />
            Through<br />
            <span className="text-terracotta font-serif">Their Words.</span>
          </h1>
          
          <DiamondDivider className="justify-start mb-6" />

          <p className="text-mud/85 font-sans text-base md:text-lg leading-relaxed max-w-md">
            Every photograph carries a memory. Every kind word reminds us why we love what we do.
          </p>
        </motion.div>

        {/* Right Side Scrapbook Client Collage */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, delay: 0.2, ease: "easeOut" }}
          className="w-full lg:w-[48%] flex justify-center items-center h-[420px] md:h-[500px] relative mt-10 lg:mt-0"
        >
          {/* Collage SVGs */}
          <BotanicalBranch className="absolute right-[5%] top-2 w-32 h-32 text-terracotta/20 pointer-events-none" />
          <BotanicalBranch className="absolute left-[5%] bottom-4 w-28 h-28 text-mud/10 pointer-events-none -rotate-90" />
          <TinyStar className="absolute top-1/3 left-6 w-3 h-3 text-terracotta/50" />
          <TinyHeart className="absolute bottom-1/4 right-8 w-4 h-4 text-mud/15" />

          {/* Photo 1 (Swing - bottom left) */}
          <div className="absolute left-2 top-20 w-[190px] md:w-[210px] rotate-[-6deg] polaroid-frame shadow-md hover:z-30 hover:rotate-0 hover:scale-105 transition-all duration-500 bg-white">
            <img 
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800" 
              alt="Groom Portrait" 
              className="w-full h-36 md:h-44 object-cover border border-sand-light" 
            />
            {/* Masking Tape */}
            <div className="absolute -top-3 left-4 w-12 h-5 bg-sand-dark/50 backdrop-blur-[1px] rotate-[18deg] border-l border-r border-dashed border-mud/10" />
            <p className="font-handwritten text-xs italic text-center text-charcoal/80 mt-3">JOY</p>
          </div>

          {/* Photo 2 (Event - top right) */}
          <div className="absolute right-2 top-6 w-[200px] md:w-[220px] rotate-[4deg] polaroid-frame shadow-lg hover:z-30 hover:rotate-0 hover:scale-105 transition-all duration-500 bg-white">
            <img 
              src="/arun-priya-rice.jpg" 
              alt="Sacred Rice" 
              className="w-full h-36 md:h-44 object-cover border border-sand-light" 
            />
            {/* Masking Tape */}
            <div className="absolute -top-4 right-10 w-16 h-5 bg-sand-dark/50 backdrop-blur-[1px] rotate-[-10deg] border-l border-r border-dashed border-mud/10" />
            <p className="font-handwritten text-xs italic text-center text-charcoal/80 mt-3">FOREVER</p>
          </div>

          {/* Photo 3 (Couple - centered foreground) */}
          <div className="absolute left-1/4 bottom-6 w-[200px] md:w-[220px] rotate-[-2deg] polaroid-frame shadow-[0_15px_30px_rgba(0,0,0,0.12)] z-20 hover:z-30 hover:rotate-0 hover:scale-105 transition-all duration-500 bg-white">
            <img 
              src="/arun-priya-garlands.jpg" 
              alt="Couple Garland" 
              className="w-full h-40 md:h-48 object-cover border border-sand-light" 
            />
            {/* Masking Tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 bg-sand-dark/50 backdrop-blur-[1px] rotate-[3deg] border-l border-r border-dashed border-mud/10" />
            <p className="font-handwritten text-xs italic text-center text-charcoal/80 mt-3">LOVE & MEMORIES</p>
          </div>
        </motion.div>
      </section>

      {/* ==================================================
          SECTION 2 — FEATURED TESTIMONIAL (Split Story view)
          ================================================== */}
      <section className="bg-sand-light py-20 md:py-28 relative overflow-hidden border-y border-sand-dark/20">
        {/* Decorative vectors */}
        <BotanicalBranch className="absolute right-0 top-4 w-48 h-48 text-sand-dark/20 pointer-events-none -rotate-45" />
        <FilmFrame className="absolute left-[2%] bottom-4 w-20 h-28 text-sand-dark/10 pointer-events-none rotate-[20deg]" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 relative z-10">
          
          {/* Left Column: Couple Photo inside editorial double frame */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[48%]"
          >
            <div className="relative p-4 bg-white border border-sand-dark/30 shadow-2xl">
              {/* Double border effect */}
              <div className="border border-sand-dark/20 p-2">
                <img 
                  src="/arun-priya-hero.png" 
                  alt="Featured Couple Portrait" 
                  className="w-full h-[320px] md:h-[440px] object-cover" 
                />
              </div>
              <div className="absolute -top-3 -right-3 w-16 h-5 bg-sand-dark/50 backdrop-blur-[1px] rotate-[12deg] border-l border-r border-dashed border-mud/10 z-10" />
            </div>
          </motion.div>

          {/* Right Column: Featured story review text */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-[46%] flex flex-col text-left relative"
          >
            <span className="font-handwritten text-terracotta text-2xl mb-2 italic">
              FEATURED STORY
            </span>
            <QuoteMark className="w-12 h-10 text-terracotta/25 mb-4" />
            
            <h3 className="font-serif italic text-charcoal text-2xl sm:text-3xl lg:text-4xl leading-relaxed mb-6 font-normal">
              "From the first conversation to the final photographs, every moment felt effortless. Footbee didn't just capture our wedding — they captured how it felt."
            </h3>

            <div className="border-t border-sand-dark/30 pt-4 flex items-center justify-between">
              <div>
                <h5 className="font-serif text-charcoal text-lg font-bold">Arun & Priya</h5>
                <span className="text-[10px] tracking-[0.25em] text-mud/60 uppercase font-semibold">
                  Traditional Wedding
                </span>
              </div>
              
              <div className="flex flex-col items-end">
                <div className="text-terracotta text-lg tracking-wider">★★★★★</div>
                <span className="text-[9px] tracking-widest text-mud/40 mt-1">5.0 RATING</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================================================
          SECTION 3 — CLIENT TESTIMONIAL COLLECTION (Journal Spreads)
          ================================================== */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="text-center mb-16">
          <span className="font-sans text-[10px] tracking-[0.3em] font-bold text-mud/60 uppercase block mb-2">
            CLIENT JOURNAL KEEPSAKES
          </span>
          <DiamondDivider className="justify-center" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {testimonialsData.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-white/80 p-8 border border-sand-dark/20 relative shadow-md hover:shadow-xl transition-all duration-500 rounded-none flex flex-col justify-between"
              style={{ transform: idx % 2 === 0 ? "rotate(0.5deg)" : "rotate(-0.5deg)" }}
            >
              {/* Botanical vectors on cards */}
              <BotanicalBranch className="absolute right-2 top-2 w-20 h-20 text-sand-dark/15 pointer-events-none" />

              <div>
                {/* Client Polaroid image */}
                <div className="w-24 h-24 mb-6 relative polaroid-frame shadow-sm p-1.5 pb-5 inline-block bg-white border border-sand-dark/10">
                  <img 
                    src={t.photo} 
                    alt={t.name} 
                    className="w-full h-full object-cover border border-sand-light" 
                  />
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-3.5 bg-sand-dark/50 rotate-3 border-l border-r border-dashed border-mud/10" />
                </div>

                <QuoteMark className="w-7 h-5 text-terracotta/20 mb-3" />
                <p className="font-serif italic text-charcoal text-base md:text-[17px] leading-relaxed mb-6">
                  "{t.review}"
                </p>
              </div>

              <div className="border-t border-sand-dark/10 pt-4 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-charcoal text-base font-bold">{t.name}</h4>
                  <span className="text-[9px] tracking-[0.2em] text-mud/60 uppercase font-semibold">
                    {t.event} • {t.location}
                  </span>
                </div>
                <div className="text-terracotta text-sm">★★★★★</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ==================================================
          SECTION 4 — ASYMMETRIC TESTIMONIAL WALL (Scrapbook Grid)
          ================================================== */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 border-t border-sand-dark/15">
        <div className="text-center mb-12">
          <span className="font-sans text-[10px] tracking-[0.3em] font-bold text-mud/60 uppercase block mb-2">
            SCRAPBOOK MEMORY WALL
          </span>
          <DiamondDivider className="justify-center" />
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {wallItems.map((item, idx) => {
            if (item.type === "quote-text") {
              return (
                <div 
                  key={idx}
                  className="break-inside-avoid bg-terracotta/5 p-8 border border-terracotta/15 flex flex-col justify-center text-center relative"
                >
                  <QuoteMark className="w-8 h-6 text-terracotta/20 mx-auto mb-4" />
                  <p className="font-serif italic text-charcoal text-lg md:text-xl leading-relaxed mb-4">
                    "{item.content}"
                  </p>
                  <span className="text-[9px] tracking-[0.25em] text-terracotta uppercase font-bold">
                    — {item.author}
                  </span>
                </div>
              );
            }

            if (item.type === "photo-overlay") {
              return (
                <div 
                  key={idx}
                  className="break-inside-avoid relative overflow-hidden group border border-sand-dark/20 p-2 bg-white shadow-md"
                >
                  <div className="relative overflow-hidden aspect-[4/5] bg-charcoal">
                    <img 
                      src={item.src} 
                      alt={item.label} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-charcoal/70 flex flex-col justify-end p-6 text-cream">
                      <span className="text-[10px] tracking-[0.2em] text-terracotta-light uppercase font-bold mb-2">
                        {item.label}
                      </span>
                      <p className="font-serif italic text-sm text-cream/90">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                </div>
              );
            }

            if (item.type === "review-card") {
              return (
                <div
                  key={idx}
                  className={`break-inside-avoid bg-white p-6 border border-sand-dark/15 shadow-md flex flex-col justify-between ${item.rotation} hover:rotate-0 transition-transform duration-500`}
                >
                  <div>
                    <div className="flex items-center space-x-4 mb-4">
                      <img 
                        src={item.photo} 
                        alt={item.name} 
                        className="w-12 h-12 rounded-full object-cover border border-sand-dark/20" 
                      />
                      <div>
                        <h5 className="font-serif text-charcoal text-sm font-bold leading-tight">{item.name}</h5>
                        <span className="text-[8px] tracking-widest text-mud/50 uppercase">{item.event}</span>
                      </div>
                    </div>
                    <p className="font-serif italic text-mud text-sm leading-relaxed mb-4">
                      "{item.review}"
                    </p>
                  </div>
                  <div className="border-t border-sand-dark/10 pt-3 flex items-center justify-between text-[10px]">
                    <span className="text-mud/60 uppercase tracking-widest font-semibold">{item.location}</span>
                    <div className="text-terracotta">★★★★★</div>
                  </div>
                </div>
              );
            }

            return null;
          })}
        </div>
      </section>

      {/* ==================================================
          SECTION 5 — GOOGLE REVIEW AREA (API Ready Placeholder)
          ================================================== */}
      <section className="max-w-2xl mx-auto px-6 py-16 text-center">
        <div className="bg-sand-light p-8 md:p-12 border border-sand-dark/20 relative">
          <BotanicalBranch className="absolute left-2 top-2 w-16 h-16 text-sand-dark/10 pointer-events-none" />
          <BotanicalBranch className="absolute right-2 bottom-2 w-16 h-16 text-sand-dark/10 pointer-events-none rotate-180" />

          <span className="font-sans text-[10px] tracking-[0.3em] font-bold text-mud/60 uppercase block mb-3">
            LOVED BY OUR CLIENTS
          </span>
          <div className="text-terracotta text-2xl tracking-widest mb-3">★★★★★</div>
          <p className="font-serif italic text-charcoal text-lg md:text-xl max-w-sm mx-auto leading-relaxed mb-6">
            "Trusted by the people whose stories we capture."
          </p>

          <a 
            href="https://google.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-[10px] tracking-[0.2em] font-semibold text-charcoal hover:text-terracotta transition-colors duration-300 border-b border-charcoal/20 pb-1"
          >
            <span>READ OUR GOOGLE REVIEWS</span>
            <span className="text-xs">→</span>
          </a>
        </div>
      </section>

      {/* ==================================================
          SECTION 6 — CLIENT PHOTO STRIP
          ================================================== */}
      <section className="py-12 border-t border-sand-dark/10">
        {/* Horizontal photo strip row */}
        <div className="flex overflow-x-auto gap-6 py-4 px-6 no-scrollbar snap-x snap-mandatory">
          {[
            { src: "/arun-priya-swing.jpg", w: "w-64", label: "REAL MOMENTS" },
            { src: "/arun-priya-holding.jpg", w: "w-80", label: "REAL PEOPLE" },
            { src: "/arun-priya-rice.jpg", w: "w-72", label: "REAL STORIES" },
            { src: "/collage-bridesmaids.jpg", w: "w-64", label: "REAL CELEBRATIONS" }
          ].map((img, idx) => (
            <div 
              key={idx}
              className={`${img.w} h-72 md:h-80 shrink-0 relative group overflow-hidden snap-center shadow-md bg-charcoal border border-sand-dark/10`}
            >
              <img 
                src={img.src} 
                alt={img.label} 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
              <span className="absolute bottom-4 left-4 font-handwritten text-cream text-lg tracking-wide select-none drop-shadow">
                {img.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================
          SECTION 7 — EMOTIONAL QUOTE (Tamil Memory Journal)
          ================================================== */}
      <section className="bg-sand-light py-20 md:py-24 my-12 border-y border-sand-dark/15 relative overflow-hidden paper-texture">
        {/* Decorative foliage and hanging elements */}
        <BotanicalBranch className="absolute left-[5%] top-1/2 -translate-y-1/2 w-48 h-48 text-mud/10 pointer-events-none -rotate-12" />
        <BotanicalBranch className="absolute right-[5%] top-1/2 -translate-y-1/2 w-48 h-48 text-mud/10 pointer-events-none rotate-12" />
        
        {/* Hanging decor mock line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-mud/15" />
        <span className="absolute top-24 left-1/2 -translate-x-1/2 text-[10px] text-terracotta/40">◇</span>

        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <h2 className="font-tamil text-2xl sm:text-3xl md:text-4xl text-charcoal leading-[1.8] font-normal tracking-wide">
            நினைவுகள் மறைந்தாலும்,<br />
            அந்த தருணங்கள் என்றும்<br />
            மனதில் வாழ்கின்றன.
          </h2>
          <span className="font-handwritten text-terracotta text-2xl mt-6 block select-none">
            — Footbee Storytellers
          </span>
        </div>
      </section>

      {/* ==================================================
          SECTION 8 — FINAL CTA (Book Date invitation)
          ================================================== */}
      <section className="py-24 md:py-32 bg-cream text-center relative overflow-hidden">
        
        {/* Vector sketches decorations */}
        <BotanicalBranch className="absolute left-[10%] top-1/2 -translate-y-1/2 w-44 h-44 text-sand-dark/15 pointer-events-none" />
        <BotanicalBranch className="absolute right-[8%] top-1/2 -translate-y-1/2 w-44 h-44 text-sand-dark/15 pointer-events-none -rotate-12" />
        <CameraOutline className="absolute left-[20%] top-10 w-16 h-12 text-terracotta/20 pointer-events-none rotate-6" />
        <TinyStar className="absolute top-12 left-1/3 w-3 h-3 text-terracotta/40" />
        <TinyHeart className="absolute bottom-16 right-1/3 w-4 h-4 text-mud/15" />

        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <h2 className="font-serif text-charcoal text-3xl sm:text-4xl md:text-5xl font-normal leading-tight mb-6">
            Ready To Create<br />
            Your Story?
          </h2>
          <p className="text-mud/85 font-sans text-base leading-relaxed max-w-lg mx-auto">
            Let us turn your moments into memories you can return to, again and again.
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

    </div>
  );
};
