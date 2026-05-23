import CustomCursor from "@/components/CustomCursor";
import Navigation from "@/components/Navigation";
import Hero from "@/components/sections/Hero";
import FeaturedWork from "@/components/sections/FeaturedWork";
import Showreel from "@/components/sections/Showreel";
import CategoryGrid from "@/components/sections/CategoryGrid";
import Testimonial from "@/components/sections/Testimonial";
import About from "@/components/sections/About";
import Inquire from "@/components/sections/Inquire";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navigation />
      <main>
        <Hero />
        <FeaturedWork />
        <Showreel />
        <CategoryGrid />
        <Testimonial />
        <About />
        <Inquire />
      </main>
      <Footer />
    </>
  );
}
