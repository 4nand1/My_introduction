import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Work from "./components/Work";
import Stack from "./components/Stack";
import Journey from "./components/Journey";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Memory from "./components/Memory";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Memory />
      <Hero />
      <Work />
      <Stack />
      <Journey />
      <Contact />
      <Footer />
    </main>
  );
}
