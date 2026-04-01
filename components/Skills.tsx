"use client";

import { useTranslations } from "@/components/LocaleProvider";
import { motion } from "framer-motion";
import HtmlIcon from "../public/assets/skills/Html";
import CSSIcon from "../public/assets/skills/CSS";
import JavaScriptIcon from "../public/assets/skills/JavaScript";
import TypeScriptIcon from "../public/assets/skills/TypeScript";
import ReactIcon from "../public/assets/skills/React";
import NextIcon from "../public/assets/skills/Next";
import NodeIcon from "../public/assets/skills/Node";
import ExpressIcon from "../public/assets/skills/Express";
import NestIcon from "../public/assets/skills/Nest";
import PythonIcon from "../public/assets/skills/Python";
import FastApiIcon from "../public/assets/skills/FastApi";
import MongoIcon from "../public/assets/skills/Mongo";
import PostgresqlIcon from "../public/assets/skills/Postgresql";
import TypeOrmIcon from "../public/assets/skills/TypeOrm";
import JestIcon from "../public/assets/skills/Jest";
import DockerIcon from "../public/assets/skills/Docker";
import WordpressIcon from "../public/assets/skills/Wordpress";
import TailwindIcon from "../public/assets/skills/Tailwind";
import GithubIcon from "../public/assets/skills/Github";
import GitlabIcon from "../public/assets/skills/Gitlab";

const skills = [
  { icon: HtmlIcon, name: "HTML5" },
  { icon: CSSIcon, name: "CSS3" },
  { icon: TailwindIcon, name: "Tailwind" },
  { icon: JavaScriptIcon, name: "JavaScript" },
  { icon: TypeScriptIcon, name: "TypeScript" },
  { icon: ReactIcon, name: "React" },
  { icon: NextIcon, name: "Next.js" },
  { icon: NodeIcon, name: "Node.js" },
  { icon: ExpressIcon, name: "Express" },
  { icon: NestIcon, name: "NestJS" },
  { icon: PythonIcon, name: "Python" },
  { icon: FastApiIcon, name: "FastAPI" },
  { icon: MongoIcon, name: "MongoDB" },
  { icon: PostgresqlIcon, name: "PostgreSQL" },
  { icon: TypeOrmIcon, name: "TypeORM" },
  { icon: JestIcon, name: "Jest" },
  { icon: DockerIcon, name: "Docker" },
  { icon: WordpressIcon, name: "WordPress" },
  { icon: GithubIcon, name: "Github" },
  { icon: GitlabIcon, name: "Gitlab" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const skillSections = [
  {
    titleKey: "frontend-title",
    textKey: "frontend-text",
    icon: "ri-layout-line",
    color: "#3b82f6",
  },
  {
    titleKey: "backend-title",
    textKey: "backend-text",
    icon: "ri-server-line",
    color: "#8b5cf6",
  },
  {
    titleKey: "testing-title",
    textKey: "testing-text",
    icon: "ri-bug-line",
    color: "#10b981",
  },
  {
    titleKey: "devops-title",
    textKey: "devops-text",
    icon: "ri-git-branch-line",
    color: "#f59e0b",
  },
  {
    titleKey: "soft-title",
    textKey: "soft-text",
    icon: "ri-team-line",
    color: "#ec4899",
  },
] as const;

export default function Skills() {
  const t = useTranslations("skills");

  return (
    <section id="skills" className="section">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="section-header"
      >
        <h2 className="section-title">{t("subtitle")}</h2>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-10 items-start">
        {/* Descriptions */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-col gap-3"
        >
          {skillSections.map(({ titleKey, textKey, icon, color }) => (
            <motion.div key={titleKey} variants={fadeUp}>
              <div className="glass-card p-4 flex gap-3 items-start">
                <div
                  className="w-9 h-9 shrink-0 flex items-center justify-center rounded-lg"
                  style={{ background: `${color}18`, color }}
                >
                  <i className={`${icon} text-sm`} />
                </div>
                <div>
                  <h4
                    className="font-semibold text-sm mb-0.5"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {t(titleKey)}
                  </h4>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {t(textKey)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          <motion.div variants={fadeUp} className="mt-1">
            <a href="#contact" className="btn-primary inline-flex">
              <i className="ri-handshake-line" />
              {t("work-with-me")}
            </a>
          </motion.div>
        </motion.div>

        {/* Skills grid — uses .skill-tile CSS class for hover (no JS handlers) */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <div className="glass-card p-5 sm:p-6">
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-2">
              {skills.map(({ icon: Icon, name }) => (
                <motion.div
                  key={name}
                  variants={fadeUp}
                  className="has-tooltip skill-tile"
                >
                  <Icon className="w-9 h-9 sm:w-10 sm:h-10 object-contain" />
                  <span
                    className="text-xs font-medium text-center leading-tight"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
