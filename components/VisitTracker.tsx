"use client";

import { useEffect } from "react";
import emailjs from "@emailjs/browser";

const STORAGE_KEY = "pf_visit_ts";
const COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 hours

function detectBrowser(ua: string): string {
  if (/Edg\//i.test(ua)) return "Edge";
  if (/OPR|Opera/i.test(ua)) return "Opera";
  if (/Firefox/i.test(ua)) return "Firefox";
  if (/Chrome/i.test(ua)) return "Chrome";
  if (/Safari/i.test(ua)) return "Safari";
  return "Unknown";
}

function detectOS(ua: string): string {
  if (/Windows NT 10/i.test(ua)) return "Windows 10/11";
  if (/Windows NT/i.test(ua)) return "Windows";
  if (/Mac OS X/i.test(ua)) return "macOS";
  if (/Android/i.test(ua)) return "Android";
  if (/iPhone|iPad|iPod/i.test(ua)) return "iOS";
  if (/Linux/i.test(ua)) return "Linux";
  return "Unknown";
}

function detectDevice(ua: string): string {
  if (/iPad|Tablet/i.test(ua)) return "Tablet 📱";
  if (/Mobi|Android|iPhone|iPod/i.test(ua)) return "Mobile 📱";
  return "Desktop 🖥️";
}

function countryFlag(code: string): string {
  try {
    return String.fromCodePoint(
      ...[...code.toUpperCase()].map((c) => c.charCodeAt(0) + 127397),
    );
  } catch {
    return "";
  }
}

export default function VisitTracker() {
  useEffect(() => {
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_VISIT_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) return;

    // 24-hour cooldown per browser
    const last = localStorage.getItem(STORAGE_KEY);
    if (last && Date.now() - Number(last) < COOLDOWN_MS) return;
    localStorage.setItem(STORAGE_KEY, String(Date.now()));

    const ua = navigator.userAgent;
    const locale =
      (typeof window !== "undefined" &&
        window.location.pathname.split("/")[1]) ||
      "es";
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

    const baseParams = {
      locale: locale.toUpperCase(),
      device_type: detectDevice(ua),
      browser: detectBrowser(ua),
      os: detectOS(ua),
      screen_res: `${screen.width}×${screen.height}`,
      lang: navigator.language || "Unknown",
      timezone,
      local_time: localTime,
      referrer: document.referrer || "Acceso directo",
    };

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);

    fetch("https://ipapi.co/json/", { signal: controller.signal })
      .then((r) => r.json())
      .then((geo) => {
        clearTimeout(timer);
        const flag = countryFlag(geo.country_code ?? "");
        return emailjs.send(
          serviceId,
          templateId,
          {
            ...baseParams,
            country: `${flag} ${geo.country_name ?? "Unknown"}`,
            country_code: geo.country_code ?? "",
            city: geo.city ?? "Unknown",
            region: geo.region ?? "Unknown",
            ip: geo.ip ?? "Unknown",
            isp: geo.org ?? "Unknown",
            latitude: geo.latitude ?? "",
            longitude: geo.longitude ?? "",
            maps_link:
              geo.latitude && geo.longitude
                ? `https://www.google.com/maps?q=${geo.latitude},${geo.longitude}`
                : "N/A",
          },
          publicKey,
        );
      })
      .catch(() => {
        clearTimeout(timer);
        // Send with minimal info if geo API fails
        emailjs.send(
          serviceId,
          templateId,
          {
            ...baseParams,
            country: "Unknown",
            country_code: "",
            city: "Unknown",
            region: "Unknown",
            ip: "Unknown",
            isp: "Unknown",
            latitude: "",
            longitude: "",
            maps_link: "N/A",
          },
          publicKey,
        );
      });
  }, []);

  return null;
}
