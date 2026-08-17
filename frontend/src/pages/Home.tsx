import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig as staticConfig } from "../data/siteConfig";
import { SectionHeading } from "../components/Common/SectionHeading";
import { StoryCard } from "../components/Cards/StoryCard";
import { ServiceCard } from "../components/Cards/ServiceCard";
import BrandIntro from "../components/UI/BrandIntro";
import { api } from "../services/api";


interface BubbleConfig {
  id: number;
  src: string;
  alt: string;
  sizeClasses: string;
  left: string;
  top: string;
  duration: number;
  delay: number;
  xMove: number;
  yMove: number;
}

const bubbles: BubbleConfig[] = [
  {
    id: 0,
    src: "/lens-1.jpg",
    alt: "Arun and Priya sitting on temple steps",
    sizeClasses: "w-[120px] h-[120px] md:w-[200px] md:h-[200px]",
    left: "15%",
    top: "25%",
    duration: 6,
    delay: 0,
    xMove: 12,
    yMove: -18,
  },
  {
    id: 1,
    src: "/lens-2.png",
    alt: "Couple walking down the steps of a pond",
    sizeClasses: "w-[90px] h-[90px] md:w-[140px] md:h-[140px]",
    left: "70%",
    top: "12%",
    duration: 8,
    delay: 1,
    xMove: -10,
    yMove: 15,
  },
  {
    id: 2,
    src: "/lens-3.jpg",
    alt: "Couple splashing water in a temple tank",
    sizeClasses: "w-[85px] h-[85px] md:w-[130px] md:h-[130px]",
    left: "8%",
    top: "62%",
    duration: 7,
    delay: 0.5,
    xMove: 15,
    yMove: -10,
  },
  {
    id: 3,
    src: "/lens-4.jpg",
    alt: "Couple looking at each other in lily pond boat",
    sizeClasses: "w-[130px] h-[130px] md:w-[220px] md:h-[220px]",
    left: "72%",
    top: "50%",
    duration: 9,
    delay: 2,
    xMove: -15,
    yMove: -12,
  },
  {
    id: 4,
    src: "/lens-5.jpg",
    alt: "Aerial view of bride in white gown in pond",
    sizeClasses: "w-[65px] h-[65px] md:w-[85px] md:h-[85px]",
    left: "40%",
    top: "8%",
    duration: 5,
    delay: 1.5,
    xMove: 8,
    yMove: 12,
  },
  {
    id: 5,
    src: "/lens-6.png",
    alt: "Couple embracing under banana leaves",
    sizeClasses: "w-[100px] h-[100px] md:w-[150px] md:h-[150px]",
    left: "32%",
    top: "58%",
    duration: 7.5,
    delay: 0.8,
    xMove: -12,
    yMove: 14,
  },
  {
    id: 6,
    src: "/lens-7.jpg",
    alt: "Couple resting on grass with jasmine strands",
    sizeClasses: "w-[70px] h-[70px] md:w-[90px] md:h-[90px]",
    left: "45%",
    top: "35%",
    duration: 6.5,
    delay: 2.2,
    xMove: 10,
    yMove: -10,
  },
  {
    id: 7,
    src: "/lens-8.png",
    alt: "Couple dancing by coconut lake",
    sizeClasses: "w-[60px] h-[60px] md:w-[80px] md:h-[80px]",
    left: "56%",
    top: "72%",
    duration: 7.2,
    delay: 1.2,
    xMove: -8,
    yMove: -12,
  },
  {
    id: 8,
    src: "/lens-9.jpg",
    alt: "Couple sitting by a traditional wooden door",
    sizeClasses: "w-[80px] h-[80px] md:w-[120px] md:h-[120px]",
    left: "4%",
    top: "5%",
    duration: 8.5,
    delay: 0.3,
    xMove: 10,
    yMove: 10,
  },
];

