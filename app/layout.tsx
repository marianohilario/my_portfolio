import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Mariano Hilario - Portfolio",
  description:
    "Fullstack developer and operational leader based in Buenos Aires, Argentina.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.2.0/remixicon.min.css"
        />
        <link rel="icon" type="image/png" href="/assets/logo negro.png" />
      </head>
      <body>
        <Providers>
          {/* Background mesh blobs */}
          <div className="bg-mesh" aria-hidden="true">
            <div className="bg-blob bg-blob-1" />
            <div className="bg-blob bg-blob-2" />
            <div className="bg-blob bg-blob-3" />
          </div>
          {children}
        </Providers>
      </body>
    </html>
  );
}

export const runtime = "nodejs";
