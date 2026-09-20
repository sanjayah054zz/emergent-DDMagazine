import { useMemo, useState, type CSSProperties } from "react";
import { toast, Toaster } from "sonner";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Fuel,
  Gauge,
  Instagram,
  MapPin,
  MessageCircle,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  ThumbsUp,
  X,
  Youtube,
} from "@/lib/lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const logoAsset =
  "https://customer-assets-jt897jd0.emergentagent.net/job_ffb74dfa-180f-4b9a-b30c-77c68fc7c605/artifacts/zaevr1ln_THE%20DAILY%20DRIVER%20MAGAZINE%20%28no%20background%20%29.webp";

const imagery = {
  hero: "https://images.unsplash.com/photo-1787354478969-e459bfd245a0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2ODh8MHwxfHNlYXJjaHwyfHxzcG9ydHMlMjBjYXIlMjBjb2FzdGFsJTIwcm9hZHxlbnwwfHx8fDE3ODk5NDEwMjd8MA&ixlib=rb-4.1.0&q=85",
  overland:
    "https://images.unsplash.com/photo-1583355497633-e4248ca3fdb0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwzfHxvZmZyb2FkJTIwc3V2JTIwYWR2ZW50dXJlfGVufDB8fHx8MTc4OTk0MTAyN3ww&ixlib=rb-4.1.0&q=85",
  ev: "https://images.unsplash.com/photo-1617727553401-3ec4e92f32a5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwyfHx3aGl0ZSUyMGVsZWN0cmljJTIwdmVoaWNsZSUyMGNhcnxlbnwwfHx8fDE3ODk5NDEwMjd8MA&ixlib=rb-4.1.0&q=85",
  miata:
    "https://images.pexels.com/photos/9846051/pexels-photo-9846051.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  tire:
    "https://images.pexels.com/photos/28748682/pexels-photo-28748682.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  night:
    "https://images.unsplash.com/photo-1780399823334-778b0787d7aa?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwyfHxzcG9ydHMlMjBjYXIlMjBjb2FzdGFsJTIwcm9hZHxlbnwwfHx8fDE3ODk5NDEwMjd8MA&ixlib=rb-4.1.0&q=85",
};

type Vehicle = {
  id: string;
  name: string;
  type: string;
  engine: string;
  weight: string;
  price: string;
  fuelEconomy: string;
  commuteRating: string;
  acceleration: string;
  topSpeed: string;
};

const vehicles: Vehicle[] = [
  {
    id: "yamaha-tenere-700",
    name: "Yamaha Ténéré 700",
    type: "Dual-Sport Adventure",
    engine: "689cc CP2 Parallel-Twin (72.4 hp)",
    weight: "205 kg (wet)",
    price: "$10,799 USD",
    fuelEconomy: "23.8 km/L",
    commuteRating: "8.7 / 10",
    acceleration: "4.2s",
    topSpeed: "185 km/h",
  },
  {
    id: "cfmoto-450-mt",
    name: "CFMoto 450 MT",
    type: "Lightweight Mid-Adventure",
    engine: "449cc 270° Parallel-Twin (44 hp)",
    weight: "190 kg (wet)",
    price: "$6,499 USD",
    fuelEconomy: "26.5 km/L",
    commuteRating: "9.2 / 10",
    acceleration: "5.6s",
    topSpeed: "155 km/h",
  },
  {
    id: "mazda-miata-nd3",
    name: "Mazda MX-5 Miata ND3",
    type: "Lightweight Sports Roadster",
    engine: "2.0L Skyactiv-G 4-Cyl (181 hp)",
    weight: "1,061 kg",
    price: "$28,985 USD",
    fuelEconomy: "14.5 km/L",
    commuteRating: "8.1 / 10",
    acceleration: "5.7s",
    topSpeed: "219 km/h",
  },
];

