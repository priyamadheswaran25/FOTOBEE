export interface StorySection {
  title: string;
  description?: string;
  type: "full-width" | "side-by-side" | "landscape-text";
  images: string[];
  captions?: string[];
}

export interface Story {
  slug: string;
  name: string;
  title: string;
  subtitle: string;
  location: string;
  date: string;
  category: string;
  heroImage: string;
  quote: string;
  sections: StorySection[];
  relatedSlugs: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  eventType: string;
  location: string;
  review: string;
  rating: number;
  avatar: string;
}

export const stories: Story[] = [
  {
    slug: "arun-priya",
    name: "Arun & Priya",
    title: "ARUN × PRIYA",
    subtitle: "A Wedding Under The Banyan Tree",
    location: "Thanjavur, Tamil Nadu",
    date: "14 February 2026",
    category: "Weddings",
    heroImage: "/arun-priya-hero.png",
    quote: "Some weddings are celebrated. Some are remembered for generations.",
    relatedSlugs: ["karthik-meena", "rahul-divya"],
    sections: [
      {
        title: "THE MORNING",
        description: "The early sun rose over the red clay roofs, filtering softly through the leaves of the ancient banyan tree. Family members gathered in the courtyard, their hands weaving fresh jasmine strands (gajra), the scent of filter coffee mixing with the temple incense.",
        type: "side-by-side",
        images: [
          "/arun-priya-swing.jpg",
          "/arun-priya-garlands.jpg"
        ],
        captions: ["Fresh jasmine woven into traditional bridal braids.", "The ancestral silk saree passed down through three generations."]
      },
      {
        title: "THE RITUALS",
        description: "The sound of the Nadaswaram rose, slow and emotional, as Arun and Priya sat in the courtyard mandapam. Traditional brass oil lamps flickered, casting a warm golden glow on their faces as they exchanged their vows under the sacred banyan tree.",
        type: "full-width",
        images: ["/arun-priya-rice.jpg"],
        captions: ["Showering of grain and blessings during the core ritual."]
      },
      {
        title: "THE PEOPLE",
        description: "It wasn't just about the couple. It was the grandfather wiping a tear, the cousins sharing a quiet laugh in the back row, and the collective warmth of the entire village attending the feast.",
        type: "landscape-text",
        images: ["/arun-priya-holding.jpg"],
        captions: ["A candid burst of laughter shared among wedding guests."]
      },
      {
        title: "AFTER THE CEREMONY",
        description: "As the sun set behind the paddy fields, the couple walked along the village path. A quiet moment of realization that they had taken their first steps into a shared life under the eyes of their people.",
        type: "side-by-side",
        images: [
          "/arun-priya-hero.png",
          "/arun-priya-garlands.jpg"
        ],
        captions: ["Walking hand-in-hand along the dusty fields.", "Priya in the quiet afternoon shade, after the ceremonies had concluded."]
      }
    ]
  },
  {
    slug: "karthik-meena",
    name: "Karthik & Meena",
    title: "KARTHIK × MEENA",
    subtitle: "Laughter in the Coconut Groves",
    location: "Pollachi, Tamil Nadu",
    date: "28 January 2026",
    category: "Weddings",
    heroImage: "/pollachi-hero.jpg",
    quote: "A celebration under open skies, wrapped in the cool breeze of Pollachi's groves.",
    relatedSlugs: ["arun-priya", "sanjay-harini"],
    sections: [
      {
        title: "THE MORNING",
        description: "Pollachi's cool mountain breeze swept through the emerald-green paddy fields as Meena's family arranged fresh mango leaf thoranam. Posing by the rustic clay walls of their ancestral mud house with its hand-painted indigo window frame, they captured the true soul of the village.",
        type: "side-by-side",
        images: [
          "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?q=80&w=800",
          "https://images.unsplash.com/photo-1595853035070-59a39fe84de3?q=80&w=800"
        ],
        captions: ["The tall coconut palms surrounding the ancestral home.", "Arranging flowers for the early morning prayer."]
      },
      {
        title: "THE PROMISE",
        description: "The tying of the Mangalsutra took place right in the stone-tiled courtyard, with warm morning sunlight breaking through the open ceiling, lighting up the sacred thread.",
        type: "full-width",
        images: ["https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200"],
        captions: ["A sacred tie, witnessed by the sun and family."]
      }
    ]
  },
  {
    slug: "rahul-divya",
    name: "Rahul & Divya",
    title: "RAHUL × DIVYA",
    subtitle: "A Sacred Union in Madurai",
    location: "Madurai, Tamil Nadu",
    date: "10 January 2026",
    category: "Weddings",
    heroImage: "/madurai-hero.jpg",
    quote: "The visual grandeur of a wedding set against the thousand-pillar architecture and historical stone halls.",
    relatedSlugs: ["arun-priya", "sanjay-harini"],
    sections: [
      {
        title: "THE RITUALS",
        description: "Stepping inside the ancient stone mandapam felt like traversing back in time. The couple walked around the sacred fire, their footsteps echoing against carved stone pillars and temple steps.",
        type: "side-by-side",
        images: [
          "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800",
          "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800"
        ],
        captions: ["Tying the knot in the presence of historical pillars.", "The couple walking around the ceremonial fire."]
      }
    ]
  },
  {
    slug: "sanjay-harini",
    name: "Sanjay & Harini",
    title: "SANJAY × HARINI",
    subtitle: "Golden Hour in the Paddy Fields",
    location: "Chettinad, Tamil Nadu",
    date: "04 January 2026",
    category: "Pre-Weddings",
    heroImage: "/chettinad-hero.png",
    quote: "Capturing love amidst heritage Chettinad mansions and wild golden grasslands.",
    relatedSlugs: ["karthik-meena", "rahul-divya"],
    sections: [
      {
        title: "THE CELEBRATION",
        description: "We chased the evening sun across the lush green paddy fields. Posing beside the textured red mud walls and heritage pillars of Chettinad, the couples wore handloom silk sarees and veshtis, completing the classic rural story.",
        type: "side-by-side",
        images: [
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800",
          "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?q=80&w=800"
        ],
        captions: ["Close-up portrait capturing raw, quiet emotion.", "The expansive fields reflecting the warm sunset rays."]
      }
    ]
  }
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Arun & Priya",
    eventType: "Wedding",
    location: "Thanjavur",
    review: "Looking at these photographs felt like reliving our wedding day all over again. Footbee didn't just capture our portraits; they captured the smell of jasmine, the sound of the nadaswaram, and the tears of our parents. It is a family heirloom.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100"
  },
  {
    id: "t2",
    name: "Karthik & Meena",
    eventType: "Village Wedding",
    location: "Pollachi",
    review: "We were worried our pictures would look forced and staged, but they made us feel completely at home. The frames are so natural, warm, and true to our village roots. Every time we open the album, we walk back into that coconut grove.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=100"
  },
  {
    id: "t3",
    name: "Sanjay & Harini",
    eventType: "Pre-Wedding Shoot",
    location: "Chettinad",
    review: "The cinematic vision of the Footbee team is top-tier. They knew exactly how the light fell in the golden hour and made our story look like a beautiful classic film. It was professional, fun, and deeply memorable.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=100"
  }
];

