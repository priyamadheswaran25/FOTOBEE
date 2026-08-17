import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "ABOUT", path: "/about" },
    { name: "STORIES", path: "/stories" },
    { name: "PORTFOLIO", path: "/portfolio" },
    { name: "SERVICES", path: "/services" },
    { name: "PACKAGES", path: "/packages" },
    { name: "TESTIMONIALS", path: "/testimonials" },
    { name: "CONTACT", path: "/contact" },
  ];

  const navbarThemeClass = isScrolled
    ? "bg-charcoal/95 backdrop-blur-md shadow-lg border-b border-white/10 text-cream py-4"
    : "bg-charcoal text-cream py-5 border-b border-white/10";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${navbarThemeClass}`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo matching sample screenshot */}
          <Link to="/" className="group flex items-center space-x-3 focus:outline-none">
            <img
              src="/logo.png"
              alt="Footbee Photography Logo"
              className="h-10 w-10 md:h-11 md:w-11 rounded-full object-cover border border-amber-500/40 group-hover:scale-105 transition-transform duration-300"
            />
            <div className="flex flex-col">
              <span className="font-serif text-base md:text-lg tracking-[0.2em] leading-none font-bold uppercase text-amber-500">
                FOOTBEE <span className="text-amber-400">STUDIO</span>
              </span>
              <span className="text-[7.5px] tracking-[0.25em] leading-none uppercase mt-1 text-cream/70">
                PHOTOGRAPHY
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links matching sample screenshot */}
          <nav className="hidden lg:flex items-center space-x-8 font-sans text-xs tracking-[0.2em] font-medium">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `line-grow relative py-1.5 transition-colors duration-300 ${
                    isActive
                      ? "text-amber-400 font-semibold"
                      : "text-cream/80 hover:text-amber-400"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Side CTA matching sample screenshot */}
          <div className="hidden lg:block">
            <Link
              to="/contact"
              className="flex items-center space-x-2 px-4 py-2 rounded border border-amber-500/60 bg-transparent text-amber-400 hover:bg-amber-500 hover:text-charcoal text-[11px] tracking-[0.15em] font-semibold transition-all duration-300 group focus:outline-none"
            >
              <span>BOOK YOUR DATE</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-cream hover:text-amber-400 focus:outline-none"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "tween", duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-charcoal text-cream z-40 flex flex-col justify-between p-8 pt-28 pointer-events-auto"
          >
            <div className="flex flex-col space-y-6 text-center mt-8 z-10">
              {navLinks.map((link, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={link.name}
                >
                  <NavLink
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `font-serif text-3xl md:text-4xl tracking-widest block transition-colors duration-300 ${
                        isActive ? "text-amber-400 font-bold" : "text-cream/80 hover:text-white"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col space-y-6 items-center text-center pb-8 z-10"
            >
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center space-x-3 border border-amber-500 bg-amber-500 text-charcoal px-8 py-3.5 text-xs tracking-[0.2em] font-semibold transition-all duration-300 group"
              >
                <span>BOOK YOUR DATE</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
