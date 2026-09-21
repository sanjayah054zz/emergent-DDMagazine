import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, Check, Crown, Globe2 } from "@/lib/lucide-react";
import { Button } from "@/components/ui/button";
import { MagazineFooter } from "@/components/MagazineFooter";
import { MagazineHeader } from "@/components/MagazineHeader";
import { useAccount, type MembershipPlan } from "@/lib/account";

const plans: { id: MembershipPlan; name: string; usd: number; detail: string; perks: string[] }[] = [
  { id: "paddock", name: "PADDOCK PASS", usd: 0, detail: "A place to start", perks: ["Weekly issue dispatch", "Pitstop community access", "Archive browsing"] },
  { id: "grid", name: "GRID MEMBER", usd: 6, detail: "For the daily driver", perks: ["Everything in Paddock Pass", "Ad-free articles", "Early feature access", "Digital member badge"] },
  { id: "factory", name: "FACTORY SPEC", usd: 14, detail: "The full telemetry", perks: ["Everything in Grid Member", "Monthly live garage session", "Quarterly print dispatch", "Special event access"] },
];

const majorRates: Record<string, number> = { USD: 1, EUR: 0.92, GBP: 0.79, JPY: 151, IDR: 15900, CAD: 1.36, AUD: 1.52, NZD: 1.66, CHF: 0.89, CNY: 7.24, INR: 83.4, BRL: 5.05, MXN: 16.8, SGD: 1.35, HKD: 7.82, ZAR: 18.6, AED: 3.67 };
const fallbackCurrencies = Object.keys(majorRates);
const intlCurrency = Intl as typeof Intl & { supportedValuesOf?: (key: string) => string[] };
const currencyCodes = Array.from(new Set(["IDR", ...(intlCurrency.supportedValuesOf?.("currency") ?? fallbackCurrencies)])).sort();
const estimatedRate = (code: string) => majorRates[code] ?? (0.7 + (code.split("").reduce((sum, letter) => sum + letter.charCodeAt(0), 0) % 1130) / 100);

export default function MembershipEnhanced() {
  const [trackMode, setTrackMode] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<MembershipPlan>("grid");
  const [currency, setCurrency] = useState("USD");
  const { currentUser, setMembershipPlan } = useAccount();
  const navigate = useNavigate();
  const plan = plans.find((item) => item.id === selectedPlan) ?? plans[1];
  const isEstimated = !majorRates[currency];
  const formatter = useMemo(() => new Intl.NumberFormat(currency === "IDR" ? "id-ID" : "en", { style: "currency", currency, maximumFractionDigits: currency === "JPY" || currency === "IDR" ? 0 : 2 }), [currency]);
  const price = (usd: number) => usd === 0 ? "FREE" : `${formatter.format(usd * estimatedRate(currency))} / MO`;
  const activate = () => { if (!currentUser) return navigate("/register"); setMembershipPlan(selectedPlan); };
  const active = currentUser?.membershipPlan === selectedPlan;

  return <div className={`daily-driver-app membership-page ${trackMode ? "track-mode" : "street-mode"}`} data-testid="membership-page"><MagazineHeader trackMode={trackMode} onToggleMode={() => setTrackMode((mode) => !mode)} /><main className="membership-main" data-testid="membership-main"><section className="membership-hero"><div><span className="eyebrow" data-testid="membership-eyebrow">DAILY DRIVER // MEMBERSHIP</span><h1 data-testid="membership-title">DRIVE<br /><em>WITH US.</em></h1><p data-testid="membership-description">Membership unlocks ad-free stories, special events, sharper tools, and a permanent seat at the table.</p></div><div className="member-badge" data-testid="membership-badge"><Crown size={25} /><span>DD</span><small>{currentUser ? currentUser.membershipPlan.toUpperCase() : "GUEST"}<br />MEMBER ISSUE 01</small></div></section><div className="currency-control" data-testid="membership-currency-control"><div><Globe2 size={18} /><span><strong>DISPLAY CURRENCY</strong><small>{isEstimated ? "PROTOTYPE ESTIMATED RATE" : "FIXED DEMO RATE"}</small></span></div><select value={currency} onChange={(event) => setCurrency(event.target.value)} data-testid="membership-currency-select">{currencyCodes.map((code) => <option value={code} key={code}>{code}</option>)}</select></div><section className="membership-plans" data-testid="membership-plans"><div className="membership-plans-intro"><span className="eyebrow">CHOOSE YOUR PACE</span><h2 data-testid="membership-plans-title">A BETTER<br />WAY TO READ.</h2><p data-testid="membership-plans-description">Every browser-supported currency is available. Major currencies use fixed demo rates; all others are clearly labeled prototype estimates.</p></div><div className="plan-grid">{plans.map((item) => <button className={`plan-card ${selectedPlan === item.id ? "selected" : ""}`} onClick={() => setSelectedPlan(item.id)} key={item.id} data-testid={`membership-plan-${item.id}`}><span className="plan-card-top"><span className="eyebrow">{item.name}</span>{selectedPlan === item.id && <span className="plan-selected">SELECTED</span>}</span><strong data-testid={`membership-plan-${item.id}-price`}>{price(item.usd)}</strong><small>{item.detail}</small><span className="plan-rule" />{item.perks.map((perk) => <span className="plan-perk" key={perk}><Check size={14} /> {perk}</span>)}</button>)}</div></section><section className="membership-join" data-testid="membership-join"><div><span className="eyebrow">YOUR SELECTED LINE</span><h2 data-testid="membership-selected-plan">{plan.name}</h2><p data-testid="membership-selected-copy">{active ? "This is your active membership. Your account dashboard reflects every unlocked benefit." : currentUser ? `${plan.detail}. Activate this plan on your local prototype account.` : "Register a local account to activate this membership and unlock your dashboard."}</p></div><Button className="orange-button" onClick={activate} data-testid="membership-join-button">{active ? "CURRENT PLAN" : currentUser ? "ACTIVATE PLAN" : "REGISTER TO JOIN"} <ArrowUpRight size={17} /></Button></section></main><MagazineFooter /></div>;
}