export const Home: React.FC = () => {
  const [displayCategories, setDisplayCategories] = useState<any[]>([]);
  const [config, setConfig] = useState<any>(staticConfig);

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleClose = () => setSelectedId(null);

  const handlePrev = () => {
    setSelectedId((prev) => {
      if (prev === null) return null;
      return (prev - 1 + bubbles.length) % bubbles.length;
    });
  };

  const handleNext = () => {
    setSelectedId((prev) => {
      if (prev === null) return null;
      return (prev + 1) % bubbles.length;
    });
  };

  const [displayServices, setDisplayServices] = useState<any[]>([]);
  const [displayStories, setDisplayStories] = useState<any[]>([]);

  useEffect(() => {
    async function loadDynamicContent() {
      try {
        const [catRes, srvRes, stRes, configRes] = await Promise.allSettled([
          api.getCategories(),
          api.getServices(),
          api.getStories(),
          api.getConfig()
        ]);
        if (srvRes.status === 'fulfilled' && Array.isArray(srvRes.value)) {
          const mappedServices = srvRes.value.map(s => ({
            ...s,
            title: s.name_en || s.title,
            description: s.description_en || s.description,
            image: s.image_path || s.image,
          }));
          setDisplayServices(mappedServices);
        }
        if (stRes.status === 'fulfilled' && Array.isArray(stRes.value)) {
          const mappedStories = stRes.value.map(s => ({
            ...s,
            name: s?.name_en || s?.name || "Story",
            subtitle: s?.subtitle_en || s?.subtitle || "",
            category: (typeof s?.portfolio === 'string' ? s.portfolio : s?.portfolio?.name_en) || "Wedding",
            heroImage: s?.hero_image_path || s?.heroImage || "",
            date: s?.event_date ? new Date(s.event_date).toLocaleDateString() : (s?.date || ""),
            location: s?.location_en || s?.location || "Unknown",
          }));
          setDisplayStories(mappedStories);
        }
        if (catRes.status === 'fulfilled' && Array.isArray(catRes.value)) {
          const mappedCategories = catRes.value.map((c: any) => ({
            ...c,
            name: c.name_en || c.name || "Portfolio",
            image: c.image_url || c.image || "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=600",
          }));
          setDisplayCategories(mappedCategories);
        }
        if (configRes.status === 'fulfilled' && configRes.value) {
          setConfig(configRes.value);
        }
      } catch (err) {
        console.error("Failed to load dynamic content", err);
      }
    }
    loadDynamicContent();
  }, []);

  useEffect(() => {
    if (selectedId === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedId]);

  return (
    <div className="w-full">
      {/* Cinematic Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-charcoal overflow-hidden select-none">
        {/* Background Video with image fallback */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-50 scale-105"
            poster="https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?q=80&w=1600"
          >
            <source
              src="/hero-bg.mp4"
              type="video/mp4"
            />
          </video>
          {/* Earthy Dark vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-charcoal/50 to-charcoal" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 text-center text-cream max-w-4xl px-4 md:px-8 mt-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-xs md:text-sm tracking-[0.4em] text-terracotta uppercase font-bold block mb-4"
          >
            {config.name.toUpperCase()}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-serif text-4xl md:text-7xl font-normal tracking-wide leading-tight mb-6"
          >
            “Every Wedding Has A Story.<br />We Frame The Moments.”
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="font-serif italic text-cream-dark/80 text-lg md:text-xl tracking-wide max-w-xl mx-auto mb-10"
          >
            “Authentic wedding stories, beautifully captured.”
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs tracking-[0.2em] font-semibold"
          >
            <Link
              to="/stories"
              className="w-full sm:w-auto px-8 py-4 bg-terracotta text-cream hover:bg-maroon transition-all duration-300 shadow-lg text-center"
            >
              EXPLORE STORIES
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-transparent text-cream border border-cream hover:bg-cream hover:text-charcoal transition-all duration-300 text-center"
            >
              BOOK YOUR DATE
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-0 right-0 text-center z-10 flex flex-col items-center justify-center text-cream/70 text-[10px] tracking-[0.3em] uppercase">
          <span className="mb-2">SCROLL TO DISCOVER</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowDown className="w-4 h-4 text-terracotta" />
          </motion.div>
        </div>
      </section>

      {/* Brand Introduction Section */}
      <BrandIntro />

      {/* Services Preview Section */}
      <section className="py-20 md:py-28 px-4 md:px-8 bg-sand-light border-y border-sand-dark/20 relative paper-texture">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Stories We Capture" subtitle="Traditional Invitation Core" />

          {/* Display first 3 services on home page */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {displayServices.slice(0, 3).map((srv) => (
              <ServiceCard key={srv.id || srv.slug} service={srv} />
            ))}
          </div>

          <div className="text-center mt-12 md:mt-16">
            <Link
              to="/services"
              className="inline-flex items-center space-x-3 px-8 py-4 bg-charcoal text-cream hover:bg-terracotta transition-colors duration-300 font-semibold tracking-[0.2em] text-xs"
            >
              <span>VIEW ALL SERVICES</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Photography Categories Horizontal Scroller */}
      <section className="py-20 bg-charcoal text-cream overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-10">
          <span className="font-handwritten text-lg text-terracotta block mb-2 text-center">Portfolio Portals</span>
          <h2 className="font-serif text-3xl md:text-5xl text-center tracking-wide font-normal">
            Postcards From The Fields
          </h2>
          <div className="w-16 h-[1px] bg-cream/20 mx-auto mt-4" />
        </div>

        {/* Horizontal scroll grid container */}
        <div className="flex overflow-x-auto py-8 px-4 md:px-8 gap-6 no-scrollbar snap-x snap-mandatory">
          {displayCategories.map((cat, i) => (
            <div
              key={i}
              className="w-72 md:w-96 h-[480px] shrink-0 group relative overflow-hidden snap-center border border-cream/10"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 opacity-70 group-hover:opacity-80"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end">
                <span className="text-[10px] tracking-[0.35em] text-terracotta font-semibold mb-2 block">
                  CATEGORY
                </span>
                <h3 className="font-serif text-2xl tracking-widest text-cream mb-4">
                  {cat.name}
                </h3>
                <Link
                  to="/portfolio"
                  className="inline-flex items-center space-x-2 text-[10px] tracking-[0.2em] font-medium text-cream/70 group-hover:text-cream transition-colors duration-300"
                >
                  <span>VIEW STORIES</span>
                  <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Stories Section */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-cream relative paper-texture">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Stories We Have Lived." subtitle="A Family Postcard Collection" />

          {/* Rhythmic Masonry Layout Grid */}
          <div className="columns-1 md:columns-2 gap-8 space-y-8">
            {displayStories.map((story, idx) => (
              <StoryCard key={story.slug} story={story} index={idx} />
            ))}
          </div>

          <div className="text-center mt-16 md:mt-24">
            <Link
              to="/stories"
              className="inline-flex items-center space-x-3 px-8 py-4 border border-charcoal hover:bg-charcoal hover:text-cream transition-all duration-300 text-xs tracking-[0.2em] font-semibold"
            >
              <span>BROWSE ALBUM STORIES</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Footbee (Editorial Feature) */}
      <section className="py-20 md:py-28 px-4 md:px-8 bg-sand-light border-t border-sand-dark/20 relative paper-texture">
        <div className="max-w-5xl mx-auto">
          <SectionHeading title="Why Couples Choose Footbee" subtitle="Honesty in Frames" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 mt-12">
            {config.whyChooseUs.map((item: any, idx: number) => (
              <div key={idx} className="flex flex-col text-left border-l-2 border-terracotta pl-6 py-2">
                <span className="font-serif text-xs text-terracotta tracking-[0.15em] font-semibold mb-2">
                  0{idx + 1}. {item.title}
                </span>
                <p className="text-xs text-mud/85 font-sans leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Feed 3x3 */}
      <section className="py-20 bg-cream relative paper-texture border-t border-sand-dark/20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <span className="font-handwritten text-lg text-terracotta block mb-2">Social Snaps</span>
            <h2 className="font-serif text-3xl md:text-5xl text-charcoal tracking-wide mb-4">
              Seen Through Our Lens.
            </h2>
            <p className="text-xs tracking-widest text-mud/60 uppercase">
              FOLLOW US <a href={config.socials.instagram} target="_blank" rel="noreferrer" className="text-terracotta font-semibold hover:underline">@FOOTBEE_PHOTOGRAPHY</a>
            </p>
            <div className="w-16 h-[1px] bg-mud/30 mx-auto mt-4" />
          </div>

          <div className="relative h-[350px] sm:h-[400px] md:h-[480px] w-full max-w-5xl mx-auto mt-8 overflow-hidden rounded-2xl animate-fade-in">
            {bubbles.map((bubble) => {
              const isSelected = selectedId === bubble.id;
              const isAnySelected = selectedId !== null;

              return (
                <React.Fragment key={bubble.id}>
                  {/* Unselected floating bubble state */}
                  {!isSelected && (
                    <motion.div
                      layoutId={`bubble-${bubble.id}`}
                      className={`absolute rounded-full flex items-center justify-center transition-all duration-500 ${
                        isAnySelected
                          ? "opacity-15 blur-[2px] scale-90 pointer-events-none"
                          : "opacity-100 hover:scale-105"
                      } ${bubble.sizeClasses}`}
                      style={{
                        left: bubble.left,
                        top: bubble.top,
                        x: "-50%",
                        y: "-50%",
                        zIndex: 10,
                      }}
                    >
                      <button
                        onClick={() => setSelectedId(bubble.id)}
                        aria-label={`View ${bubble.alt}`}
                        className="w-full h-full rounded-full p-[4px] md:p-[8px] bg-cream/5 backdrop-blur-[2px] border border-cream/40 shadow-md hover:shadow-xl cursor-pointer focus-visible:ring-2 focus-visible:ring-terracotta focus:outline-none"
                      >
                        <motion.div
                          className="w-full h-full rounded-full relative"
                          animate="float"
                          custom={bubble}
                          variants={{
                            float: {
                              x: [0, bubble.xMove, 0],
                              y: [0, bubble.yMove, 0],
                              rotate: [0, bubble.xMove * 0.15, 0],
                              transition: {
                                duration: bubble.duration,
                                delay: bubble.delay,
                                repeat: Infinity,
                                repeatType: "reverse" as const,
                                ease: "easeInOut",
                              },
                            },
                          }}
                        >
                          <img
                            src={bubble.src}
                            alt={bubble.alt}
                            className="w-full h-full rounded-full object-cover border border-mud/10 select-none pointer-events-none"
                          />
                        </motion.div>
                      </button>
                    </motion.div>
                  )}

                  {/* Centered Expanded bubble state */}
                  {isSelected && (
                    <motion.div
                      layoutId={`bubble-${bubble.id}`}
                      className="absolute left-1/2 top-[35%] w-[230px] h-[230px] sm:w-[270px] sm:h-[270px] md:w-[380px] md:h-[380px] z-50 flex items-center justify-center rounded-full bg-transparent border-none shadow-none"
                      style={{
                        x: "-50%",
                        y: "-50%",
                      }}
                    >
                      <div className="w-full h-full relative rounded-full">
                        <img
                          src={bubble.src}
                          alt={bubble.alt}
                          className="w-full h-full rounded-full object-cover select-none pointer-events-none shadow-2xl border-2 border-cream"
                        />

                        {/* Close button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleClose();
                          }}
                          aria-label="Close photograph"
                          className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center bg-cream border border-mud/20 shadow-lg hover:scale-110 active:scale-95 transition-transform duration-200 cursor-pointer z-50 text-mud hover:text-terracotta focus-visible:ring-2 focus-visible:ring-terracotta focus:outline-none"
                        >
                          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>

                        {/* Prev button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePrev();
                          }}
                          aria-label="Previous photograph"
                          className="absolute left-[-45px] md:left-[-75px] top-1/2 -translate-y-1/2 w-9 h-9 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-cream border border-mud/20 shadow-lg hover:scale-110 active:scale-95 transition-transform duration-200 cursor-pointer z-50 text-mud hover:text-terracotta focus-visible:ring-2 focus-visible:ring-terracotta focus:outline-none"
                        >
                          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>

                        {/* Next button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNext();
                          }}
                          aria-label="Next photograph"
                          className="absolute right-[-45px] md:right-[-75px] top-1/2 -translate-y-1/2 w-9 h-9 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-cream border border-mud/20 shadow-lg hover:scale-110 active:scale-95 transition-transform duration-200 cursor-pointer z-50 text-mud hover:text-terracotta focus-visible:ring-2 focus-visible:ring-terracotta focus:outline-none"
                        >
                          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
