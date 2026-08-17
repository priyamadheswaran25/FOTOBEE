import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { api } from "../services/api";

export const DynamicServiceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchService = async () => {
      try {
        const res = await api.getServices();
        if (Array.isArray(res)) {
          const found = res.find(s => s.slug === slug);
          if (found) {
            setService({
              ...found,
              title: found.name_en || found.name,
              description: found.description_en || found.description,
              image: found.image_path || found.image || "/collage-bridesmaids.jpg"
            });
          }
        }
      } catch (err) {
        console.error("Error fetching service details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [slug]);

  if (loading) {
    return <div className="w-full h-screen bg-cream flex items-center justify-center">Loading...</div>;
  }

  if (!service) {
    return (
      <div className="w-full h-screen bg-cream flex flex-col items-center justify-center space-y-4">
        <h1 className="font-serif text-3xl text-charcoal">Service Not Found</h1>
        <button onClick={() => navigate("/services")} className="text-terracotta underline">Return to Services</button>
      </div>
    );
  }

  return (
    <div className="w-full bg-cream relative paper-texture overflow-hidden">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-4 text-left">
        <nav className="text-xs tracking-widest uppercase font-bold text-mud/50 space-x-2">
          <Link to="/" className="hover:text-terracotta transition-colors">Home</Link>
          <span>&gt;</span>
          <Link to="/services" className="hover:text-terracotta transition-colors">Services</Link>
          <span>&gt;</span>
          <span className="text-terracotta">{service.title}</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-16 border-b border-sand-dark/15">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Text */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="text-[10px] tracking-[0.25em] font-bold uppercase text-mud/50">
              OUR SERVICES
            </span>
            <h1 className="font-serif text-[44px] sm:text-[54px] md:text-[62px] text-charcoal tracking-normal leading-[1.15] font-light">
              {service.title.split(' ')[0]}<br />
              <span className="font-serif font-normal italic text-terracotta">
                {service.title.split(' ').slice(1).join(' ')}
              </span>
            </h1>
            
            <p className="font-sans text-sm sm:text-base text-mud/85 leading-relaxed max-w-lg">
              {service.description}
            </p>

            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center space-x-3 px-8 py-3 bg-terracotta hover:bg-terracotta-dark text-white font-sans text-xs tracking-[0.2em] font-medium transition-colors duration-300 rounded-none uppercase shadow-md hover:shadow-lg"
              >
                <span>BOOK YOUR DATE →</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Large Featured Image */}
          <div className="lg:col-span-6 relative flex items-center justify-center py-6">
            <div className="absolute w-[80%] aspect-[3/4] bg-[#eae5db] rotate-[-5deg] shadow-sm pointer-events-none" />
            <motion.div
              initial={{ opacity: 0, scale: 0.97, rotate: 1 }}
              animate={{ opacity: 1, scale: 1, rotate: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-[80%] aspect-[3/4] bg-[#fffdf8] p-3 pb-12 shadow-xl border border-sand-dark/15"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-sand-dark/15">
        <div className="lg:col-span-5 text-left space-y-2">
          <span className="text-[10px] tracking-[0.25em] font-bold text-terracotta uppercase">
            WHY CHOOSE US
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal leading-tight">
            Professional &<br />Beautiful Memories.
          </h2>
        </div>
        <div className="lg:col-span-7 text-left space-y-4">
          <p className="font-sans text-sm sm:text-base text-mud/85 leading-relaxed">
            {service.description} We are dedicated to providing the highest quality photography and videography services, ensuring every detail is perfectly captured.
          </p>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 max-w-3xl mx-auto text-center px-4 space-y-6">
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal leading-tight">
          Let’s Preserve<br />Your Beautiful Moments.
        </h2>
        <p className="text-sm text-mud/75 font-sans tracking-wide">
          Your traditions deserve to be remembered beautifully.
        </p>
        <div className="pt-4">
          <button
            onClick={() => navigate("/contact", { state: { fromService: service.title } })}
            className="inline-flex items-center space-x-3 px-10 py-4 bg-terracotta hover:bg-terracotta-dark text-white font-sans text-xs tracking-[0.2em] font-bold uppercase transition-colors duration-300 rounded-none shadow-md hover:shadow-lg cursor-pointer"
          >
            <span>BOOK YOUR DATE →</span>
          </button>
        </div>
      </section>
    </div>
  );
};
