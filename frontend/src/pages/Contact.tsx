import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Phone, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "../data/siteConfig";
import { SectionHeading } from "../components/Common/SectionHeading";
import { useToast } from "../context/ToastContext";

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  eventType: string;
  eventDate: string;
  location: string;
  requiredService: string;
  budgetRange: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  eventType?: string;
  eventDate?: string;
  location?: string;
  requiredService?: string;
  budgetRange?: string;
}

export const Contact: React.FC = () => {
  const routerLocation = useLocation();
  
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    eventType: "Wedding",
    eventDate: "",
    location: "",
    requiredService: "",
    budgetRange: "Premium (Custom Quote)",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  // Read state passed from package redirects or stories
  useEffect(() => {
    const state = routerLocation.state as {
      packageId?: string;
      packageName?: string;
      fromStory?: string;
    };

    if (state) {
      if (state.packageName) {
        setFormData((prev) => ({
          ...prev,
          requiredService: state.packageName || "",
          message: `Hi, I am interested in custom pricing/quote for the package: ${state.packageName}.`,
        }));
      } else if (state.fromStory) {
        setFormData((prev) => ({
          ...prev,
          message: `Hi, I was inspired by the story of ${state.fromStory} and would love to discuss a similar photography project.`,
        }));
      }
    }
  }, [routerLocation]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear errors as user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9\s+\-()]{10,15}$/;

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone.replace(/\s+/g, ""))) {
      newErrors.phone = "Please enter a valid phone number (10-12 digits)";
    }

    if (!formData.eventDate) {
      newErrors.eventDate = "Event date is required";
    } else {
      const selectedDate = new Date(formData.eventDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.eventDate = "Event date cannot be in the past";
      }
    }

    if (!formData.location.trim()) newErrors.location = "Event location is required";
    if (!formData.eventType) newErrors.eventType = "Event type is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
      toast.success("Inquiry sent successfully! We will contact you soon.");
    } else {
      toast.error("Please fill in all required fields correctly.");
    }
  };

  // Pre-filled WhatsApp link
  const encodedMsg = encodeURIComponent(
    `Hi Footbee Photography, my name is ${formData.fullName || "there"}. I would like to check availability for ${formData.eventType} on ${formData.eventDate || "my event date"} at ${formData.location || "my location"}.`
  );
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp.number}?text=${encodedMsg}`;

  return (
    <div className="w-full pt-28 pb-20 bg-cream relative paper-texture">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <SectionHeading
          title="Let's Begin Your Story."
          subtitle="Envelope Inquiry Form"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8 items-start">
          {/* Form Card */}
          <div className="lg:col-span-8 bg-sand-light border border-sand-dark/45 p-6 md:p-8 shadow-md vintage-border relative">
            <div className="absolute inset-0 paper-texture opacity-30 pointer-events-none" />

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6 relative z-10"
                >
                  {/* Full Name */}
                  <div className="flex flex-col text-left">
                    <label className="text-[10px] tracking-[0.2em] font-semibold text-mud mb-1 uppercase font-sans">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`bg-cream border p-3 text-sm focus:outline-none focus:ring-1 focus:ring-terracotta ${
                        errors.fullName ? "border-terracotta" : "border-sand-dark/40"
                      }`}
                      placeholder="e.g., Karthik Ramasamy"
                    />
                    {errors.fullName && (
                      <span className="text-[10px] text-terracotta mt-1 tracking-wider font-semibold uppercase">
                        {errors.fullName}
                      </span>
                    )}
                  </div>

                  {/* Phone & Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col text-left">
                      <label className="text-[10px] tracking-[0.2em] font-semibold text-mud mb-1 uppercase font-sans">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`bg-cream border p-3 text-sm focus:outline-none focus:ring-1 focus:ring-terracotta ${
                          errors.phone ? "border-terracotta" : "border-sand-dark/40"
                        }`}
                        placeholder="e.g., +91 98765 43210"
                      />
                      {errors.phone && (
                        <span className="text-[10px] text-terracotta mt-1 tracking-wider font-semibold uppercase">
                          {errors.phone}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col text-left">
                      <label className="text-[10px] tracking-[0.2em] font-semibold text-mud mb-1 uppercase font-sans">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`bg-cream border p-3 text-sm focus:outline-none focus:ring-1 focus:ring-terracotta ${
                          errors.email ? "border-terracotta" : "border-sand-dark/40"
                        }`}
                        placeholder="e.g., karthik@example.com"
                      />
                      {errors.email && (
                        <span className="text-[10px] text-terracotta mt-1 tracking-wider font-semibold uppercase">
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Event Type & Date */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col text-left">
                      <label className="text-[10px] tracking-[0.2em] font-semibold text-mud mb-1 uppercase font-sans">
                        Event Type *
                      </label>
                      <select
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                        className="bg-cream border border-sand-dark/40 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-terracotta"
                      >
                        <option value="Wedding">Wedding Ceremony</option>
                        <option value="Pre-Wedding">Pre-Wedding Shoot</option>
                        <option value="Engagement">Engagement Functions</option>
                        <option value="Portrait">Fine Art Portrait</option>
                        <option value="Event">Other Festive Function</option>
                      </select>
                    </div>

                    <div className="flex flex-col text-left">
                      <label className="text-[10px] tracking-[0.2em] font-semibold text-mud mb-1 uppercase font-sans">
                        Event Date *
                      </label>
                      <input
                        type="date"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleChange}
                        className={`bg-cream border p-3 text-sm focus:outline-none focus:ring-1 focus:ring-terracotta ${
                          errors.eventDate ? "border-terracotta" : "border-sand-dark/40"
                        }`}
                      />
                      {errors.eventDate && (
                        <span className="text-[10px] text-terracotta mt-1 tracking-wider font-semibold uppercase">
                          {errors.eventDate}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Location & Package Required */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col text-left">
                      <label className="text-[10px] tracking-[0.2em] font-semibold text-mud mb-1 uppercase font-sans">
                        Wedding / Event Location *
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className={`bg-cream border p-3 text-sm focus:outline-none focus:ring-1 focus:ring-terracotta ${
                          errors.location ? "border-terracotta" : "border-sand-dark/40"
                        }`}
                        placeholder="e.g., Pollachi, Tamil Nadu"
                      />
                      {errors.location && (
                        <span className="text-[10px] text-terracotta mt-1 tracking-wider font-semibold uppercase">
                          {errors.location}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col text-left">
                      <label className="text-[10px] tracking-[0.2em] font-semibold text-mud mb-1 uppercase font-sans">
                        Baseline Package
                      </label>
                      <select
                        name="requiredService"
                        value={formData.requiredService}
                        onChange={handleChange}
                        className="bg-cream border border-sand-dark/40 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-terracotta"
                      >
                        <option value="">-- Select Package (Optional) --</option>
                        <option value="THE ROOTS">THE ROOTS (Essential)</option>
                        <option value="THE HARVEST">THE HARVEST (Complete)</option>
                        <option value="THE SUNSET">THE SUNSET (Cinematic)</option>
                        <option value="THE LEGACY">THE LEGACY (Luxury)</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col text-left">
                    <label className="text-[10px] tracking-[0.2em] font-semibold text-mud mb-1 uppercase font-sans">
                      Share Your Story & Vision
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="bg-cream border border-sand-dark/40 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-terracotta resize-none"
                      placeholder="Tell us about your wedding style, family, location setting..."
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 bg-terracotta text-cream hover:bg-maroon transition-all duration-300 font-semibold tracking-[0.2em] text-xs flex items-center justify-center space-x-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>SEND ENQUIRY</span>
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success-screen"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-6 relative z-10 flex flex-col items-center justify-center"
                >
                  <CheckCircle2 className="w-16 h-16 text-olive" />
                  <h3 className="font-serif text-3xl text-charcoal">
                    Enquiry Postmarked!
                  </h3>
                  <div className="max-w-md bg-cream p-6 border border-dashed border-sand-dark/60 rounded-sm shadow-inner relative overflow-hidden">
                    {/* Simulated postmark stamp */}
                    <div className="absolute top-2 right-2 border border-terracotta text-terracotta text-[9px] tracking-widest font-semibold p-1 rotate-12 uppercase">
                      POLLACHI P.O.
                    </div>
                    
                    <p className="text-xs text-mud/85 font-sans leading-relaxed text-left space-y-2">
                      <strong>To:</strong> Footbee Photography<br />
                      <strong>From:</strong> {formData.fullName}<br />
                      <strong>Date Mark:</strong> {new Date().toLocaleDateString()}<br />
                      <span className="block border-t border-sand-dark/20 mt-3 pt-3">
                        Thank you for sharing your story notes with us. We will review our calendar dates and write back to you within 24 hours.
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs tracking-widest font-bold text-terracotta hover:underline mt-4"
                  >
                    SEND ANOTHER ENQUIRY
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Contact Info */}
          <div className="lg:col-span-4 space-y-8 flex flex-col">
            <div className="bg-sand-light border border-sand-dark/30 p-6 shadow-sm text-left relative vintage-border">
              <div className="absolute inset-0 paper-texture opacity-30 pointer-events-none" />
              <h4 className="font-serif text-lg text-charcoal mb-4 border-b border-sand-dark/20 pb-2">
                Studio Channels
              </h4>
              <p className="text-xs text-mud/80 font-sans leading-relaxed mb-6">
                Prefer immediate correspondence? Call us directly or launch an instant chat with our booking desk.
              </p>

              <div className="space-y-4">
                <a
                  href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}
                  className="w-full py-3.5 border border-charcoal/20 text-charcoal bg-transparent hover:bg-charcoal hover:text-cream transition-colors duration-300 flex items-center justify-center space-x-2 text-xs tracking-[0.15em] font-semibold"
                >
                  <Phone className="w-4 h-4" />
                  <span>CALL DIRECTLY</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 bg-terracotta text-cream hover:bg-maroon transition-colors duration-300 flex items-center justify-center space-x-2 text-xs tracking-[0.15em] font-semibold"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>CHAT ON WHATSAPP</span>
                </a>
              </div>
            </div>

            {/* Quote details */}
            <div className="bg-cream-dark p-6 border border-sand-dark/25 shadow-sm text-left">
              <span className="font-handwritten text-lg text-terracotta">Notice</span>
              <p className="text-[11px] font-sans text-mud/75 italic leading-relaxed mt-2">
                “Dates during the auspicious wedding seasons fill up quickly. We recommend submitting enquiry details 4–6 months in advance.”
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

