import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Share2, Heart, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../services/api";
import { stories as staticStories } from "../data/stories";

export const StoryDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [story, setStory] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStory() {
      try {
        setLoading(true);
        const res = await api.getStoryBySlug(slug!);
        if (res) {
          const mappedStory = {
            ...res,
            name: res?.name_en || res?.name || "Story",
            category: res?.portfolio?.name_en || res?.portfolio || "Wedding",
            heroImage: res?.hero_image_path || res?.heroImage || "",
            date: res?.event_date ? new Date(res.event_date).toLocaleDateString() : (res?.date || ""),
            location: res?.location_en || res?.location || "Unknown",
            sections: Array.isArray(res?.sections) ? res.sections.map((sec: any) => ({
              ...sec,
              title: sec?.title_en || sec?.title || "Story",
              description: sec?.description_en || sec?.description || "",
              captions: Array.isArray(sec?.captions_en) ? sec.captions_en : (Array.isArray(sec?.captions) ? sec.captions : [])
            })) : []
          };
          setStory(mappedStory);
        } else {
          setStory(staticStories.find((s) => s.slug === slug));
        }
      } catch (err) {
        setStory(staticStories.find((s) => s.slug === slug));
      } finally {
        setLoading(false);
      }
    }
    fetchStory();
  }, [slug]);

  // States
  const [activeCategory, setActiveCategory] = useState("ALL MOMENTS");
  const [activeTimeline, setActiveTimeline] = useState("THE BEGINNING");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isFavourited, setIsFavourited] = useState(false);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Dynamic gallery items mapping from current story sections
  const galleryItems = story ? [
    { src: story.heroImage, category: "PORTRAITS", caption: `${story.name} - Cover Portrait` },
    ...(story.sections || []).flatMap((sect: any, idx: number) => 
      (sect.images || []).map((img: string, imgIdx: number) => {
        // Assign categories dynamically based on section structure
        let cat = "CANDID";
        if (idx === 0) cat = "PORTRAITS";
        if (idx === 1) cat = "TRADITIONAL";
        if (idx === 2) cat = "DETAILS";
        return {
          src: img,
          category: cat,
          caption: sect.captions?.[imgIdx] || `${sect.title} Moment`
        };
      })
    )
  ] : [];

  const categories = ["ALL MOMENTS", "TRADITIONAL", "CANDID", "DETAILS", "PORTRAITS"];

  const timelineItems = [
    { title: "THE BEGINNING", time: "08:30 AM", category: "ALL MOMENTS" },
    { title: "BRIDE PREPARATION", time: "10:45 AM", category: "PORTRAITS" },
    { title: "GROOM PREPARATION", time: "11:30 AM", category: "PORTRAITS" },
    { title: "VOWS & CEREMONY", time: "12:15 PM", category: "TRADITIONAL" },
    { title: "SACRED MOMENTS", time: "01:30 PM", category: "TRADITIONAL" },
    { title: "FAMILY & BLESSINGS", time: "03:00 PM", category: "CANDID" },
    { title: "THE RECEPTION", time: "07:00 PM", category: "CANDID" },
    { title: "THE FINALE", time: "09:30 PM", category: "DETAILS" }
  ];

  const handleTimelineClick = (item: typeof timelineItems[0]) => {
    setActiveTimeline(item.title);
    setActiveCategory(item.category);
    
    // Smooth scroll to gallery wrapper on mobile
    const galleryEl = document.getElementById("gallery-wrapper");
    if (galleryEl) {
      galleryEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const filteredGallery = activeCategory === "ALL MOMENTS"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  // Lightbox handlers
  const handlePrevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredGallery.length) % filteredGallery.length);
    }
  };

  const handleNextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredGallery.length);
    }
  };

  // Keyboard controls for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filteredGallery.length) % filteredGallery.length : null));
      if (e.key === "ArrowRight") setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredGallery.length : null));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredGallery.length]);

  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-cream text-charcoal paper-texture">
        <h2 className="font-serif text-3xl mb-4">Loading Story...</h2>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-cream text-charcoal paper-texture">
        <h2 className="font-serif text-3xl mb-4">Story not found</h2>
        <Link to="/stories" className="text-xs tracking-widest text-terracotta hover:underline">
          RETURN TO STORIES
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-cream relative paper-texture overflow-x-hidden">
      
      {/* Page Hero Section */}
      <section className="relative pt-32 pb-16 px-4 md:px-8 max-w-7xl mx-auto border-b border-sand-dark/15">
        <div className="absolute top-28 left-4 md:left-8 z-20">
          <Link
            to="/stories"
            className="inline-flex items-center space-x-2 text-[10px] tracking-[0.2em] font-bold text-mud/60 hover:text-terracotta transition-colors uppercase"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO STORIES</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-8 items-center">
          
          {/* Left: Layered Paper-Photo composition */}
          <div className="lg:col-span-6 relative flex items-center justify-center py-6">
            
            {/* Dried flower SVG Accent (Top-Left) */}
            <div className="absolute left-[5%] top-[2%] w-16 h-16 text-terracotta/20 pointer-events-none select-none">
              <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-1.2 2.5-3 4-5 6 3 0 5 2 6 5 1-3 3-5 6-5-2-2-3.8-3.5-7-6zM12 14v7" />
              </svg>
            </div>

            {/* Behind layers shadow boards */}
            <div className="absolute w-[80%] aspect-[3/4] bg-[#eae5db] rotate-[-5deg] shadow-sm pointer-events-none" />
            <div className="absolute w-[80%] aspect-[3/4] bg-[#f2ede3] rotate-[2deg] shadow-sm pointer-events-none" />
            
            {/* Front main polaroid cover */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: -1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative w-[80%] aspect-[3/4] bg-[#fffdf8] p-3 pb-12 shadow-xl border border-sand-dark/15"
            >
              <img
                src={story.heroImage}
                alt={story.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.25em] font-sans font-bold uppercase text-mud/50">
                REAL MOMENTS
              </span>
            </motion.div>

            {/* Circular badge */}
            <div className="absolute right-[5%] bottom-[5%] w-24 h-24 rounded-full bg-terracotta flex flex-col items-center justify-center text-center shadow-lg rotate-12 select-none pointer-events-none border-2 border-[#fffdf8]">
              <span className="text-[7px] tracking-[0.2em] font-bold text-white leading-none">REAL MOMENTS</span>
              <div className="w-8 h-[1px] bg-white/30 my-1" />
              <span className="text-[7px] tracking-[0.2em] font-bold text-white leading-none">TRUE STORIES</span>
            </div>
          </div>

          {/* Right: Story details */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="font-handwritten text-xl text-terracotta block">
              A Beautiful Story
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-charcoal tracking-wide font-light leading-tight">
              {story.name}
            </h1>
            
            {/* Metadata bar */}
            <div className="flex flex-wrap items-center gap-6 text-xs tracking-widest text-mud/70 font-semibold uppercase">
              <span className="flex items-center space-x-1">
                <span>📅</span>
                <span>{story.date ? String(story.date).slice(0, 10) : "12.06.2024"}</span>
              </span>
              <span className="flex items-center space-x-1">
                <span>📍</span>
                <span>{story.location}</span>
              </span>
              <span className="flex items-center space-x-1">
                <span>♡</span>
                <span>{story.category}</span>
              </span>
            </div>

            {/* Tamil translation sub-quote */}
            <p className="font-tamil font-normal text-base md:text-lg text-mud/85 leading-relaxed border-l-2 border-terracotta/30 pl-4 py-1">
              "அன்பின் தொடக்கம் ஒரு புன்னகையால்...<br />
              அந்த நாள் முழுவதும் நினைவுகளால் நிறம்பியது."
            </p>

            <blockquote className="font-serif italic text-charcoal/80 text-sm tracking-wide">
              "Every moment, beautifully ours."
            </blockquote>

            {/* Share & Favourite actions */}
            <div className="flex items-center space-x-4 pt-4">
              <button className="inline-flex items-center space-x-2 px-5 py-2.5 bg-transparent border border-sand-dark/30 hover:border-terracotta hover:text-terracotta text-charcoal text-[10px] tracking-[0.2em] font-bold uppercase transition-colors cursor-pointer">
                <Share2 className="w-3.5 h-3.5" />
                <span>SHARE STORY</span>
              </button>
              <button
                onClick={() => setIsFavourited(!isFavourited)}
                className={`inline-flex items-center space-x-2 px-5 py-2.5 border text-[10px] tracking-[0.2em] font-bold uppercase transition-all duration-300 cursor-pointer ${
                  isFavourited
                    ? "bg-terracotta border-terracotta text-white"
                    : "bg-transparent border-sand-dark/30 hover:border-terracotta hover:text-terracotta text-charcoal"
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isFavourited ? "fill-white" : ""}`} />
                <span>{isFavourited ? "FAVOURITED" : "FAVOURITE"}</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Two-Column Storytelling Layout */}
      <section id="gallery-wrapper" className="max-w-7xl mx-auto px-4 md:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT COLUMN: Vertical Timeline card */}
        <div className="lg:col-span-4 lg:sticky lg:top-28 self-start z-10">
          <div className="bg-[#fffdf8] p-6 md:p-8 shadow-sm border border-sand-dark/15 space-y-8 relative">
            
            <div>
              <span className="text-[10px] tracking-[0.3em] font-bold text-mud/50 uppercase block mb-1">JOURNAL</span>
              <h2 className="font-serif text-xl tracking-[0.1em] text-charcoal uppercase font-bold border-b border-sand-dark/20 pb-3">
                STORY COLLECTION
              </h2>
            </div>

            {/* Timeline nodes */}
            <div className="relative border-l border-sand-dark/30 pl-6 ml-2 space-y-6 text-left">
              {timelineItems.map((item) => {
                const isActive = activeTimeline === item.title;
                return (
                  <button
                    key={item.title}
                    onClick={() => handleTimelineClick(item)}
                    className="group block w-full text-left relative focus:outline-none focus:ring-0"
                  >
                    {/* Circle Node */}
                    <div className={`absolute left-[-31px] top-1.5 w-3 h-3 rounded-full border transition-all duration-300 ${
                      isActive
                        ? "bg-terracotta border-terracotta scale-125 shadow-md"
                        : "bg-[#fffdf8] border-sand-dark group-hover:border-terracotta"
                    }`} />
                    
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-1.5">
                        <Clock className={`w-3 h-3 ${isActive ? "text-terracotta" : "text-mud/40"}`} />
                        <span className={`text-[10px] tracking-wider font-bold ${isActive ? "text-terracotta" : "text-mud/50"}`}>
                          {item.time}
                        </span>
                      </div>
                      <h4 className={`text-xs tracking-widest uppercase font-semibold transition-colors duration-300 ${
                        isActive ? "text-terracotta" : "text-charcoal group-hover:text-terracotta"
                      }`}>
                        {item.title}
                      </h4>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom notes and quote */}
            <div className="pt-6 border-t border-sand-dark/20 space-y-4">
              <p className="font-serif italic text-mud/70 text-xs tracking-wide">
                “Some stories stay in our hearts forever.”
              </p>
              <div className="flex items-center justify-between text-[10px] tracking-wider text-mud/50 uppercase font-bold">
                <span>— Footbee Storytellers</span>
                
                {/* Tiny dried flower SVG */}
                <div className="w-5 h-5 text-terracotta/30">
                  <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-1.2 2.5-3 4-5 6 3 0 5 2 6 5 1-3 3-5 6-5-2-2-3.8-3.5-7-6zM12 14v7" />
                  </svg>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE: Photo Gallery */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Tabs header */}
          <div className="w-full border-b border-sand-dark/20 pb-4 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center flex-wrap gap-x-6 gap-y-2 text-xs tracking-[0.2em] font-medium uppercase">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`pb-1 border-b-2 transition-all duration-300 cursor-pointer ${
                    activeCategory === cat
                      ? "text-terracotta border-terracotta"
                      : "text-mud/50 border-transparent hover:text-charcoal"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery grid as standard columns masonry */}
          <AnimatePresence mode="wait">
            {filteredGallery.length > 0 ? (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="columns-1 sm:columns-2 gap-4 space-y-4"
              >
                {filteredGallery.map((item, idx) => (
                  <motion.div
                    key={`${item.src}-${idx}`}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    onClick={() => setLightboxIndex(idx)}
                    className="break-inside-avoid relative overflow-hidden bg-[#fffdf8] p-2 pb-6 shadow-sm border border-sand-dark/15 rounded-[8px] cursor-pointer group transition-all duration-300 hover:shadow-md"
                  >
                    <img
                      src={item.src}
                      alt={item.caption}
                      className="w-full h-auto object-cover rounded-[6px]"
                      loading="lazy"
                    />
                    
                    {/* Info display on hover */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-[10px] tracking-[0.2em] font-bold border border-white/30 px-3 py-1.5 backdrop-blur-[1px] uppercase">
                        EXPAND MOMENT
                      </span>
                    </div>

                    <p className="font-serif italic text-[11px] text-mud/60 text-center mt-2.5 px-2">
                      {item.caption}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="w-full text-center py-20 bg-sand-light border border-sand-dark/10">
                <p className="font-serif italic text-mud/60 text-lg">
                  No images match this filter in this story yet.
                </p>
              </div>
            )}
          </AnimatePresence>

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
                src={filteredGallery[lightboxIndex].src}
                alt={filteredGallery[lightboxIndex].caption}
                className="max-w-full max-h-[70vh] object-contain border border-sand/20"
              />
              
              <div className="w-full flex items-center justify-between mt-4 px-1 text-charcoal/80">
                <p className="font-serif italic text-xs">
                  {filteredGallery[lightboxIndex].caption}
                </p>
                <span className="text-[10px] tracking-widest font-sans font-bold uppercase text-mud/50">
                  {lightboxIndex + 1} / {filteredGallery.length}
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

      {/* Booking CTA Section */}
      <section className="mt-12 py-16 bg-sand-light border-y border-sand-dark/25 relative overflow-hidden">
        {/* Staggered overlapping polaroids (Left side) */}
        <div className="hidden lg:block absolute left-[-5%] top-1/2 -translate-y-1/2 w-48 z-10">
          <div className="bg-[#fffdf8] p-2.5 pb-8 shadow-lg rotate-[-6deg] border border-sand-dark/10">
            <img
              src="/hands-holding.png"
              alt="Hands holding traditional details"
              className="w-full aspect-[4/3] object-cover"
            />
          </div>
        </div>

        <div className="max-w-xl mx-auto text-center space-y-6 px-4 relative z-20">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal leading-tight">
            Your story could be<br />our next favourite.
          </h2>
          <p className="text-sm text-mud/70 font-sans tracking-wide">
            Let's create something beautiful together.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate("/contact", { state: { fromStory: story.name } })}
              className="inline-flex items-center justify-center px-8 py-3 bg-terracotta hover:bg-terracotta-dark text-white font-sans text-xs tracking-[0.2em] font-medium transition-colors duration-300 rounded-none shadow-md hover:shadow-lg uppercase cursor-pointer"
            >
              <span>BOOK YOUR DATE →</span>
            </button>
          </div>
        </div>

        {/* Staggered overlapping polaroids (Right side) */}
        <div className="hidden lg:block absolute right-[-5%] top-1/2 -translate-y-1/2 w-48 z-10">
          <div className="bg-[#fffdf8] p-2.5 pb-8 shadow-lg rotate-[5deg] border border-sand-dark/10">
            <img
              src="/arun-priya-hero.png"
              alt="Traditional Tamil wedding couple"
              className="w-full aspect-[3/4] object-cover"
            />
          </div>
        </div>
      </section>

    </div>
  );
};
