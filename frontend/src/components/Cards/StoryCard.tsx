import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Story } from "../../data/stories";

interface StoryCardProps {
  story: Story;
  index: number;
}

export const StoryCard: React.FC<StoryCardProps> = ({ story, index }) => {
  // Use index to vary the aspect ratios for a gorgeous editorial masonry vibe
  const aspectClass =
    index % 4 === 0
      ? "aspect-masonry-1"
      : index % 4 === 1
      ? "aspect-masonry-2"
      : index % 4 === 2
      ? "aspect-masonry-3"
      : "aspect-masonry-1";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden group shadow-sm border border-sand-dark/10"
    >
      <Link to={`/stories/${story.slug}`} className="block w-full h-full">
        {/* Photo Container */}
        <div className={`w-full overflow-hidden ${aspectClass} relative`}>
          <img
            src={story.heroImage}
            alt={story.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          />

          {/* Grain overlay */}
          <div className="absolute inset-0 paper-texture opacity-20 pointer-events-none" />

          {/* Postmarked / Date stamp overlay detail */}
          <div className="absolute top-4 right-4 bg-cream/80 backdrop-blur-sm text-[10px] tracking-[0.2em] font-sans border border-sand-dark/30 py-1.5 px-3 uppercase text-charcoal">
            {story.location.split(",")[0]}
          </div>

          {/* Vignette Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Metadata content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end text-cream z-20">
            <span className="text-[10px] tracking-[0.2em] uppercase text-terracotta-light font-semibold mb-2">
              {story.category}
            </span>
            <h3 className="font-serif text-2xl md:text-3xl text-white tracking-wide mb-1 leading-snug">
              {story.name}
            </h3>
            <p className="text-[11px] tracking-wider text-cream/70 italic uppercase">
              {story.subtitle}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
