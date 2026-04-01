"use client";

import { useTranslations, useLocale } from "@/components/LocaleProvider";
import { motion } from "framer-motion";
import Image from "next/image";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};

const socials = [
  {
    href: "https://github.com/marianohilario",
    icon: "ri-github-fill",
    label: "GitHub",
    socialClass: "social-github",
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
  {
    href: "mailto:marianohilario@gmail.com",
    icon: "ri-mail-fill",
    label: "Email",
    socialClass: "social-email",
  },
];

function calcDevYears() {
  const start = new Date(2022, 7, 1); // August 2022
  return Math.floor(
    (Date.now() - start.getTime()) / (1000 * 60 * 60 * 24 * 365.25),
  );
}

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const devYears = calcDevYears();

  const resumeFile =
    locale === "es"
      ? "/assets/resumes/MarianoHilarioResume - ES.pdf"
      : "/assets/resumes/MarianoHilarioResume - EN.pdf";

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20 pb-10"
    >
      <div className="max-w-5xl w-full mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
        {/* Profile image */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="shrink-0"
        >
          <div
            className="relative rounded-full p-0.75"
            style={{
              background: "linear-gradient(135deg, var(--accent), #8b5cf6)",
              width: "clamp(180px, 35vw, 240px)",
              height: "clamp(180px, 35vw, 240px)",
            }}
          >
            <div className="w-full h-full rounded-full overflow-hidden">
              <Image
                src="/assets/profile.png"
                alt="Mariano Hilario"
                width={240}
                height={240}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        </motion.div>

        {/* Text content */}
        <div className="flex flex-col gap-4 text-center md:text-left flex-1">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "var(--accent)" }}
          >
            Fullstack Developer · Buenos Aires, Argentina
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
            className="font-extrabold leading-tight tracking-tight"
            style={{
              color: "var(--text-primary)",
              fontSize: "clamp(1.9rem, 5vw, 3.25rem)",
              letterSpacing: "-0.03em",
            }}
          >
            {t("title")}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
            className="text-base leading-relaxed max-w-xl mx-auto md:mx-0"
            style={{ color: "var(--text-secondary)" }}
          >
            {t("text")}
          </motion.p>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
            className="text-base leading-relaxed max-w-xl mx-auto md:mx-0"
            style={{ color: "var(--accent)" }}
          >
            {t("sub-text", { devYears })}
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.4}
            className="flex flex-wrap gap-3 justify-center md:justify-start"
          >
            <a href="#contact" className="btn-primary">
              <i className="ri-handshake-line" />
              {t("work-with-me")}
            </a>
            <a href="#projects" className="btn-secondary">
              <i className="ri-eye-line" />
              {t("see-portfolio")}
            </a>
            <a href={resumeFile} download className="btn-secondary">
              <i className="ri-download-2-line" />
              CV
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.5}
            className="flex items-center gap-2 justify-center md:justify-start mt-1"
          >
            {socials.map(({ href, icon, label, socialClass }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? "_self" : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className={`glass-card social-link ${socialClass} w-9 h-9 flex items-center justify-center no-underline`}
              >
                <i className={`${icon} text-lg`} />
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
