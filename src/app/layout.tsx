import type { Metadata } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
const display = Instrument_Serif({ subsets: ["latin"], variable: "--f-display", weight: "400", style: ["normal", "italic"] });
const body = Inter({ subsets: ["latin"], variable: "--f-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--f-mono" });
export const metadata: Metadata = {
  title: "Shishir | Design, Marketing & Development",
  description: "Digital growth and online solutions for modern businesses. Brand design, digital marketing, video editing, web and Android development, AI automation.",
  openGraph: { title: "Shishir | Design, Marketing & Development", description: "Digital growth and online solutions for modern businesses.", type: "website" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body className={`${display.variable} ${body.variable} ${mono.variable}`}>{children}</body></html>);
}
