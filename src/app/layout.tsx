import type { Metadata } from "next";
import { Fuzzy_Bubbles, Funnel_Display, Funnel_Sans } from "next/font/google";
import "./globals.css";

const fuzzyBubbles = Fuzzy_Bubbles({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-fuzzy-bubbles",
  display: "swap",
});

const funnelSans = Funnel_Sans({
  subsets: ["latin"],
  variable: "--font-funnel-sans",
  display: "swap",
});

const funnelDisplay = Funnel_Display({
  subsets: ["latin"],
  variable: "--font-funnel-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Proof Of Work Lol",
  description: "Proof Of Work Lol",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fuzzyBubbles.variable} ${funnelSans.variable} ${funnelDisplay.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
