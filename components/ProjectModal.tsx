"use client";

import { useEffect, JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export interface ModalProject {
  image: string;
  alt: string;
  github: string | null;
  demo: string;
  title: string;
  description: string;
  tech: { icon: (props: { className?: string }) => JSX.Element; name: string }[];
  viewCode: string;
  viewDemo: string;
}

interface ProjectModalProps {
  project: ModalProject | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-50"
            style={{
              background: "rgba(0,0,0,0.55)",
              WebkitBackdropFilter: "blur(16px)",
              backdropFilter: "blur(16px)",
            }}
          />

          {/* Modal container — centers the panel */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              key="modal"
              role="dialog"
              aria-modal="true"
              aria-label={project.title}
              initial={{ opacity: 0, scale: 0.91, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="pointer-events-auto w-full overflow-hidden"
              style={{
                maxWidth: "540px",
                maxHeight: "90vh",
                display: "flex",
                flexDirection: "column",
                background: "var(--glass-bg)",
                border: "1px solid var(--glass-border)",
                borderRadius: "1.75rem",
                WebkitBackdropFilter: "blur(40px)",
                backdropFilter: "blur(40px)",
                boxShadow:
                  "0 40px 100px rgba(0,0,0,0.35), 0 0 0 1px var(--glass-border)",
              }}
            >
              {/* ── Image ── */}
              <div className="relative w-full shrink-0" style={{ height: "260px" }}>
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 600px) 100vw, 540px"
                  priority
                />

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 45%, transparent 100%)",
                  }}
                />

                {/* Accent top line */}
                <div
                  className="absolute top-0 left-0 right-0"
                  style={{
                    height: "3px",
                    background:
                      "linear-gradient(90deg, var(--accent), #8b5cf6, #06b6d4)",
                  }}
                />

                {/* Close button */}
                <button
                  onClick={onClose}
                  autoFocus
                  aria-label="Close"
                  className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
                  style={{
                    background: "rgba(0,0,0,0.45)",
                    WebkitBackdropFilter: "blur(8px)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.25)",
                    color: "#fff",
                  }}
                >
                  <i className="ri-close-line text-lg" />
                </button>
              </div>

              {/* ── Content (scrollable) ── */}
              <div
                className="flex flex-col gap-5 p-6 overflow-y-auto"
                style={{ flex: 1 }}
              >
                {/* Title */}
                <h3
                  className="font-extrabold leading-tight"
                  style={{
                    color: "var(--text-primary)",
                    fontSize: "clamp(1.1rem, 3vw, 1.35rem)",
                    letterSpacing: "-0.025em",
                  }}
                >
                  {project.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed whitespace-pre-line"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {project.description}
                </p>

                {/* Divider */}
                <div
                  style={{ height: "1px", background: "var(--glass-border)" }}
                />

                {/* Tech stack */}
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-3"
                    style={{ color: "var(--accent)" }}
                  >
                    Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map(({ icon: Icon, name }) => (
                      <div
                        key={name}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 hover:scale-105"
                        style={{
                          background: "rgba(0, 122, 255, 0.08)",
                          border: "1px solid rgba(0, 122, 255, 0.2)",
                          color: "var(--text-primary)",
                        }}
                      >
                        <Icon className="w-3.5 h-3.5 shrink-0" />
                        {name}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div
                  style={{ height: "1px", background: "var(--glass-border)" }}
                />

                {/* Action buttons */}
                <div className="flex gap-3 pb-1">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary flex-1"
                      style={{ justifyContent: "center" }}
                    >
                      <i className="ri-github-fill" />
                      {project.viewCode}
                    </a>
                  )}
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{
                      flex: project.github ? 1 : undefined,
                      width: project.github ? undefined : "100%",
                      justifyContent: "center",
                    }}
                  >
                    <i className="ri-external-link-line" />
                    {project.viewDemo}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
