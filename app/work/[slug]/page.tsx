import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CustomCursor from "@/components/CustomCursor";
import CategoryTopBar from "@/components/category/CategoryTopBar";
import CategoryHero from "@/components/category/CategoryHero";
import CategoryIntro from "@/components/category/CategoryIntro";
import CategoryNext from "@/components/category/CategoryNext";
import EditorialStack from "@/components/category/layouts/EditorialStack";
import MasonryMixed from "@/components/category/layouts/MasonryMixed";
import VideoCinema from "@/components/category/layouts/VideoCinema";
import ProductClean from "@/components/category/layouts/ProductClean";
import { CATEGORIES, getCategory, getNextCategory } from "@/lib/categories";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) return { title: "Practice — CaptureX" };
  return {
    title: `${cat.label} — CaptureX`,
    description: cat.intro,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const next = getNextCategory(slug);

  // Skip the first media item if it's already used as hero
  const galleryMedia = category.media.filter(
    (m) =>
      !(m.src === category.hero.src && m.type === category.hero.type)
  );

  // Fall back: if filter removed everything, show all media
  const displayMedia = galleryMedia.length > 0 ? galleryMedia : category.media;

  const renderLayout = () => {
    switch (category.layout) {
      case "video-cinema":
        return <VideoCinema media={displayMedia} />;
      case "product-clean":
        return <ProductClean media={displayMedia} />;
      case "masonry-mixed":
        return <MasonryMixed media={displayMedia} />;
      case "editorial-stack":
      default:
        return <EditorialStack media={displayMedia} />;
    }
  };

  return (
    <>
      <CustomCursor />
      <CategoryTopBar />
      <main className="bg-void">
        <CategoryHero category={category} />
        <CategoryIntro category={category} />
        {renderLayout()}

        {/* Credits / Inquire band */}
        <section className="bg-void border-t border-white/[0.04] py-24">
          <div className="max-w-360 mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <p
                className="text-gold text-[10px] tracking-[0.3em] uppercase mb-3"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Practice Closes
              </p>
              <div className="w-10 h-px bg-gold/40" />
            </div>
            <div className="md:col-span-8">
              <h3
                className="text-ivory font-light leading-tight mb-6"
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
                }}
              >
                Working on something in{" "}
                <em className="italic">{category.label.toLowerCase()}?</em>
              </h3>
              <p
                className="text-ivory/70 mb-10 max-w-xl"
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "14px",
                  lineHeight: "1.85",
                }}
              >
                We take on a limited number of projects each season. Tell us
                about your vision — we respond within 48 hours.
              </p>
              <a href="/#inquire" className="cta-primary">
                <span>Begin an Inquiry</span>
                <span className="text-gold" style={{ fontSize: "18px" }}>
                  →
                </span>
              </a>
            </div>
          </div>
        </section>

        <CategoryNext next={next} />
      </main>
    </>
  );
}
