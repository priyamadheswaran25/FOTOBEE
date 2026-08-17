import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Film, 
  MapPin, 
  Users, 
  Compass, 
  Sparkles, 
  Stars, 
  Play, 
  Shield, 
  Camera,
  PlayCircle,
  CloudSun
} from "lucide-react";

export const DroneVideography: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const captureItems = [
    {
      num: "01",
      title: "Venue Overview",
      desc: "Complete aerial coverage of your venue and setup.",
      icon: MapPin
    },
    {
      num: "02",
      title: "Grand Ceremonies",
      desc: "Capture large rituals, stages and mandap from stunning angles.",
      icon: Sparkles
    },
    {
      num: "03",
      title: "Guest & Crowd",
      desc: "Beautiful aerial views of your guests and celebrations.",
      icon: Users
    },
    {
      num: "04",
      title: "Scenic Surroundings",
      desc: "Nearby locations and natural beauty that enhance your story.",
      icon: Compass
    },
    {
      num: "05",
      title: "Entry & Processions",
      desc: "Cinematic aerial shots of grand entries and processions.",
      icon: Film
    },
    {
      num: "06",
      title: "Creative Shots",
      desc: "Artistic drone shots that make your film stand out.",
      icon: Stars
    }
  ];

  // Video moments with existing project images
  const videoMoments = [
    { src: "/arun-priya-swing.jpg", title: "Beach Wedding", caption: "Beachside outdoor ceremony film frame" },
    { src: "/pollachi-hero.jpg", title: "Destination Wedding", caption: "Vast Pollachi coconut groves aerial film frame" },
    { src: "/arun-priya-hero.png", title: "Grand Temples", caption: "Heritage temple tower aerial filming frame" },
    { src: "/collage-bridesmaids.jpg", title: "Night Celebration", caption: "Sunset and evening lights drone filming frame" },
    { src: "/arun-priya-rice.jpg", title: "Mandap Overview", caption: "Sacred fire and mandap overview film frame" }
  ];

  const handlePrevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + videoMoments.length) % videoMoments.length);
    }
  };

  const handleNextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % videoMoments.length);
    }
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") setLightboxIndex((prev) => (prev !== null ? (prev - 1 + videoMoments.length) % videoMoments.length : null));
      if (e.key === "ArrowRight") setLightboxIndex((prev) => (prev !== null ? (prev + 1) % videoMoments.length : null));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, videoMoments.length]);

  return (
    <div className="w-full bg-cream relative paper-texture overflow-hidden">
      
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-4 text-left">
        <nav className="text-xs tracking-widest uppercase font-bold text-mud/50 space-x-2">
          <Link to="/" className="hover:text-terracotta transition-colors">Home</Link>
          <span>&gt;</span>
          <Link to="/services" className="hover:text-terracotta transition-colors">Services</Link>
          <span>&gt;</span>
          <span className="text-terracotta">Drone Videography</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-16 border-b border-sand-dark/15">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Text */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="text-[10px] tracking-[0.25em] font-bold uppercase text-mud/50">
              OUR SERVICES
            </span>
            <h1 className="font-serif text-[44px] sm:text-[54px] md:text-[62px] text-charcoal tracking-normal leading-[1.15] font-light">
              Drone<br />
              <span className="font-serif font-normal italic text-terracotta">Videography</span>
            </h1>

            {/* Floral divider spacer */}
            <div className="flex items-center space-x-3 py-1">
              <div className="h-[1px] bg-sand-dark/30 w-16" />
              <span className="text-terracotta text-sm">◇</span>
              <div className="h-[1px] bg-sand-dark/30 w-16" />
            </div>

            <p className="font-tamil font-normal text-base md:text-lg text-mud/85 leading-relaxed border-l-2 border-terracotta/30 pl-4">
              "வானிலிருந்து ஒரு பார்வை...<br />
              நினைவுகளை ஒரு புதிய கோணத்தில்."
            </p>

            <p className="font-sans text-sm sm:text-base text-mud/80 leading-relaxed max-w-lg">
              Get a stunning aerial perspective of your celebration, location and moments with professional drone videography that adds a cinematic touch to your memories.
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

          {/* Right Column: Polaroid Image Collage */}
          <div className="lg:col-span-6 relative flex items-center justify-center py-10 min-h-[380px] sm:min-h-[440px]">
            <div className="absolute w-[80%] aspect-[4/3] bg-[#eae5db] rotate-[-6deg] shadow-sm pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, rotate: 1 }}
              animate={{ opacity: 1, scale: 1, rotate: 2 }}
              transition={{ duration: 0.8 }}
              className="relative w-[82%] aspect-[4/3] bg-[#fffdf8] p-3 pb-12 shadow-xl border border-sand-dark/15"
            >
              {/* Cover videographer drone landscape view */}
              <img
                src="/pollachi-hero.jpg"
                alt="Scenic landscape drone wedding cover"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.25em] font-sans font-bold uppercase text-mud/40">
                AERIAL VIEW
              </span>
            </motion.div>

            {/* Overlapping small polaroid */}
            <motion.div
              initial={{ opacity: 0, x: 20, rotate: -6 }}
              animate={{ opacity: 1, x: 0, rotate: -5 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute left-[3%] bottom-[5%] w-[42%] bg-[#fffdf8] p-2 pb-6 shadow-lg border border-sand-dark/10"
            >
              <img
                src="/arun-priya-swing.jpg"
                alt="Candid couple portrait swing"
                className="w-full aspect-[3/4] object-cover"
              />
            </motion.div>

            {/* Handwritten script badge */}
            <div className="absolute right-[5%] top-[8%] z-30 select-none pointer-events-none">
              <span className="font-handwritten text-lg md:text-xl text-terracotta rotate-[8deg] block leading-relaxed">
                From Above,<br />It's Simply Magical.
              </span>
            </div>

            {/* Circular decorative badge */}
            <div className="absolute right-[-2%] bottom-[12%] w-24 h-24 rounded-full border border-sand-dark/20 flex items-center justify-center text-center p-2 backdrop-blur-[1px] rotate-[-12deg] pointer-events-none select-none">
              <span className="text-[7px] tracking-[0.15em] font-bold uppercase text-mud/55 leading-tight">
                NEW PERSPECTIVE • TIMELESS MEMORIES
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Story / Introduction Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 border-b border-sand-dark/15">
        <div className="bg-sand-light border border-sand-dark/20 p-8 sm:p-12 md:p-16 relative overflow-hidden text-left">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] tracking-[0.25em] font-bold text-terracotta uppercase">
                BEYOND THE ORDINARY
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-charcoal leading-tight">
                See your story<br />from a whole<br />
                <span className="font-serif font-normal italic text-terracotta">new perspective.</span>
              </h2>
            </div>
            
            <div className="lg:col-span-7 space-y-4 border-l-0 lg:border-l border-sand-dark/20 lg:pl-8">
              <p className="font-sans text-sm sm:text-base text-mud/85 leading-relaxed">
                Drone videography brings a cinematic aerial dimension to your celebrations — grand venues, beautiful landscapes, vibrant crowds, and once-in-a-lifetime moments captured from the skies.
              </p>
              <p className="font-tamil font-normal text-base text-terracotta/80 leading-relaxed italic">
                "மேலிருந்து காணும் அந்த ஒரு பார்வை, என்றும் மனதில் நிற்கும்."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. What We Capture Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 border-b border-sand-dark/15">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal tracking-wide">
            WHAT WE CAPTURE
          </h2>
          {/* Floral divider spacer */}
          <div className="flex justify-center items-center space-x-2 mt-4">
            <div className="w-8 h-[1px] bg-sand-dark/30" />
            <span className="text-terracotta text-xs">◇</span>
            <div className="w-8 h-[1px] bg-sand-dark/30" />
          </div>
        </div>

        {/* Feature columns layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 max-w-6xl mx-auto divide-y lg:divide-y-0 lg:divide-x divide-sand-dark/20">
          {captureItems.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.num}
                className="text-left space-y-4 pt-6 lg:pt-0 lg:px-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-[11px] font-bold text-terracotta">
                    {item.num}
                  </span>
                  <Icon className="w-4 h-4 text-mud/50" />
                </div>
                <h4 className="font-serif text-sm font-semibold text-charcoal tracking-wide">
                  {item.title}
                </h4>
                <p className="text-[11px] text-mud/75 font-sans leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Magical Aerial Moments (Cinematic Grid) */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 border-b border-sand-dark/15">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal tracking-wide">
            MAGICAL AERIAL MOMENTS
          </h2>
          <div className="w-12 h-[1px] bg-terracotta/30 mx-auto mt-4" />
        </div>

        {/* 5 columns grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {videoMoments.map((moment, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxIndex(idx)}
              className="relative overflow-hidden bg-[#fffdf8] p-2 pb-5 shadow-sm border border-sand-dark/15 cursor-pointer group transition-all duration-300 hover:shadow-md"
            >
              <div className="aspect-[9/16] overflow-hidden relative rounded-[4px]">
                <img
                  src={moment.src}
                  alt={moment.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/35 flex items-center justify-center transition-opacity duration-300 group-hover:bg-black/45">
                  <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <Play className="w-4.5 h-4.5 text-terracotta fill-terracotta ml-0.5" />
                  </div>
                </div>
              </div>

              <div className="mt-3 px-1 text-center">
                <h4 className="font-serif text-xs font-semibold text-charcoal tracking-wide uppercase">
                  {moment.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Why Choose Drone Videography */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 border-b border-sand-dark/15">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          <div className="lg:col-span-5 text-left space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl text-charcoal tracking-wide uppercase">
              WHY CHOOSE OUR<br />DRONE VIDEOGRAPHY?
            </h2>
            <div className="w-12 h-[1px] bg-terracotta/30" />
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              { num: "01", title: "Professional Drones", desc: "High-end drones for smooth, stable and cinematic footage.", icon: PlayCircle },
              { num: "02", title: "4K Cinematic Quality", desc: "Crystal clear 4K aerial footage with rich colours and detail.", icon: Camera },
              { num: "03", title: "Licensed & Safe", desc: "Fully licensed pilots ensuring safety and professionalism.", icon: Shield },
              { num: "04", title: "All Conditions", desc: "We adapt to different lighting and weather conditions.", icon: CloudSun }
            ].map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className="text-left space-y-2 p-4 border-l border-sand-dark/20">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-xs font-bold text-terracotta/75">{benefit.num}</span>
                    <Icon className="w-4 h-4 text-mud/50" />
                  </div>
                  <h4 className="text-xs tracking-[0.15em] font-bold uppercase text-charcoal">
                    {benefit.title}
                  </h4>
                  <p className="text-xs text-mud/75 font-sans leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Tamil Quote Section */}
      <section className="py-20 bg-sand-light relative paper-texture border-b border-sand-dark/15 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Left: Tamil Quote */}
        <div className="lg:col-span-7 text-center lg:text-left space-y-6">
          <span className="text-terracotta text-6xl font-serif block leading-none select-none">“</span>
          <p className="font-tamil font-normal text-lg sm:text-xl md:text-2xl text-charcoal tracking-wide leading-relaxed pl-2">
            "வானிலிருந்து எடுத்து அந்த<br />
            ஒரு ஷாட்... கதையை இன்னும்<br />
            பெரிதாக்கும்."
          </p>
          <span className="font-handwritten text-base text-terracotta block pl-2">
            — Footbee Storytellers
          </span>
        </div>

        {/* Right: Asymmetric Polaroid Grid */}
        <div className="lg:col-span-5 relative flex items-center justify-center py-6 min-h-[220px]">
          <div className="absolute w-[60%] aspect-[3/4] bg-[#eae5db] rotate-[-8deg] shadow-sm pointer-events-none" />
          
          <div className="relative w-[62%] bg-[#fffdf8] p-2 pb-6 shadow-md rotate-[4deg] border border-sand-dark/15">
            <img
              src="/chettinad-hero.png"
              alt="temple towers background frame"
              className="w-full aspect-[3/4] object-cover"
            />
          </div>

          <div className="absolute left-[5%] bottom-[5%] w-[42%] bg-[#fffdf8] p-1.5 pb-5 shadow-lg rotate-[-6deg] border border-sand-dark/10">
            <img
              src="/collage-kolam.jpg"
              alt="village entrance setup"
              className="w-full aspect-[3/4] object-cover"
            />
          </div>
        </div>

      </section>

      {/* 7. Final CTA Section */}
      <section className="w-full grid grid-cols-1 lg:grid-cols-2 relative">
        {/* Left Side: Photography asset */}
        <div className="relative h-[280px] sm:h-[360px] lg:h-auto min-h-[300px] overflow-hidden select-none pointer-events-none">
          <img
            src="/pollachi-hero.jpg"
            alt="Aerial landscape location view"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-charcoal/10" />
        </div>

        {/* Right Side: Terracotta Form info block */}
        <div className="bg-terracotta text-cream px-6 py-16 sm:p-16 md:p-20 flex flex-col justify-center text-left relative overflow-hidden">
          {/* Background stamp */}
          <div className="absolute right-[-5%] bottom-[-5%] opacity-5 pointer-events-none select-none">
            <PlayCircle className="w-48 h-48 text-cream" />
          </div>

          <div className="max-w-md space-y-6 relative z-10">
            <div className="flex items-center space-x-2">
              <Film className="w-5 h-5 text-cream/70" />
              <span className="text-[10px] tracking-[0.25em] font-bold uppercase text-cream/70">aerial legacy</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-wide leading-tight">
              Let’s Elevate<br />Your Story.
            </h2>

            {/* Decorative divider */}
            <div className="h-[1px] bg-white/30 w-24 my-4" />

            <p className="text-xs sm:text-sm text-cream/80 font-sans leading-relaxed">
              From breathtaking aerial views to cinematic storytelling, we turn your big moments into beautiful memories from above.
            </p>

            <div className="pt-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-cream hover:bg-white text-terracotta font-sans text-xs tracking-[0.2em] font-bold uppercase transition-all duration-300 shadow-md hover:shadow-lg rounded-none"
              >
                <span>BOOK YOUR DATE →</span>
              </Link>
            </div>
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
                src={videoMoments[lightboxIndex].src}
                alt={videoMoments[lightboxIndex].caption}
                className="max-w-full max-h-[70vh] object-contain border border-sand/20"
              />
              
              <div className="w-full flex items-center justify-between mt-4 px-1 text-charcoal/80">
                <p className="font-serif italic text-xs">
                  {videoMoments[lightboxIndex].caption}
                </p>
                <span className="text-[10px] tracking-widest font-sans font-bold uppercase text-mud/50">
                  {lightboxIndex + 1} / {videoMoments.length}
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
