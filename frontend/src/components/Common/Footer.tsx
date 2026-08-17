import React from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "../../data/siteConfig";
import { Heart, MapPin } from "lucide-react";

export const Footer: React.FC = () => {

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-8 border-t border-stone-800/80 relative paper-texture overflow-hidden">
      {/* Background stamp accent */}
      <div className="absolute right-[-5%] bottom-[-5%] opacity-5 pointer-events-none select-none">
        <span className="font-serif text-[15vw] leading-none tracking-widest text-amber-500">
          F
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-16 relative z-10">
        {/* Brand Column */}
        <div className="flex flex-col space-y-4">
          <Link to="/" className="group flex items-center space-x-3 focus:outline-none">
            <img
              src="/logo.png"
              alt="Footbee Photography Logo"
              className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover border border-amber-500/30 group-hover:scale-105 transition-transform duration-300"
            />
            <div className="flex flex-col">
              <span className="font-serif text-lg md:text-xl tracking-[0.2em] text-stone-100 leading-none font-bold uppercase">
                FOOTBEE <span className="text-amber-500">STUDIO</span>
              </span>
              <span className="text-[8px] tracking-[0.3em] text-stone-400 leading-none uppercase mt-1">
                {siteConfig.logoSubtitle}
              </span>
            </div>
          </Link>
          <p className="font-serif italic text-stone-400 text-sm pt-2 max-w-xs">
            “{siteConfig.tagline}”
          </p>
          <div className="flex space-x-4 pt-4">
            <a
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full border border-stone-800 bg-stone-900 flex items-center justify-center hover:bg-amber-500 hover:border-amber-500 hover:text-stone-950 transition-colors duration-300 text-stone-300"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a
              href={siteConfig.socials.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="w-8 h-8 rounded-full border border-stone-800 bg-stone-900 flex items-center justify-center hover:bg-amber-500 hover:border-amber-500 hover:text-stone-950 transition-colors duration-300 text-stone-300"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a
              href={siteConfig.socials.youtube}
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="w-8 h-8 rounded-full border border-stone-800 bg-stone-900 flex items-center justify-center hover:bg-amber-500 hover:border-amber-500 hover:text-stone-950 transition-colors duration-300 text-stone-300"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
            </a>
            <a
              href={siteConfig.socials.googleBusiness}
              target="_blank"
              rel="noreferrer"
              aria-label="Google Maps"
              className="w-8 h-8 rounded-full border border-stone-800 bg-stone-900 flex items-center justify-center hover:bg-amber-500 hover:border-amber-500 hover:text-stone-950 transition-colors duration-300 text-stone-300"
            >
              <MapPin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Company Column */}
        <div className="flex flex-col space-y-4">
          <h4 className="font-serif text-sm tracking-[0.2em] uppercase text-amber-500 border-b border-stone-800 pb-2">
            COMPANY
          </h4>
          <ul className="space-y-2 text-xs tracking-widest font-medium text-stone-400">
            <li>
              <Link to="/about" className="hover:text-amber-400 transition-colors">
                ABOUT US
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-amber-400 transition-colors">
                OUR TEAM
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-amber-400 transition-colors">
                CAREERS
              </Link>
            </li>
          </ul>
        </div>

        {/* Services Column */}
        <div className="flex flex-col space-y-4">
          <h4 className="font-serif text-sm tracking-[0.2em] uppercase text-amber-500 border-b border-stone-800 pb-2">
            SERVICES
          </h4>
          <ul className="space-y-2 text-xs tracking-widest font-medium text-stone-400">
            <li>
              <Link to="/services" className="hover:text-amber-400 transition-colors">
                WEDDING PHOTOGRAPHY
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-amber-400 transition-colors">
                CANDID PHOTOGRAPHY
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-amber-400 transition-colors">
                VIDEOGRAPHY
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-amber-400 transition-colors">
                ALBUMS
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Column */}
        <div className="flex flex-col space-y-4">
          <h4 className="font-serif text-sm tracking-[0.2em] uppercase text-amber-500 border-b border-stone-800 pb-2">
            SUPPORT
          </h4>
          <ul className="space-y-2 text-xs tracking-widest font-medium text-stone-400">
            <li>
              <Link to="/contact" className="hover:text-amber-400 transition-colors">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-amber-400 transition-colors">
                CLIENT GUIDE
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-amber-400 transition-colors">
                PRIVACY POLICY
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-amber-400 transition-colors">
                TERMS & CONDITIONS
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info Column */}
        <div className="flex flex-col space-y-4">
          <h4 className="font-serif text-sm tracking-[0.2em] uppercase text-amber-500 border-b border-stone-800 pb-2">
            STUDIO
          </h4>
          <ul className="space-y-3 text-sm text-stone-400 font-sans">
            <li className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
              <span>{siteConfig.address}</span>
            </li>
            <li className="text-xs tracking-widest">
              <span>EMAIL: </span>
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:text-amber-400 text-stone-200 transition-colors font-medium font-sans text-sm"
              >
                {siteConfig.email}
              </a>
            </li>
            <li className="text-xs tracking-widest">
              <span>PHONE: </span>
              <a
                href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                className="hover:text-amber-400 text-stone-200 transition-colors font-medium font-sans text-sm"
              >
                {siteConfig.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 border-t border-stone-800/60 flex flex-col md:flex-row items-center justify-between text-xs text-stone-500 tracking-wider relative z-10">
        <p className="mb-4 md:mb-0">{siteConfig.footerCopyright}</p>
        <p className="flex items-center space-x-1 font-serif italic text-sm text-stone-400">
          <span>{siteConfig.footerHeartNote}</span>
          <Heart className="w-3 h-3 text-amber-500 fill-amber-500 ml-1" />
        </p>
      </div>
    </footer>
  );
};
