import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MaintenIQ | Maintenance Operations SaaS",
  description: "Maintenance management platform for workshops, assets, technicians and supervisors.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
