"use client";

import { useTranslations } from "@/components/LocaleProvider";

export default function Footer() {
  const tNav = useTranslations("navbar");
  const tFooter = useTranslations("footer");

  const links = [
    { href: "#home", label: tNav("home") },
    { href: "#about", label: tNav("about") },
    { href: "#skills", label: tNav("skills") },
    { href: "#projects", label: tNav("projects") },
    { href: "#contact", label: tNav("contact") },
  ];

  return (
    <footer className="glass-navbar mt-10 py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex flex-col items-center sm:items-start gap-1">
          <a
            href="#home"
            className="flex items-center gap-2 font-bold text-base no-underline"
            style={{ color: "var(--text-primary)" }}
          >
            <i
              className="ri-code-s-slash-line text-xl"
              style={{ color: "var(--accent)" }}
            />
            Mariano Hilario
          </a>
          <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
            {tFooter("copyright")}
          </p>
        </div>

        {/* Nav links */}
        <nav className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs no-underline transition-colors duration-200"
              style={{ color: "var(--text-secondary)" }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Socials */}
        <div className="flex items-center gap-2">
          {[
            {
              href: "https://github.com/marianohilario",
              icon: "ri-github-fill",
              label: "GitHub",
              socialClass: "social-github",
            },
            {
              href: "https://gitlab.com/marianoJobchain",
              icon: "ri-gitlab-fill",
              label: "GitLab",
              socialClass: "social-gitlab",
            },
            {
              href: "https://www.linkedin.com/in/marianohilario/",
              icon: "ri-linkedin-box-fill",
              label: "LinkedIn",
              socialClass: "social-linkedin",
            },
            {
              href: "https://wa.me/5491151339874",
              icon: "ri-whatsapp-fill",
              label: "WhatsApp",
              socialClass: "social-whatsapp",
            },
          ].map(({ href, icon, label, socialClass }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={`w-8 h-8 flex items-center justify-center rounded-xl glass-card no-underline transition-all duration-200 hover:scale-110 ${socialClass}`}
            >
              <i className={`${icon} text-sm`} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
