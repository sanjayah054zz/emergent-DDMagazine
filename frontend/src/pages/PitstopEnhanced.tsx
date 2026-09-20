import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImagePlus, MessageCircle, Plus, ThumbsUp, Trophy, X } from "@/lib/lucide-react";
import { MagazineFooter } from "@/components/MagazineFooter";
import { MagazineHeader } from "@/components/MagazineHeader";

type ForumPost = {
  id: number;
  author: string;
  badge: string;
  title: string;
  preview: string;
  upvotes: number;
  comments: number;
  category: string;
  time: string;
  image?: string;
};

const initialPosts: ForumPost[] = [
  { id: 1, author: "ApexHunter_99", badge: "TRACK VETERAN", title: "Is dailying a manual roadster still practical in stop-and-go metro traffic?", preview: "Been doing 40km across Seattle for 6 months. Heavy clutch, but the Friday escape makes every red light worth it.", upvotes: 42, comments: 19, category: "DAILY GRIND", time: "22m ago" },
  { id: 2, author: "OverlandKev", badge: "TRAIL MASTER", title: "Budget skid plates: aluminum 4mm vs steel 3mm for weekend warriors", preview: "Tested both on rocky Colorado fire roads. Steel took the rock slams, but that 18kg penalty hurts mpg.", upvotes: 28, comments: 14, category: "TECH TALK", time: "1h ago" },
  { id: 3, author: "VoltRunner", badge: "EV PIONEER", title: "Cold weather range drop: 2026 winter observations across Scandinavia", preview: "Heat pump efficiency held steady down to -12C. Preconditioning while plugged in saves at least 18% usable pack.", upvotes: 35, comments: 23, category: "EV LAB", time: "3h ago" },
  { id: 4, author: "NightShift", badge: "NEW MEMBER", title: "What is the best low-light route for a first midnight drive?", preview: "Looking for a route with good sightlines, interesting corners, and somewhere to stop for coffee before sunrise.", upvotes: 16, comments: 8, category: "DAILY GRIND", time: "5h ago" },
];

