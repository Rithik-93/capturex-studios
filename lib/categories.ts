export type MediaItem = {
  type: "image" | "video";
  src: string;
  alt?: string;
  ratio?: "landscape" | "portrait" | "square";
  caption?: string;
};

export type Category = {
  slug: string;
  number: string;
  label: string;
  kicker: string;
  italicTitle: string;
  titlePrefix: string;
  intro: string;
  accent: string;
  hero: MediaItem;
  /** Lightweight still image used on the homepage grid (always an image, never a video). */
  gridPreview?: string;
  media: MediaItem[];
  meta: string;
  layout:
    | "spotlight"
    | "editorial-stack"
    | "masonry-mixed"
    | "video-cinema"
    | "product-clean";
};

/** Returns the best still image to use as a homepage grid thumbnail. */
export function getGridPreview(cat: Category): { src: string; alt: string } {
  if (cat.gridPreview) {
    return { src: cat.gridPreview, alt: cat.label };
  }
  if (cat.hero.type === "image") {
    return { src: cat.hero.src, alt: cat.hero.alt || cat.label };
  }
  // Hero is video — find first image in media
  const firstImage = cat.media.find((m) => m.type === "image");
  if (firstImage) {
    return { src: firstImage.src, alt: firstImage.alt || cat.label };
  }
  // Last resort: derive a poster from the video URL
  return { src: cat.hero.src.replace(/\.mp4$/i, ".jpg"), alt: cat.label };
}

