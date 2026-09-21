import { useMemo, useState } from "react";
import { ChevronDown, Search } from "@/lib/lucide-react";
import { Input } from "@/components/ui/input";
import { MagazineFooter } from "@/components/MagazineFooter";
import { MagazineHeader } from "@/components/MagazineHeader";

const faqs = [
  ["ACCOUNT", "How do local prototype accounts work?", "Accounts and sessions are stored only in this browser. Use the demo login or register a local profile to view membership status and events."],
  ["MEMBERSHIP", "How do I change my membership plan?", "Open Membership, choose a plan, select your preferred currency, and confirm. Your account page updates immediately."],
  ["ARTICLES", "Why do I see a sponsor message in articles?", "Guests and free Paddock readers see one sponsor block. Grid and Factory members read without advertising."],
  ["PITSTOP", "Which images can I upload?", "Pitstop accepts one JPG, PNG, or WebP image under 5 MB per locally created discussion post."],
  ["TOOLS", "Can I save a livery build?", "Yes. Save several builds for the current session or download an SVG build card to keep."],
  ["GARAGE", "How do vehicle comparisons work?", "Choose any two of the eight vehicles, then select Compare Machines to reveal images and side-by-side specifications."],
];

export default function Help() {
  const [trackMode, setTrackMode] = useState(true);
  const [query, setQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const results = useMemo(() => faqs.filter((item) => item.join(" ").toLowerCase().includes(query.toLowerCase())), [query]);
  return <div className={`daily-driver-app support-page ${trackMode ? "track-mode" : "street-mode"}`} data-testid="help-page"><MagazineHeader trackMode={trackMode} onToggleMode={() => setTrackMode((mode) => !mode)} /><main className="support-main"><section className="support-hero"><span className="eyebrow">SUPPORT // HELP CENTRE</span><h1 data-testid="help-title">FIND THE<br /><em>RIGHT LINE.</em></h1><p data-testid="help-description">Search practical answers about accounts, membership, the archive, Pitstop, and Daily Driver tools.</p><div className="help-search"><Search size={18} /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search help topics..." aria-label="Search help topics" data-testid="help-search-input" /></div></section><section className="faq-list" data-testid="help-results">{results.map((item, index) => <article className={`faq-item ${openIndex === index ? "open" : ""}`} key={item[1]}><button onClick={() => setOpenIndex(openIndex === index ? null : index)} data-testid={`help-question-${index + 1}`}><span><small>{item[0]}</small><strong>{item[1]}</strong></span><ChevronDown size={18} /></button>{openIndex === index && <p data-testid={`help-answer-${index + 1}`}>{item[2]}</p>}</article>)}</section>{results.length === 0 && <p className="support-empty" data-testid="help-empty">NO HELP TOPICS MATCH THAT SEARCH.</p>}</main><MagazineFooter /></div>;
}