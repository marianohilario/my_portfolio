"use client";

import { useState } from "react";
import { useTranslations } from "@/components/LocaleProvider";
import { motion } from "framer-motion";
import Image from "next/image";
import TiltCard from "./TiltCard";
import ProjectModal from "./ProjectModal";
import type { ModalProject } from "./ProjectModal";
import HtmlIcon from "../public/assets/skills/Html";
import CSSIcon from "../public/assets/skills/CSS";
import JavaScriptIcon from "../public/assets/skills/JavaScript";
import TypeScriptIcon from "../public/assets/skills/TypeScript";
import ReactIcon from "../public/assets/skills/React";
import NextIcon from "../public/assets/skills/Next";
import NodeIcon from "../public/assets/skills/Node";
import ExpressIcon from "../public/assets/skills/Express";
import NestIcon from "../public/assets/skills/Nest";
import MongoIcon from "../public/assets/skills/Mongo";
import PostgresqlIcon from "../public/assets/skills/Postgresql";
import TypeOrmIcon from "../public/assets/skills/TypeOrm";
import WordpressIcon from "../public/assets/skills/Wordpress";
import TailwindIcon from "../public/assets/skills/Tailwind";
import { JSX } from "react";

interface Project {
  id: string;
  image: string;
  alt: string;
  github: string | null;
  demo: string;
  tech: { icon: (props: { className?: string }) => JSX.Element; name: string }[];
}

