import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "@/lib/lucide-react";
import { articleStories } from "@/lib/articles";
import { MagazineHeader, logoAsset } from "@/components/MagazineHeader";
import { useAccount } from "@/lib/account";

export default function Article() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [trackMode, setTrackMode] = useState(true);
  const { currentUser, isPaidMember } = useAccount();
  const article = articleStories.find((story) => story.slug === slug);

  if (!article) {
    return (
      <div className="article-page track-mode" data-testid="article-not-found-page">
        <MagazineHeader trackMode={trackMode} onToggleMode={() => setTrackMode((mode) => !mode)} />
        <main className="article-not-found" data-testid="article-not-found-content"><span className="eyebrow" data-testid="article-not-found-eyebrow">404 // OFF THE MAP</span><h1 data-testid="article-not-found-title">THIS STORY ISN'T IN THE GARAGE.</h1><Link className="article-back-link" to="/" data-testid="article-not-found-back-link"><ArrowLeft size={16} /> BACK TO THE MAGAZINE</Link></main>
      </div>
    );
  }

  return (
    <div className={`article-page ${trackMode ? "track-mode" : "street-mode"}`} data-testid="article-page">
      <MagazineHeader trackMode={trackMode} onToggleMode={() => setTrackMode((mode) => !mode)} />

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
            {!isPaidMember && <aside className="article-sponsor" data-testid="article-sponsor-ad"><span className="eyebrow">SPONSORED // ROAD PARTNER</span><strong>KEEP THE LONG WAY HOME WITHIN REACH.</strong><p>Daily Driver guest reading is supported by Apex Fuel &amp; Road. Paid members enjoy every article without commercial breaks.</p><Link to="/membership" data-testid="article-sponsor-membership-link">GO AD-FREE <ArrowUpRight size={15} /></Link><small data-testid="article-sponsor-reader-status">{currentUser ? "PADDOCK PASS READER" : "GUEST READER"}</small></aside>}
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