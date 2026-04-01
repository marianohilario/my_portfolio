"use client";

import { useTranslations } from "@/components/LocaleProvider";
import { motion } from "framer-motion";
import TiltCard from "./TiltCard";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const jobs = [
  {
    titleKey: "first-job-title",
    companyKey: "first-job-company",
    dateKey: "first-job-date",
  },
  {
    titleKey: "second-job-title",
    companyKey: "second-job-company",
    dateKey: "second-job-date",
  },
  {
    titleKey: "third-job-title",
    companyKey: "third-job-company",
    dateKey: "third-job-date",
  },
  {
    titleKey: "fourth-job-title",
    companyKey: "fourth-job-company",
    dateKey: "fourth-job-date",
  },
] as const;

const certs = [
  {
    titleKey: "cert1-title",
    companyKey: "cert1-company",
    dateKey: "cert1-date",
    urlKey: "cert1-url",
  },
  {
    titleKey: "cert2-title",
    companyKey: "cert2-company",
    dateKey: "cert2-date",
    urlKey: "cert2-url",
  },
  {
    titleKey: "cert3-title",
    companyKey: "cert3-company",
    dateKey: "cert3-date",
    urlKey: "cert3-url",
  },
  {
    titleKey: "cert4-title",
    companyKey: "cert4-company",
    dateKey: "cert4-date",
    urlKey: "cert4-url",
  },
] as const;

export default function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="section">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="section-header"
      >
        <h2 className="section-title">{t("subtitle")}</h2>
        <p className="section-subtitle">{t("text")}</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Work Experience */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <h3
            className="text-lg font-bold mb-5 flex items-center gap-2"
            style={{ color: "var(--text-primary)" }}
          >
            <span
              className="w-8 h-8 flex items-center justify-center rounded-lg text-sm"
              style={{
                background: "rgba(0,122,255,0.12)",
                color: "var(--accent)",
              }}
            >
              <i className="ri-briefcase-fill" />
            </span>
            {t("work-experience")}
          </h3>
          <div className="flex flex-col gap-3">
            {jobs.map((job) => (
              <motion.div key={job.titleKey} variants={fadeUp}>
                <TiltCard maxTilt={6}>
                  <div className="glass-card p-4 flex items-start gap-3 cursor-default">
                    <div
                      className="w-9 h-9 shrink-0 flex items-center justify-center rounded-lg"
                      style={{
                        background: "rgba(0,122,255,0.1)",
                        color: "var(--accent)",
                      }}
                    >
                      <i className="ri-pen-nib-fill text-sm" />
                    </div>
                    <div className="min-w-0">
                      <h5
                        className="font-semibold text-sm leading-snug"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {t(job.titleKey)}{" "}
                        <span style={{ color: "var(--accent)" }}>
                          {t(job.companyKey)}
                        </span>
                      </h5>
                      <p
                        className="text-xs mt-1"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {t(job.dateKey)}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <h3
            className="text-lg font-bold mb-5 flex items-center gap-2"
            style={{ color: "var(--text-primary)" }}
          >
            <span
              className="w-8 h-8 flex items-center justify-center rounded-lg text-sm"
              style={{ background: "rgba(139,92,246,0.12)", color: "#8b5cf6" }}
            >
              <i className="ri-medal-fill" />
            </span>
            {t("certifications")}
          </h3>
          <div className="flex flex-col gap-3">
            {certs.map((cert) => (
              <motion.div key={cert.titleKey} variants={fadeUp}>
                <TiltCard maxTilt={6}>
                  <div className="glass-card p-4 flex items-center gap-3 cursor-default">
                    <div
                      className="w-9 h-9 shrink-0 flex items-center justify-center rounded-lg"
                      style={{
                        background: "rgba(139,92,246,0.1)",
                        color: "#8b5cf6",
                      }}
                    >
                      <i className="ri-medal-fill text-sm" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5
                        className="font-semibold text-sm leading-snug"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {t(cert.titleKey)}{" "}
                        <span style={{ color: "var(--accent)" }}>
                          {t(cert.companyKey)}
                        </span>
                      </h5>
                      <p
                        className="text-xs mt-1"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {t(cert.dateKey)}
                      </p>
                    </div>
                    <a
                      href={t(cert.urlKey)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover-accent shrink-0 w-8 h-8 flex items-center justify-center rounded-lg no-underline"
                      aria-label="View certificate"
                    >
                      <i className="ri-external-link-line text-sm" />
                    </a>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
