import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Camera, 
  Video, 
  Heart, 
  Film, 
  Compass, 
  Sparkles, 
  MapPin, 
  Plane,
  ArrowRight
} from "lucide-react";
import { api } from "../services/api";

export const Services: React.FC = () => {
  
  const [servicesList, setServicesList] = React.useState<any[]>([]);


  React.useEffect(() => {
    async function fetchServices() {
      try {
        const res = await api.getServices();
        if (Array.isArray(res)) {
          const iconMap: Record<string, any> = {
            Camera, Video, Heart, Film, Plane, MapPin, Sparkles, Compass
          };
          
          const bgTones = [
            "bg-terracotta/10 text-terracotta",
            "bg-mud/15 text-mud",
            "bg-sand-dark/15 text-charcoal"
          ];
          
          setServicesList(res.map((s, idx) => {
            const isUrl = s.image_path?.startsWith('http') || s.image_path?.startsWith('/');
            return {
              id: s.slug || s.id,
              slug: s.slug,
              title: s.name_en || s.title || "Service",
              description: s.description_en || s.description || "",
              icon: isUrl ? s.image_path : (iconMap[s.image_path] || Camera),
              bgTone: bgTones[idx % bgTones.length],
              isImageUrl: isUrl
            };
          }));
        }
      } catch (err) {
        console.error("Failed to load services:", err);
      }
    }
    fetchServices();
  }, []);

  return (
    <div className="w-full pt-28 bg-cream relative paper-texture overflow-hidden">
      
      {/* Services Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 border-b border-sand-dark/15">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Hero Text */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="font-handwritten text-xl text-terracotta block">
              Our Services
            </span>
            <h1 className="font-serif text-[42px] sm:text-[50px] md:text-[56px] text-charcoal tracking-normal leading-[1.15] font-light">
              Every Moment<br />
              Deserves To Be<br />
              <span className="text-terracotta font-normal">Beautifully</span> Captured
            </h1>
            
            {/* Divider with small floral/star ornament */}
            <div className="flex items-center space-x-3 py-2">
              <div className="h-[1px] bg-sand-dark/30 w-16" />
              <span className="text-terracotta text-sm">◇</span>
              <div className="h-[1px] bg-sand-dark/30 w-16" />
            </div>

            <p className="font-sans text-sm sm:text-base text-mud/85 leading-relaxed max-w-lg">
              From timeless traditions to candid emotions, we offer a wide range of photography and videography services to preserve your most precious memories.
            </p>
          </div>

          {/* Right Column: Layered Editorial Polaroid Composition */}
          <div className="lg:col-span-6 relative flex items-center justify-center py-10 min-h-[360px] sm:min-h-[440px] md:min-h-[480px]">
            {/* Background layered boards */}
            <div className="absolute w-[60%] aspect-[3/4] bg-[#eae5db] rotate-[-8deg] shadow-sm pointer-events-none left-[10%] top-[10%]" />
            <div className="absolute w-[60%] aspect-[3/4] bg-[#f2ede3] rotate-[4deg] shadow-md pointer-events-none right-[8%] bottom-[8%]" />

            {/* Photo 1: Top-Left (Traditional detail / hands holding) */}
            <motion.div
              initial={{ opacity: 0, x: -30, rotate: -6 }}
              animate={{ opacity: 1, x: 0, rotate: -6 }}
              transition={{ duration: 0.8 }}
              className="absolute left-[5%] top-[5%] w-[42%] bg-[#fffdf8] p-2 pb-6 md:p-2.5 md:pb-8 shadow-lg rotate-[-6deg] border border-sand-dark/10"
            >
              <img
                src="/hands-holding.png"
                alt="Traditional gold bangles details"
                className="w-full aspect-[3/4] object-cover"
              />
            </motion.div>

            {/* Photo 2: Center (Main wedding portrait) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="absolute left-[24%] top-[12%] w-[52%] z-20 bg-[#fffdf8] p-2.5 pb-8 md:p-3.5 md:pb-12 shadow-2xl rotate-[1deg] border border-sand-dark/10"
            >
              <img
                src="/arun-priya-hero.png"
                alt="Arun & Priya wedding cover"
                className="w-full aspect-[3/4] object-cover"
              />
            </motion.div>

            {/* Photo 3: Bottom-Right (Celebration bridesmaids laughter) */}
            <motion.div
              initial={{ opacity: 0, x: 30, rotate: 5 }}
              animate={{ opacity: 1, x: 0, rotate: 5 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute right-[5%] bottom-[5%] w-[44%] z-30 bg-[#fffdf8] p-2 pb-6 md:p-2.5 md:pb-8 shadow-lg rotate-[5deg] border border-sand-dark/10"
            >
              <img
                src="/collage-bridesmaids.jpg"
                alt="Bridesmaids smiling"
                className="w-full aspect-[3/4] object-cover"
              />
            </motion.div>

            {/* Optional tape visual accent (top-center of main photo) */}
            <div className="absolute left-[45%] top-[7%] w-16 h-5 bg-white/20 border border-white/10 shadow-sm backdrop-blur-[1px] rotate-[-5deg] z-30 pointer-events-none select-none" />
          </div>

        </div>
      </section>

      {/* Services Section Title */}
      <section className="py-16 text-center max-w-4xl mx-auto px-4">
        <div className="flex justify-center mb-3">
          <Camera className="w-5 h-5 text-terracotta/60" />
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-charcoal tracking-wide font-normal">
          Photography & Videography Services
        </h2>
        
        {/* Underline divider */}
        <div className="flex justify-center items-center space-x-2 mt-4">
          <div className="w-8 h-[1px] bg-sand-dark/30" />
          <span className="text-terracotta text-xs">◇</span>
          <div className="w-8 h-[1px] bg-sand-dark/30" />
        </div>
      </section>

      {/* Service Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesList.map((service: any, idx) => {
            const IconComponent = !service.isImageUrl ? service.icon : null;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                whileHover={{ y: -6 }}
                className="group bg-transparent p-6 border border-sand-dark/15 rounded-none text-center flex flex-col items-center justify-between min-h-[320px] transition-all duration-300 hover:border-sand-dark hover:shadow-sm"
              >
                <div className="flex flex-col items-center">
                  {/* Organic circular background behind icon */}
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-105 ${service.bgTone}`}>
                    {service.isImageUrl ? (
                      <img src={service.icon as string} alt={service.title} className="w-8 h-8 object-cover rounded-full transition-transform duration-300 group-hover:scale-110" />
                    ) : (
                      IconComponent && <IconComponent className="w-7 h-7 transition-transform duration-300 group-hover:scale-110" />
                    )}
                  </div>

                  <h3 className="font-serif text-lg tracking-wide text-charcoal font-semibold mb-3">
                    {service.title}
                  </h3>
                  
                  <p className="text-xs text-mud/75 font-sans leading-relaxed px-2">
                    {service.description}
                  </p>
                </div>
                
                {/* Bottom interactive elements */}
                <div className="w-full flex flex-col items-center mt-6">
                  {/* Small decorative divider at bottom */}
                  <div className="w-8 h-[1px] bg-sand-dark/20 group-hover:w-16 transition-all duration-500" />
                  
                  <Link
                    to={`/services/${service.slug}`}
                    className="mt-3 inline-flex items-center text-[9px] tracking-[0.2em] font-bold text-mud/40 group-hover:text-terracotta uppercase transition-colors"
                  >
                    <span>EXPLORE SERVICE</span>
                    <ArrowRight className="w-3 h-3 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Booking CTA Section */}
      <section className="w-full grid grid-cols-1 lg:grid-cols-2 relative">
        {/* Left Side: Photography asset */}
        <div className="relative h-[280px] sm:h-[360px] lg:h-auto min-h-[300px] overflow-hidden select-none pointer-events-none">
          <img
            src="/welcome-hero.png"
            alt="Camera lenses and photographer focus"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-charcoal/10" />
        </div>

        {/* Right Side: Terracotta Form info block */}
        <div className="bg-terracotta text-cream px-6 py-16 sm:p-16 md:p-20 flex flex-col justify-center text-left relative overflow-hidden">
          {/* Background stamp */}
          <div className="absolute right-[-5%] bottom-[-5%] opacity-5 pointer-events-none select-none">
            <Camera className="w-48 h-48 text-cream" />
          </div>

          <div className="max-w-md space-y-6 relative z-10">
            <div className="flex items-center space-x-2">
              <Camera className="w-5 h-5 text-cream/70" />
              <span className="text-[10px] tracking-[0.25em] font-bold uppercase text-cream/70">legacy moments</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-wide leading-tight">
              Let's Capture<br />Your Beautiful Story
            </h2>

            {/* Decorative divider */}
            <div className="h-[1px] bg-white/30 w-24 my-4" />

            <p className="text-xs sm:text-sm text-cream/80 font-sans leading-relaxed">
              We would love to be a part of your special moments and turn them into memories that last forever.
            </p>

            <div className="pt-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-cream hover:bg-white text-terracotta font-sans text-xs tracking-[0.2em] font-bold uppercase transition-all duration-300 shadow-md hover:shadow-lg rounded-none"
              >
                <span>BOOK YOUR DATE →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
