import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio.example"),
  title: {
    default: "Patrick Fruean | Full-Stack Developer & Computer Science Student",
    template: "%s | Patrick Fruean",
  },
  description:
    "Portfolio of Patrick Fruean, a Computer Science student and full-stack developer focused on web applications, databases, networking, systems, and cybersecurity.",
  applicationName: "Patrick Fruean Portfolio",
  authors: [{ name: "Patrick Fruean" }],
  creator: "Patrick Fruean",
  keywords: ["Patrick Fruean", "full-stack developer", "computer science", "Laravel developer", "Next.js developer", "cybersecurity", "Samoa", "Fiji"],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Patrick Fruean | Full-Stack Developer",
    description: "Practical software, grounded in systems thinking.",
    siteName: "Patrick Fruean Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Patrick Fruean | Full-Stack Developer",
    description: "Practical software, grounded in systems thinking.",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#07111f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
