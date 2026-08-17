import React from "react";
import { useNavigate } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Package } from "../../data/packages";

interface PackageCardProps {
  pkg: Package;
  index: number;
}

export const PackageCard: React.FC<PackageCardProps> = ({ pkg, index }) => {
  const navigate = useNavigate();

  const handleInquiry = () => {
    navigate("/contact", {
      state: {
        packageId: pkg.id,
        packageName: pkg.name,
      },
    });
  };

  const cardBorderClass = pkg.isPopular
    ? "border-2 border-terracotta bg-cream shadow-xl"
    : "border border-sand-dark/40 bg-sand-light shadow-sm";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex flex-col justify-between p-8 md:p-10 vintage-border ${cardBorderClass} overflow-hidden`}
    >
      {/* Background paper texture effect */}
      <div className="absolute inset-0 paper-texture pointer-events-none z-10" />

      {/* Popular Badge */}
      {pkg.isPopular && (
        <div className="absolute top-0 right-0 bg-terracotta text-cream text-[10px] tracking-[0.25em] font-semibold py-2 px-6 uppercase rotate-0 shadow-sm z-20">
          MOST POPULAR
        </div>
      )}

      {/* Header */}
      <div className="relative z-20 mb-8">
        <span className="text-[10px] tracking-[0.25em] text-terracotta uppercase font-bold block mb-1">
          {pkg.subtitle}
        </span>
        <h3 className="font-serif text-3xl text-charcoal tracking-wide mb-3 font-normal">
          {pkg.name}
        </h3>
        <p className="text-xs text-mud/75 font-sans leading-relaxed">
          {pkg.description}
        </p>
      </div>

      {/* Features List */}
      <div className="relative z-20 flex-grow mb-8 border-t border-sand-dark/20 pt-6">
        <ul className="space-y-4 text-xs tracking-wider text-mud/90">
          {pkg.features.map((feature, i) => (
            <li key={i} className="flex items-start space-x-3">
              <Check className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Button */}
      <div className="relative z-20 mt-auto border-t border-sand-dark/20 pt-6">
        <button
          onClick={handleInquiry}
          className={`w-full py-3.5 px-4 text-xs tracking-[0.2em] font-semibold transition-all duration-300 flex items-center justify-center space-x-2 focus:outline-none ${
            pkg.isPopular
              ? "bg-terracotta text-cream hover:bg-maroon"
              : "bg-charcoal text-cream hover:bg-terracotta"
          }`}
        >
          <span>GET A CUSTOM QUOTE</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};
