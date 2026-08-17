export interface Service {
  id: string;
  slug?: string;
  name: string;
  description: string;
  image: string;
}

export const services: Service[] = [
  {
    id: "wedding-photography",
    name: "Wedding Photography",
    description: "Honest, emotional, and timeless framing of your main wedding day, centered on rituals and relationships.",
    image: "/arun-priya-hero.png"
  },
  {
    id: "pre-wedding-photography",
    name: "Pre-Wedding Photography",
    description: "Intimate couples portraiture in scenic locations, showcasing your relationship before the big celebration.",
    image: "/chettinad-hero.png"
  },
  {
    id: "engagement-photography",
    name: "Engagement Photography",
    description: "Capturing the joy of promise, exchange of rings, and the union of two families in traditional setups.",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800"
  },
  {
    id: "candid-photography",
    name: "Candid Photography",
    description: "Unplanned, unposed moments that capture the pure essence of laughter, joy, and emotional exchanges.",
    image: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=800"
  },
  {
    id: "cinematic-films",
    name: "Cinematic Wedding Films",
    description: "Moving stories captured in full film quality, complete with customized traditional musical scores.",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800"
  },
  {
    id: "portrait-photography",
    name: "Portrait Photography",
    description: "Personal and fine-art editorial portraiture capturing the depth and character of the individual.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800"
  },
  {
    id: "fashion-photography",
    name: "Fashion Photography",
    description: "Premium editorial framing of traditional garments, silks, and jewelry in heritage surroundings.",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800"
  },
  {
    id: "product-photography",
    name: "Product Photography",
    description: "Elegant commercial shots of handmade crafts, bridal jewelry, and heritage products.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800"
  },
  {
    id: "event-photography",
    name: "Event Photography",
    description: "Comprehensive coverage of traditional functions, family gatherings, and milestone ceremonies.",
    image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=800"
  },
  {
    id: "corporate-photography",
    name: "Corporate Photography",
    description: "Clean, professional imagery for brand events, executive profiles, and business storytelling.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=800"
  },
  {
    id: "baby-maternity",
    name: "Baby & Maternity",
    description: "Warm, soft portraits celebrating new beginnings and the tender bond of motherhood and early childhood.",
    image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=800"
  },
  {
    id: "custom-photography",
    name: "Custom Photography",
    description: "Bespoke photography packages designed specifically to match your creative needs and storytelling vision.",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=800"
  }
];