export const CATEGORIES: Category[] = [
  {
    slug: "pre-wedding",
    number: "01",
    label: "Pre-Wedding",
    kicker: "Stories Before The Story",
    titlePrefix: "Two people,",
    italicTitle: "one beginning.",
    intro:
      "A pre-wedding shoot is the quiet rehearsal before the symphony. We chase the unspoken — the way one looks at the other when they think no one is watching, the easy laughter that arrives without a cue. Filmed and photographed in places that mean something.",
    accent: "#c9a96e",
    meta: "Pre-Wedding · Editorial · 2024–2025",
    layout: "editorial-stack",
    hero: {
      type: "image",
      src: "https://capturex2026.sgp1.cdn.digitaloceanspaces.com/pre_wedding/0P1A9828.jpg",
      ratio: "landscape",
      alt: "Pre-wedding couple in golden light",
    },
    media: [
      {
        type: "image",
        src: "https://capturex2026.sgp1.cdn.digitaloceanspaces.com/pre_wedding/0P1A9828.jpg",
        ratio: "landscape",
        alt: "Pre-wedding couple in golden light",
      },
      {
        type: "video",
        src: "https://capturex2026.sgp1.cdn.digitaloceanspaces.com/pre_wedding/Weeding%20Video%20Sample.mp4",
        ratio: "landscape",
        caption: "Film · 90s",
      },
      {
        type: "image",
        src: "https://capturex2026.sgp1.cdn.digitaloceanspaces.com/pre_wedding/DSC07558.jpg",
        ratio: "landscape",
        alt: "Pre-wedding portrait",
      },
      {
        type: "video",
        src: "https://capturex2026.sgp1.cdn.digitaloceanspaces.com/pre_wedding/wedding1.mp4",
        ratio: "landscape",
        caption: "Wedding Film",
      },
    ],
  },
  {
    slug: "sports",
    number: "02",
    label: "Sports",
    kicker: "Kinetic, Powerful, Dramatic",
    titlePrefix: "Bodies in",
    italicTitle: "motion.",
    intro:
      "Sport is a language without translation — the held breath before the throw, the suspended weightlessness mid-air, the ground that meets the runner first. We film athletes and arenas with the same reverence other studios reserve for couture.",
    accent: "#d96b3a",
    meta: "Sports · Film · 2024–2025",
    layout: "video-cinema",
    hero: {
      type: "image",
      src: "https://capturex2026.sgp1.cdn.digitaloceanspaces.com/sports/hero_for_category_section.jpeg",
      ratio: "landscape",
      alt: "Sports — kinetic moment",
    },
    media: [
      {
        type: "video",
        src: "https://capturex2026.sgp1.cdn.digitaloceanspaces.com/sports/BJK%20PROMO.mp4",
        ratio: "landscape",
        caption: "BJK · Promotional Film",
      },
      {
        type: "video",
        src: "https://capturex2026.sgp1.cdn.digitaloceanspaces.com/sports/Chittapur%20Sports%20Stadium%204K_1.mp4",
        ratio: "landscape",
        caption: "Chittapur Sports Stadium · 4K",
      },
    ],
  },
  {
    slug: "food",
    number: "03",
    label: "Food",
    kicker: "Warm · Sensory · Textural",
    titlePrefix: "What hunger",
    italicTitle: "looks like.",
    intro:
      "Food photography is light, patience, and one decisive moment of steam. We work close — close enough to see the salt on the crust, the slow drift of oil on the surface. Shot for restaurants and brands who care about more than the plate.",
    accent: "#b8753a",
    meta: "Food · Editorial & Brand · 2024–2025",
    layout: "masonry-mixed",
    hero: {
      type: "image",
      src: "https://capturex2026.sgp1.cdn.digitaloceanspaces.com/food/7Z4A0919.JPG",
      ratio: "landscape",
      alt: "Plated dish under directional light",
    },
    media: [
      {
        type: "image",
        src: "https://capturex2026.sgp1.cdn.digitaloceanspaces.com/food/7Z4A0819.JPG",
        ratio: "landscape",
        alt: "Plated course",
      },
      {
        type: "image",
        src: "https://capturex2026.sgp1.cdn.digitaloceanspaces.com/food/7Z4A0919.JPG",
        ratio: "landscape",
        alt: "Detail of plated course",
      },
      {
        type: "image",
        src: "https://capturex2026.sgp1.cdn.digitaloceanspaces.com/food/1714471167185.jpg",
        ratio: "portrait",
        alt: "Restaurant dish",
      },
      {
        type: "image",
        src: "https://capturex2026.sgp1.cdn.digitaloceanspaces.com/food/1714471167244.jpg",
        ratio: "portrait",
        alt: "Restaurant dish detail",
      },
      {
        type: "image",
        src: "https://capturex2026.sgp1.cdn.digitaloceanspaces.com/food/1714471167249.jpg",
        ratio: "portrait",
        alt: "Restaurant dish overhead",
      },
      {
        type: "image",
        src: "https://capturex2026.sgp1.cdn.digitaloceanspaces.com/food/_storage_emulated_0_Android_data_com.miui.gallery_cache_SecurityShare_1714471167175.jpg",
        ratio: "portrait",
        alt: "Restaurant dish styled",
      },
      {
        type: "video",
        src: "https://capturex2026.sgp1.cdn.digitaloceanspaces.com/food/video.mp4",
        ratio: "landscape",
        caption: "Behind the kitchen",
      },
    ],
  },
  {
    slug: "events",
    number: "04",
    label: "Events",
    kicker: "Birthdays, Family, Celebrations",
    titlePrefix: "Moments that",
    italicTitle: "outlive the day.",
    intro:
      "Birthdays. First-year ceremonies. Family gatherings that won't repeat. We work quietly through the room, finding the grandparent watching the grandchild, the cousins laughing at something no one else heard. The shoots that mean the most often look like the simplest.",
    accent: "#c9a96e",
    meta: "Events · Family & Celebration · 2024–2025",
    layout: "masonry-mixed",
    hero: {
      type: "image",
      src: "https://capturex2026.sgp1.cdn.digitaloceanspaces.com/events/7Z4A6326.jpg",
      ratio: "landscape",
      alt: "Family celebration moment",
    },
    media: [
      {
        type: "image",
        src: "https://capturex2026.sgp1.cdn.digitaloceanspaces.com/events/0P1A6479.jpg",
        ratio: "landscape",
        alt: "Event candid",
      },
      {
        type: "image",
        src: "https://capturex2026.sgp1.cdn.digitaloceanspaces.com/events/7Z4A6326.jpg",
        ratio: "landscape",
        alt: "Celebration moment",
      },
      {
        type: "image",
        src: "https://capturex2026.sgp1.cdn.digitaloceanspaces.com/events/0P1A6834.jpg",
        ratio: "portrait",
        alt: "Family portrait",
      },
      {
        type: "image",
        src: "https://capturex2026.sgp1.cdn.digitaloceanspaces.com/events/7Z4A0016.jpg",
        ratio: "portrait",
        alt: "Event detail",
      },
      {
        type: "image",
        src: "https://capturex2026.sgp1.cdn.digitaloceanspaces.com/events/7Z4A0194.jpg",
        ratio: "landscape",
        alt: "Event ceremony",
      },
      {
        type: "image",
        src: "https://capturex2026.sgp1.cdn.digitaloceanspaces.com/events/7Z4A0255.jpg",
        ratio: "landscape",
        alt: "Celebration candid",
      },
      {
        type: "image",
        src: "https://capturex2026.sgp1.cdn.digitaloceanspaces.com/events/7Z4A6294.jpg",
        ratio: "portrait",
        alt: "Event candid",
      },
      {
        type: "image",
        src: "https://capturex2026.sgp1.cdn.digitaloceanspaces.com/events/7Z4A7574.jpg",
        ratio: "landscape",
        alt: "Celebration finale",
      },
      {
        type: "image",
        src: "https://capturex2026.sgp1.cdn.digitaloceanspaces.com/events/Copy%20of%200P1A7580.jpg",
        ratio: "portrait",
        alt: "Family moment",
      },
      {
        type: "video",
        src: "https://capturex2026.sgp1.cdn.digitaloceanspaces.com/events/Aiden.mp4",
        ratio: "landscape",
        caption: "Aiden · Family Film",
      },
    ],
  },
  {
    slug: "product",
    number: "05",
    label: "Product",
    kicker: "Clean · Premium · Minimal",
    titlePrefix: "Objects, made",
    italicTitle: "to be wanted.",
    intro:
      "Product photography is geometry under light. Whether the brief is editorial campaign or e-commerce catalogue, the work behind a product image is the same — surface, edge, shadow, hour spent.",
    accent: "#9a8970",
    meta: "Product · Brand & E-Commerce · 2024–2025",
    layout: "product-clean",
    hero: {
      type: "video",
      src: "https://capturex2026.sgp1.cdn.digitaloceanspaces.com/products/Diary%20Pen.mp4",
      ratio: "landscape",
    },
    gridPreview:
      "https://capturex2026.sgp1.cdn.digitaloceanspaces.com/products/IMG_3121.JPG",
    media: [
      {
        type: "video",
        src: "https://capturex2026.sgp1.cdn.digitaloceanspaces.com/products/Diary%20Pen.mp4",
        ratio: "landscape",
        caption: "Diary Pen · Product Film",
      },
      {
        type: "image",
        src: "https://capturex2026.sgp1.cdn.digitaloceanspaces.com/products/IMG_3121.JPG",
        ratio: "portrait",
        alt: "Product still",
      },
      {
        type: "image",
        src: "https://capturex2026.sgp1.cdn.digitaloceanspaces.com/products/IMG_3220.JPG",
        ratio: "portrait",
        alt: "Product still",
      },
    ],
  },
  {
    slug: "corporate",
    number: "06",
    label: "Corporate & Real Estate",
    kicker: "Confident · Polished · Trustworthy",
    titlePrefix: "Spaces and",
    italicTitle: "the people in them.",
    intro:
      "Conferences. Headshots. Real estate that needs to be sold before it is seen. Corporate work is where restraint earns its keep — clean light, considered framing, no theatrics. We make brands look the way they wish they looked.",
    accent: "#7a8a9a",
    meta: "Corporate & Real Estate · Film & Stills · 2024–2025",
    layout: "editorial-stack",
    hero: {
      type: "video",
      src: "https://capturex2026.sgp1.cdn.digitaloceanspaces.com/corporate/tech_summit.mp4",
      ratio: "landscape",
    },
    gridPreview:
      "https://capturex2026.sgp1.cdn.digitaloceanspaces.com/corporate/corporate.jpg",
    media: [
      {
        type: "video",
        src: "https://capturex2026.sgp1.cdn.digitaloceanspaces.com/corporate/tech_summit.mp4",
        ratio: "landscape",
        caption: "Tech Summit · Event Film",
      },
      {
        type: "image",
        src: "https://capturex2026.sgp1.cdn.digitaloceanspaces.com/corporate/corporate.jpg",
        ratio: "landscape",
        alt: "Corporate event",
      },
      {
        type: "image",
        src: "https://capturex2026.sgp1.cdn.digitaloceanspaces.com/corporate/1.jpg",
        ratio: "landscape",
        alt: "Corporate moment",
      },
      {
        type: "video",
        src: "https://capturex2026.sgp1.cdn.digitaloceanspaces.com/corporate/Capture%20X%20%20Yercaud.mp4",
        ratio: "landscape",
        caption: "Yercaud · Brand Retreat",
      },
      {
        type: "image",
        src: "https://capturex2026.sgp1.cdn.digitaloceanspaces.com/corporate/DSC01960.jpg",
        ratio: "landscape",
        alt: "Corporate venue",
      },
      {
        type: "image",
        src: "https://capturex2026.sgp1.cdn.digitaloceanspaces.com/corporate/DSC02016.jpg",
        ratio: "landscape",
        alt: "Corporate venue",
      },
      {
        type: "image",
        src: "https://capturex2026.sgp1.cdn.digitaloceanspaces.com/corporate/DSC02054.jpg",
        ratio: "landscape",
        alt: "Real estate interior",
      },
      {
        type: "image",
        src: "https://capturex2026.sgp1.cdn.digitaloceanspaces.com/corporate/DSC02058.jpg",
        ratio: "landscape",
        alt: "Real estate interior",
      },
      {
        type: "image",
        src: "https://capturex2026.sgp1.cdn.digitaloceanspaces.com/corporate/DSC02075.jpg",
        ratio: "landscape",
        alt: "Real estate detail",
      },
      {
        type: "video",
        src: "https://capturex2026.sgp1.cdn.digitaloceanspaces.com/corporate/VIDEO-2025-07-29-22-35-21.mp4",
        ratio: "landscape",
        caption: "Corporate Film",
      },
    ],
  },
];

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getNextCategory(slug: string): Category {
  const idx = CATEGORIES.findIndex((c) => c.slug === slug);
  return CATEGORIES[(idx + 1) % CATEGORIES.length];
}
