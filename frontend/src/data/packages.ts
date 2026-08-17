export interface Package {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export const packages: Package[] = [
  {
    id: "the-roots",
    name: "THE ROOTS",
    subtitle: "Essential Wedding Coverage",
    description: "Perfect for intimate functions, capturing the core rituals and emotions of your day.",
    features: [
      "1 Lead Candid Photographer",
      "1 Traditional Photographer",
      "Up to 6 Hours of Coverage",
      "250+ High-Resolution Edited Images",
      "Online Private Gallery (1 Year)",
      "Standard Hardcover Album (40 Pages)"
    ]
  },
  {
    id: "the-harvest",
    name: "THE HARVEST",
    subtitle: "Complete Wedding Storytelling",
    description: "Our signature package, detailing every chapter of your village wedding from dawn to dusk.",
    features: [
      "2 Lead Candid Photographers",
      "1 Traditional Photographer",
      "Up to 12 Hours of Coverage",
      "500+ High-Resolution Edited Images",
      "Online Private Gallery (Lifetime)",
      "Premium Leatherette Keepsake Album (60 Pages)",
      "Teaser Story Video (3-5 Minutes)",
      "Full Traditional Video Coverage"
    ],
    isPopular: true
  },
  {
    id: "the-sunset",
    name: "THE SUNSET",
    subtitle: "Premium Cinematic Experience",
    description: "Focusing heavily on rich cinematic storytelling, moving frames, and artistic portraiture.",
    features: [
      "2 Lead Candid Photographers",
      "2 Cinematic Videographers",
      "Aerial Drone Cinematic Footage",
      "Up to 12 Hours of Coverage",
      "600+ High-Resolution Edited Images",
      "4K Cinematic Wedding Film (10-15 Minutes)",
      "3 Custom Instagram Reels / Teasers",
      "Linen Hand-stitched Album (80 Pages)"
    ]
  },
  {
    id: "the-legacy",
    name: "THE LEGACY",
    subtitle: "Luxury Wedding Storytelling",
    description: "The ultimate package, preserving your family story, environment, and rituals for generations.",
    features: [
      "3 Lead Candid Photographers",
      "2 Cinematic Videographers",
      "Aerial Drone Cinematic Footage",
      "Full Pre-Wedding / Portrait Shoot",
      "Unlimited Hours of Coverage (2 Days)",
      "800+ High-Resolution Edited Images",
      "4K Extended Cinematic Film (20-30 Minutes)",
      "5 Custom Instagram Reels / Teasers",
      "2 Companion Parent Albums + 1 Deluxe Heirloom Album",
      "Handmade Wooden Keepsake Box"
    ]
  }
];