export default function PitstopEnhanced() {
  const [trackMode, setTrackMode] = useState(true);
  const [posts, setPosts] = useState(initialPosts);
  const [category, setCategory] = useState("ALL");
  const [draft, setDraft] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageName, setImageName] = useState("");
  const [uploadError, setUploadError] = useState("");
  const categories = ["ALL", "DAILY GRIND", "TECH TALK", "EV LAB"];
  const filteredPosts = useMemo(() => posts.filter((post) => category === "ALL" || post.category === category), [category, posts]);

  const upvote = (id: number) => {
    setPosts((current) => current.map((post) => post.id === id ? { ...post, upvotes: post.upvotes + 1 } : post));
  };

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!(["image/jpeg", "image/png", "image/webp"].includes(file.type))) {
      setUploadError("Use a JPG, PNG, or WebP image.");
      event.target.value = "";
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Keep the image below 5 MB.");
      event.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImagePreview(reader.result);
        setImageName(file.name);
        setUploadError("");
      }
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setImagePreview(null);
    setImageName("");
    setUploadError("");
  };

  const submitPost = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!draft.trim()) return;
    const nextPost: ForumPost = {
      id: Date.now(),
      author: "You",
      badge: "NEW MEMBER",
      title: draft.trim(),
      preview: imagePreview ? "Fresh from the garage — image attached for the paddock." : "Your new discussion is now live in the Daily Driver paddock.",
      upvotes: 0,
      comments: 0,
      category: "DAILY GRIND",
      time: "NOW",
      image: imagePreview ?? undefined,
    };
    setPosts((current) => [nextPost, ...current]);
    setDraft("");
    clearImage();
    setCategory("ALL");
  };

  return (
    <div className={`daily-driver-app pitstop-page ${trackMode ? "track-mode" : "street-mode"}`} data-testid="pitstop-page">
      <MagazineHeader trackMode={trackMode} onToggleMode={() => setTrackMode((mode) => !mode)} />
      <main className="pitstop-main" data-testid="pitstop-main">
        <section className="pitstop-hero" id="pitstop">
          <div><span className="eyebrow" data-testid="pitstop-eyebrow">03 // READER COLLECTIVE</span><h1 data-testid="pitstop-title">THE PITSTOP<br /><em>STAY IN THE LOOP.</em></h1><p data-testid="pitstop-description">Live paddock telemetry from the Daily Driver reader collective. Share garage photos, ask better questions, and find the people who know the long way home.</p></div>
          <div className="pitstop-stats" data-testid="pitstop-stats"><div><strong data-testid="pitstop-member-count">3.2K</strong><span>ACTIVE DRIVERS</span></div><div><strong data-testid="pitstop-discussion-count">148</strong><span>OPEN THREADS</span></div><div><strong data-testid="pitstop-expert-count">27</strong><span>GARAGE EXPERTS</span></div></div>
        </section>

        <section className="pitstop-compose pitstop-compose-enhanced" data-testid="pitstop-compose-section">
          <div><span className="eyebrow" data-testid="pitstop-compose-eyebrow">ADD YOUR SIGNAL</span><h2 data-testid="pitstop-compose-title">START A DISCUSSION.</h2><p data-testid="pitstop-compose-description">Post a question, workshop photo, road find, or the machine currently taking up your garage.</p></div>
          <form onSubmit={submitPost} data-testid="pitstop-compose-form">
            <div className="compose-input-row"><Input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="What are you driving, fixing, or thinking about?" aria-label="Discussion title" data-testid="pitstop-compose-input" /><Button className="orange-button" type="submit" data-testid="pitstop-compose-submit"><Plus size={16} /> POST TO PITSTOP</Button></div>
            <div className="compose-media-row">
              <label className="image-upload-button" htmlFor="pitstop-image-upload" data-testid="pitstop-image-upload-label"><ImagePlus size={16} /> ATTACH GARAGE IMAGE</label>
              <input id="pitstop-image-upload" className="visually-hidden-input" type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImage} data-testid="pitstop-image-upload-input" />
              <span data-testid="pitstop-image-upload-note">JPG, PNG OR WEBP // MAX 5 MB</span>
            </div>
            {uploadError && <p className="upload-error" data-testid="pitstop-image-upload-error">{uploadError}</p>}
            {imagePreview && <div className="compose-image-preview" data-testid="pitstop-image-preview"><img src={imagePreview} alt="Discussion upload preview" data-testid="pitstop-image-preview-image" /><div><span data-testid="pitstop-image-preview-name">{imageName}</span><small data-testid="pitstop-image-preview-status">READY TO PUBLISH</small></div><button type="button" onClick={clearImage} aria-label="Remove uploaded image" data-testid="pitstop-image-remove-button"><X size={16} /></button></div>}
          </form>
        </section>

        <section className="pitstop-feed-section">
          <div className="pitstop-feed-header"><div><span className="eyebrow" data-testid="pitstop-feed-eyebrow">ACTIVE DISCUSSIONS</span><h2 data-testid="pitstop-feed-title">WHAT'S MOVING<br />IN THE PADDOCK.</h2></div><div className="pitstop-filter-row" data-testid="pitstop-filters">{categories.map((item) => <button className={category === item ? "active" : ""} onClick={() => setCategory(item)} key={item} data-testid={`pitstop-filter-${item.toLowerCase().replaceAll(" ", "-")}`}>{item}</button>)}</div></div>
          <div className="forum-feed" data-testid="pitstop-forum-feed">
            {filteredPosts.map((post) => <article className={`forum-post ${post.image ? "has-image" : ""}`} key={post.id} data-testid={`pitstop-post-${post.id}`}><div className="forum-post-meta"><span className="post-number">{String(post.id).slice(-2).padStart(2, "0")}</span><span>{post.category}</span><span>{post.time}</span></div><div className="forum-post-body"><div className="forum-author"><span className="avatar">{post.author.slice(0, 2).toUpperCase()}</span><span><strong data-testid={`pitstop-post-${post.id}-author`}>{post.author}</strong><small>{post.badge}</small></span></div><h3 data-testid={`pitstop-post-${post.id}-title`}>{post.title}</h3><p>{post.preview}</p>{post.image && <img className="forum-post-image" src={post.image} alt={`Uploaded by ${post.author}`} data-testid={`pitstop-post-${post.id}-image`} />}</div><div className="forum-post-actions"><button className="vote-button" onClick={() => upvote(post.id)} data-testid={`pitstop-post-${post.id}-upvote`}><ThumbsUp size={16} /><strong data-testid={`pitstop-post-${post.id}-votes`}>{post.upvotes}</strong></button><span><MessageCircle size={15} /> {post.comments}</span></div></article>)}
          </div>
        </section>
        <section className="pitstop-cta" data-testid="pitstop-cta"><Trophy size={22} /><span data-testid="pitstop-cta-copy">THE BEST ADVICE IS USUALLY AROUND THE NEXT CORNER.</span><a href="#pitstop" data-testid="pitstop-back-to-top">BACK TO THE BOARD ↑</a></section>
      </main>
      <MagazineFooter />
    </div>
  );
}