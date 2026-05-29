import { Field } from "../components/Field";
import { DEFAULTS } from "../types";

type Hero = typeof DEFAULTS.hero;

export function HeroSection({ hero, setHero }: { hero: Hero; setHero: React.Dispatch<React.SetStateAction<Hero>> }) {
  return (
    <div className="space-y-4">
      <Field label="Name (Latin)" value={hero.name} onChange={v => setHero(h => ({ ...h, name: v }))} placeholder="Anand" />
      <Field label="Name (Cyrillic — Mongolian)" value={hero.cyrillic} onChange={v => setHero(h => ({ ...h, cyrillic: v }))} placeholder="Анан · leave empty to hide" />
      <Field label="Title" value={hero.title} onChange={v => setHero(h => ({ ...h, title: v }))} placeholder="Full-Stack Developer" />
      <Field label="Bio (your own words)" value={hero.bio} onChange={v => setHero(h => ({ ...h, bio: v }))} textarea placeholder="Empty = hidden" />
      <Field label="Tagline / quote" value={hero.tagline} onChange={v => setHero(h => ({ ...h, tagline: v }))} placeholder="Empty = hidden" />
      <Field label="Location" value={hero.location} onChange={v => setHero(h => ({ ...h, location: v }))} placeholder="Ulaanbaatar" />
      <Field label="Coordinates" value={hero.coords} onChange={v => setHero(h => ({ ...h, coords: v }))} placeholder="47.9°N · 106.9°E" />
      <div className="grid grid-cols-2 gap-4 pt-2">
        <Field label="Stat 1 value" value={hero.stat1Value} onChange={v => setHero(h => ({ ...h, stat1Value: v }))} />
        <Field label="Stat 1 label" value={hero.stat1Label} onChange={v => setHero(h => ({ ...h, stat1Label: v }))} />
        <Field label="Stat 2 value" value={hero.stat2Value} onChange={v => setHero(h => ({ ...h, stat2Value: v }))} />
        <Field label="Stat 2 label" value={hero.stat2Label} onChange={v => setHero(h => ({ ...h, stat2Label: v }))} />
      </div>
    </div>
  );
}
