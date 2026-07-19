import Header from "../components/layout/Header";
import Hero from "../components/home/Hero";
import Statistics from "../components/home/Statistics";
import PrincipalWelcome from "../components/home/PrincipalWelcome";
import Features from "../components/home/Features";
import LatestNews from "../components/home/LatestNews";
import Gallery from "../components/home/Gallery";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Statistics />
      <PrincipalWelcome />
      <Features />
      <LatestNews />
      <Gallery />
      <Footer />
    </>
  );
}