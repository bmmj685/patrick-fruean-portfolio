import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { profile } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="footer">
      <div className="section-shell footer-inner">
        <div>
          <Link className="brand" href="/#top" aria-label="Back to the top">
            <span className="brand-mark" aria-hidden="true">PF</span>
            <span className="brand-name">Patrick Fruean</span>
          </Link>
          <p>Building practical software with systems-level curiosity.</p>
        </div>
        <div className="footer-meta">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <p>© {new Date().getFullYear()} Patrick Fruean</p>
        </div>
        <Link href="/#top" className="back-to-top" aria-label="Back to top">
          <ArrowUp size={18} aria-hidden="true" />
        </Link>
      </div>
    </footer>
  );
}
