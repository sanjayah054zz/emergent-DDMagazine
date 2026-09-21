import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "@/lib/lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MagazineFooter } from "@/components/MagazineFooter";
import { MagazineHeader } from "@/components/MagazineHeader";
import { useAccount } from "@/lib/account";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [trackMode, setTrackMode] = useState(true);
  const { register } = useAccount();
  const navigate = useNavigate();

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = register(name, email, password);
    if (!result.ok) return setError(result.message);
    navigate("/account");
  };

  return <div className={`daily-driver-app auth-page ${trackMode ? "track-mode" : "street-mode"}`} data-testid="register-page"><MagazineHeader trackMode={trackMode} onToggleMode={() => setTrackMode((mode) => !mode)} /><main className="auth-main"><section className="auth-panel"><div className="auth-copy"><span className="eyebrow" data-testid="register-eyebrow">ACCOUNT // NEW DRIVER</span><h1 data-testid="register-title">JOIN<br /><em>THE LINE.</em></h1><p data-testid="register-description">Create a local prototype account to track your membership, benefits, and members-only events.</p><div className="auth-feature-list"><span>01 // FREE PADDOCK ACCESS</span><span>02 // MEMBERSHIP STATUS</span><span>03 // SPECIAL EVENT BOARD</span></div></div><form className="auth-form" onSubmit={submit} data-testid="register-form"><label htmlFor="register-name">DRIVER NAME</label><Input id="register-name" value={name} onChange={(event) => setName(event.target.value)} required data-testid="register-name-input" /><label htmlFor="register-email">EMAIL</label><Input id="register-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required data-testid="register-email-input" /><label htmlFor="register-password">PASSWORD</label><Input id="register-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} minLength={6} required data-testid="register-password-input" />{error && <p className="form-error" data-testid="register-error">{error}</p>}<Button className="orange-button" type="submit" data-testid="register-submit-button">REGISTER <ArrowRight size={16} /></Button><p className="auth-switch">ALREADY REGISTERED? <Link to="/login" data-testid="register-login-link">LOGIN</Link></p></form></section></main><MagazineFooter /></div>;
}