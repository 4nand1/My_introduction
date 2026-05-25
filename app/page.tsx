import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Now from "./components/Now";
import Work from "./components/Work";
import Stack from "./components/Stack";
import Journey from "./components/Journey";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Memory from "./components/Memory";
import CommandPalette from "./components/CommandPalette";
import EasterEggs from "./components/EasterEggs";

export default function Home() {
  return (
    <main>
      <CommandPalette />
      <EasterEggs />
      <Navbar />
      <Memory />
      <Hero />
      <Now />
      <Work />
      <Stack />
      <Journey />
      <Contact />
      <Footer />
    </main>
  );
}