const heroStories = [
  {
    kicker: "01 // COVER STORY",
    title: "THE ART OF HYBRID SPEED: Driving the New Artura.",
    subheading: "Our definitive review of the latest performance benchmark.",
    image: imagery.hero,
  },
  {
    kicker: "02 // LONG HAUL",
    title: "THE ROAD LESS REASONABLE: Finding the perfect escape route.",
    subheading: "A map, a full tank, and a weekend with nowhere else to be.",
    image: imagery.overland,
  },
  {
    kicker: "03 // ELECTRIC AGE",
    title: "SMALL CAR, BIG CURRENT: Why compact EVs make sense now.",
    subheading: "The city-sized commuter quietly changing the daily drive.",
    image: imagery.ev,
  },
  {
    kicker: "04 // DRIVER'S CAR",
    title: "THE JOY OF LESS: Chasing the lightest possible grin.",
    subheading: "The classic roadster still knows exactly what matters.",
    image: imagery.miata,
  },
  {
    kicker: "05 // NIGHT SHIFT",
    title: "AFTER DARK: The machinery of seeing the apex.",
    subheading: "Modern light, old instincts, and the road beyond midnight.",
    image: imagery.night,
  },
];

const forumSeed = [
  {
    id: 1,
    author: "ApexHunter_99",
    badge: "TRACK VETERAN",
    title: "Is dailying a manual roadster still practical in stop-and-go metro traffic?",
    preview: "Been doing 40km across Seattle for 6 months. Heavy clutch, but the Friday escape makes every red light worth it.",
    upvotes: 42,
    comments: 19,
    category: "DAILY GRIND",
    time: "22m ago",
  },
  {
    id: 2,
    author: "OverlandKev",
    badge: "TRAIL MASTER",
    title: "Budget skid plates: aluminum 4mm vs steel 3mm for weekend warriors",
    preview: "Tested both on rocky Colorado fire roads. Steel took the rock slams, but that 18kg penalty hurts mpg.",
    upvotes: 28,
    comments: 14,
    category: "TECH TALK",
    time: "1h ago",
  },
  {
    id: 3,
    author: "VoltRunner",
    badge: "EV PIONEER",
    title: "Cold weather range drop: 2026 winter observations across Scandinavia",
    preview: "Heat pump efficiency held steady down to -12C. Preconditioning while plugged in saves at least 18% usable pack.",
    upvotes: 35,
    comments: 23,
    category: "EV LAB",
    time: "3h ago",
  },
];

const featuredArticles = [
  { category: "TECH LAB", title: "Tire Tech 2026: The Rubber Compound Revolution", image: imagery.tire },
  { category: "BUYER'S GUIDE", title: "Kilowatts vs Octane: The Commuter Dilemma", image: imagery.ev },
  { category: "FEATURES", title: "Night Driving: Apex Vision & LED Laser Tech", image: imagery.night },
];

function SectionHeading({
  eyebrow,
  title,
  description,
  id,
}: {
  eyebrow: string;
  title: string;
  description: string;
  id: string;
}) {
  return (
    <div className="section-heading" data-testid={`${id}-heading-group`}>
      <div className="section-heading-copy">
        <span className="eyebrow" data-testid={`${id}-eyebrow`}>{eyebrow}</span>
        <h2 data-testid={`${id}-title`}>{title}</h2>
      </div>
      <p data-testid={`${id}-description`}>{description}</p>
    </div>
  );
}

function SpecCell({ label, value, testId }: { label: string; value: string; testId: string }) {
  return (
    <div className="spec-cell" data-testid={testId}>
      <span className="spec-label" data-testid={`${testId}-label`}>{label}</span>
      <strong data-testid={`${testId}-value`}>{value}</strong>
    </div>
  );
}

