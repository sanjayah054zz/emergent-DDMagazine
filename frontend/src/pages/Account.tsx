import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CalendarDays, Check, Crown, LockKeyhole, LogOut, Ticket } from "@/lib/lucide-react";
import { Button } from "@/components/ui/button";
import { MagazineFooter } from "@/components/MagazineFooter";
import { MagazineHeader } from "@/components/MagazineHeader";
import { useAccount } from "@/lib/account";

const planNames = { paddock: "PADDOCK PASS", grid: "GRID MEMBER", factory: "FACTORY SPEC" };
const events = [
  { date: "OCT 14", title: "APEX AFTER DARK", place: "Members live stream // 20:00 GMT" },
  { date: "NOV 06", title: "FACTORY FLOOR: HYBRID SPEED", place: "Virtual garage tour // McLaren Technology Centre" },
  { date: "DEC 03", title: "WINTER ROADBOOK WORKSHOP", place: "Member Q&A // Route planning lab" },
];

export default function Account() {
  const [trackMode, setTrackMode] = useState(true);
  const { currentUser, isPaidMember, logout } = useAccount();
  const navigate = useNavigate();

  if (!currentUser) return <div className={`daily-driver-app account-page ${trackMode ? "track-mode" : "street-mode"}`} data-testid="account-guest-page"><MagazineHeader trackMode={trackMode} onToggleMode={() => setTrackMode((mode) => !mode)} /><main className="account-main"><section className="account-guest"><span className="eyebrow">ACCOUNT // NO ACTIVE SESSION</span><h1 data-testid="account-guest-title">YOUR GARAGE<br /><em>IS WAITING.</em></h1><p data-testid="account-guest-description">Login or register to see membership status, benefits, and special member events.</p><div><Link className="orange-button" to="/login" data-testid="account-guest-login">LOGIN</Link><Link className="article-back-link" to="/register" data-testid="account-guest-register">REGISTER</Link></div></section></main><MagazineFooter /></div>;

  return <div className={`daily-driver-app account-page ${trackMode ? "track-mode" : "street-mode"}`} data-testid="account-page"><MagazineHeader trackMode={trackMode} onToggleMode={() => setTrackMode((mode) => !mode)} /><main className="account-main"><section className="account-hero"><div><span className="eyebrow" data-testid="account-eyebrow">DRIVER ACCOUNT // ACTIVE</span><h1 data-testid="account-title">WELCOME BACK,<br /><em>{currentUser.name.toUpperCase()}.</em></h1><p data-testid="account-email">{currentUser.email}</p></div><div className={`account-status-card ${isPaidMember ? "member" : "free"}`} data-testid="account-membership-status"><Crown size={24} /><span>CURRENT STATUS</span><strong data-testid="account-plan-name">{planNames[currentUser.membershipPlan]}</strong><small>JOINED {currentUser.joinedAt}</small></div></section><section className="account-dashboard"><div className="account-benefits"><span className="eyebrow">YOUR MEMBERSHIP</span><h2 data-testid="account-benefits-title">WHAT YOUR PASS UNLOCKS.</h2><div className="benefit-grid">{["Ad-free article reading", "Early feature access", "Pitstop member badge", "Saved tool presets", "Members-only event board", "Quarterly editorial dispatch"].map((benefit, index) => <div className={isPaidMember || index < 2 ? "unlocked" : "locked"} key={benefit} data-testid={`account-benefit-${index + 1}`}>{isPaidMember || index < 2 ? <Check size={15} /> : <LockKeyhole size={15} />}<span>{benefit}</span></div>)}</div><Link className="orange-button" to="/membership" data-testid="account-manage-membership">{isPaidMember ? "MANAGE MEMBERSHIP" : "UPGRADE MEMBERSHIP"}</Link></div><div className="account-events"><div className="account-events-heading"><CalendarDays size={19} /><div><span className="eyebrow">MEMBER CALENDAR</span><h2 data-testid="account-events-title">SPECIAL EVENTS.</h2></div></div>{events.map((event, index) => <article className={`account-event ${isPaidMember ? "" : "locked"}`} key={event.title} data-testid={`account-event-${index + 1}`}><span>{event.date}</span><div><strong>{event.title}</strong><small>{isPaidMember ? event.place : "Upgrade to reveal event access"}</small></div>{isPaidMember ? <Ticket size={18} /> : <LockKeyhole size={18} />}</article>)}</div></section><div className="account-actions"><Button variant="outline" onClick={() => { logout(); navigate("/"); }} data-testid="account-logout-button"><LogOut size={15} /> LOG OUT</Button></div></main><MagazineFooter /></div>;
}