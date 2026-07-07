import Header from "@/components/layout/Header";
import MobileNav from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Menu from "@/components/sections/Menu";
import Gallery from "@/components/sections/Gallery";
import Social from "@/components/sections/Social";
import Location from "@/components/sections/Location";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pb-16 lg:pb-0">
        <Hero />
        <About />
        <Menu />
        <Gallery />
        <Social />
        <Location />
        <Contact />
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}
