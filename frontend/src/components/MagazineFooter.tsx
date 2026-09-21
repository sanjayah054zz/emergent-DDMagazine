import { Facebook, Instagram, X, Youtube } from "@/lib/lucide-react";
import { Link } from "react-router-dom";
import { logoAsset } from "@/components/MagazineHeader";

export function MagazineFooter() {
  return (
    <footer className="site-footer magazine-footer" data-testid="magazine-footer">
      <div className="footer-brand"><img src={logoAsset} alt="Daily Driver" data-testid="magazine-footer-logo" /><span data-testid="magazine-footer-tagline">THE EVERYDAY AUTOMOTIVE MAGAZINE // EST. 2026</span></div>
      <div className="footer-socials" data-testid="magazine-footer-socials"><span data-testid="magazine-footer-social-label">FOLLOW THE LINE</span><a href="#top" aria-label="Facebook" data-testid="magazine-footer-facebook"><Facebook size={17} /></a><a href="#top" aria-label="Instagram" data-testid="magazine-footer-instagram"><Instagram size={17} /></a><a href="#top" aria-label="X" data-testid="magazine-footer-x"><X size={17} /></a><a href="#top" aria-label="YouTube" data-testid="magazine-footer-youtube"><Youtube size={18} /></a></div>
      <div className="footer-support-links" data-testid="magazine-footer-support"><Link to="/help" data-testid="footer-help-link">HELP</Link><Link to="/contact" data-testid="footer-contact-link">CONTACT US</Link></div>
      <p data-testid="magazine-footer-legal">© 2026 Daily Driver Magazine. All telemetry and automotive reviews reserved.</p>
    </footer>
  );
}