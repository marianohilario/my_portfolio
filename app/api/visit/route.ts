import { NextRequest, NextResponse } from "next/server";

function detectBrowser(ua: string): string {
  if (/Edg\//i.test(ua)) return "Edge";
  if (/OPR|Opera/i.test(ua)) return "Opera";
  if (/Firefox/i.test(ua)) return "Firefox";
  if (/Chrome/i.test(ua)) return "Chrome";
  if (/Safari/i.test(ua)) return "Safari";
  if (ua) return "Other";
  return "Unknown";
}

function detectOS(ua: string): string {
  if (/Windows NT 10/i.test(ua)) return "Windows 10/11";
  if (/Windows NT/i.test(ua)) return "Windows";
  if (/Mac OS X/i.test(ua)) return "macOS";
  if (/Android/i.test(ua)) return "Android";
  if (/iPhone|iPad|iPod/i.test(ua)) return "iOS";
  if (/Linux/i.test(ua)) return "Linux";
  if (ua) return "Other";
  return "Unknown";
}

function detectDevice(ua: string): string {
  if (/iPad|Tablet/i.test(ua)) return "Tablet 📱";
  if (/Mobi|Android|iPhone|iPod/i.test(ua)) return "Mobile 📱";
  return "Desktop 🖥️";
}

function countryFlag(code: string): string {
  if (!code || code.length !== 2) return "";
  try {
    return String.fromCodePoint(
      ...[...code.toUpperCase()].map((c) => c.charCodeAt(0) + 127397),
    );
  } catch {
    return "";
  }
}

function countryName(code: string): string {
  if (!code) return "Unknown";
  try {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(code) ?? code;
  } catch {
    return code;
  }
}

export async function POST(req: NextRequest) {
  try {
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_VISIT_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    const privateKey = process.env.EMAILJS_PRIVATE_KEY;

    if (!serviceId || !templateId || !publicKey) {
      return NextResponse.json({ ok: false });
    }

    // Browser-only data sent by the client
    const body = await req.json();

    // UA from the real HTTP request header (not from client JS — can't be blocked)
    const ua = req.headers.get("user-agent") ?? "";

    // Geo from Vercel's automatic headers (set at the edge, never touch the browser)
    const country_code = req.headers.get("x-vercel-ip-country") ?? "";
    const region = req.headers.get("x-vercel-ip-country-region") ?? "Unknown";
    const rawCity = req.headers.get("x-vercel-ip-city") ?? "";
    const city = rawCity ? decodeURIComponent(rawCity) : "Unknown";
    const latitude = req.headers.get("x-vercel-ip-latitude") ?? "";
    const longitude = req.headers.get("x-vercel-ip-longitude") ?? "";

    // Real client IP
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "Unknown";

    const flag = countryFlag(country_code);
    const name = countryName(country_code);
    const maps_link =
      latitude && longitude
        ? `https://www.google.com/maps?q=${latitude},${longitude}`
        : "N/A";

    const params = {
      // From client
      locale: body.locale ?? "?",
      screen_res: body.screen_res ?? "Unknown",
      lang: body.lang ?? "Unknown",
      timezone: body.timezone ?? "Unknown",
      local_time: body.local_time ?? new Date().toISOString(),
      referrer: body.referrer ?? "Acceso directo",
      // From server headers
      device_type: detectDevice(ua),
      browser: detectBrowser(ua),
      os: detectOS(ua),
      // From Vercel geo headers
      country: country_code ? `${flag} ${name}` : "Unknown",
      country_code,
      city,
      region,
      ip,
      isp: "N/A",
      latitude,
      longitude,
      maps_link,
    };

    // Send via EmailJS REST API (no client-side SDK needed)
    const ejsRes = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        ...(privateKey ? { accessToken: privateKey } : {}),
        template_params: params,
      }),
    });

    return NextResponse.json({ ok: ejsRes.ok });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
