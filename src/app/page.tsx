import HeroSection from "@/components/landing page/HeroSection";
import PopularCategories from "@/components/landing page/PopularCategoriesSection";
import FeaturedProductsSection from "@/components/landing page/FeaturedProductsSection";
import HurryUpDeals from "@/components/landing page/HurryUpDeals";
import Testimonials from "@/components/landing page/Testimonials";
import StayUpdated from "@/components/landing page/StayUpdated";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <PopularCategories />
      <FeaturedProductsSection />
      <HurryUpDeals />
      <Testimonials />
      <StayUpdated />
    </div>
  );
}
