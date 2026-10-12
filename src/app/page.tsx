import Navbar from "@/components/Navbar/Navbar";
import HeroSection from "@/components/HeroSection/HeroSection";
import AboutSection from "@/components/AboutSection/AboutSection";
import ServicesSection from "@/components/ServicesSection/ServicesSection";
import WhyChooseUs from "@/components/WhyChooseUs/WhyChooseUs";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
import ContactSection from "@/components/ContactSection/ContactSection";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      {/* pt-16 offsets the fixed navbar height */}
      <main className="pt-16">
        <HeroSection />
        {/* <AboutSection /> */}
        <ServicesSection />
        <WhyChooseUs />
        {/* <HowItWorks /> */}
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