const projects: Project[] = [
  {
    id: "project4",
    image: "/assets/projects/MVA.png",
    alt: "MVA SRL",
    github: "https://github.com/ArielDRighi/mva-frontend",
    demo: "https://mvasrl.com/",
    tech: [
      { icon: NextIcon, name: "Next.js" },
      { icon: NestIcon, name: "NestJS" },
      { icon: TypeOrmIcon, name: "TypeORM" },
      { icon: PostgresqlIcon, name: "PostgreSQL" },
      { icon: TypeScriptIcon, name: "TypeScript" },
      { icon: TailwindIcon, name: "Tailwind CSS" },
    ],
  },
  {
    id: "project5",
    image: "/assets/projects/Konektia.png",
    alt: "Konektia CRM",
    github: "https://github.com/federicovanni/legalDev",
    demo: "https://demo.konektiacrm.com",
    tech: [
      { icon: NextIcon, name: "Next.js" },
      { icon: NestIcon, name: "NestJS" },
      { icon: TypeOrmIcon, name: "TypeORM" },
      { icon: PostgresqlIcon, name: "PostgreSQL" },
      { icon: TypeScriptIcon, name: "TypeScript" },
      { icon: TailwindIcon, name: "Tailwind CSS" },
    ],
  },
  {
    id: "project1",
    image: "/assets/projects/anaadelina.png",
    alt: "Ana Adelina",
    github: "https://github.com/marianohilario/turnero-ana-adelina",
    demo: "https://turnero-ana-adelina.vercel.app/",
    tech: [
      { icon: ReactIcon, name: "React" },
      { icon: ExpressIcon, name: "Express" },
      { icon: TypeScriptIcon, name: "TypeScript" },
      { icon: PostgresqlIcon, name: "PostgreSQL" },
    ],
  },
  {
    id: "project2",
    image: "/assets/projects/mhmovies.png",
    alt: "MH Movies",
    github: "https://github.com/marianohilario/movies-platform",
    demo: "https://movies-platform-lemon.vercel.app/",
    tech: [
      { icon: HtmlIcon, name: "HTML5" },
      { icon: JavaScriptIcon, name: "JS" },
      { icon: MongoIcon, name: "MongoDB" },
    ],
  },
  {
    id: "project3",
    image: "/assets/projects/pork.png",
    alt: "Pork Custom Toys",
    github: "https://github.com/marianohilario/pork",
    demo: "https://pork-custom-toys.vercel.app/",
    tech: [
      { icon: HtmlIcon, name: "HTML5" },
      { icon: CSSIcon, name: "CSS" },
      { icon: JavaScriptIcon, name: "JS" },
    ],
  },
  {
    id: "project6",
    image: "/assets/projects/qrcodegenerator.png",
    alt: "QR Generator",
    github: "https://github.com/marianohilario/QR-Code-Generator",
    demo: "https://qr-code-generator-drab-six.vercel.app/",
    tech: [
      { icon: HtmlIcon, name: "HTML5" },
      { icon: CSSIcon, name: "CSS" },
      { icon: JavaScriptIcon, name: "JS" },
    ],
  },
  {
    id: "project7",
    image: "/assets/projects/translator.png",
    alt: "Translator",
    github: "https://github.com/marianohilario/translator-app",
    demo: "https://translator-app-bay.vercel.app/",
    tech: [
      { icon: HtmlIcon, name: "HTML5" },
      { icon: JavaScriptIcon, name: "JS" },
    ],
  },
  {
    id: "project8",
    image: "/assets/projects/draganddropnotes.png",
    alt: "Drag and Drop Notes",
    github: "https://github.com/marianohilario/drag-and-drop-notes",
    demo: "https://drag-and-drop-notes-henna.vercel.app/",
    tech: [
      { icon: HtmlIcon, name: "HTML5" },
      { icon: JavaScriptIcon, name: "JS" },
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

export default function Projects() {
  const t = useTranslations("projects");
  const [selected, setSelected] = useState<ModalProject | null>(null);

  const openModal = (project: Project) => {
    const titleKey = `${project.id}-title` as Parameters<typeof t>[0];
    const descKey = `${project.id}-desc` as Parameters<typeof t>[0];
    setSelected({
      image: project.image,
      alt: project.alt,
      github: project.github,
      demo: project.demo,
      title: t(titleKey),
      description: t(descKey),
      tech: project.tech,
      viewCode: t("view-code"),
      viewDemo: t("view-demo"),
    });
  };

  return (
    <section id="projects" className="section">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="section-header"
      >
        <h2 className="section-title">{t("title")}</h2>
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
      >
        {projects.map((project) => {
          const titleKey = `${project.id}-title` as Parameters<typeof t>[0];
          const descKey = `${project.id}-desc` as Parameters<typeof t>[0];

          return (
            <motion.div key={project.id} variants={fadeUp} className="h-full">
              <TiltCard maxTilt={8} className="h-full">
                <div
                  className="glass-card overflow-hidden flex flex-col h-full cursor-pointer group"
                  onClick={() => openModal(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && openModal(project)}
                  aria-label={`Open ${t(titleKey)} details`}
                >
                  {/* Project image */}
                  <div className="relative h-40 sm:h-44 overflow-hidden shrink-0">
                    <Image
                      src={project.image}
                      alt={project.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    {/* Gradient overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 60%)",
                      }}
                    />
                    {/* Expand hint — appears on hover */}
                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{ background: "rgba(0, 122, 255, 0.12)" }}
                    >
                      <div
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                        style={{
                          background: "rgba(0,0,0,0.5)",
                          WebkitBackdropFilter: "blur(8px)",
                          backdropFilter: "blur(8px)",
                          border: "1px solid rgba(255,255,255,0.25)",
                          color: "#fff",
                        }}
                      >
                        <i className="ri-zoom-in-line text-sm" />
                        Ver más
                      </div>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="flex flex-col flex-1 p-4 gap-2.5">
                    <h4
                      className="font-bold text-sm"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {t(titleKey)}
                    </h4>
                    <p
                      className="text-xs leading-relaxed flex-1 line-clamp-3"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {t(descKey)}
                    </p>

                    {/* Tech icons */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map(({ icon: Icon, name }) => (
                        <div key={name} className="has-tooltip">
                          <Icon className="w-4 h-4 object-contain opacity-60" />
                          <span className="tooltip-label">{name}</span>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-1">
                      {project.github ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-8 h-8 flex items-center justify-center rounded-lg no-underline transition-all duration-200 hover:scale-110 hover-accent"
                          aria-label="View code on GitHub"
                        >
                          <i className="ri-github-fill text-lg" />
                        </a>
                      ) : (
                        <div className="w-8 h-8" />
                      )}
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="btn-primary text-xs flex-1"
                        style={{ padding: "0.4rem 0.75rem" }}
                      >
                        <i className="ri-external-link-line" />
                        {t("view-demo")}
                      </a>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          );
        })}
      </motion.div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
