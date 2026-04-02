"use client";

import { useEffect } from "react";

const STORAGE_KEY = "pf_visit_ts";
const COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 hours

export default function VisitTracker() {
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_EMAILJS_VISIT_TEMPLATE_ID) return;

    const last = localStorage.getItem(STORAGE_KEY);
    if (last && Date.now() - Number(last) < COOLDOWN_MS) return;
    localStorage.setItem(STORAGE_KEY, String(Date.now()));

    const locale =
      window.location.pathname.split("/")[1]?.toUpperCase() || "ES";
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localTime = new Date().toLocaleString("es-AR", {
      timeZone: timezone,
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // Only browser-specific data that the server can't access
    fetch("/api/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        screen_res: `${screen.width}×${screen.height}`,
        lang: navigator.language || "Unknown",
        timezone,
        local_time: localTime,
        referrer: document.referrer || "Acceso directo",
        locale,
      }),
    }).catch(() => {});
  }, []);

  return null;
}
