import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Moon, Sun } from "@/lib/lucide-react";
import { articleStories } from "@/lib/articles";

const logoAsset =
  "https://customer-assets-jt897jd0.emergentagent.net/job_ffb74dfa-180f-4b9a-b30c-77c68fc7c605/artifacts/zaevr1ln_THE%20DAILY%20DRIVER%20MAGAZINE%20%28no%20background%20%29.webp";

export default function Article() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [trackMode, setTrackMode] = useState(true);
  const article = articleStories.find((story) => story.slug === slug);

  if (!article) {
    return (
      <div className="article-page track-mode" data-testid="article-not-found-page">
        <header className="site-header" data-testid="article-not-found-header">
          <div className="header-inner">
            <Link className="brand-lockup" to="/" data-testid="article-not-found-logo-link"><img src={logoAsset} alt="Daily Driver" data-testid="article-not-found-logo" /></Link>
          </div>
        </header>
        <main className="article-not-found" data-testid="article-not-found-content"><span className="eyebrow" data-testid="article-not-found-eyebrow">404 // OFF THE MAP</span><h1 data-testid="article-not-found-title">THIS STORY ISN'T IN THE GARAGE.</h1><Link className="article-back-link" to="/" data-testid="article-not-found-back-link"><ArrowLeft size={16} /> BACK TO THE MAGAZINE</Link></main>
      </div>
    );
  }

  return (
    <div className={`article-page ${trackMode ? "track-mode" : "street-mode"}`} data-testid="article-page">
      <header className="site-header article-site-header" data-testid="article-site-header">
        <div className="header-inner">
          <Link className="brand-lockup" to="/" data-testid="article-logo-link" aria-label="Return to Daily Driver home">
            <img src={logoAsset} alt="Daily Driver" data-testid="article-logo" />
            <span data-testid="article-brand-tagline">THE EVERYDAY AUTOMOTIVE MAGAZINE</span>
          </Link>
          <div className="article-header-center"><span className="eyebrow" data-testid="article-header-issue">{article.issue}</span><span data-testid="article-header-label">FIELD NOTES / EDITORIAL</span></div>
          <div className="article-header-tools">
            <Link className="article-back-link compact" to="/" data-testid="article-back-to-magazine-link"><ArrowLeft size={15} /> BACK TO MAGAZINE</Link>
            <button className="article-mode-toggle" onClick={() => setTrackMode((mode) => !mode)} aria-label="Toggle article mode" data-testid="article-mode-toggle">{trackMode ? <Moon size={15} /> : <Sun size={15} />}<span data-testid="article-mode-label">{trackMode ? "TRACK" : "STREET"}</span></button>
          </div>
        </div>
        <div className="header-stripe"><span /></div>
      </header>

      <main className="article-main" data-testid="article-main">
        <div className="article-breadcrumb"><Link to="/" data-testid="article-breadcrumb-home">DAILY DRIVER</Link><span>/</span><span data-testid="article-breadcrumb-category">{article.category}</span></div>
        <section className="article-hero" data-testid="article-hero">
          <div className="article-hero-copy"><span className="eyebrow" data-testid="article-category">{article.category} // FEATURE</span><h1 data-testid="article-title">{article.title}</h1><p data-testid="article-dek">{article.dek}</p><div className="article-meta" data-testid="article-meta"><span data-testid="article-author">WORDS BY <strong>{article.author}</strong></span><span data-testid="article-published">{article.published}</span><span data-testid="article-read-time">{article.readTime}</span></div></div>
          <div className="article-hero-image"><img src={article.image} alt={article.title} data-testid="article-hero-image" /><span data-testid="article-image-caption">DAILY DRIVER / ARCHIVE FRAME {article.issue.slice(0, 2)}</span></div>
        </section>

        <div className="article-body-layout">
          <aside className="article-rail" data-testid="article-rail"><span className="eyebrow" data-testid="article-rail-label">READ THE LINE</span><span data-testid="article-rail-number">01—03</span><div className="article-rail-rule" /><span data-testid="article-rail-note">THE EVERYDAY AUTOMOTIVE MAGAZINE</span></aside>
          <article className="article-copy" data-testid="article-copy">
            <p className="article-lede" data-testid="article-lede">{article.body[0]}</p>
            {article.body.slice(1).map((paragraph, index) => <p key={paragraph} data-testid={`article-body-paragraph-${index + 2}`}>{paragraph}</p>)}
            <div className="article-endmark" data-testid="article-endmark"><span /><strong>END OF TRANSMISSION</strong><span /></div>
          </article>
        </div>
        <div className="article-footer-nav"><Link className="article-back-link" to="/" data-testid="article-bottom-back-link"><ArrowLeft size={16} /> BACK TO THE MAGAZINE</Link><button className="article-next-link" onClick={() => navigate("/")} data-testid="article-next-story-link">MORE FROM DAILY DRIVER <ArrowUpRight size={16} /></button></div>
      </main>

      <footer className="site-footer article-footer" data-testid="article-footer"><div className="footer-brand"><img src={logoAsset} alt="Daily Driver" data-testid="article-footer-logo" /><span data-testid="article-footer-tagline">THE EVERYDAY AUTOMOTIVE MAGAZINE // EST. 2026</span></div><p data-testid="article-footer-legal">© 2026 Daily Driver Magazine. All telemetry and automotive reviews reserved.</p></footer>
    </div>
  );
}