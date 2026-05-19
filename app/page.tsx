import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Work from "./components/Work";
import Stack from "./components/Stack";
import Journey from "./components/Journey";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Work />
      <Stack />
      <Journey />
      <Contact />
    </main>
  );
}