export default function Home() {
  const [trackMode, setTrackMode] = useState(true);
  const [heroIndex, setHeroIndex] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [vehicleA, setVehicleA] = useState("yamaha-tenere-700");
  const [vehicleB, setVehicleB] = useState("cfmoto-450-mt");
  const [showCompare, setShowCompare] = useState(false);
  const [dailyKm, setDailyKm] = useState("45");
  const [fuelEfficiency, setFuelEfficiency] = useState("14.5");
  const [annualTax, setAnnualTax] = useState("320");
  const [forumPosts, setForumPosts] = useState(forumSeed);
  const [liveryColor, setLiveryColor] = useState("#FF6600");
  const [maskWindshield, setMaskWindshield] = useState(false);

  const currentStory = heroStories[heroIndex];
  const selectedA = vehicles.find((vehicle) => vehicle.id === vehicleA) ?? vehicles[0];
  const selectedB = vehicles.find((vehicle) => vehicle.id === vehicleB) ?? vehicles[1];
  const monthlyCost = useMemo(() => {
    const distance = Number(dailyKm) || 0;
    const efficiency = Number(fuelEfficiency) || 1;
    const tax = Number(annualTax) || 0;
    return (distance * 30.5 / efficiency) * 1.75 + tax / 12;
  }, [annualTax, dailyKm, fuelEfficiency]);

  const moveHero = (direction: number) => {
    setHeroIndex((current) => (current + direction + heroStories.length) % heroStories.length);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const voteForPost = (id: number) => {
    setForumPosts((posts) => posts.map((post) => (
      post.id === id ? { ...post, upvotes: post.upvotes + 1 } : post
    )));
  };

  const rootStyle = { "--hero-image": `url(${currentStory.image})` } as CSSProperties;

  return (
    <div className={`daily-driver-app ${trackMode ? "track-mode" : "street-mode"}`} style={rootStyle} data-testid="daily-driver-page">
      <Toaster position="bottom-right" richColors />
      <header className="site-header" data-testid="site-header">
        <div className="header-inner">
          <button className="brand-lockup" onClick={() => scrollToSection("top")} data-testid="daily-driver-logo-button" aria-label="Back to top">
            <img src={logoAsset} alt="Daily Driver" data-testid="daily-driver-logo" />
            <span data-testid="brand-tagline">THE EVERYDAY AUTOMOTIVE MAGAZINE</span>
          </button>
          <nav className="primary-nav" aria-label="Primary navigation" data-testid="primary-navigation">
            {[
              ["CAR REVIEWS", "garage"],
              ["FEATURES", "magazine-grid"],
              ["NEWS", "pitstop"],
              ["BUYERS GUIDES", "ownership"],
              ["SHOP", "livery"],
            ].map(([label, target]) => (
              <button key={label} onClick={() => scrollToSection(target)} data-testid={`nav-${label.toLowerCase().replaceAll(" ", "-")}-link`}>
                {label}
              </button>
            ))}
          </nav>
          <div className="header-tools">
            <div className={`search-dock ${searchOpen ? "is-open" : ""}`} data-testid="search-dock">
              {searchOpen && <Input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search the garage..." aria-label="Search the magazine" data-testid="magazine-search-input" />}
              <button className="icon-button" onClick={() => setSearchOpen((open) => !open)} aria-label="Toggle search" data-testid="search-toggle-button">
                {searchOpen ? <X size={18} /> : <Search size={18} />}
              </button>
            </div>
            <button className="mode-toggle" onClick={() => setTrackMode((mode) => !mode)} aria-label="Toggle Track Mode and Street Mode" data-testid="mode-toggle-button">
              <span className="mode-toggle-label" data-testid="track-mode-label">TRACK</span>
              <span className="mode-track"><span className="mode-thumb" /></span>
              <span className="mode-toggle-label muted" data-testid="street-mode-label">STREET</span>
            </button>
          </div>
        </div>
        <div className="header-stripe" aria-hidden="true"><span /></div>
      </header>

      <main id="top">
        <section className="hero-section" data-testid="hero-section">
          <div className="hero-image" aria-label="Performance car on coastal road" data-testid="hero-background-image" />
          <div className="hero-scrim" aria-hidden="true" />
          <div className="hero-content">
            <span className="eyebrow hero-eyebrow" data-testid="hero-kicker">{currentStory.kicker}</span>
            <h1 data-testid="hero-heading">{currentStory.title}</h1>
            <p data-testid="hero-subheading">{currentStory.subheading}</p>
            <Button className="orange-button" onClick={() => toast.success("Feature queued for your reading list")} data-testid="hero-feature-cta">
              READ THE FULL FEATURE <ArrowUpRight size={17} />
            </Button>
          </div>
          <div className="hero-telemetry" data-testid="hero-carousel-indicator">
            <div className="hero-arrows">
              <button onClick={() => moveHero(-1)} aria-label="Previous feature" data-testid="hero-previous-button"><ChevronLeft size={18} /></button>
              <button onClick={() => moveHero(1)} aria-label="Next feature" data-testid="hero-next-button"><ChevronRight size={18} /></button>
            </div>
            <div className="progress-rail"><span style={{ width: `${((heroIndex + 1) / heroStories.length) * 100}%` }} /></div>
            <strong data-testid="hero-slide-count">{heroIndex + 1}/{heroStories.length}</strong>
          </div>
          <div className="hero-corner hero-corner-top" aria-hidden="true" />
          <div className="hero-corner hero-corner-bottom" aria-hidden="true" />
        </section>

        <section className="magazine-grid" id="magazine-grid" data-testid="magazine-grid">
          <article className="feature-card feature-card-tall" style={{ backgroundImage: `url(${imagery.overland})` }} data-testid="overland-feature-card">
            <div className="card-shade" />
            <div className="feature-card-copy"><span data-testid="overland-card-kicker">ADVENTURE // 01</span><h3 data-testid="overland-card-title">OVERLANDING FOR EVERYONE: <strong>Building a Budget Adventurer.</strong></h3><div className="orange-rule" /></div>
          </article>
          <div className="feature-middle-column">
            <article className="feature-card feature-card-short" style={{ backgroundImage: `url(${imagery.ev})` }} data-testid="ev-feature-card">
              <div className="card-shade" /><div className="feature-card-copy"><span data-testid="ev-card-kicker">COMMUTE // 02</span><h3 data-testid="ev-card-title">FUTURE OF COMMUTING: <strong>Tiny Volvo, Big Impact.</strong></h3><div className="orange-rule" /></div>
            </article>
            <article className="feature-card feature-card-short" style={{ backgroundImage: `url(${imagery.miata})` }} data-testid="miata-feature-card">
              <div className="card-shade" /><div className="feature-card-copy"><span data-testid="miata-card-kicker">LIFESTYLE // 03</span><h3 data-testid="miata-card-title">LEGENDS OF LIFESTYLE: <strong>The Unbeatable Joy of a Miata.</strong></h3><div className="orange-rule" /></div>
            </article>
          </div>
          <aside className="featured-mag" data-testid="featured-mag-section">
            <div className="featured-heading"><span className="eyebrow" data-testid="featured-mag-eyebrow">EDITOR'S PICK // 04</span><h2 data-testid="featured-mag-title">FEATURED IN THE MAG</h2></div>
            <div className="featured-list">
              {featuredArticles.map((article, index) => (
                <button className="featured-article" key={article.title} onClick={() => toast(`Opening ${article.title}`)} data-testid={`featured-article-${index + 1}`}>
                  <span className="featured-article-copy"><small data-testid={`featured-article-${index + 1}-category`}>{article.category}</small><strong data-testid={`featured-article-${index + 1}-title`}>{article.title}</strong></span>
                  <img src={article.image} alt="" data-testid={`featured-article-${index + 1}-image`} />
                </button>
              ))}
            </div>
            <div className="featured-footer"><span data-testid="featured-location"><MapPin size={13} /> GLOBAL GARAGE</span><span data-testid="featured-page-number">04 / 12</span></div>
          </aside>
        </section>

        <div className="content-wrap">
          <section className="interactive-section" id="garage" data-testid="garage-section">
            <SectionHeading id="garage" eyebrow="01 // THE GARAGE" title="SPEC SHEET COMPARISON" description="Select two machines from the fleet to compare daily livability, horsepower, wet curb weight, and real-world commuter ratings." />
            <div className="garage-layout">
              <div className="garage-controls" data-testid="garage-controls">
                <div className="control-field"><label htmlFor="vehicle-a" data-testid="vehicle-a-label">VEHICLE A</label><div className="select-wrap"><select id="vehicle-a" value={vehicleA} onChange={(event) => setVehicleA(event.target.value)} data-testid="vehicle-a-select">{vehicles.map((vehicle) => <option value={vehicle.id} key={vehicle.id}>{vehicle.name}</option>)}</select><ChevronDown size={16} /></div></div>
                <div className="control-field"><label htmlFor="vehicle-b" data-testid="vehicle-b-label">VEHICLE B</label><div className="select-wrap"><select id="vehicle-b" value={vehicleB} onChange={(event) => setVehicleB(event.target.value)} data-testid="vehicle-b-select">{vehicles.map((vehicle) => <option value={vehicle.id} key={vehicle.id}>{vehicle.name}</option>)}</select><ChevronDown size={16} /></div></div>
                <Button className="outline-button" onClick={() => setShowCompare(true)} data-testid="compare-vehicles-button">COMPARE MACHINES <SlidersHorizontal size={16} /></Button>
                <div className="garage-note" data-testid="garage-note"><ShieldCheck size={16} /><span>All specs verified by the Daily Driver test bench.</span></div>
              </div>
              {showCompare && <div className="comparison-sheet" data-testid="comparison-sheet">
                <div className="comparison-head"><span className="eyebrow" data-testid="comparison-eyebrow">LIVE COMPARISON</span><button onClick={() => setShowCompare(false)} aria-label="Close comparison" data-testid="close-comparison-button"><X size={18} /></button></div>
                <div className="vehicle-columns">
                  {[selectedA, selectedB].map((vehicle, index) => (
                    <div className="vehicle-column" key={vehicle.id} data-testid={`vehicle-${index === 0 ? "a" : "b"}-spec-column`}>
                      <div className="vehicle-column-title"><span data-testid={`vehicle-${index === 0 ? "a" : "b"}-type`}>{vehicle.type}</span><h3 data-testid={`vehicle-${index === 0 ? "a" : "b"}-name`}>{vehicle.name}</h3></div>
                      <SpecCell label="Engine" value={vehicle.engine} testId={`vehicle-${index === 0 ? "a" : "b"}-engine`} />
                      <SpecCell label="Weight" value={vehicle.weight} testId={`vehicle-${index === 0 ? "a" : "b"}-weight`} />
                      <SpecCell label="Price" value={vehicle.price} testId={`vehicle-${index === 0 ? "a" : "b"}-price`} />
                      <SpecCell label="Daily commute" value={vehicle.commuteRating} testId={`vehicle-${index === 0 ? "a" : "b"}-commute-rating`} />
                      <div className="mini-spec-row"><span data-testid={`vehicle-${index === 0 ? "a" : "b"}-fuel-label`}>ECONOMY</span><strong data-testid={`vehicle-${index === 0 ? "a" : "b"}-fuel-value`}>{vehicle.fuelEconomy}</strong><span data-testid={`vehicle-${index === 0 ? "a" : "b"}-speed-label`}>0—100</span><strong data-testid={`vehicle-${index === 0 ? "a" : "b"}-speed-value`}>{vehicle.acceleration}</strong></div>
                    </div>
                  ))}
                </div>
              </div>}
            </div>
          </section>

          <section className="interactive-section" id="ownership" data-testid="ownership-section">
            <SectionHeading id="ownership" eyebrow="02 // RUNNING METRICS" title="COST OF OWNERSHIP CALCULATOR" description="Calculate your true everyday operating expenditure based on real commute habits and localized taxation." />
            <div className="ownership-panel">
              <div className="ownership-fields" data-testid="ownership-calculator-form">
                <div className="control-field"><label htmlFor="daily-km" data-testid="daily-km-label">DAILY COMMUTE DISTANCE <span>(KM)</span></label><Input id="daily-km" type="number" min="0" value={dailyKm} onChange={(event) => setDailyKm(event.target.value)} data-testid="daily-commute-distance-input" /></div>
                <div className="control-field"><label htmlFor="fuel-efficiency" data-testid="fuel-efficiency-label">VEHICLE FUEL EFFICIENCY <span>(KM/L)</span></label><Input id="fuel-efficiency" type="number" min="0" step="0.1" value={fuelEfficiency} onChange={(event) => setFuelEfficiency(event.target.value)} data-testid="fuel-efficiency-input" /></div>
                <div className="control-field"><label htmlFor="annual-tax" data-testid="annual-tax-label">ESTIMATED ANNUAL TAX</label><Input id="annual-tax" type="number" min="0" value={annualTax} onChange={(event) => setAnnualTax(event.target.value)} data-testid="annual-tax-input" /></div>
                <p className="fuel-note" data-testid="fuel-price-note"><Fuel size={15} /> Using benchmark fuel price: <strong>$1.75 / L</strong></p>
              </div>
              <div className="cost-output" data-testid="monthly-running-cost-output"><span data-testid="monthly-running-cost-label">MONTHLY RUNNING COST</span><strong data-testid="monthly-running-cost-value">${monthlyCost.toFixed(2)}</strong><small data-testid="monthly-running-cost-caption">EST. USD // 30.5 DAYS</small></div>
            </div>
          </section>

          <section className="interactive-section" id="pitstop" data-testid="pitstop-section">
            <SectionHeading id="pitstop" eyebrow="03 // READER COLLECTIVE" title="PITSTOP COMMUNITY" description="Live paddock telemetry from the Daily Driver reader collective. Upvote posts, share garage insights, or just lurk." />
            <div className="forum-feed" data-testid="forum-feed">
              {forumPosts.map((post) => (
                <article className="forum-post" key={post.id} data-testid={`forum-post-${post.id}`}>
                  <div className="forum-post-meta"><span className="post-number" data-testid={`forum-post-${post.id}-number`}>0{post.id}</span><span data-testid={`forum-post-${post.id}-category`}>{post.category}</span><span data-testid={`forum-post-${post.id}-time`}>{post.time}</span></div>
                  <div className="forum-post-body"><div className="forum-author"><span className="avatar" data-testid={`forum-post-${post.id}-avatar`}>{post.author.slice(0, 2).toUpperCase()}</span><span><strong data-testid={`forum-post-${post.id}-author`}>{post.author}</strong><small data-testid={`forum-post-${post.id}-badge`}>{post.badge}</small></span></div><h3 data-testid={`forum-post-${post.id}-title`}>{post.title}</h3><p data-testid={`forum-post-${post.id}-preview`}>{post.preview}</p></div>
                  <div className="forum-post-actions"><button className="vote-button" onClick={() => voteForPost(post.id)} data-testid={`forum-post-${post.id}-upvote-button`}><ThumbsUp size={16} /> <strong data-testid={`forum-post-${post.id}-upvote-count`}>{post.upvotes}</strong></button><span data-testid={`forum-post-${post.id}-comments`}><MessageCircle size={15} /> {post.comments}</span></div>
                </article>
              ))}
            </div>
          </section>

          <section className="interactive-section" id="livery" data-testid="livery-section">
            <SectionHeading id="livery" eyebrow="04 // PAINT BOOTH" title="CUSTOMIZATION VISUALIZER" description="Interactive race paddock paint booth. Switch color swatches and test windshield masking in real time." />
            <div className="livery-layout">
              <div className="livery-preview" data-testid="livery-preview">
                <div className="preview-grid" aria-hidden="true" />
                <span className="preview-label" data-testid="livery-preview-label">DAILY DRIVER // TEST CAR 01</span>
                <div className="vehicle-silhouette" style={{ backgroundColor: liveryColor }} data-testid="vehicle-silhouette"><div className={`vehicle-windshield ${maskWindshield ? "masked" : ""}`} data-testid="vehicle-windshield">{maskWindshield && <span data-testid="windshield-mask-label">MASKED</span>}</div><div className="vehicle-roof" /><div className="vehicle-cabin" /><div className="vehicle-wheel wheel-one" /><div className="vehicle-wheel wheel-two" /></div>
                <span className="preview-caption" data-testid="livery-preview-caption">LIVERY / {liveryColor}</span>
              </div>
              <div className="livery-controls" data-testid="livery-controls">
                <div><span className="control-title" data-testid="livery-color-label">SELECT LIVERY COLOR</span><div className="swatch-row">{[["#1A1A1A", "ASPHALT BLACK"], ["#FF6600", "ORANGE SAFETY"], ["#CCCCCC", "STEEL SILVER"]].map(([color, label]) => <button key={color} className={`color-swatch ${liveryColor === color ? "selected" : ""}`} style={{ backgroundColor: color }} onClick={() => setLiveryColor(color)} aria-label={`Select ${label}`} data-testid={`livery-swatch-${label.toLowerCase().replaceAll(" ", "-")}`}><span>{liveryColor === color ? "✓" : ""}</span></button>)}</div><div className="swatch-names"><span data-testid="livery-current-color">{liveryColor === "#FF6600" ? "ORANGE SAFETY" : liveryColor === "#CCCCCC" ? "STEEL SILVER" : "ASPHALT BLACK"}</span><span data-testid="livery-color-system">RAL // AUTOMOTIVE</span></div></div>
                <div className="mask-control"><div><span className="control-title" data-testid="masking-label">APPLY WINDSHIELD MASKING</span><small data-testid="masking-description">Leave the glass blank for a clean race-day silhouette.</small></div><button className={`binary-toggle ${maskWindshield ? "active" : ""}`} onClick={() => setMaskWindshield((masked) => !masked)} aria-pressed={maskWindshield} aria-label="Toggle windshield masking" data-testid="windshield-masking-toggle"><span /></button></div>
                <div className="livery-specs" data-testid="livery-specs"><span><Gauge size={16} /><strong data-testid="livery-specs-a">AERO PACKAGE / 02</strong></span><span><SlidersHorizontal size={16} /><strong data-testid="livery-specs-b">CONFIGURATOR READY</strong></span></div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="site-footer" data-testid="site-footer">
        <div className="footer-brand"><img src={logoAsset} alt="Daily Driver" data-testid="footer-logo" /><span data-testid="footer-tagline">THE EVERYDAY AUTOMOTIVE MAGAZINE // EST. 2026</span></div>
        <div className="footer-socials" data-testid="footer-socials"><span data-testid="footer-social-label">FOLLOW THE LINE</span><a href="#top" aria-label="Facebook" data-testid="footer-facebook-link"><Facebook size={17} /></a><a href="#top" aria-label="Instagram" data-testid="footer-instagram-link"><Instagram size={17} /></a><a href="#top" aria-label="X" data-testid="footer-x-link"><X size={17} /></a><a href="#top" aria-label="YouTube" data-testid="footer-youtube-link"><Youtube size={18} /></a></div>
        <p data-testid="footer-legal">© 2026 Daily Driver Magazine. All telemetry and automotive reviews reserved.</p>
      </footer>
      {searchOpen && searchTerm && <div className="search-result-toast" data-testid="search-result-toast">SEARCHING THE GARAGE FOR <strong>{searchTerm.toUpperCase()}</strong></div>}
    </div>
  );
}
