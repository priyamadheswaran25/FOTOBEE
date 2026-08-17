import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Film, 
  Clock, 
  Mic, 
  Sparkles, 
  Play, 
  Video, 
  Award, 
  Heart, 
  Users, 
  Camera,
  PlayCircle
} from "lucide-react";

export const TraditionalVideography: React.FC = () => {
  const navigate = useNavigate();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featureItems = [
    {
      num: "01",
      title: "Full Day Coverage",
      desc: "From getting ready to the last goodbye, we capture everything.",
      icon: Clock
    },
    {
      num: "02",
      title: "Cinematic Storytelling",
      desc: "Professionally edited films that tell your story beautifully.",
      icon: Film
    },
    {
      num: "03",
      title: "Live Audio Capture",
      desc: "Crystal clear audio of your vows, speeches and rituals.",
      icon: Mic
    },
    {
      num: "04",
      title: "Highlight Film",
      desc: "A beautifully crafted highlight video of the best moments.",
      icon: Sparkles
    },
    {
      num: "05",
      title: "Full Length Film",
      desc: "The complete video of your special day in all its detail.",
      icon: PlayCircle
    },
    {
      num: "06",
      title: "Aerial & Drone Shots",
      desc: "Stunning cinematic aerial views to make your film magical.",
      icon: Video
    }
  ];

  // Video moments with existing project images
  const videoMoments = [
    { src: "/arun-priya-swing.jpg", title: "Getting Ready", caption: "Bridal getting ready film frame" },
    { src: "/arun-priya-rice.jpg", title: "Sacred Rituals", caption: "Vows and core rituals film frame" },
    { src: "/arun-priya-garlands.jpg", title: "Garland Exchange", caption: "Exchange of wedding garlands film frame" },
    { src: "/collage-bridesmaids.jpg", title: "Celebrations", caption: "Family laughs and feast highlights film frame" },
    { src: "/arun-priya-holding.jpg", title: "Emotional Moments", caption: "Tying the holy mangalsutra film frame" }
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
          <span className="text-terracotta">Traditional Videography</span>
        </nav>
      </div>

      {/* 4. Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-16 border-b border-sand-dark/15">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="text-[10px] tracking-[0.25em] font-bold uppercase text-mud/50">
              OUR SERVICES
            </span>
            <h1 className="font-serif text-[44px] sm:text-[54px] md:text-[62px] text-charcoal tracking-normal leading-[1.15] font-light">
              Traditional<br />
              <span className="font-serif font-normal italic text-terracotta">Videography</span>
            </h1>

            {/* Floral divider spacer */}
            <div className="flex items-center space-x-3 py-1">
              <div className="h-[1px] bg-sand-dark/30 w-16" />
              <span className="text-terracotta text-sm">◇</span>
              <div className="h-[1px] bg-sand-dark/30 w-16" />
            </div>

            <p className="font-tamil font-normal text-base md:text-lg text-mud/85 leading-relaxed border-l-2 border-terracotta/30 pl-4">
              "நினைவுகள் மறையலாம்...<br />
              ஆனால் உணர்வுகள் என்றும் நிலைத்திருக்கும்."
            </p>

            <p className="font-sans text-sm sm:text-base text-mud/80 leading-relaxed max-w-lg">
              We capture the complete flow of your celebration in beautiful cinematic videos — preserving every emotion, every moment, every memory.
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
              {/* Cover videographer/couple camera view */}
              <img
                src="/welcome-hero.png"
                alt="Wedding videography filming cover"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.25em] font-sans font-bold uppercase text-mud/40">
                CINEMATIC PERSPECTIVE
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
                src="/hands-holding.png"
                alt="Tied ceremonial cloth detail"
                className="w-full aspect-[3/4] object-cover"
              />
            </motion.div>

            {/* Handwritten script badge */}
            <div className="absolute right-[5%] top-[8%] z-30 select-none pointer-events-none">
              <span className="font-handwritten text-lg md:text-xl text-terracotta rotate-[8deg] block">
                Every Emotion<br />Captured<br />Beautifully
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Story in Motion Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-sand-dark/15">
        <div className="lg:col-span-5 text-left space-y-2 lg:pr-6 border-r-0 lg:border-r border-sand-dark/20">
          <span className="text-[10px] tracking-[0.25em] font-bold text-terracotta uppercase">
            THE STORY IN MOTION
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal leading-tight">
            Relive every<br />moment as it<br />
            <span className="font-serif font-normal italic text-terracotta">happened.</span>
          </h2>
        </div>
        <div className="lg:col-span-7 text-left space-y-4 lg:pl-6 self-center">
          <p className="font-sans text-sm sm:text-base text-mud/85 leading-relaxed">
            Traditional videography is more than just recording. It is about capturing the complete story of your special day — the anticipation, the emotions, the rituals, the celebrations, and the little moments in between.
          </p>
          <p className="font-tamil font-normal text-base text-terracotta/80 leading-relaxed italic">
            "அது ஒரு வீடியோ அல்ல... அது உங்கள் வாழ்க்கையின் அழகான கதை."
          </p>
        </div>
      </section>

      {/* 6. What We Include Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 border-b border-sand-dark/15">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal tracking-wide">
            WHAT WE INCLUDE
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
          {featureItems.map((item) => {
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

      {/* 7. Moments That Come Alive (Cinematic Grid) */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 border-b border-sand-dark/15">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal tracking-wide">
            MOMENTS THAT COME ALIVE
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

      {/* 8. Why Choose Videography */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 border-b border-sand-dark/15">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal tracking-wide uppercase">
            Why Choose Our Traditional Videography?
          </h2>
          <div className="w-12 h-[1px] bg-terracotta/30 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {[
            { title: "Experienced Team", desc: "Skilled professionals who understand emotions and traditions.", icon: Users },
            { title: "High Quality Equipment", desc: "We use professional cinema-grade cameras and audio gear.", icon: Camera },
            { title: "Expert Editing", desc: "Cinematic edits that bring your memories to life.", icon: Award },
            { title: "Timeless Memories", desc: "Films you will cherish for generations to come.", icon: Heart }
          ].map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div key={idx} className="text-left space-y-3 p-4 border-l border-sand-dark/20">
                <Icon className="w-6 h-6 text-terracotta/75" />
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
      </section>

      {/* 9. Tamil Quote Section */}
      <section className="py-20 bg-sand-light relative paper-texture border-b border-sand-dark/15">
        {/* Overlapping small polaroid (Left) */}
        <div className="hidden xl:block absolute left-[5%] top-1/2 -translate-y-1/2 w-32 z-10">
          <div className="bg-[#fffdf8] p-1.5 pb-5 shadow-sm rotate-[-8deg] border border-sand-dark/10">
            <img
              src="/collage-kolam.jpg"
              alt="traditional details ritual"
              className="w-full aspect-[3/4] object-cover"
            />
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-center space-y-6 px-4">
          <p className="font-tamil font-normal text-lg sm:text-xl md:text-2xl text-charcoal tracking-wide leading-relaxed">
            "ஒரு நாள் முடிகிறது,<br />
            ஆனால் அந்த நாளின் நினைவுகள்<br />
            என்றும் நெஞ்சில் வாழ்கின்றன."
          </p>
          <span className="font-handwritten text-base text-terracotta block">
            — Footbee Storytellers
          </span>
        </div>
      </section>

      {/* 10. Final CTA Section */}
      <section className="bg-terracotta text-cream py-16 px-6 sm:p-16 md:p-20 grid grid-cols-1 lg:grid-cols-2 relative gap-8 items-center text-left">
        
        {/* Left Side: Text Details */}
        <div className="max-w-md space-y-6">
          <div className="flex items-center space-x-2">
            <Film className="w-5 h-5 text-cream/70" />
            <span className="text-[10px] tracking-[0.25em] font-bold uppercase text-cream/70">cinematic legacy</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-wide leading-tight">
            Let’s Film Your<br />Beautiful Story
          </h2>

          <div className="h-[1px] bg-white/30 w-24 my-4" />

          <p className="text-xs sm:text-sm text-cream/80 font-sans leading-relaxed">
            From real emotions to beautiful moments, we turn your special day into a cinematic masterpiece.
          </p>

          <div className="pt-2">
            <button
              onClick={() => navigate("/contact", { state: { fromService: "Traditional Videography" } })}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-cream hover:bg-white text-terracotta font-sans text-xs tracking-[0.2em] font-bold uppercase transition-all duration-300 shadow-md hover:shadow-lg rounded-none cursor-pointer"
            >
              <span>BOOK YOUR DATE →</span>
            </button>
          </div>
        </div>

        {/* Right Side: Videography gear photography overlay */}
        <div className="relative h-[240px] lg:h-[340px] overflow-hidden rounded-[4px] shadow-lg border border-white/10 select-none pointer-events-none">
          <img
            src="/welcome-hero.png"
            alt="Photography filming lens detail"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-charcoal/20" />
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
