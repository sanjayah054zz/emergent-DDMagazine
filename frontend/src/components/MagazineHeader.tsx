import { Link } from "react-router-dom";
import { LogIn, LogOut, Moon, Sun, UserPlus, UserRound } from "@/lib/lucide-react";
import { useAccount } from "@/lib/account";

const logoAsset =
  "https://customer-assets-jt897jd0.emergentagent.net/job_ffb74dfa-180f-4b9a-b30c-77c68fc7c605/artifacts/zaevr1ln_THE%20DAILY%20DRIVER%20MAGAZINE%20%28no%20background%20%29.webp";

type MagazineHeaderProps = {
  trackMode?: boolean;
  onToggleMode?: () => void;
};

export function MagazineHeader({ trackMode = true, onToggleMode = () => undefined }: MagazineHeaderProps) {
  const { currentUser, logout } = useAccount();
  const links = [
    ["THE MAG", "/"],
    ["ARCHIVE", "/archive"],
    ["TOOLS", "/tools"],
    ["PITSTOP", "/pitstop"],
    ["MEMBERSHIP", "/membership"],
    ["HELP", "/help"],
    ["CONTACT", "/contact"],
  ];

  return (
    <header className="site-header magazine-nav-header" data-testid="magazine-header">
      <div className="header-inner">
        <Link className="brand-lockup" to="/" data-testid="magazine-logo-link">
          <img src={logoAsset} alt="Daily Driver" data-testid="magazine-logo" />
          <span data-testid="magazine-tagline">THE EVERYDAY AUTOMOTIVE MAGAZINE</span>
        </Link>
        <nav className="primary-nav" aria-label="Magazine navigation" data-testid="magazine-navigation">
          {links.map(([label, href]) => (
            <Link to={href} key={href} data-testid={`magazine-nav-${label.toLowerCase().replaceAll(" ", "-")}-link`}>{label}</Link>
          ))}
        </nav>
        <div className="header-tools">
          {currentUser ? <><Link className="header-auth-link" to="/account" data-testid="header-account-link"><UserRound size={14} /><span>ACCOUNT</span></Link><button className="header-auth-icon" onClick={logout} aria-label="Log out" data-testid="header-logout-button"><LogOut size={15} /></button></> : <><Link className="header-auth-link" to="/login" data-testid="header-login-link"><LogIn size={14} /><span>LOGIN</span></Link><Link className="header-auth-link register" to="/register" data-testid="header-register-link"><UserPlus size={14} /><span>REGISTER</span></Link></>}
          <button className="mode-toggle" onClick={onToggleMode} aria-label="Toggle Track Mode and Street Mode" data-testid="magazine-mode-toggle"><span className="mode-toggle-label">{trackMode ? "TRACK" : "STREET"}</span>{trackMode ? <Moon size={14} /> : <Sun size={14} />}</button>
        </div>
      </div>
      <div className="header-stripe" aria-hidden="true"><span /></div>
    </header>
  );
}

export { logoAsset };