export const galleryPhotos = [
  { id: 1, src: "/arun-priya-hero.png", category: "WEDDINGS", caption: "Arun & Priya in front of the temple towers." },
  { id: 2, src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800", category: "WEDDINGS", caption: "Holding hands in the holy rituals." },
  { id: 3, src: "/madurai-hero.jpg", category: "WEDDINGS", caption: "Rahul & Divya standing by the stone pillars of Madurai." },
  { id: 4, src: "/chettinad-hero.png", category: "PRE-WEDDINGS", caption: "Sanjay & Harini in the heritage courtyards of Chettinad." },
  { id: 5, src: "https://images.unsplash.com/photo-1595853035070-59a39fe84de3?q=80&w=800", category: "PORTRAITS", caption: "Bridal portrait filled with natural light." },
  { id: 6, src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800", category: "PORTRAITS", caption: "Groom's portrait in reflection of morning sun." },
  { id: 7, src: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=800", category: "EVENTS", caption: "Laughter of guests at the traditional feast." },
  { id: 8, src: "/pollachi-hero.jpg", category: "PRE-WEDDINGS", caption: "Karthik & Meena inside the banana and coconut groves of Pollachi." },
  { id: 9, src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800", category: "FASHION", caption: "Traditional Kanchipuram silk showcase." },
  { id: 10, src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800", category: "PRODUCTS", caption: "Handmade ceramic brass lamps." },
  { id: 11, src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=800", category: "EVENTS", caption: "Thoranam and evening lights setup." },
  { id: 12, src: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=800", category: "PRODUCTS", caption: "Classic camera resting on heritage wood table." }
];
