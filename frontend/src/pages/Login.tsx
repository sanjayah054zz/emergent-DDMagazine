import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, KeyRound } from "@/lib/lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MagazineFooter } from "@/components/MagazineFooter";
import { MagazineHeader } from "@/components/MagazineHeader";
import { useAccount } from "@/lib/account";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [trackMode, setTrackMode] = useState(true);
  const { login } = useAccount();
  const navigate = useNavigate();

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = login(email, password);
    if (!result.ok) return setError(result.message);
    navigate("/account");
  };

  const useDemo = () => {
    setEmail("driver@daily.test");
    setPassword("TrackMode26!");
    setError("");
  };

  return <div className={`daily-driver-app auth-page ${trackMode ? "track-mode" : "street-mode"}`} data-testid="login-page"><MagazineHeader trackMode={trackMode} onToggleMode={() => setTrackMode((mode) => !mode)} /><main className="auth-main"><section className="auth-panel"><div className="auth-copy"><span className="eyebrow" data-testid="login-eyebrow">ACCOUNT // DRIVER ACCESS</span><h1 data-testid="login-title">BACK IN<br /><em>THE PADDOCK.</em></h1><p data-testid="login-description">Sign in to see your membership, unlocked benefits, and the next members-only events.</p><div className="demo-credentials" data-testid="demo-credentials"><KeyRound size={18} /><div><strong>DEMO MEMBER ACCOUNT</strong><span>driver@daily.test</span><span>TrackMode26!</span></div><button onClick={useDemo} data-testid="use-demo-account-button">USE DEMO</button></div></div><form className="auth-form" onSubmit={submit} data-testid="login-form"><label htmlFor="login-email">EMAIL</label><Input id="login-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required data-testid="login-email-input" /><label htmlFor="login-password">PASSWORD</label><Input id="login-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required data-testid="login-password-input" />{error && <p className="form-error" data-testid="login-error">{error}</p>}<Button className="orange-button" type="submit" data-testid="login-submit-button">LOGIN <ArrowRight size={16} /></Button><p className="auth-switch">NEW TO DAILY DRIVER? <Link to="/register" data-testid="login-register-link">REGISTER AN ACCOUNT</Link></p></form></section></main><MagazineFooter /></div>;
}