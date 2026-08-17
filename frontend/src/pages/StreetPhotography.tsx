import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export const StreetPhotography: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Hand-drawn botanical branch SVG component helper
  const BotanicalBranch: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 120 120" className={`stroke-current fill-none stroke-[1.2] ${className}`}>
      <path d="M60 110 Q50 60 60 10 M60 85 Q40 78 30 65 M60 65 Q80 58 85 45 M60 45 Q42 38 35 25 M60 25 Q78 18 80 8" strokeLinecap="round" />
      <path d="M30 65 Q23 60 25 54 Q33 58 30 65 Z" fill="currentColor" className="opacity-20" />
      <path d="M85 45 Q92 40 90 34 Q82 38 85 45 Z" fill="currentColor" className="opacity-20" />
      <path d="M35 25 Q28 20 30 14 Q38 18 35 25 Z" fill="currentColor" className="opacity-20" />
      <path d="M80 8 Q87 3 85 -3 Q77 1 80 8 Z" fill="currentColor" className="opacity-20" />
    </svg>
  );

  const captureCategories = [
    {
      num: "01",
      title: "People",
      desc: "Real expressions, daily life and emotions.",
      // Hand-drawn people outline
      icon: (
        <svg viewBox="0 0 100 100" className="w-7 h-7 stroke-current fill-none stroke-[1.5]">
          <circle cx="50" cy="35" r="15" />
          <path d="M25 80 Q25 60 50 60 T75 80" strokeLinecap="round" />
        </svg>
      ),
      bgTone: "bg-terracotta/10 text-terracotta"
    },
    {
      num: "02",
      title: "Places",
      desc: "Streets, markets, architecture and life.",
      // Hand-drawn street outline
      icon: (
        <svg viewBox="0 0 100 100" className="w-7 h-7 stroke-current fill-none stroke-[1.5]">
          <path d="M15 85 L35 15 L65 15 L85 85 Z M35 15 L50 85 M65 15 L50 85" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M25 50 h50" strokeLinecap="round" />
        </svg>
      ),
      bgTone: "bg-mud/15 text-mud"
    },
    {
      num: "03",
      title: "Culture",
      desc: "Traditions, heritage and local life.",
      // Hand-drawn temple outline
      icon: (
        <svg viewBox="0 0 100 100" className="w-7 h-7 stroke-current fill-none stroke-[1.5]">
          <path d="M50 10 L80 40 H20 Z M30 40 V80 H70 V40 M50 40 V80 M40 60 H60" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      bgTone: "bg-sand-dark/15 text-charcoal"
    },
    {
      num: "04",
      title: "Moments",
      desc: "Unposed, candid and spontaneous frames.",
      // Hand-drawn shutter/eye
      icon: (
        <svg viewBox="0 0 100 100" className="w-7 h-7 stroke-current fill-none stroke-[1.5]">
          <circle cx="50" cy="50" r="20" />
          <path d="M15 50 Q50 15 85 50 T15 50" strokeLinecap="round" />
        </svg>
      ),
      bgTone: "bg-terracotta/10 text-terracotta"
    },
    {
      num: "05",
      title: "Everyday Life",
      desc: "Local flavours and vibrant interactions.",
      // Hand-drawn cup/conversation
      icon: (
        <svg viewBox="0 0 100 100" className="w-7 h-7 stroke-current fill-none stroke-[1.5]">
          <path d="M25 35 H75 V65 Q75 80 50 80 T25 65 Z M75 40 H85 Q90 40 90 48 T85 56 H75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      bgTone: "bg-mud/15 text-mud"
    },
    {
      num: "06",
      title: "Light & Shadow",
      desc: "The natural beauty of real scenarios.",
      // Hand-drawn sun
      icon: (
        <svg viewBox="0 0 100 100" className="w-7 h-7 stroke-current fill-none stroke-[1.5]">
          <circle cx="50" cy="50" r="16" />
          <path d="M50 15 v10 M50 75 v10 M15 50 h10 M75 50 h10 M25 25 l7 7 M68 68 l7 7 M25 75 l7 -7 M68 32 l7 -7" strokeLinecap="round" />
        </svg>
      ),
      bgTone: "bg-sand-dark/15 text-charcoal"
    }
  ];

  // Gallery items using existing project images
  const galleryImages = [
    { src: "/chettinad-hero.png", caption: "Chettinad Heritage Street Walking", category: "Traditional Streets" },
    { src: "/pollachi-hero.jpg", caption: "Local Pollachi Village Setup", category: "Everyday Life" },
    { src: "/welcome-hero.png", caption: "Candid Street Photographer focus", category: "Moments" },
    { src: "/arun-priya-hero.png", caption: "Walking past temple corridors", category: "Culture" },
    { src: "/arun-priya-swing.jpg", caption: "Smiles in the traditional village yard", category: "People" },
    { src: "/collage-kolam.jpg", caption: "Drawing Kolam on village roads", category: "Everyday Life" }
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
    <div className="w-full bg-cream relative paper-texture overflow-hidden">
      
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-4 text-left">
        <nav className="text-xs tracking-widest uppercase font-bold text-mud/50 space-x-2">
          <Link to="/" className="hover:text-terracotta transition-colors">Home</Link>
          <span>&gt;</span>
          <Link to="/services" className="hover:text-terracotta transition-colors">Services</Link>
          <span>&gt;</span>
          <span className="text-terracotta">Street Photography</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-16 border-b border-sand-dark/15">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-6 space-y-6 text-left relative">
            <span className="text-[10px] tracking-[0.25em] font-bold uppercase text-mud/50">
              OUR SERVICES
            </span>
            <h1 className="font-serif text-[44px] sm:text-[54px] md:text-[62px] text-charcoal tracking-normal leading-[1.15] font-light">
              Street<br />
              <span className="font-serif font-normal italic text-terracotta">Photography</span>
            </h1>

            {/* Custom hand-drawn separator line */}
            <div className="flex items-center space-x-3 py-1">
              <div className="h-[1px] bg-sand-dark/30 w-16" />
              <span className="text-terracotta text-sm">◇</span>
              <div className="h-[1px] bg-sand-dark/30 w-16" />
            </div>

            <p className="font-tamil font-normal text-base md:text-lg text-mud/85 leading-relaxed border-l-2 border-terracotta/30 pl-4">
              “ஒவ்வொரு தெருவும்...<br />
              ஒரு கதை சொல்லும்.”
            </p>

            <p className="font-sans text-sm sm:text-base text-mud/80 leading-relaxed max-w-lg">
              We capture the beauty of everyday life — people, places, culture, and emotions, in their most authentic and natural form.
            </p>

            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center space-x-3 px-8 py-3 bg-terracotta hover:bg-terracotta-dark text-white font-sans text-xs tracking-[0.2em] font-medium transition-colors duration-300 rounded-none uppercase shadow-md hover:shadow-lg"
              >
                <span>BOOK YOUR DATE →</span>
              </Link>
            </div>

            {/* Decorative botanical branch drawing */}
            <div className="absolute right-0 bottom-[-20px] opacity-15 hidden md:block">
              <BotanicalBranch className="w-28 h-28 text-sand-dark" />
            </div>
          </div>

          {/* Right Column: Layered Editorial Polaroid collage */}
          <div className="lg:col-span-6 relative flex items-center justify-center py-10 min-h-[400px] sm:min-h-[460px]">
            {/* Background card layering */}
            <div className="absolute w-[75%] aspect-[3/4] bg-[#eae5db] rotate-[-5deg] shadow-sm pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, rotate: 1 }}
              animate={{ opacity: 1, scale: 1, rotate: 2 }}
              transition={{ duration: 0.8 }}
              className="relative w-[78%] aspect-[3/4] bg-[#fffdf8] p-3 pb-12 shadow-xl border border-sand-dark/15 z-10"
            >
              <img
                src="/chettinad-hero.png"
                alt="Local street heritage site"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.25em] font-sans font-bold uppercase text-mud/40">
                EVERYDAY CHRONICLES
              </span>
            </motion.div>

            {/* Smaller overlapping Polaroid card */}
            <motion.div
              initial={{ opacity: 0, x: 20, rotate: -6 }}
              animate={{ opacity: 1, x: 0, rotate: -5 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute left-[3%] bottom-[5%] w-[42%] bg-[#fffdf8] p-2 pb-6 shadow-lg border border-sand-dark/10 z-20"
            >
              <img
                src="/pollachi-hero.jpg"
                alt="Local village setup"
                className="w-full aspect-[3/4] object-cover"
              />
            </motion.div>

            {/* Handwritten overlay tag */}
            <div className="absolute right-[5%] top-[8%] z-30 select-none pointer-events-none">
              <span className="font-handwritten text-lg md:text-xl text-terracotta rotate-[8deg] block leading-normal">
                Stories<br />Beyond<br />Poses
              </span>
            </div>

            {/* Hand-drawn SVG branches framing collage */}
            <div className="absolute right-[2%] bottom-[2%] z-30 opacity-40">
              <BotanicalBranch className="w-20 h-20 text-terracotta" />
            </div>
            <div className="absolute left-[2%] top-[2%] z-30 opacity-40 rotate-[180deg]">
              <BotanicalBranch className="w-20 h-20 text-terracotta" />
            </div>
          </div>

        </div>
      </section>

      {/* 4. Editorial Introduction Panel */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 border-b border-sand-dark/15">
        <div className="bg-[#fcfaf5] border border-sand-dark/20 p-8 sm:p-12 md:p-16 relative overflow-hidden rounded-[8px] text-left">
          
          {/* Background hand-drawn branches */}
          <div className="absolute right-2 bottom-2 opacity-10">
            <BotanicalBranch className="w-36 h-36 text-sand-dark" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left side: Heading + Vintage Street Lamp outline */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center space-x-3">
                {/* Hand-drawn vintage street lamp SVG */}
                <svg viewBox="0 0 100 100" className="w-14 h-14 text-terracotta/75 stroke-current fill-none stroke-[1.2] shrink-0">
                  <path d="M50 95 V30 M50 30 Q35 30 35 15 H65 Q65 30 50 30 M35 15 L50 5 L65 15 M42 15 V25 H58 V15 M50 25 V30" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="50" cy="20" r="2" fill="currentColor" />
                </svg>
                <div className="space-y-1">
                  <span className="text-[10px] tracking-[0.25em] font-bold text-terracotta uppercase">
                    THE ESSENCE OF STREETS
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-charcoal leading-tight">
                    "Life happens<br />beautifully in the<br />
                    <span className="font-serif font-normal italic text-terracotta">little moments.</span>"
                  </h2>
                </div>
              </div>
            </div>
            
            {/* Right side: Description */}
            <div className="lg:col-span-7 space-y-4 border-l-0 lg:border-l border-sand-dark/20 lg:pl-8 self-center">
              <p className="font-sans text-sm sm:text-base text-mud/85 leading-relaxed">
                Street photography is about observing, feeling and capturing the world as it naturally unfolds — raw, real and full of life. Every frame tells a story of people, places and emotions.
              </p>
              <p className="font-tamil font-normal text-base text-terracotta/80 leading-relaxed italic border-t border-sand-dark/10 pt-4 mt-2">
                “தெருவின் ஒவ்வொரு மூலையும் ஒரு அழகான கதை சொல்லும்... அதைப் பார்க்கும் கண்கள் வேண்டும்.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. What We Capture Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 border-b border-sand-dark/15">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal tracking-wide">
            WHAT WE CAPTURE
          </h2>
          {/* Hand-drawn separator */}
          <div className="flex justify-center items-center space-x-2 mt-4">
            <div className="w-8 h-[1px] bg-sand-dark/30" />
            <span className="text-terracotta text-xs">◇</span>
            <div className="w-8 h-[1px] bg-sand-dark/30" />
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 max-w-6xl mx-auto divide-y lg:divide-y-0 lg:divide-x divide-sand-dark/20">
          {captureCategories.map((item) => (
            <div 
              key={item.num}
              className="text-left space-y-4 pt-6 lg:pt-0 lg:px-4 group"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-[11px] font-bold text-terracotta">
                  {item.num}
                </span>
                {/* Custom organic circular background around hand-drawn icon */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110 ${item.bgTone}`}>
                  {item.icon}
                </div>
              </div>
              <h4 className="font-serif text-sm font-semibold text-charcoal tracking-wide">
                {item.title}
              </h4>
              <p className="text-[11px] text-mud/75 font-sans leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Street Frames Gallery (Asymmetrical Masonry) */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 border-b border-sand-dark/15">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal tracking-wide">
            STREET FRAMES
          </h2>
          <div className="w-12 h-[1px] bg-terracotta/30 mx-auto mt-4" />
        </div>

        {/* Asymmetrical Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryImages.map((image, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxIndex(idx)}
              className="break-inside-avoid relative overflow-hidden bg-[#fffdf8] p-2.5 pb-7 shadow-sm border border-sand-dark/15 rounded-none cursor-pointer group transition-all duration-300 hover:shadow-md"
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
                  VIEW FRAME
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

      {/* 8. Why Choose Street Photography */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 border-b border-sand-dark/15">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          <div className="lg:col-span-5 text-left space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl text-charcoal tracking-wide uppercase">
              WHY CHOOSE OUR<br />STREET PHOTOGRAPHY?
            </h2>
            <div className="w-12 h-[1px] bg-terracotta/30" />
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              { 
                title: "Authentic Frames", 
                desc: "Real moments, not staged shots.",
                icon: (
                  <svg viewBox="0 0 100 100" className="w-8 h-8 text-terracotta/75 stroke-current fill-none stroke-[1.2]">
                    <circle cx="50" cy="50" r="22" />
                    <circle cx="50" cy="50" r="10" />
                    <path d="M20 20 L30 30 M80 20 L70 30 M20 80 L30 70 M80 80 L70 70" strokeLinecap="round" />
                  </svg>
                )
              },
              { 
                title: "Creative Perspective", 
                desc: "Unique angles and fresh visual stories.",
                icon: (
                  <svg viewBox="0 0 100 100" className="w-8 h-8 text-terracotta/75 stroke-current fill-none stroke-[1.2]">
                    <path d="M15 50 Q50 15 85 50 T15 50 M40 50 Q50 35 60 50 T40 50" strokeLinecap="round" />
                    <circle cx="50" cy="50" r="3" fill="currentColor" />
                  </svg>
                )
              },
              { 
                title: "Wide Locations", 
                desc: "Cities, towns, villages and travel destinations.",
                icon: (
                  <svg viewBox="0 0 100 100" className="w-8 h-8 text-terracotta/75 stroke-current fill-none stroke-[1.2]">
                    <path d="M50 15 A20 20 0 0 0 30 35 C30 55 50 85 50 85 S70 55 70 35 A20 20 0 0 0 50 15 Z" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="50" cy="35" r="5" fill="currentColor" />
                  </svg>
                )
              },
              { 
                title: "Timeless Collection", 
                desc: "Images that grow more beautiful with time.",
                icon: (
                  <svg viewBox="0 0 100 100" className="w-8 h-8 text-terracotta/75 stroke-current fill-none stroke-[1.2]">
                    <circle cx="50" cy="50" r="22" />
                    <path d="M50 28 V50 L65 58" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )
              }
            ].map((benefit, idx) => (
              <div key={idx} className="text-left space-y-3 p-4 border-l border-sand-dark/20">
                {benefit.icon}
                <h4 className="text-xs tracking-[0.15em] font-bold uppercase text-charcoal">
                  {benefit.title}
                </h4>
                <p className="text-xs text-mud/75 font-sans leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Quote / Story Section (Torn Paper Paper Visuals) */}
      <section className="py-20 bg-sand-light relative paper-texture border-b border-sand-dark/15 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Left: Tamil Quote */}
        <div className="lg:col-span-7 text-center lg:text-left space-y-6">
          <span className="text-terracotta text-6xl font-serif block leading-none select-none">“</span>
          <p className="font-tamil font-normal text-lg sm:text-xl md:text-2xl text-charcoal tracking-wide leading-relaxed pl-2">
            “தெருவின் ஒவ்வொரு மூலையும்<br />
            ஒரு அழகான கதை சொல்லும்...<br />
            அதைப் பார்க்கும் கண்கள் வேண்டும்.”
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

          {/* Masking tape visuals */}
          <div className="absolute left-[20%] top-[8%] w-12 h-4 bg-white/25 backdrop-blur-[1px] shadow-sm rotate-[-12deg]" />
          
          {/* Hand-drawn branch framing photo */}
          <div className="absolute right-[-4%] top-[-4%] opacity-20">
            <BotanicalBranch className="w-20 h-20 text-sand-dark" />
          </div>
        </div>

      </section>

      {/* 10. Final CTA Section */}
      <section className="w-full grid grid-cols-1 lg:grid-cols-2 relative border-t border-sand-dark/20">
        {/* Left Side: Photography asset */}
        <div className="relative h-[280px] sm:h-[360px] lg:h-auto min-h-[300px] overflow-hidden select-none pointer-events-none">
          <img
            src="/welcome-hero.png"
            alt="Candid street photographer focusing lens"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-charcoal/10" />
        </div>

        {/* Right Side: Terracotta Form info block */}
        <div className="bg-terracotta text-cream px-6 py-16 sm:p-16 md:p-20 flex flex-col justify-center text-left relative overflow-hidden">
          {/* Background stamp */}
          <div className="absolute right-[-5%] bottom-[-5%] opacity-5 pointer-events-none select-none">
            {/* Hand-drawn camera line-art SVG */}
            <svg viewBox="0 0 100 100" className="w-48 h-48 text-cream stroke-current fill-none stroke-[1.2]">
              <path d="M15 35 H35 L40 25 H60 L65 35 H85 V75 H15 Z" strokeLinejoin="round" />
              <circle cx="50" cy="55" r="16" />
            </svg>
          </div>

          <div className="max-w-md space-y-6 relative z-10">
            <div className="flex items-center space-x-2">
              {/* Camera icon */}
              <svg viewBox="0 0 100 100" className="w-5 h-5 text-cream/70 stroke-current fill-none stroke-[1.5]">
                <path d="M15 35 H35 L40 25 H60 L65 35 H85 V75 H15 Z" strokeLinejoin="round" />
                <circle cx="50" cy="55" r="15" />
              </svg>
              <span className="text-[10px] tracking-[0.25em] font-bold uppercase text-cream/70">STREET DIARIES</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-wide leading-tight">
              Let’s Explore<br />The World Together
            </h2>

            {/* Decorative divider */}
            <div className="h-[1px] bg-white/30 w-24 my-4" />

            <p className="text-xs sm:text-sm text-cream/80 font-sans leading-relaxed">
              Capture life as it truly is — one frame at a time.
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

          {/* Botanical drawings on the right edge */}
          <div className="absolute right-2 top-2 opacity-15 rotate-[45deg] pointer-events-none select-none">
            <BotanicalBranch className="w-36 h-36 text-cream" />
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
