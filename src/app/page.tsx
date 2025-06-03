import HeroSection from "@/components/landing page/HeroSection";
import PopularCategoriesSlider from "@/components/landing page/PopularCategoriesSlider";
import FeaturedProductsSection from "@/components/landing page/FeaturedProductsSection";
import HurryUpDeals from "@/components/landing page/HurryUpDeals";
import Testimonials from "@/components/landing page/Testimonials";
import StayUpdated from "@/components/landing page/StayUpdated";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <PopularCategoriesSlider />
      <FeaturedProductsSection />
      <HurryUpDeals />
      <Testimonials />
      <StayUpdated />
    </div>
  );
}
