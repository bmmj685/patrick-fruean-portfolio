"use client";

import Link from "next/link";
import { Download, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";

const links = [
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Projects", "#projects"],
  ["Journey", "#journey"],
  ["Services", "#services"],
  ["Contact", "#contact"],
] as const;

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map(([, href]) => document.querySelector(href))
      .filter((section): section is Element => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-35% 0px -55%", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <nav className="nav-shell" aria-label="Primary navigation">
        <Link className="brand" href="/#top" onClick={() => setOpen(false)} aria-label="Patrick Fruean — home">
          <span className="brand-mark" aria-hidden="true">PF</span>
          <span className="brand-name">Patrick Fruean</span>
        </Link>

        <div className="nav-links" aria-label="Page sections">
          {links.map(([label, href]) => (
            <Link key={href} href={`/${href}`} className={active === href ? "active" : ""}>
              {label}
            </Link>
          ))}
        </div>

        <a className="nav-cv" href={profile.cvPath} download>
          <Download size={16} aria-hidden="true" />
          <span>Download CV</span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </nav>

      <div id="mobile-menu" className={`mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="mobile-menu-inner">
          {links.map(([label, href], index) => (
            <Link
              key={href}
              href={`/${href}`}
              className={active === href ? "active" : ""}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
            >
              <span>0{index + 1}</span>{label}
            </Link>
          ))}
          <a href={profile.cvPath} download className="button button-primary" tabIndex={open ? 0 : -1}>
            <Download size={17} aria-hidden="true" /> Download CV
          </a>
        </div>
      </div>
    </header>
  );
}
