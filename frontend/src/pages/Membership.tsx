import { useState } from "react";
import { Check, Crown, ArrowUpRight } from "@/lib/lucide-react";
import { Button } from "@/components/ui/button";
import { MagazineFooter } from "@/components/MagazineFooter";
import { MagazineHeader } from "@/components/MagazineHeader";

const plans = [
  { id: "paddock", name: "PADDOCK PASS", price: "FREE", detail: "A place to start", perks: ["Weekly issue dispatch", "Pitstop community access", "Archive browsing"] },
  { id: "grid", name: "GRID MEMBER", price: "$6 / MO", detail: "For the daily driver", perks: ["Everything in Paddock Pass", "Early access to features", "Member-only tool presets", "Digital member badge"] },
  { id: "factory", name: "FACTORY SPEC", price: "$14 / MO", detail: "The full telemetry", perks: ["Everything in Grid Member", "Monthly live garage session", "Quarterly print dispatch", "Founding member number"] },
];

export default function Membership() {
  const [trackMode, setTrackMode] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState("grid");
  const [joined, setJoined] = useState(false);
  const plan = plans.find((item) => item.id === selectedPlan) ?? plans[1];

  return (
    <div className={`daily-driver-app membership-page ${trackMode ? "track-mode" : "street-mode"}`} data-testid="membership-page"><MagazineHeader trackMode={trackMode} onToggleMode={() => setTrackMode((mode) => !mode)} /><main className="membership-main" data-testid="membership-main"><section className="membership-hero"><div><span className="eyebrow" data-testid="membership-eyebrow">DAILY DRIVER // MEMBERSHIP</span><h1 data-testid="membership-title">DRIVE<br /><em>WITH US.</em></h1><p data-testid="membership-description">Membership is for readers who believe the everyday drive deserves better stories, sharper tools, and a seat at the table.</p></div><div className="member-badge" data-testid="membership-badge"><Crown size={25} /><span>DD</span><small>EST. 2026<br />MEMBER ISSUE 01</small></div></section><section className="membership-plans" data-testid="membership-plans"><div className="membership-plans-intro"><span className="eyebrow">CHOOSE YOUR PACE</span><h2 data-testid="membership-plans-title">A BETTER<br />WAY TO READ.</h2><p data-testid="membership-plans-description">Start free, go deeper, or join the full telemetry line. Change your plan whenever the road changes.</p></div><div className="plan-grid">{plans.map((item) => <button className={`plan-card ${selectedPlan === item.id ? "selected" : ""}`} onClick={() => { setSelectedPlan(item.id); setJoined(false); }} key={item.id} data-testid={`membership-plan-${item.id}`}><span className="plan-card-top"><span className="eyebrow">{item.name}</span>{selectedPlan === item.id && <span className="plan-selected">SELECTED</span>}</span><strong data-testid={`membership-plan-${item.id}-price`}>{item.price}</strong><small data-testid={`membership-plan-${item.id}-detail`}>{item.detail}</small><span className="plan-rule" />{item.perks.map((perk) => <span className="plan-perk" key={perk} data-testid={`membership-plan-${item.id}-perk-${perk.toLowerCase().replaceAll(" ", "-")}`}><Check size={14} /> {perk}</span>)}</button>)}</div></section><section className="membership-join" data-testid="membership-join"><div><span className="eyebrow">YOUR SELECTED LINE</span><h2 data-testid="membership-selected-plan">{plan.name}</h2><p data-testid="membership-selected-copy">{joined ? "Welcome to the line. Your local prototype membership badge is active." : `Ready when you are. ${plan.detail} and built for readers who prefer the long way home.`}</p></div><Button className="orange-button" onClick={() => setJoined(true)} data-testid="membership-join-button">{joined ? "MEMBERSHIP ACTIVE" : "JOIN THE LINE"} <ArrowUpRight size={17} /></Button></section></main><MagazineFooter /></div>
  );
}