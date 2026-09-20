import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Search } from "@/lib/lucide-react";
import { Input } from "@/components/ui/input";
import { articleStories } from "@/lib/articles";
import { MagazineFooter } from "@/components/MagazineFooter";
import { MagazineHeader } from "@/components/MagazineHeader";

export default function ArticleIndex() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("ALL");
  const categories = ["ALL", ...Array.from(new Set(articleStories.map((story) => story.category)))];
  const filteredStories = useMemo(() => articleStories.filter((story) => {
    const matchesCategory = category === "ALL" || story.category === category;
    const haystack = `${story.title} ${story.dek} ${story.category}`.toLowerCase();
    return matchesCategory && haystack.includes(query.toLowerCase());
  }), [category, query]);

  return (
    <div className="daily-driver-app track-mode archive-page" data-testid="article-index-page">
      <MagazineHeader />
      <main className="archive-main" data-testid="article-index-main">
        <div className="archive-intro"><div><span className="eyebrow" data-testid="article-index-eyebrow">THE DAILY DRIVER // ARCHIVE</span><h1 data-testid="article-index-title">ALL THE STORIES<br /><em>WORTH THE DETOUR.</em></h1></div><p data-testid="article-index-description">Browse the full issue: performance benchmarks, practical machines, technical deep dives, and the small details that make a daily drive worth repeating.</p></div>
        <div className="archive-stats" data-testid="article-index-stats"><span data-testid="article-index-story-count">{articleStories.length.toString().padStart(2, "0")} STORIES</span><span data-testid="article-index-category-count">{categories.length - 1} CATEGORIES</span><span data-testid="article-index-issue">ISSUE 01 // 2026</span></div>
        <div className="archive-toolbar" data-testid="article-index-toolbar"><div className="archive-search"><Search size={17} /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search stories, machines, ideas..." aria-label="Search article archive" data-testid="article-index-search-input" /></div><div className="archive-filters" data-testid="article-index-filters">{categories.map((item) => <button className={category === item ? "active" : ""} onClick={() => setCategory(item)} key={item} data-testid={`article-filter-${item.toLowerCase().replaceAll(" ", "-").replaceAll("'", "")}`}>{item}</button>)}</div></div>
        <section className="archive-grid" data-testid="article-index-grid">{filteredStories.map((story, index) => <Link className={`archive-card ${index === 0 ? "archive-card-lead" : ""}`} to={`/articles/${story.slug}`} key={story.slug} data-testid={`archive-card-${story.slug}`}><div className="archive-card-image"><img src={story.image} alt={story.title} data-testid={`archive-card-${story.slug}-image`} /><span data-testid={`archive-card-${story.slug}-index`}>{String(index + 1).padStart(2, "0")}</span></div><div className="archive-card-copy"><span className="eyebrow" data-testid={`archive-card-${story.slug}-category`}>{story.category}</span><h2 data-testid={`archive-card-${story.slug}-title`}>{story.title}</h2><p data-testid={`archive-card-${story.slug}-dek`}>{story.dek}</p><span className="archive-read-link" data-testid={`archive-card-${story.slug}-read-link`}>READ STORY <ArrowUpRight size={15} /></span></div></Link>)}</section>
        {filteredStories.length === 0 && <div className="archive-empty" data-testid="article-index-empty">NO STORIES MATCH THAT SEARCH. TRY ANOTHER LINE.</div>}
      </main>
      <MagazineFooter />
    </div>
  );
}