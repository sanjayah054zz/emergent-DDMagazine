import { useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronLeft, ChevronRight, MapPin } from "@/lib/lucide-react";
import { articleStories } from "@/lib/articles";
import { MagazineFooter } from "@/components/MagazineFooter";
import { MagazineHeader } from "@/components/MagazineHeader";

const findStory = (slug: string) => articleStories.find((story) => story.slug === slug) ?? articleStories[0];
const heroStories = [
  { kicker: "01 // COVER STORY", slug: "art-of-hybrid-speed", title: "THE ART OF HYBRID SPEED: Driving the New Artura.", dek: "Our definitive review of the latest performance benchmark." },
  { kicker: "02 // LONG HAUL", slug: "overlanding-for-everyone", title: "THE ROAD LESS REASONABLE: Finding the perfect escape route.", dek: "A map, a full tank, and a weekend with nowhere else to be." },
  { kicker: "03 // ELECTRIC AGE", slug: "future-of-commuting", title: "SMALL CAR, BIG CURRENT: Why compact EVs make sense now.", dek: "The city-sized commuter quietly changing the daily drive." },
  { kicker: "04 // DRIVER'S CAR", slug: "legends-of-lifestyle", title: "THE JOY OF LESS: Chasing the lightest possible grin.", dek: "The classic roadster still knows exactly what matters." },
];

export default function MagazineHome() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [trackMode, setTrackMode] = useState(true);
  const currentStory = heroStories[heroIndex];
  const currentImage = findStory(currentStory.slug).image;
  const rootStyle = { "--hero-image": `url(${currentImage})` } as CSSProperties;
  const overland = findStory("overlanding-for-everyone");
  const ev = findStory("future-of-commuting");
  const miata = findStory("legends-of-lifestyle");
  const featured = [findStory("tire-tech-2026"), findStory("kilowatts-vs-octane"), findStory("night-driving-apex-vision")];

  return (
    <div className={`daily-driver-app ${trackMode ? "track-mode" : "street-mode"}`} style={rootStyle} data-testid="magazine-home-page">
      <MagazineHeader trackMode={trackMode} onToggleMode={() => setTrackMode((mode) => !mode)} />
      <main id="top">
        <section className="hero-section" data-testid="magazine-home-hero">
          <div className="hero-image" data-testid="magazine-home-hero-image" /><div className="hero-scrim" />
          <div className="hero-content"><span className="eyebrow hero-eyebrow" data-testid="magazine-home-hero-kicker">{currentStory.kicker}</span><h1 data-testid="magazine-home-hero-title">{currentStory.title}</h1><p data-testid="magazine-home-hero-dek">{currentStory.dek}</p><Link className="orange-button" to={`/articles/${currentStory.slug}`} data-testid="magazine-home-hero-cta">READ THE FULL FEATURE <ArrowUpRight size={17} /></Link></div>
          <div className="hero-telemetry"><div className="hero-arrows"><button onClick={() => setHeroIndex((index) => (index + heroStories.length - 1) % heroStories.length)} aria-label="Previous story" data-testid="magazine-home-hero-previous"><ChevronLeft size={18} /></button><button onClick={() => setHeroIndex((index) => (index + 1) % heroStories.length)} aria-label="Next story" data-testid="magazine-home-hero-next"><ChevronRight size={18} /></button></div><div className="progress-rail"><span style={{ width: `${((heroIndex + 1) / heroStories.length) * 100}%` }} /></div><strong data-testid="magazine-home-hero-count">{heroIndex + 1}/{heroStories.length}</strong></div>
          <div className="hero-corner hero-corner-top" /><div className="hero-corner hero-corner-bottom" />
        </section>
        <section className="magazine-grid" id="magazine-grid" data-testid="magazine-home-article-grid">
          <Link className="feature-card feature-card-tall article-link-card" to="/articles/overlanding-for-everyone" style={{ backgroundImage: `url(${overland.image})` }} data-testid="magazine-home-overland-card"><div className="card-shade" /><div className="feature-card-copy"><span data-testid="magazine-home-overland-kicker">ADVENTURE // 01</span><h3 data-testid="magazine-home-overland-title">OVERLANDING FOR EVERYONE: <strong>{overland.title}</strong></h3><div className="orange-rule" /></div></Link>
          <div className="feature-middle-column"><Link className="feature-card feature-card-short article-link-card" to="/articles/future-of-commuting" style={{ backgroundImage: `url(${ev.image})` }} data-testid="magazine-home-ev-card"><div className="card-shade" /><div className="feature-card-copy"><span data-testid="magazine-home-ev-kicker">COMMUTE // 02</span><h3 data-testid="magazine-home-ev-title">FUTURE OF COMMUTING: <strong>{ev.title}</strong></h3><div className="orange-rule" /></div></Link><Link className="feature-card feature-card-short article-link-card" to="/articles/legends-of-lifestyle" style={{ backgroundImage: `url(${miata.image})` }} data-testid="magazine-home-miata-card"><div className="card-shade" /><div className="feature-card-copy"><span data-testid="magazine-home-miata-kicker">LIFESTYLE // 03</span><h3 data-testid="magazine-home-miata-title">LEGENDS OF LIFESTYLE: <strong>{miata.title}</strong></h3><div className="orange-rule" /></div></Link></div>
          <aside className="featured-mag" data-testid="magazine-home-featured"><div className="featured-heading"><span className="eyebrow" data-testid="magazine-home-featured-eyebrow">EDITOR'S PICK // 04</span><h2 data-testid="magazine-home-featured-title">FEATURED IN THE MAG</h2></div><div className="featured-list">{featured.map((story, index) => <Link className="featured-article" to={`/articles/${story.slug}`} key={story.slug} data-testid={`magazine-home-featured-${index + 1}`}><span className="featured-article-copy"><small data-testid={`magazine-home-featured-${index + 1}-category`}>{story.category}</small><strong data-testid={`magazine-home-featured-${index + 1}-title`}>{story.title}</strong></span><img src={story.image} alt="" data-testid={`magazine-home-featured-${index + 1}-image`} /></Link>)}</div><div className="featured-footer"><span data-testid="magazine-home-featured-location"><MapPin size={13} /> GLOBAL GARAGE</span><span data-testid="magazine-home-featured-issue">04 / 12</span></div></aside>
        </section>
      </main>
      <MagazineFooter />
    </div>
  );
}