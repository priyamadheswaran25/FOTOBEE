import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../services/api";

export const Stories: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All Stories");
  const [sortOrder, setSortOrder] = useState("Latest First");
  const [displayStories, setDisplayStories] = useState<any[]>([]);
  const [portfolios, setPortfolios] = useState<any[]>([]);

  useEffect(() => {
    async function loadStories() {
      try {
        const [res, portRes] = await Promise.allSettled([
          api.getStories(),
          api.getPortfolios(),
        ]);
        
        if (res.status === 'fulfilled' && Array.isArray(res.value)) {
          const mappedStories = res.value.map(s => ({
            ...s,
            name: s?.name_en || s?.name || "Story",
            category: (typeof s?.portfolio === 'string' ? s.portfolio : s?.portfolio?.name_en) || "Wedding",
            heroImage: s?.hero_image_path || s?.heroImage || "",
            date: s?.event_date ? new Date(s.event_date).toLocaleDateString() : (s?.date || ""),
            location: s?.location_en || s?.location || "Unknown",
          }));
          setDisplayStories(mappedStories);
        }

        if (portRes.status === 'fulfilled' && Array.isArray(portRes.value)) {
          setPortfolios(portRes.value);
        }
      } catch (err) {
        console.error("Failed to load stories", err);
      }
    }
    loadStories();
  }, []);

  const dynamicCategories = portfolios.map(p => p.name_en || p.name).filter(Boolean);
  const categories = ["All Stories", ...dynamicCategories];

  const getFilteredStories = () => {
    let list = [...displayStories];
    
    if (activeCategory !== "All Stories") {
      list = displayStories.filter(s => s.category && s.category.toUpperCase() === activeCategory.toUpperCase());
    }

    if (sortOrder === "Oldest First") {
      return list.reverse();
    }
    return list;
  };

  const filteredStories = getFilteredStories();

  return (
    <div className="w-full pt-28 pb-20 bg-cream relative paper-texture overflow-hidden">
      
      {/* Background Subtle Line Art Accent */}
      <div className="absolute left-[3%] top-[12%] opacity-10 pointer-events-none select-none hidden xl:block">
        <svg className="w-40 h-40 text-terracotta" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-1.2 2.5-3 4-5 6 3 0 5 2 6 5 1-3 3-5 6-5-2-2-3.8-3.5-7-6zM12 14v7" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Stories Hero Section */}
        <section className="relative pt-12 pb-16 text-center max-w-4xl mx-auto">
          {/* Left Polaroid - Desktop Float */}
          <div className="hidden lg:block absolute left-[-15%] top-[-10px] w-48 z-10">
            <motion.div
              initial={{ opacity: 0, x: -30, rotate: -10 }}
              animate={{ opacity: 1, x: 0, rotate: -8 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="bg-[#fffdf8] p-2.5 pb-8 shadow-lg border border-sand-dark/15"
            >
              <img
                src="/arun-priya-hero.png"
                alt="Tamil wedding couple"
                className="w-full aspect-[4/3] object-cover"
              />
              <p className="font-handwritten text-center text-charcoal/70 text-xs mt-3">Arun & Priya</p>
            </motion.div>
          </div>
          
          <span className="font-handwritten text-xl text-terracotta block mb-3">Our Stories</span>
          <h1 className="font-serif text-[42px] sm:text-[54px] md:text-[62px] text-charcoal tracking-normal mb-6 leading-[1.15] font-light">
            Every Love.<br />A Beautiful Story.
          </h1>
          
          <p className="font-tamil font-normal text-sm sm:text-base md:text-[17px] text-mud/85 max-w-xl mx-auto leading-[1.8] whitespace-pre-line">
            ஒவ்வொரு திருமணமும் ஒரு பயணம்.<br />
            அந்தப் பயணத்தின் அழகிய தருணங்களை<br />
            நாங்கள் கதைகளாகச் சொல்கிறோம்.
          </p>

          {/* Right Polaroid - Desktop Float */}
          <div className="hidden lg:block absolute right-[-15%] bottom-[-20px] w-44 z-10">
            <motion.div
              initial={{ opacity: 0, x: 30, rotate: 8 }}
              animate={{ opacity: 1, x: 0, rotate: 6 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="bg-[#fffdf8] p-2.5 pb-8 shadow-lg border border-sand-dark/15"
            >
              <img
                src="/pollachi-hero.jpg"
                alt="Coconut grove walk"
                className="w-full aspect-[3/4] object-cover"
              />
              <p className="font-handwritten text-center text-charcoal/70 text-xs mt-3">Karthik & Meena</p>
            </motion.div>
          </div>
        </section>

        {/* Story Category Filter Bar */}
        <div className="w-full border-y border-sand-dark/20 py-4 mb-16 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Horizontally scrollable list on mobile */}
          <div className="w-full md:w-auto overflow-x-auto whitespace-nowrap scrollbar-hide flex items-center space-x-6 md:space-x-8 px-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs tracking-[0.2em] font-medium transition-all duration-300 pb-1 border-b-2 uppercase cursor-pointer ${
                  activeCategory === cat
                    ? "text-terracotta border-terracotta"
                    : "text-mud/60 border-transparent hover:text-charcoal"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sorting Option */}
          <div className="flex items-center space-x-2 text-xs tracking-[0.15em] font-medium text-mud/60 uppercase shrink-0">
            <span>SORT:</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-transparent border-none text-charcoal font-semibold focus:outline-none cursor-pointer pr-1"
            >
              <option value="Latest First">LATEST FIRST</option>
              <option value="Oldest First">OLDEST FIRST</option>
            </select>
          </div>
        </div>

        {/* Stories Grid */}
        <AnimatePresence mode="wait">
          {filteredStories.length > 0 ? (
            <motion.div
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12"
            >
              {filteredStories.map((story) => (
                <motion.div
                  layoutId={`story-card-${story.slug}`}
                  key={story.slug}
                  className="group cursor-pointer flex flex-col space-y-4"
                >
                  <Link to={`/stories/${story.slug}`} className="block w-full">
                    {/* Polaroid-style printed photo wrapper */}
                    <div className="relative overflow-hidden bg-[#fffdf8] p-3 pb-8 shadow-[0_8px_25px_rgba(0,0,0,0.06)] border border-sand-dark/10 transition-shadow duration-300 group-hover:shadow-[0_15px_35px_rgba(0,0,0,0.12)]">
                      <div className="w-full aspect-[4/5] overflow-hidden relative">
                        <img
                          src={story.heroImage}
                          alt={story.name}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          loading="lazy"
                        />
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="text-white text-xs tracking-[0.2em] font-medium border border-white/40 px-4 py-2 backdrop-blur-[2px]">
                            VIEW STORY →
                          </span>
                        </div>
                        {/* Heart Icon Top-Right */}
                        <div className="absolute top-3 right-3 text-white/80 hover:text-terracotta transition-colors duration-200 opacity-0 group-hover:opacity-100">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Metadata below image */}
                  <div className="px-1 text-left space-y-1">
                    <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-terracotta block">
                      {story.category?.toUpperCase()}
                    </span>
                    <h3 className="font-serif text-[22px] text-charcoal tracking-wide font-medium group-hover:text-terracotta transition-colors duration-300">
                      <Link to={`/stories/${story.slug}`}>{story.name}</Link>
                    </h3>
                    <p className="text-xs text-mud/60 font-sans tracking-wide">
                      {story.date} · {story.location}
                    </p>
                    <Link
                      to={`/stories/${story.slug}`}
                      className="inline-flex items-center text-[10px] tracking-[0.15em] font-bold uppercase text-charcoal group-hover:text-terracotta transition-colors pt-2"
                    >
                      <span>VIEW STORY</span>
                      <svg className="w-3.5 h-3.5 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="w-full text-center py-20 bg-sand-light border border-sand-dark/10">
              <p className="font-serif italic text-mud/60 text-lg">
                No stories match this filter yet. Our collection is growing.
              </p>
            </div>
          )}
        </AnimatePresence>

        {/* Pagination Section */}
        <div className="w-full flex items-center justify-center space-x-4 mt-20">
          <button className="w-8 h-8 rounded-full flex items-center justify-center bg-terracotta text-white font-sans text-xs font-bold cursor-pointer">
            1
          </button>
          <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-sand transition-colors text-charcoal font-sans text-xs font-bold cursor-pointer">
            2
          </button>
          <span className="text-mud/40 text-xs">…</span>
          <button className="inline-flex items-center text-xs tracking-[0.15em] font-bold uppercase text-charcoal hover:text-terracotta transition-colors cursor-pointer pl-2">
            <span>NEXT</span>
            <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* CTA Editorial Section */}
        <section className="mt-28 py-16 bg-sand-light border border-sand-dark/25 relative overflow-hidden rounded-2xl">
          {/* Polaroid Left Accent */}
          <div className="hidden lg:block absolute left-[-6%] top-1/2 -translate-y-1/2 w-48 z-10">
            <div className="bg-[#fffdf8] p-2 pb-6 shadow-md rotate-[-6deg] border border-sand-dark/10">
              <img
                src="/madurai-hero.jpg"
                alt="Madurai temple wedding story"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
          </div>

          <div className="max-w-xl mx-auto text-center space-y-6 px-4 relative z-20">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal leading-tight">
              Your story could be<br />our next favourite.
            </h2>
            <p className="text-sm text-mud/70 font-sans tracking-wide">
              We'd love to hear your story. Let's document your heritage wedding together.
            </p>
            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-terracotta hover:bg-terracotta-dark text-white font-sans text-xs tracking-[0.2em] font-medium transition-colors duration-300 rounded-none shadow-md hover:shadow-lg uppercase"
              >
                <span>BOOK YOUR DATE →</span>
              </Link>
            </div>
          </div>

          {/* Polaroid Right Accent */}
          <div className="hidden lg:block absolute right-[-6%] top-1/2 -translate-y-1/2 w-48 z-10">
            <div className="bg-[#fffdf8] p-2 pb-6 shadow-md rotate-[5deg] border border-sand-dark/10">
              <img
                src="/chettinad-hero.png"
                alt="Chettinad mansion pre-wedding"
                className="w-full aspect-[3/4] object-cover"
              />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
