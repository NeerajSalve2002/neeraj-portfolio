"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import BrandIcon from "@/components/brand-icon";

const links = ["Home", "About", "Skills", "Projects", "Experience", "Blog", "Contact"];
const themeEvent = "portfolio-theme-change";
const emailComposeUrl = "https://mail.google.com/mail/?view=cm&fs=1&to=neerajsalve01%40gmail.com";

function subscribeToTheme(callback: () => void) {
  window.addEventListener(themeEvent, callback);
  return () => window.removeEventListener(themeEvent, callback);
}

function getThemeSnapshot() {
  return document.documentElement.dataset.theme === "dark";
}

export default function SiteHeader() {
  const dark = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, () => false);
  const [menuOpen, setMenuOpen] = useState(false);
  const themeTransitionTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (themeTransitionTimer.current !== null) window.clearTimeout(themeTransitionTimer.current);
  }, []);

  function toggleTheme() {
    const nextDark = !dark;
    const root = document.documentElement;
    root.classList.add("theme-transitioning");
    root.dataset.theme = nextDark ? "dark" : "light";
    try {
      localStorage.setItem("theme", nextDark ? "dark" : "light");
    } catch {
      // The visual theme still works if browser storage is unavailable.
    }
    window.dispatchEvent(new Event(themeEvent));
    if (themeTransitionTimer.current !== null) window.clearTimeout(themeTransitionTimer.current);
    themeTransitionTimer.current = window.setTimeout(() => {
      root.classList.remove("theme-transitioning");
      themeTransitionTimer.current = null;
    }, 340);
  }

  return (
    <header className="site-header section-wrap">
      <a className="brand" href="#home" aria-label="Neeraj Salve home"><span className="brand-mark">n<span>.</span></span><span>Neeraj Salve</span></a>
      <nav id="main-navigation" className={`main-nav${menuOpen ? " nav-open" : ""}`} aria-label="Main navigation">
        {links.map((link) => <a href={`#${link.toLowerCase()}`} key={link} onClick={() => setMenuOpen(false)}>{link}</a>)}
      </nav>
      <div className="header-actions">
        <a className="header-contact" href={emailComposeUrl} target="_blank" rel="noopener noreferrer"><BrandIcon name="gmail" className="brand-icon-inline" />Let’s talk <span aria-hidden="true">↗</span></a>
        <button className="theme-toggle" type="button" onClick={toggleTheme} aria-pressed={dark} aria-label={`Switch to ${dark ? "light" : "dark"} theme`} title={`Switch to ${dark ? "light" : "dark"} theme`}><span aria-hidden="true">{dark ? "☼" : "◐"}</span></button>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-controls="main-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
      </div>
    </header>
  );
}
