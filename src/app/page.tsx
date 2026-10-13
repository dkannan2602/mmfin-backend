import Navbar from "@/components/Navbar/Navbar";
import HeroSection from "@/components/HeroSection/HeroSection";
import PosterCarousel from "@/components/PosterCarousel/PosterCarousel";
import AboutSection from "@/components/AboutSection/AboutSection";
import ServicesSection from "@/components/ServicesSection/ServicesSection";
import EMICalculator from "@/components/EMICalculator/EMICalculator";
import WhyChooseUs from "@/components/WhyChooseUs/WhyChooseUs";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
import ContactSection from "@/components/ContactSection/ContactSection";
import Footer from "@/components/Footer/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget/WhatsAppWidget";

export default function Home() {
  return (
    <>
      <Navbar />
      {/* pt-24 accounts for fixed navbar + top info bar height */}
      <main className="pt-24">
        <HeroSection />
        <PosterCarousel />
        <AboutSection />
        <ServicesSection />
        <EMICalculator />
        <WhyChooseUs />
        <HowItWorks />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppWidget />
    </>
  );
}
