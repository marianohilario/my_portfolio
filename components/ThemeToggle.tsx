"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const localeStorageTheme =
    typeof window !== "undefined" ? localStorage.getItem("theme") : null;

  useEffect(() => {
    setMounted(true);
    if (localeStorageTheme) {
      setTheme(localeStorageTheme);
    } else {
      setTheme(systemTheme || "dark");
    }
  }, []);

  if (!mounted) return <div style={{ width: 36, height: 36 }} />;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="w-9 h-9 flex items-center justify-center rounded-xl glass-card transition-all duration-300 hover:scale-105 cursor-pointer"
      style={{ color: "var(--text-primary)" }}
    >
      <i className={`text-base ${isDark ? "ri-sun-line" : "ri-moon-line"}`} />
    </button>
  );
}
