import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "../components/Common/SectionHeading";

export const About: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);

  const collageImages = [
    {
      src: "/collage-prayer.jpg",
      alt: "Traditional wedding prayer ritual"
    },
    {
      src: "/hands-holding.png",
      alt: "Traditional Tamil wedding hand-holding"
    },
    {
      src: "/collage-kolam.jpg",
      alt: "Traditional wedding kolam ritual"
    },
    {
      src: "/collage-bridesmaids.jpg",
      alt: "Couple and bridesmaids laughing"
    }
  ];

  const handleImageClick = (idx: number) => {
    setLightboxIndex(idx);
  };

  const handleCloseLightbox = () => setLightboxIndex(null);

  const handlePrevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + collageImages.length) % collageImages.length);
    }
  };

  const handleNextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % collageImages.length);
    }
  };
  const team = [
    {
      name: "Ananth Krishnan",
      role: "Lead Storyteller & Founder",
      bio: "Ananth spent his childhood in rural Thanjavur, fascinated by his grandfather's vintage collection of postcard photographs. He believes a wedding is an ancestral story that deserves cinematic framing.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600"
    },
    {
      name: "Kavin Balaji",
      role: "Cinematic Film Director",
      bio: "With a background in independent Tamil cinema, Kavin views weddings as motion canvases. He works with natural lighting and traditional musical overlays to build immersive wedding movies.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600"
    }
  ];

  return (
    <div className="w-full pt-28 pb-20 bg-cream relative paper-texture">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Editorial Heading */}
        <SectionHeading
          title="From Our Village, To Your Story."
          subtitle="Our Roots & Creative Vision"
        />

        {/* Brand Story Layout Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div>
              <span className="font-serif text-xs text-terracotta tracking-[0.2em] font-bold block mb-2 uppercase">
                Our Beginning
              </span>
              <h3 className="font-serif text-2xl text-charcoal tracking-wide mb-3">
                Born in the soil of heritage.
              </h3>
              <p className="text-sm font-sans text-mud/85 leading-relaxed">
                Footbee Photography began under the shade of an old village grove in Pollachi. We noticed how wedding photography was becoming heavily computerized, neon, and detached from authentic emotions. We chose to return to the roots—framing the natural warmth, traditional attire, and the deep emotional connections of Tamil village celebrations.
              </p>
            </div>

            <div>
              <span className="font-serif text-xs text-terracotta tracking-[0.2em] font-bold block mb-2 uppercase">
                Our Journey
              </span>
              <h3 className="font-serif text-2xl text-charcoal tracking-wide mb-3">
                Ten years of family archives.
              </h3>
              <p className="text-sm font-sans text-mud/85 leading-relaxed">
                Over the past decade, we have traveled down dusty red roads and busy temple corridors across Tamil Nadu. We have documented over a hundred wedding stories, each one capturing the individual character of the land, the ceremonies, and the families who welcomed us as their own.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-10"
          >
            <div>
              <span className="font-serif text-xs text-terracotta tracking-[0.2em] font-bold block mb-2 uppercase">
                Our Philosophy
              </span>
              <h3 className="font-serif text-2xl text-charcoal tracking-wide mb-3">
                Honesty over choreography.
              </h3>
              <p className="text-sm font-sans text-mud/85 leading-relaxed">
                We do not ask couples to smile for hours or pose in unnatural angles. We stand back. We watch. We capture the laughter before the ritual begins, the nervous silence in the dressing room, the hands that raised you, and the moments you never knew were worth remembering.
              </p>
            </div>

            <div>
              <span className="font-serif text-xs text-terracotta tracking-[0.2em] font-bold block mb-2 uppercase">
                Our Vision
              </span>
              <h3 className="font-serif text-2xl text-charcoal tracking-wide mb-3">
                Preserving generational artifacts.
              </h3>
              <p className="text-sm font-sans text-mud/85 leading-relaxed">
                Our photographs are designed to look as beautiful fifty years from now as they do today. By combining high-definition modern equipment with film textures, warm skin tones, and rich editorial shadows, we craft family treasures that connect generations.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Large Highlight Quote Section */}
        <section className="my-28 max-w-5xl mx-auto border-y border-sand-dark/30 py-16 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <span className="text-[11px] uppercase text-mud/50 font-bold mb-4 block" style={{ letterSpacing: '3.5px' }}>
              OUR CORE STATEMENT
            </span>
            <p className="font-tamil font-normal text-[26px] sm:text-[32px] md:text-[38px] text-charcoal leading-[1.45] tracking-normal max-w-[540px]">
              “மணமக்களின் புன்னகை முதல்,<br />
              உறவுகளின் அன்பு வரை…<br />
              ஒவ்வொரு தருணமும் ஒரு கதை.”
            </p>
            <span className="font-handwritten text-[17px] text-terracotta mt-4 block">
              — Footbee Storytellers
            </span>
          </div>

          <div className="lg:col-span-5 relative py-8 flex items-center justify-center">
            {/* Asymmetrical Editorial Collage Container */}
            <div className="relative w-full max-w-[320px] sm:max-w-[400px] md:max-w-[440px] aspect-square mx-auto">
              
              {/* Small Photo 1: Top-Left (Traditional Prayer Ritual) */}
              <motion.div
                initial={{ opacity: 0, y: 20, rotate: -10, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, rotate: -8, scale: 0.95 }}
                whileHover={{ scale: 1.04, rotate: 0, zIndex: 40 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                onClick={() => handleImageClick(0)}
                className="absolute left-[-8%] top-[5%] w-[42%] z-10 cursor-pointer bg-[#fffdf8] p-2 pb-6 md:p-3 md:pb-8 shadow-[0_10px_30px_rgba(0,0,0,0.08)] border-none"
              >
                <img
                  src="/collage-prayer.jpg"
                  alt="Traditional wedding prayer ritual"
                  className="w-full aspect-[3/4] object-cover border border-sand/10"
                  loading="lazy"
                />
              </motion.div>

              {/* Main Photo: Center-Right (Wedding hands-holding) */}
              <motion.div
                initial={{ opacity: 0, y: 25, rotate: 2, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, rotate: 1, scale: 1 }}
                whileHover={{ scale: 1.04, rotate: 0, zIndex: 40 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                onClick={() => handleImageClick(1)}
                className="absolute left-[20%] top-[12%] w-[58%] z-20 cursor-pointer bg-[#fffdf8] p-2.5 pb-8 md:p-3.5 md:pb-12 shadow-[0_12px_40px_rgba(0,0,0,0.1)] border-none"
              >
                <img
                  src="/hands-holding.png"
                  alt="Traditional Tamil wedding hand-holding"
                  className="w-full aspect-[3/4] object-cover border border-sand/10"
                  loading="lazy"
                />
              </motion.div>

              {/* Small Photo 2: Bottom-Left (Kolam Ritual) */}
              <motion.div
                initial={{ opacity: 0, y: 30, rotate: -6, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, rotate: -4, scale: 0.95 }}
                whileHover={{ scale: 1.04, rotate: 0, zIndex: 40 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                onClick={() => handleImageClick(2)}
                className="absolute left-[-2%] bottom-[6%] w-[42%] z-30 cursor-pointer bg-[#fffdf8] p-2 pb-6 md:p-3 md:pb-8 shadow-[0_10px_30px_rgba(0,0,0,0.08)] border-none"
              >
                <img
                  src="/collage-kolam.jpg"
                  alt="Traditional wedding kolam ritual"
                  className="w-full aspect-[3/4] object-cover border border-sand/10"
                  loading="lazy"
                />
              </motion.div>

              {/* Small Photo 3: Bottom-Right (Bridesmaids laughing) */}
              <motion.div
                initial={{ opacity: 0, y: 35, rotate: 5, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, rotate: 3, scale: 0.95 }}
                whileHover={{ scale: 1.04, rotate: 0, zIndex: 40 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                onClick={() => handleImageClick(3)}
                className="absolute right-[-6%] bottom-[12%] w-[45%] z-25 cursor-pointer bg-[#fffdf8] p-2 pb-6 md:p-3 md:pb-8 shadow-[0_10px_30px_rgba(0,0,0,0.08)] border-none"
              >
                <img
                  src="/collage-bridesmaids.jpg"
                  alt="Couple and bridesmaids laughing"
                  className="w-full aspect-[3/4] object-cover border border-sand/10"
                  loading="lazy"
                />
              </motion.div>

            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mt-20">
          <div className="text-center mb-16">
            <span className="font-handwritten text-lg text-terracotta block mb-2">
              The Storytellers
            </span>
            <h3 className="font-serif text-3xl md:text-5xl text-charcoal tracking-wide">
              The Hands Behind The Lens
            </h3>
            <div className="w-12 h-[1px] bg-mud/30 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {team.map((member, i) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                key={i}
                className="bg-sand-light border border-sand-dark/25 p-6 shadow-sm flex flex-col items-center text-center vintage-border"
              >
                <div className="w-48 h-48 overflow-hidden rounded-full mb-6 border-2 border-terracotta/25 p-1 bg-cream">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full"
                    loading="lazy"
                  />
                </div>
                <h4 className="font-serif text-xl text-charcoal tracking-wide mb-1 font-semibold">
                  {member.name}
                </h4>
                <span className="text-[10px] tracking-[0.25em] text-terracotta uppercase font-bold mb-4 block">
                  {member.role}
                </span>
                <p className="text-xs text-mud/80 font-sans leading-relaxed px-4">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={handleCloseLightbox}
          >
            {/* Close button */}
            <button
              onClick={handleCloseLightbox}
              className="absolute top-6 right-6 text-white/75 hover:text-white transition-colors cursor-pointer z-50 p-2 focus:outline-none"
              aria-label="Close preview"
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
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors cursor-pointer z-50 p-2 focus:outline-none"
              aria-label="Previous image"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Main Lightbox Image Frame */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[85vh] flex flex-col items-center bg-[#fffdf8] p-3 pb-12 shadow-2xl"
            >
              <img
                src={collageImages[lightboxIndex].src}
                alt={collageImages[lightboxIndex].alt}
                className="max-w-full max-h-[70vh] object-contain border border-sand/20"
              />
              <p className="font-serif italic text-charcoal/80 text-sm mt-4 text-center">
                {collageImages[lightboxIndex].alt}
              </p>
            </motion.div>

            {/* Next button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors cursor-pointer z-50 p-2 focus:outline-none"
              aria-label="Next image"
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
