import Hero from "../components/Hero";
import Features from "../components/Features";
import Destinations from "../components/TopDestinations";
import HowItWorks from "../components/HowItWorks";
import CallToAction from "../components/CallToAction";
import Gallery from "../components/Gallery";

const HomePage = () => {
  return (
    <div className="w-full">
      <Hero />
      <Features />
      <HowItWorks />
      <Destinations />
      <Gallery />
      <CallToAction />
    </div>
  );
};

export default HomePage;
