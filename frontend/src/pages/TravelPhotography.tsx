import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";

export const TravelPhotography: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Hand-drawn botanical branch helper
  const BotanicalBranch: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 120 120" className={`stroke-current fill-none stroke-[1.2] ${className}`}>
      <path d="M60 110 Q50 60 60 10 M60 85 Q40 78 30 65 M60 65 Q80 58 85 45 M60 45 Q42 38 35 25 M60 25 Q78 18 80 8" strokeLinecap="round" />
      <path d="M30 65 Q23 60 25 54 Q33 58 30 65 Z" fill="currentColor" className="opacity-20" />
      <path d="M85 45 Q92 40 90 34 Q82 38 85 45 Z" fill="currentColor" className="opacity-20" />
      <path d="M35 25 Q28 20 30 14 Q38 18 35 25 Z" fill="currentColor" className="opacity-20" />
      <path d="M80 8 Q87 3 85 -3 Q77 1 80 8 Z" fill="currentColor" className="opacity-20" />
    </svg>
  );

  // Vintage Camper Van sketch helper
  const CamperVanSketch: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 120 80" className={`stroke-current fill-none stroke-[1] ${className}`}>
      <path d="M15 50 C15 30 25 20 60 20 H95 C102 20 105 25 105 35 V55 H15 Z" strokeLinejoin="round" />
      <path d="M22 26 H45 V40 H22 Z M52 26 H75 V40 H52 Z M82 26 H98 V40 H82 Z" />
      <circle cx="35" cy="55" r="9" />
      <circle cx="85" cy="55" r="9" />
      <path d="M40 20 V14 H80 V20 M45 14 H75" />
    </svg>
  );

  // Mountains & Signpost landscape sketch helper
  const MountainLandscape: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 160 120" className={`stroke-current fill-none stroke-[1] ${className}`}>
      <path d="M10 90 L50 40 L90 90 M70 90 L110 30 L150 90" strokeLinecap="round" />
      <path d="M30 90 V70 M130 90 V60" opacity="0.5" />
      <path d="M30 70 L25 78 H35 L30 70 M30 75 L22 85 H38 L30 75" fill="currentColor" opacity="0.1" />
      <path d="M75 90 V50 M60 55 H90 L95 58 L90 61 H60 Z M65 67 H95 L100 70 L95 73 H65 Z" />
    </svg>
  );

  // Compass sketch helper
  const CompassSketch: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 80 80" className={`stroke-current fill-none stroke-[1] ${className}`}>
      <circle cx="40" cy="40" r="30" />
      <circle cx="40" cy="40" r="26" strokeDasharray="2,2" />
      <path d="M40 18 L46 40 L40 62 L34 40 Z" fill="currentColor" className="opacity-10" />
      <path d="M18 40 L40 46 L62 40 L40 34 Z" fill="currentColor" className="opacity-10" />
      <path d="M40 18 L43 40 H37 Z" fill="currentColor" />
    </svg>
  );

  // Custom floral divider element
  const FloralDivider: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`flex items-center justify-center space-x-4 my-6 ${className}`}>
      <div className="h-[1px] bg-[#B85F43]/20 w-16" />
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#B85F43] stroke-current fill-none stroke-[1.2]">
        <path d="M12 4v16 M4 12h16 M6 6l12 12 M6 18l12-12" />
        <circle cx="12" cy="12" r="3.5" fill="currentColor" className="opacity-20" />
      </svg>
      <div className="h-[1px] bg-[#B85F43]/20 w-16" />
    </div>
  );

  const captureCategories = [
    {
      num: "01",
      title: "Stunning Landscapes",
      desc: "Breathtaking views that leave you speechless.",
      // Mountain sketch
      icon: (
        <svg viewBox="0 0 100 100" className="w-8 h-8 stroke-current fill-none stroke-[1.2]">
          <path d="M15 75 L50 25 L85 75 Z M45 75 L70 40 L95 75 Z" />
        </svg>
      )
    },
    {
      num: "02",
      title: "City & Streets",
      desc: "The charm of streets, architecture and urban life.",
      // City buildings outline
      icon: (
        <svg viewBox="0 0 100 100" className="w-8 h-8 stroke-current fill-none stroke-[1.2]">
          <path d="M20 80 V30 H50 V80 M50 80 V45 H80 V80" />
          <path d="M30 45 H40 M30 60 H40 M60 55 H70 M60 68 H70" />
        </svg>
      )
    },
    {
      num: "03",
      title: "People & Culture",
      desc: "Real people, local cultures and warm interactions.",
      // People icon sketch
      icon: (
        <svg viewBox="0 0 100 100" className="w-8 h-8 stroke-current fill-none stroke-[1.2]">
          <circle cx="35" cy="35" r="10" />
          <circle cx="65" cy="35" r="10" />
          <path d="M15 75 Q35 55 35 75 M85 75 Q65 55 65 75" />
          <path d="M35 55 H65" />
        </svg>
      )
    },
    {
      num: "04",
      title: "Food & Flavours",
      desc: "Delicious moments that tell the story of a place.",
      // Plate/table illustration
      icon: (
        <svg viewBox="0 0 100 100" className="w-8 h-8 stroke-current fill-none stroke-[1.2]">
          <circle cx="50" cy="50" r="25" />
          <circle cx="50" cy="50" r="15" strokeDasharray="3,3" />
        </svg>
      )
    },
    {
      num: "05",
      title: "Adventure & Outdoors",
      desc: "Thrilling adventures, hikes and outdoor experiences.",
      // Backpack sketch
      icon: (
        <svg viewBox="0 0 100 100" className="w-8 h-8 stroke-current fill-none stroke-[1.2]">
          <path d="M30 35 H70 V80 H30 Z M40 35 V25 H60 V35" />
          <path d="M30 50 H70 M40 50 V80 M60 50 V80" />
        </svg>
      )
    },
    {
      num: "06",
      title: "Details & Moments",
      desc: "Little details that make big memories truly special.",
      // Camera sketch
      icon: (
        <svg viewBox="0 0 100 100" className="w-8 h-8 stroke-current fill-none stroke-[1.2]">
          <path d="M15 35 H35 L40 25 H60 L65 35 H85 V75 H15 Z" />
          <circle cx="50" cy="55" r="16" />
        </svg>
      )
    }
  ];

  // Gallery items using existing project images
  const galleryImages = [
    { src: "/chettinad-hero.png", title: "Mountain Wonders", caption: "Breathtaking peak scenic overlooks" },
    { src: "/pollachi-hero.jpg", title: "Coastal Escapes", caption: "Golden sands and turquoise waters" },
    { src: "/welcome-hero.png", title: "Desert Diaries", caption: "Sand dunes under shifting sunset light" },
    { src: "/arun-priya-hero.png", title: "Heritage Trails", caption: "Historic ruins and ancient architecture walking" },
    { src: "/arun-priya-swing.jpg", title: "Wilderness Adventures", caption: "Deep forests and rustic trails" },
    { src: "/collage-kolam.jpg", title: "Sunset Stories", caption: "Silhouette captures against warm twilight skies" }
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

  // Keyboard navigation for Lightbox
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
    <div className="w-full bg-[#F8F3EC] text-[#24211F] relative paper-texture overflow-hidden">
      
      {/* Subtle paper travel lines / flights path */}
      <svg className="absolute top-0 left-0 w-full h-32 text-[#B85F43]/20 pointer-events-none select-none z-10" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M50,30 Q300,90 550,30 T1050,30" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4,4" />
        {/* Airplane */}
        <path d="M550,30 L555,27 L552,32 L548,31 Z" fill="currentColor" />
      </svg>

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-4 text-left relative z-20">
        <nav className="text-xs tracking-widest uppercase font-bold text-[#24211F]/50 space-x-2">
          <Link to="/" className="hover:text-[#B85F43] transition-colors">Home</Link>
          <span>&gt;</span>
          <Link to="/services" className="hover:text-[#B85F43] transition-colors">Services</Link>
          <span>&gt;</span>
          <span className="text-[#B85F43]">Travel Photography</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-16 border-b border-[#B85F43]/10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Text */}
          <div className="lg:col-span-6 space-y-6 text-left relative">
            <span className="text-[10px] tracking-[0.25em] font-bold uppercase text-[#B85F43]">
              OUR SERVICES
            </span>
            <h1 className="font-serif text-[44px] sm:text-[54px] md:text-[62px] text-[#24211F] tracking-normal leading-[1.15] font-light">
              Travel<br />
              <span className="font-serif font-normal italic text-[#B85F43]">Photography</span>
            </h1>

            {/* Decorative Divider */}
            <FloralDivider className="!justify-start" />

            <p className="font-tamil font-normal text-base md:text-lg text-[#24211F]/80 leading-relaxed border-l-2 border-[#B85F43]/30 pl-4">
              “புதிய இடங்கள், புதிய கதைகள்,<br />நினைவுகளில் நிலைத்து நிற்கும்.”
            </p>

            <p className="font-sans text-sm sm:text-base text-[#24211F]/70 leading-relaxed max-w-lg">
              We capture the beauty of your journeys, the places you explore, and the moments that stay with you forever.
            </p>

            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center space-x-3 px-8 py-3.5 bg-[#B85F43] hover:bg-[#B85F43]/90 text-white font-sans text-xs tracking-[0.2em] font-medium transition-colors duration-300 rounded-none uppercase shadow-md hover:shadow-lg"
              >
                <span>BOOK YOUR DATE →</span>
              </Link>
            </div>

            {/* Camera doodle stamp */}
            <div className="absolute right-6 bottom-[-20px] opacity-10 hidden md:block select-none pointer-events-none text-[#B85F43]">
              <svg viewBox="0 0 100 100" className="w-24 h-24 stroke-current fill-none stroke-[1]">
                <path d="M15 35 H35 L40 25 H60 L65 35 H85 V75 H15 Z" />
                <circle cx="50" cy="55" r="16" />
              </svg>
            </div>
          </div>

          {/* Right Column: Layered Polaroid Collage */}
          <div className="lg:col-span-6 relative flex items-center justify-center py-10 min-h-[400px] sm:min-h-[460px]">
            {/* Background card layering */}
            <div className="absolute w-[75%] aspect-[3/4] bg-[#EFE5D8] rotate-[-5deg] shadow-sm pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, rotate: 1 }}
              animate={{ opacity: 1, scale: 1, rotate: 2 }}
              transition={{ duration: 0.8 }}
              className="relative w-[78%] aspect-[3/4] bg-[#fffdf8] p-3 pb-12 shadow-xl border border-[#B85F43]/10 z-10"
            >
              <img
                src="/chettinad-hero.png"
                alt="Scenic mountain peaks"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.25em] font-sans font-bold uppercase text-[#24211F]/40">
                SCENIC CHRONICLES
              </span>
              {/* Masking tape on top */}
              <div className="absolute top-[-10px] left-[35%] w-16 h-5 bg-[#faf6f0]/65 shadow-sm border border-[#B85F43]/10 -rotate-[10deg] z-20" />
            </motion.div>

            {/* Smaller overlapping Polaroid card */}
            <motion.div
              initial={{ opacity: 0, x: 20, rotate: -6 }}
              animate={{ opacity: 1, x: 0, rotate: -5 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute left-[3%] bottom-[5%] w-[42%] bg-[#fffdf8] p-2 pb-6 shadow-lg border border-[#B85F43]/10 z-20"
            >
              <img
                src="/pollachi-hero.jpg"
                alt="Scenic coastal villas"
                className="w-full aspect-[3/4] object-cover"
              />
              {/* Masking tape on top */}
              <div className="absolute top-[-8px] left-[25%] w-12 h-4 bg-[#faf6f0]/65 shadow-sm border border-[#B85F43]/10 rotate-[8deg] z-20" />
            </motion.div>

            {/* Handwritten overlay tag */}
            <div className="absolute right-[5%] top-[8%] z-30 select-none pointer-events-none">
              <span className="font-handwritten text-lg md:text-xl text-[#B85F43] rotate-[8deg] block leading-relaxed">
                Collect<br />Moments.<br />Not Things.
              </span>
            </div>

            {/* Botanical drawings and Compass framing collage */}
            <div className="absolute right-[-4%] bottom-[-4%] z-30 opacity-40 select-none pointer-events-none text-[#B85F43]">
              <CompassSketch className="w-16 h-16" />
            </div>
            <div className="absolute left-[2%] top-[2%] z-30 opacity-45 rotate-[180deg] select-none pointer-events-none">
              <BotanicalBranch className="w-20 h-20 text-[#B85F43]" />
            </div>
          </div>

        </div>
      </section>

      {/* STORYTELLING INTRODUCTION SECTION ("THE JOY OF EXPLORING") */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 border-b border-[#B85F43]/10 relative z-10">
        <div className="bg-[#fcfaf5] border border-[#B85F43]/10 p-8 sm:p-12 md:p-16 relative overflow-hidden rounded-[8px] text-left">
          
          {/* Detailed Mountain sketch (Background outline) */}
          <div className="absolute right-6 bottom-0 opacity-15 hidden lg:block select-none pointer-events-none text-[#B85F43]">
            <MountainLandscape className="w-48 h-36" />
          </div>

          {/* Hanging camper van doodle */}
          <div className="absolute left-6 top-6 opacity-20 hidden md:block select-none pointer-events-none text-[#B85F43]">
            <CamperVanSketch className="w-24 h-16" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] tracking-[0.25em] font-bold text-[#B85F43] uppercase">
                THE JOY OF EXPLORING
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#24211F] leading-tight">
                Every place<br />has a story,<br />
                we capture<br />
                the <span className="font-serif font-normal italic text-[#B85F43]">magic.</span>
              </h2>
            </div>
            
            <div className="lg:col-span-7 space-y-4 border-l-0 lg:border-l border-[#B85F43]/10 lg:pl-8 self-center">
              <p className="font-sans text-sm sm:text-base text-[#24211F]/80 leading-relaxed">
                Travel photography is about capturing the landscapes, cultures, people and little moments that make every journey unique and unforgettable.
              </p>
              <p className="font-tamil font-normal text-base text-[#B85F43]/80 leading-relaxed italic border-t border-[#B85F43]/10 pt-4 mt-2">
                “பயணங்களில் சேகரிப்பவை பொருட்களல்ல, அனுபவங்கள்... நினைவுகள்தான்.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE CAPTURE Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 border-b border-[#B85F43]/10 relative z-10">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#24211F] tracking-wide">
            WHAT WE CAPTURE
          </h2>
          <FloralDivider />
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 max-w-6xl mx-auto divide-y lg:divide-y-0 lg:divide-x divide-[#B85F43]/10">
          {captureCategories.map((item) => (
            <div 
              key={item.num}
              className="text-left space-y-4 pt-6 lg:pt-0 lg:px-4 group"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-[11px] font-bold text-[#B85F43]">
                  {item.num}
                </span>
                {/* Organic backdrop behind custom line icon */}
                <div className="w-12 h-12 rounded-full bg-[#B85F43]/10 text-[#B85F43] flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                  {item.icon}
                </div>
              </div>
              <h4 className="font-serif text-sm font-semibold text-[#24211F] tracking-wide">
                {item.title}
              </h4>
              <p className="text-[11px] text-[#24211F]/70 font-sans leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* JOURNEYS IN FRAMES Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 border-b border-[#B85F43]/10 relative z-10">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#24211F] tracking-wide">
            JOURNEYS IN FRAMES
          </h2>
          <FloralDivider />
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
          {galleryImages.map((image, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxIndex(idx)}
              className="relative overflow-hidden bg-[#fffdf8] p-2 pb-5 shadow-sm border border-[#B85F43]/10 cursor-pointer group transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              <div className="aspect-[9/16] overflow-hidden relative rounded-[2px]">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/35 flex items-center justify-center transition-opacity duration-300 group-hover:bg-black/45">
                  <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <Play className="w-4 h-4 text-[#B85F43] fill-[#B85F43] ml-0.5" />
                  </div>
                </div>
              </div>

              <div className="mt-3 px-1 text-center">
                <h4 className="font-serif text-xs font-semibold text-[#24211F] tracking-wide uppercase">
                  {image.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE OUR TRAVEL PHOTOGRAPHY? Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 border-b border-[#B85F43]/10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          <div className="lg:col-span-5 text-left space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#24211F] tracking-wide uppercase">
              WHY CHOOSE OUR<br />TRAVEL PHOTOGRAPHY?
            </h2>
            <FloralDivider className="!justify-start" />
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              { 
                title: "Experienced Team", 
                desc: "Passionate travelers who understand your journey.",
                // Custom camera sketch SVG
                icon: (
                  <svg viewBox="0 0 100 100" className="w-8 h-8 text-[#B85F43] stroke-current fill-none stroke-[1.2]">
                    <path d="M15 35 H35 L40 25 H60 L65 35 H85 V75 H15 Z" />
                    <circle cx="50" cy="55" r="16" />
                  </svg>
                )
              },
              { 
                title: "Creative Vision", 
                desc: "Unique storytelling with artistic perspectives.",
                // Creative Spark icon SVG
                icon: (
                  <svg viewBox="0 0 100 100" className="w-8 h-8 text-[#B85F43] stroke-current fill-none stroke-[1.2]">
                    <path d="M50 15 V85 M15 50 H85 M25 25 L75 75 M25 75 L75 25" strokeLinecap="round" />
                    <circle cx="50" cy="50" r="8" fill="currentColor" />
                  </svg>
                )
              },
              { 
                title: "High Quality Gear", 
                desc: "Top-notch equipment for stunning results.",
                // Professional Camera icon SVG
                icon: (
                  <svg viewBox="0 0 100 100" className="w-8 h-8 text-[#B85F43] stroke-current fill-none stroke-[1.2]">
                    <path d="M15 35 H85 V80 H15 Z M35 35 V28 H65 V35" />
                    <circle cx="50" cy="58" r="16" />
                    <circle cx="50" cy="58" r="8" fill="currentColor" />
                  </svg>
                )
              },
              { 
                title: "Timeless Memories", 
                desc: "Images that stay with you for a lifetime.",
                // Heart icon SVG
                icon: (
                  <svg viewBox="0 0 100 100" className="w-8 h-8 text-[#B85F43] stroke-current fill-none stroke-[1.2]">
                    <path d="M50 80 C20 60 20 30 50 30 C80 30 80 60 50 80 Z" />
                  </svg>
                )
              }
            ].map((benefit, idx) => (
              <div key={idx} className="text-left space-y-3 p-4 border-l border-[#B85F43]/20">
                {benefit.icon}
                <h4 className="text-xs tracking-[0.15em] font-bold uppercase text-[#24211F]">
                  {benefit.title}
                </h4>
                <p className="text-xs text-[#24211F]/70 font-sans leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial / Storyteller Section */}
      <section className="py-20 bg-[#EFE5D8] relative paper-texture border-b border-[#B85F43]/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Left: Tamil Quote */}
        <div className="lg:col-span-7 text-center lg:text-left space-y-6">
          <span className="text-[#B85F43] text-6xl font-serif block leading-none select-none">“</span>
          <p className="font-tamil font-normal text-lg sm:text-xl md:text-2xl text-[#24211F] tracking-wide leading-relaxed pl-2">
            “பயணம் என்பது வாழ்க்கையை<br />
            புரிந்துகொள்ளும் மிக அழகான வழி...<br />
            அந்த தருணங்களை நாங்கள்<br />
            நினைவுகளாக மாற்றுகிறோம்.”
          </p>
          <span className="font-handwritten text-base text-[#B85F43] block pl-2">
            — Footbee Storytellers
          </span>
        </div>

        {/* Right: Asymmetric Polaroid Grid */}
        <div className="lg:col-span-5 relative flex items-center justify-center py-6 min-h-[220px]">
          <div className="absolute w-[60%] aspect-[3/4] bg-[#eae5db] rotate-[-8deg] shadow-sm pointer-events-none" />
          
          <div className="relative w-[62%] bg-[#fffdf8] p-2 pb-6 shadow-md rotate-[4deg] border border-[#B85F43]/10">
            <img
              src="/chettinad-hero.png"
              alt="village entrance"
              className="w-full aspect-[3/4] object-cover"
            />
            {/* Transparent masking tape */}
            <div className="absolute top-[-10px] left-[30%] w-16 h-5 bg-[#faf6f0]/65 shadow-sm border border-[#B85F43]/10 -rotate-[8deg] z-20" />
          </div>

          <div className="absolute left-[5%] bottom-[5%] w-[42%] bg-[#fffdf8] p-1.5 pb-5 shadow-lg rotate-[-6deg] border border-[#B85F43]/10">
            <img
              src="/pollachi-hero.jpg"
              alt="village path"
              className="w-full aspect-[3/4] object-cover"
            />
            {/* Transparent masking tape */}
            <div className="absolute top-[-8px] left-[20%] w-12 h-4 bg-[#faf6f0]/65 shadow-sm border border-[#B85F43]/10 rotate-[5deg] z-20" />
          </div>
          
          {/* Hand-drawn branch framing photo */}
          <div className="absolute right-[-4%] top-[-4%] opacity-20">
            <BotanicalBranch className="w-20 h-20 text-[#B85F43]" />
          </div>
        </div>

      </section>

      {/* Final CTA Section */}
      <section className="w-full grid grid-cols-1 lg:grid-cols-2 relative border-t border-[#B85F43]/10">
        {/* Left Side: Photography asset */}
        <div className="relative h-[280px] sm:h-[360px] lg:h-auto min-h-[300px] overflow-hidden select-none pointer-events-none">
          <img
            src="/welcome-hero.png"
            alt="Photographer captures scenic travel peak"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[#24211F]/15" />
        </div>

        {/* Right Side: Terracotta background block */}
        <div className="bg-[#B85F43] text-[#F8F3EC] px-6 py-16 sm:p-16 md:p-20 flex flex-col justify-center text-left relative overflow-hidden">
          {/* Background stamp */}
          <div className="absolute right-[-5%] bottom-[-5%] opacity-5 pointer-events-none select-none">
            {/* Camera outline */}
            <svg viewBox="0 0 100 100" className="w-48 h-48 text-[#F8F3EC] stroke-current fill-none stroke-[1.2]">
              <path d="M15 35 H35 L40 25 H60 L65 35 H85 V75 H15 Z" />
              <circle cx="50" cy="55" r="16" />
            </svg>
          </div>

          <div className="max-w-md space-y-6 relative z-10">
            <div className="flex items-center space-x-2">
              <svg viewBox="0 0 100 100" className="w-5 h-5 text-[#F8F3EC]/70 stroke-current fill-none stroke-[1.5]">
                <path d="M15 35 H35 L40 25 H60 L65 35 H85 V75 H15 Z" />
                <circle cx="50" cy="55" r="15" />
              </svg>
              <span className="text-[10px] tracking-[0.25em] font-bold uppercase text-[#F8F3EC]/70">travel diaries</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-wide leading-tight">
              Let’s Capture<br />Your Next Journey
            </h2>

            {/* Decorative divider */}
            <div className="h-[1px] bg-white/30 w-24 my-4" />

            <p className="text-xs sm:text-sm text-[#F8F3EC]/80 font-sans leading-relaxed">
              From mountains to oceans, cities to villages — let us capture your journey in the most beautiful way.
            </p>

            <div className="pt-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-[#F8F3EC] hover:bg-white text-[#B85F43] font-sans text-xs tracking-[0.2em] font-bold uppercase transition-all duration-300 shadow-md hover:shadow-lg rounded-none"
              >
                <span>BOOK YOUR DATE →</span>
              </Link>
            </div>
          </div>

          {/* Custom signpost sketch on the right edge */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-25 hidden md:block select-none pointer-events-none text-white">
            <svg viewBox="0 0 80 160" className="w-24 h-48 stroke-current fill-none stroke-[1.2]">
              <line x1="40" y1="0" x2="40" y2="160" />
              <path d="M20 20 H60 L65 25 L60 30 H20 Z" />
              <path d="M15 50 H55 L60 55 L55 60 H15 Z" />
              <path d="M25 80 H65 L70 85 L65 90 H25 Z" />
              <path d="M18 110 H58 L63 115 L58 120 H18 Z" />
            </svg>
          </div>
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
                <span className="text-[10px] tracking-[0.25em] font-sans font-bold uppercase text-mud/50">
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
