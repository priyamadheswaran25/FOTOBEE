import React, { useEffect, useState } from "react";
import { packages as staticPackages } from "../data/packages";
import { testimonials as staticTestimonials } from "../data/stories";
import { PackageCard } from "../components/Cards/PackageCard";
import { TestimonialCard } from "../components/Cards/TestimonialCard";
import { SectionHeading } from "../components/Common/SectionHeading";
import { api } from "../services/api";

export const Packages: React.FC = () => {
  const [displayPackages, setDisplayPackages] = useState<any[]>(staticPackages);
  const [displayTestimonials, setDisplayTestimonials] = useState<any[]>(staticTestimonials);

  useEffect(() => {
    async function loadData() {
      try {
        const [pkgRes, testRes] = await Promise.allSettled([
          api.getPackages(),
          api.getTestimonials(),
        ]);

        if (pkgRes.status === 'fulfilled' && Array.isArray(pkgRes.value) && pkgRes.value.length > 0) {
          const mappedPackages = pkgRes.value.map(p => ({
            ...p,
            name: p.name_en || p.name,
            subtitle: p.subtitle_en || p.subtitle,
            description: p.description_en || p.description,
            isPopular: p.is_popular || p.isPopular,
            features: p.features ? p.features.map((f: any) => f.feature_en || f.feature || f) : [],
          }));
          setDisplayPackages(mappedPackages);
        }
        if (testRes.status === 'fulfilled' && Array.isArray(testRes.value) && testRes.value.length > 0) {
          const mappedTestimonials = testRes.value.map(t => ({
            ...t,
            clientName: t.client_name_en || t.clientName,
            eventType: t.event_type_en || t.eventType,
            location: t.location_en || t.location,
            review: t.review_en || t.review,
            avatar: t.avatar_path || t.avatar,
          }));
          setDisplayTestimonials(mappedTestimonials);
        }
      } catch {
        // Fallback to static
      }
    }
    loadData();
  }, []);

  return (
    <div className="w-full pt-28 pb-20 bg-cream relative paper-texture">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Packages Section */}
        <section className="mb-24">
          <SectionHeading
            title="Choose Your Story."
            subtitle="Tailored Photography Collections"
          />
          <p className="text-center font-serif italic text-mud/85 max-w-xl mx-auto text-base md:text-lg mb-16 leading-relaxed">
            All collections focus on honest storytelling, natural lighting, and premium handcrafted heirloom albums. Select a baseline structure and let's configure it for your day.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayPackages.map((pkg, idx) => (
              <PackageCard key={pkg.id || idx} pkg={pkg} index={idx} />
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="border-t border-sand-dark/30 pt-20">
          <SectionHeading
            title="Words From The People In Our Frames."
            subtitle="Letters From Our Couples"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {displayTestimonials.map((test, idx) => (
              <TestimonialCard key={test.id || idx} testimonial={test} index={idx} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
