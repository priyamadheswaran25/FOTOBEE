import React from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import type { Testimonial } from "../../data/stories";

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="bg-cream-dark p-8 border border-sand-dark/40 shadow-sm relative paper-texture flex flex-col justify-between h-[360px] vintage-border overflow-hidden"
    >
      {/* Postal postmark decoration in corner */}
      <div className="absolute top-4 right-4 opacity-5 pointer-events-none select-none">
        <div className="w-16 h-16 rounded-full border-2 border-dashed border-charcoal flex items-center justify-center text-[8px] tracking-[0.1em] font-sans text-center rotate-12">
          POSTAL
          <br />
          STAMP
        </div>
      </div>

      {/* Review Text */}
      <div className="relative z-10 flex-grow">
        {/* Star Rating */}
        <div className="flex space-x-1 mb-4 text-terracotta">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-current" />
          ))}
        </div>

        <p className="font-serif italic text-charcoal/80 text-base md:text-lg leading-relaxed pt-2 line-clamp-6">
          “{testimonial.review}”
        </p>
      </div>

      {/* Client Info */}
      <div className="flex items-center space-x-4 border-t border-sand-dark/30 pt-4 relative z-10">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-10 h-10 rounded-full object-cover border border-sand-dark"
          loading="lazy"
        />
        <div className="flex flex-col text-left">
          <span className="font-serif text-sm font-semibold tracking-wide text-charcoal">
            {testimonial.name}
          </span>
          <span className="text-[10px] tracking-widest text-mud/60 uppercase">
            {testimonial.eventType}, {testimonial.location}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
