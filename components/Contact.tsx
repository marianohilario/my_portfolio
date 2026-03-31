"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useState, FormEvent } from "react";
import emailjs from "@emailjs/browser";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Contact() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
        form,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "",
      );
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 5000);
  };

  const contactItems = [
    {
      icon: "ri-whatsapp-line",
      color: "#25d366",
      href: "https://wa.me/5491151339874",
      label: t("whatsapp"),
      sub: t("phone-value"),
      isBtn: true,
      socialClass: "social-whatsapp",
    },
    {
      icon: "ri-mail-line",
      color: "var(--accent)",
      href: `mailto:${t("email-value")}`,
      label: "Email",
      sub: t("email-value"),
      isBtn: false,
    },
  ];

  return (
    <section id="contact" className="section">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Left: contact info */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col gap-6"
        >
          <motion.div variants={fadeUp}>
            <p
              className="text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: "var(--accent)" }}
            >
              {t("title")}
            </p>
            <h2
              className="section-title"
              style={{ textAlign: "left", marginBottom: 0 }}
            >
              {t("subtitle")}
            </h2>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col gap-4">
            {contactItems.map(
              ({ icon, color, href, label, sub, socialClass }) => (
                <div key={label} className="flex items-center gap-4">
                  <a
                    href={href}
                    target={href.startsWith("mailto") ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    className={`btn-primary shrink-0 w-36 ${socialClass} text-white!`}
                    style={{ background: color }}
                  >
                    <i className={icon} />
                    {label}
                  </a>
                  <span
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {sub}
                  </span>
                </div>
              ),
            )}
          </motion.div>
        </motion.div>

        {/* Right: form */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <form
            id="contact-form"
            onSubmit={handleSubmit}
            className="glass-card p-6 sm:p-8 flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1.5">
              <label
                className="text-sm font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {t("name-label")}
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder={t("name-placeholder")}
                className="glass-input"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                className="text-sm font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {t("email-label")}
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder={t("email-placeholder")}
                className="glass-input"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                className="text-sm font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {t("message-label")}
              </label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder={t("message-placeholder")}
                className="glass-input resize-none"
              />
            </div>

            {status === "success" && (
              <p className="text-sm font-medium" style={{ color: "#10b981" }}>
                {t("success")}
              </p>
            )}
            {status === "error" && (
              <p className="text-sm font-medium" style={{ color: "#ef4444" }}>
                {t("error")}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-primary w-full"
              style={{ opacity: status === "loading" ? 0.7 : 1 }}
            >
              {status === "loading" ? (
                <>
                  <i
                    className="ri-loader-4-line"
                    style={{ animation: "spin 1s linear infinite" }}
                  />{" "}
                  Sending...
                </>
              ) : (
                <>
                  <i className="ri-send-plane-fill" /> {t("submit")}
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}
