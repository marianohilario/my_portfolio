"use client";

import ThemeToggle from "./ThemeToggle";
import { clsx } from "clsx";
import { useNavbar } from "@/hooks/useNavbar";

export default function Navbar() {
  const {
    t,
    locale,
    menuOpen,
    setMenuOpen,
    scrolled,
    switchLocale,
    navLinks,
    resumeFile,
  } = useNavbar();

  return (
    <>
      <nav
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "glass-navbar shadow-sm" : "bg-transparent",
        )}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href={`/${locale}#home`}
            className="flex items-center gap-2 font-bold text-base no-underline shrink-0"
            style={{ color: "var(--text-primary)" }}
          >
            <i
              className="ri-code-s-slash-line text-xl"
              style={{ color: "var(--accent)" }}
            />
            <span className="block">Mariano Hilario</span>
          </a>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-0.5 list-none m-0 p-0">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="nav-link px-3 py-2 rounded-lg text-sm font-medium no-underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-1 p-1 rounded-xl glass-card">
              <button
                onClick={() => switchLocale("en")}
                className={clsx(
                  "w-7 h-7 rounded-lg overflow-hidden transition-all duration-200 border-2 cursor-pointer",
                  locale === "en" ? "opacity-100" : "opacity-40",
                )}
                style={{
                  borderColor:
                    locale === "en" ? "var(--accent)" : "transparent",
                }}
                aria-label="English"
              >
                <img
                  src="/assets/EN-Flag.png"
                  alt="EN"
                  className="w-full h-full object-cover"
                />
              </button>
              <button
                onClick={() => switchLocale("es")}
                className={clsx(
                  "w-7 h-7 rounded-lg overflow-hidden transition-all duration-200 border-2 cursor-pointer",
                  locale === "es" ? "opacity-100" : "opacity-40",
                )}
                style={{
                  borderColor:
                    locale === "es" ? "var(--accent)" : "transparent",
                }}
                aria-label="Español"
              >
                <img
                  src="/assets/ES-Flag.png"
                  alt="ES"
                  className="w-full h-full object-cover"
                />
              </button>
            </div>
            <ThemeToggle />
            <a
              href={resumeFile}
              download
              className="btn-primary text-xs px-4 py-2"
            >
              <i className="ri-download-2-line" />
              {t("get-cv")}
            </a>
          </div>

          {/* Mobile: theme + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="w-9 h-9 flex items-center justify-center rounded-xl glass-card transition-all"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <i
                className={clsx(
                  "text-lg",
                  menuOpen ? "ri-close-large-line" : "ri-menu-fill",
                )}
                style={{ color: "var(--text-primary)" }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {/* {menuOpen && ( */}
      {
        <div
          className={`md:hidden fixed inset-0 z-40 transition-transform duration-500 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="glass-navbar shadow-lg p-5 flex flex-col gap-4 h-full pt-16"
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="list-none m-0 p-0 flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="nav-link flex items-center px-4 py-3 rounded-xl text-sm font-medium no-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div
              className="flex items-center gap-3 pt-3 border-t"
              style={{ borderColor: "var(--glass-border)" }}
            >
              <div className="flex items-center gap-1 p-1 rounded-xl glass-card">
                <button
                  onClick={() => switchLocale("en")}
                  className={clsx(
                    "w-8 h-8 rounded-lg overflow-hidden border-2",
                    locale === "en" ? "opacity-100" : "opacity-40",
                  )}
                  style={{
                    borderColor:
                      locale === "en" ? "var(--accent)" : "transparent",
                  }}
                >
                  <img
                    src="/assets/EN-Flag.png"
                    alt="EN"
                    className="w-full h-full object-cover"
                  />
                </button>
                <button
                  onClick={() => switchLocale("es")}
                  className={clsx(
                    "w-8 h-8 rounded-lg overflow-hidden border-2",
                    locale === "es" ? "opacity-100" : "opacity-40",
                  )}
                  style={{
                    borderColor:
                      locale === "es" ? "var(--accent)" : "transparent",
                  }}
                >
                  <img
                    src="/assets/ES-Flag.png"
                    alt="ES"
                    className="w-full h-full object-cover"
                  />
                </button>
              </div>
              <a
                href={resumeFile}
                download
                className="btn-primary text-xs ml-auto"
                onClick={() => setMenuOpen(false)}
              >
                <i className="ri-download-2-line" />
                {t("get-cv")}
              </a>
            </div>
          </div>
        </div>
      }
    </>
  );
}
