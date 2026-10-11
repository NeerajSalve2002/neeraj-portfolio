"use client";

import { useEffect, useState } from "react";

const links = ["Home", "About", "Skills", "Projects", "Experience", "Blog", "Contact"];

export default function SiteHeader() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialDark = stored ? stored === "dark" : prefersDark;
    setDark(initialDark);
    document.documentElement.dataset.theme = initialDark ? "dark" : "light";
  }, []);

  function toggleTheme() {
    const nextDark = !dark;
    setDark(nextDark);
    document.documentElement.dataset.theme = nextDark ? "dark" : "light";
    localStorage.setItem("theme", nextDark ? "dark" : "light");
  }

  return (
    <header className="site-header section-wrap">
      <a className="brand" href="#home" aria-label="Neeraj Salve home"><span className="brand-mark">n<span>.</span></span><span>Neeraj Salve</span></a>
      <nav className={`main-nav${menuOpen ? " nav-open" : ""}`} aria-label="Main navigation">
        {links.map((link) => <a href={`#${link.toLowerCase()}`} key={link} onClick={() => setMenuOpen(false)}>{link}</a>)}
      </nav>
      <div className="header-actions">
        <a className="header-contact" href="mailto:hello@neerajsalve.dev">Let’s talk <span aria-hidden="true">↗</span></a>
        <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${dark ? "light" : "dark"} theme`} title={`Switch to ${dark ? "light" : "dark"} theme`}><span aria-hidden="true">{dark ? "☼" : "◐"}</span></button>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
      </div>
    </header>
  );
}
