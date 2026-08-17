import React, { useState } from "react";
import { MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig as staticConfig } from "../../data/siteConfig";
import { api } from "../../services/api";

export const WhatsAppButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [config, setConfig] = useState<any>(staticConfig);

  React.useEffect(() => {
    api.getConfig().then(res => {
      if (res) setConfig(res);
    });
  }, []);

  // Encode the message for url
  const encodedMsg = encodeURIComponent(config.whatsapp.prefilledMessage);
  const whatsappUrl = `https://wa.me/${config.whatsapp.number}?text=${encodedMsg}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center space-x-3">
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="hidden md:block bg-charcoal text-cream text-[11px] tracking-[0.15em] font-medium py-2.5 px-4 shadow-xl border border-mud/20 whitespace-nowrap uppercase font-sans"
          >
            {config.whatsapp.hoverText}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-terracotta text-cream shadow-2xl flex items-center justify-center relative hover:bg-maroon transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2 focus:ring-offset-cream border border-cream/10"
        aria-label="Contact us on WhatsApp"
      >
        {/* Subtle pulse ring around the button */}
        <span className="absolute inset-0 rounded-none border border-terracotta animate-ping opacity-40" />
        <MessageSquare className="w-6 h-6" />
      </motion.a>
    </div>
  );
};
