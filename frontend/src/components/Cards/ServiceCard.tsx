import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Service } from "../../data/services";

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group bg-sand-light border border-sand-dark/30 overflow-hidden relative flex flex-col justify-between h-[450px] vintage-border"
    >
      {/* Background paper texture effect */}
      <div className="absolute inset-0 paper-texture pointer-events-none z-10" />

      {/* Image Area */}
      <div className="h-64 overflow-hidden relative">
        <img
          src={service.image}
          alt={service.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
        />
        {/* Subtle overlay shading */}
        <div className="absolute inset-0 bg-gradient-to-t from-sand-light to-transparent opacity-60" />
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col justify-between flex-grow relative z-20">
        <div>
          <h3 className="font-serif text-xl text-charcoal tracking-wide mb-2 group-hover:text-terracotta transition-colors duration-300">
            {service.name}
          </h3>
          <p className="text-xs text-mud/85 leading-relaxed font-sans line-clamp-3">
            {service.description}
          </p>
        </div>

        <div className="pt-4">
          <Link
            to={`/services/${service.slug || service.id}`}
            className="inline-flex items-center space-x-2 text-xs tracking-[0.15em] font-semibold text-charcoal group-hover:text-terracotta transition-colors duration-300"
          >
            <span>EXPLORE</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
