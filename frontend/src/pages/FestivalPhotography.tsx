import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";

export const FestivalPhotography: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Detailed hand-drawn Gopuram illustration component
  const TempleIllustration: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 160 220" className={`stroke-current fill-none stroke-[1] ${className}`}>
      {/* Base Foundation */}
      <path d="M10 210 H150 M20 210 V195 H140 V210 M30 195 V180 H130 V195" strokeLinecap="round" />
      {/* Entrance Doorway */}
      <path d="M65 210 V185 C65 180 95 180 95 185 V210" strokeLinecap="round" />
      
      {/* Tier 1 */}
      <path d="M35 180 L40 150 H120 L125 180 M40 150 V138 H120 V150" />
      <path d="M48 180 V150 M70 180 V150 M90 180 V150 M112 180 V150" opacity="0.4" />
      <circle cx="80" cy="165" r="4" />

      {/* Tier 2 */}
      <path d="M43 138 L48 110 H112 L117 138 M48 110 V98 H112 V110" />
      <path d="M55 138 V110 M72 138 V110 M88 138 V110 M105 138 V110" opacity="0.4" />
      <circle cx="80" cy="124" r="3.5" />

      {/* Tier 3 */}
      <path d="M51 98 L56 75 H104 L109 98 M56 75 V65 H104 V75" />
      <path d="M62 98 V75 M75 98 V75 M85 98 V75 M98 98 V75" opacity="0.4" />
      <circle cx="80" cy="86" r="3" />

      {/* Tier 4 */}
      <path d="M59 65 L63 45 H97 L101 65 M63 45 V38 H97 V45" />
      <circle cx="80" cy="55" r="2.5" />

      {/* Top Dome (Kalasams) */}
      <path d="M68 38 Q80 20 92 38 Z" fill="currentColor" className="opacity-10" />
      <path d="M72 20 Q80 8 88 20 M80 8 V2" strokeWidth="1.5" />
      <circle cx="80" cy="2" r="1.5" fill="currentColor" />
      
      {/* Flag / Side decorative towers */}
      <path d="M22 180 V160 L18 165 M138 180 V160 L142 165" opacity="0.6" />
    </svg>
  );

  // Reusable botanical branch illustration
  const BotanicalBranch: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 120 120" className={`stroke-current fill-none stroke-[1.2] ${className}`}>
      <path d="M60 110 Q50 60 60 10 M60 85 Q40 78 30 65 M60 65 Q80 58 85 45 M60 45 Q42 38 35 25 M60 25 Q78 18 80 8" strokeLinecap="round" />
      <path d="M30 65 Q23 60 25 54 Q33 58 30 65 Z" fill="currentColor" className="opacity-20" />
      <path d="M85 45 Q92 40 90 34 Q82 38 85 45 Z" fill="currentColor" className="opacity-20" />
      <path d="M35 25 Q28 20 30 14 Q38 18 35 25 Z" fill="currentColor" className="opacity-20" />
      <path d="M80 8 Q87 3 85 -3 Q77 1 80 8 Z" fill="currentColor" className="opacity-20" />
    </svg>
  );

  // Hanging diya illustration component
  const HangingDiya: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 60 140" className={`stroke-current fill-none stroke-[1.2] ${className}`}>
      <line x1="30" y1="0" x2="30" y2="90" />
      {/* Diya Base */}
      <path d="M12 90 C12 112 48 112 48 90 Z" />
      <path d="M12 90 H48" />
      {/* Wicks & Flame */}
      <path d="M30 90 C26 82 30 70 30 70 C30 70 34 82 30 90" fill="currentColor" className="text-[#B85F43]" />
      <circle cx="30" cy="90" r="2" fill="currentColor" />
      {/* Subtle flame glow indicator */}
      <circle cx="30" cy="78" r="10" className="stroke-none fill-[#B85F43]/15 animate-ping" />
    </svg>
  );

  // Hanging lights wire system
  const HangingLights: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={`stroke-current fill-none stroke-[1.2] ${className}`}>
      <path d="M0,15 Q150,45 300,15 T600,15 T900,15 T1200,15" />
      <path d="M150,30 V55 M450,20 V48 M750,23 V60 M1050,22 V50" strokeWidth="0.8" />
      <circle cx="150" cy="55" r="4.5" fill="#B85F43" className="animate-pulse" />
      <circle cx="450" cy="48" r="4.5" fill="#B85F43" className="animate-pulse" />
      <circle cx="750" cy="60" r="4.5" fill="#B85F43" className="animate-pulse" />
      <circle cx="1050" cy="50" r="4.5" fill="#B85F43" className="animate-pulse" />
      {/* Tiny stars */}
      <path d="M220 40 l2 2 l-2 2 l-2 -2 z M620 30 l2 2 l-2 2 l-2 -2 z M940 35 l2 2 l-2 2 l-2 -2 z" fill="currentColor" className="opacity-40" />
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
      title: "Traditions & Rituals",
      desc: "Sacred rituals and traditional ceremonies.",
      // Diya illustration
      icon: (
        <svg viewBox="0 0 100 100" className="w-8 h-8 stroke-current fill-none stroke-[1.2]">
          <path d="M20 65 C20 85 80 85 80 65 Z" />
          <path d="M50 65 C46 55 50 40 50 40 C50 40 54 55 50 65" fill="currentColor" className="text-[#B85F43]" />
        </svg>
      )
    },
    {
      num: "02",
      title: "Vibrant Celebrations",
      desc: "Colours, crowds and energetic moments.",
      // Celebrating people outline
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
      num: "03",
      title: "Culture & Heritage",
      desc: "Our rich cultural heritage in every frame.",
      // Temple sketch
      icon: (
        <svg viewBox="0 0 100 100" className="w-8 h-8 stroke-current fill-none stroke-[1.2]">
          <path d="M30 85 L35 45 H65 L70 85 M35 45 L40 20 H60 L65 45 M40 20 L50 5 L60 20 Z" />
        </svg>
      )
    },
    {
      num: "04",
      title: "Devotion & Faith",
      desc: "Pure devotion and spiritual expressions.",
      // Offering hands / diya
      icon: (
        <svg viewBox="0 0 100 100" className="w-8 h-8 stroke-current fill-none stroke-[1.2]">
          <path d="M30 75 Q50 45 70 75 M40 75 Q50 55 60 75" />
          <circle cx="50" cy="40" r="5" fill="currentColor" />
        </svg>
      )
    },
    {
      num: "05",
      title: "Music & Dance",
      desc: "Rhythms, performances and joyful expressions.",
      // Traditional drum
      icon: (
        <svg viewBox="0 0 100 100" className="w-8 h-8 stroke-current fill-none stroke-[1.2]">
          <ellipse cx="35" cy="40" rx="15" ry="8" />
          <ellipse cx="35" cy="70" rx="15" ry="8" />
          <line x1="20" y1="40" x2="20" y2="70" />
          <line x1="50" y1="40" x2="50" y2="70" />
        </svg>
      )
    },
    {
      num: "06",
      title: "Lights & Emotions",
      desc: "The magic of lights and heartfelt vibes.",
      // Sparkler/fireworks
      icon: (
        <svg viewBox="0 0 100 100" className="w-8 h-8 stroke-current fill-none stroke-[1.2]">
          <path d="M50 25 V75 M25 50 H75 M32 32 L68 68 M32 68 L68 32" strokeLinecap="round" />
        </svg>
      )
    }
  ];

  // Gallery items using existing project images
  const galleryImages = [
    { src: "/arun-priya-hero.png", title: "Temple Festivals", caption: "Gopuram chariot celebration frame" },
    { src: "/chettinad-hero.png", title: "Processions", caption: "Procession walks past heritage corridors" },
    { src: "/collage-bridesmaids.jpg", title: "Cultural Performances", caption: "Festive Bharatanatyam traditional dances" },
    { src: "/arun-priya-rice.jpg", title: "Evening Rituals", caption: "Evening diya lamps lighting setup" },
    { src: "/collage-kolam.jpg", title: "Decorations", caption: "Vibrant flower kolam decorations" },
    { src: "/pollachi-hero.jpg", title: "Community Celebration", caption: "Village folk festival gathering" }
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

  return (
    <div className="w-full bg-[#F8F3EC] text-[#24211F] relative paper-texture overflow-hidden">
      
      {/* Hanging festival lights string wire */}
      <HangingLights className="absolute top-0 left-0 w-full h-24 text-[#B85F43]/30 pointer-events-none select-none z-10" />

      {/* Hanging diyas (hero sides) */}
      <div className="absolute left-[3%] top-20 hidden xl:block select-none pointer-events-none opacity-45">
        <HangingDiya className="w-10 h-32 text-[#B85F43]" />
      </div>
      <div className="absolute right-[3%] top-20 hidden xl:block select-none pointer-events-none opacity-45">
        <HangingDiya className="w-10 h-32 text-[#B85F43]" />
      </div>

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-4 text-left relative z-20">
        <nav className="text-xs tracking-widest uppercase font-bold text-[#24211F]/50 space-x-2">
          <Link to="/" className="hover:text-[#B85F43] transition-colors">Home</Link>
          <span>&gt;</span>
          <Link to="/services" className="hover:text-[#B85F43] transition-colors">Services</Link>
          <span>&gt;</span>
          <span className="text-[#B85F43]">Festival Photography</span>
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
              Festival<br />
              <span className="font-serif font-normal italic text-[#B85F43]">Photography</span>
            </h1>

            {/* FloralDivider */}
            <FloralDivider className="!justify-start" />

            <p className="font-tamil font-normal text-base md:text-lg text-[#24211F]/80 leading-relaxed border-l-2 border-[#B85F43]/30 pl-4">
              “திருவிழாக்கள் என்பது உணர்வுகளின் கொண்டாட்டம்.”
            </p>

            <p className="font-sans text-sm sm:text-base text-[#24211F]/70 leading-relaxed max-w-lg">
              We capture the spirit, colours, traditions and emotions of festivals in their most vibrant and authentic form.
            </p>

            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center space-x-3 px-8 py-3.5 bg-[#B85F43] hover:bg-[#B85F43]/90 text-white font-sans text-xs tracking-[0.2em] font-medium transition-colors duration-300 rounded-none uppercase shadow-md hover:shadow-lg"
              >
                <span>BOOK YOUR DATE →</span>
              </Link>
            </div>

            {/* Botanical decorative branch drawing */}
            <div className="absolute right-0 bottom-[-20px] opacity-15 hidden md:block select-none pointer-events-none">
              <BotanicalBranch className="w-28 h-28 text-[#B85F43]" />
            </div>
          </div>

          {/* Right Column: Layered Polaroid scrapbook */}
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
                src="/arun-priya-hero.png"
                alt="Traditional festival chariot"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.25em] font-sans font-bold uppercase text-[#24211F]/40">
                SPIRIT OF CELEBRATION
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
                src="/collage-bridesmaids.jpg"
                alt="Dance celebrations"
                className="w-full aspect-[3/4] object-cover"
              />
              {/* Masking tape on top */}
              <div className="absolute top-[-8px] left-[25%] w-12 h-4 bg-[#faf6f0]/65 shadow-sm border border-[#B85F43]/10 rotate-[8deg] z-20" />
            </motion.div>

            {/* Handwritten overlay tag */}
            <div className="absolute right-[5%] top-[8%] z-30 select-none pointer-events-none">
              <span className="font-handwritten text-lg md:text-xl text-[#B85F43] rotate-[8deg] block leading-relaxed">
                Traditions.<br />Emotions.<br />Timeless.
              </span>
            </div>

            {/* Botanical drawings framing collage */}
            <div className="absolute right-[-2%] bottom-[-2%] z-30 opacity-40 select-none pointer-events-none">
              <BotanicalBranch className="w-20 h-20 text-[#B85F43]" />
            </div>
            <div className="absolute left-[2%] top-[2%] z-30 opacity-40 rotate-[180deg] select-none pointer-events-none">
              <BotanicalBranch className="w-20 h-20 text-[#B85F43]" />
            </div>
          </div>

        </div>
      </section>

      {/* THE SPIRIT OF FESTIVALS Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 border-b border-[#B85F43]/10 relative z-10">
        <div className="bg-[#fcfaf5] border border-[#B85F43]/10 p-8 sm:p-12 md:p-16 relative overflow-hidden rounded-[8px] text-left">
          
          {/* Detailed Gopuram sketch (Background outline) */}
          <div className="absolute right-6 bottom-0 opacity-10 hidden lg:block select-none pointer-events-none">
            <TempleIllustration className="w-56 h-72 text-[#B85F43]" />
          </div>

          {/* Hanging lantern doodle */}
          <div className="absolute left-6 top-0 opacity-20 hidden md:block select-none pointer-events-none">
            <svg viewBox="0 0 50 120" className="w-10 h-28 text-[#B85F43] stroke-current fill-none stroke-[1]">
              <line x1="25" y1="0" x2="25" y2="50" />
              <path d="M15 50 L25 35 L35 50 L25 65 Z" />
              <path d="M10 65 H40 M15 65 V85 M35 65 V85 M25 65 V95" />
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] tracking-[0.25em] font-bold text-[#B85F43] uppercase">
                THE SPIRIT OF FESTIVALS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#24211F] leading-tight">
                Every festival<br />tells a story,<br />
                we preserve it<br />
                <span className="font-serif font-normal italic text-[#B85F43]">forever.</span>
              </h2>
            </div>
            
            <div className="lg:col-span-7 space-y-4 border-l-0 lg:border-l border-[#B85F43]/10 lg:pl-8 self-center">
              <p className="font-sans text-sm sm:text-base text-[#24211F]/80 leading-relaxed">
                From grand celebrations to intimate rituals, festival photography is about capturing the energy, devotion, culture and joy that bring communities together.
              </p>
              <p className="font-tamil font-normal text-base text-[#B85F43]/80 leading-relaxed italic border-t border-[#B85F43]/10 pt-4 mt-2">
                “ஒவ்வொரு திருவிழாவும் ஒரு பாரம்பரியத்தின் இதயத் துடிப்பு.”
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
          {/* Hand-drawn flower divider spacer */}
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

      {/* FESTIVAL MOMENTS Section (Horizontal Gallery with Polaroid border frames) */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 border-b border-[#B85F43]/10 relative z-10">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#24211F] tracking-wide">
            FESTIVAL MOMENTS
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

      {/* WHY CHOOSE OUR FESTIVAL PHOTOGRAPHY? Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 border-b border-[#B85F43]/10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          <div className="lg:col-span-5 text-left space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#24211F] tracking-wide uppercase">
              WHY CHOOSE OUR<br />FESTIVAL PHOTOGRAPHY?
            </h2>
            <FloralDivider className="!justify-start" />
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              { 
                title: "Experienced Team", 
                desc: "We understand festivals, traditions and the perfect moments to capture.",
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
                desc: "Artistic storytelling that reflects the true festival spirit.",
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
                desc: "Professional cameras for sharp, vibrant and stunning results.",
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
                desc: "Images you will cherish and pass on for generations.",
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

      {/* Quote / Story Section (Hanging Diyas & Botanical Backgrounds) */}
      <section className="py-20 bg-[#EFE5D8] relative paper-texture border-b border-[#B85F43]/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Hanging Diya elements */}
        <div className="absolute left-[8%] top-0 hidden md:block opacity-35 select-none pointer-events-none">
          <HangingDiya className="w-8 h-28 text-[#B85F43]" />
        </div>
        <div className="absolute right-[35%] top-0 hidden md:block opacity-35 select-none pointer-events-none">
          <HangingDiya className="w-8 h-28 text-[#B85F43]" />
        </div>

        {/* Left: Tamil Quote */}
        <div className="lg:col-span-7 text-center lg:text-left space-y-6">
          <span className="text-[#B85F43] text-6xl font-serif block leading-none select-none">“</span>
          <p className="font-tamil font-normal text-lg sm:text-xl md:text-2xl text-[#24211F] tracking-wide leading-relaxed pl-2">
            “திருவிழாவின் ஒளியும், ஒலியும்,<br />
            உணர்வும்... நம் கலாச்சாரத்தின்<br />
            நெஞ்சில் என்றும் வாழ்கிறது.”
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
              src="/arun-priya-hero.png"
              alt="village temple gopuram"
              className="w-full aspect-[3/4] object-cover"
            />
            {/* Transparent masking tape */}
            <div className="absolute top-[-10px] left-[30%] w-16 h-5 bg-[#faf6f0]/65 shadow-sm border border-[#B85F43]/10 -rotate-[8deg] z-20" />
          </div>

          <div className="absolute left-[5%] bottom-[5%] w-[42%] bg-[#fffdf8] p-1.5 pb-5 shadow-lg rotate-[-6deg] border border-[#B85F43]/10">
            <img
              src="/arun-priya-rice.jpg"
              alt="diya oil lamps lighting"
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
        {/* Left Side: Traditional photography asset */}
        <div className="relative h-[280px] sm:h-[360px] lg:h-auto min-h-[300px] overflow-hidden select-none pointer-events-none">
          <img
            src="/welcome-hero.png"
            alt="Photographer captures festival sparklers"
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

          {/* Hanging diya on CTA card */}
          <div className="absolute left-6 top-0 opacity-20 pointer-events-none select-none text-[#F8F3EC]">
            <HangingDiya className="w-8 h-28" />
          </div>

          <div className="max-w-md space-y-6 relative z-10">
            <div className="flex items-center space-x-2">
              <svg viewBox="0 0 100 100" className="w-5 h-5 text-[#F8F3EC]/70 stroke-current fill-none stroke-[1.5]">
                <path d="M15 35 H35 L40 25 H60 L65 35 H85 V75 H15 Z" />
                <circle cx="50" cy="55" r="15" />
              </svg>
              <span className="text-[10px] tracking-[0.25em] font-bold uppercase text-[#F8F3EC]/70">festival spirit</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-wide leading-tight">
              Let’s Capture<br />The Festival Spirit
            </h2>

            {/* Decorative divider */}
            <div className="h-[1px] bg-white/30 w-24 my-4" />

            <p className="text-xs sm:text-sm text-[#F8F3EC]/80 font-sans leading-relaxed">
              Let us freeze the colours, devotion and celebration of your festival memories forever.
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

          {/* Botanical drawings on the right edge */}
          <div className="absolute right-2 top-2 opacity-15 rotate-[45deg] pointer-events-none select-none">
            <BotanicalBranch className="w-36 h-36 text-[#F8F3EC]" />
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
