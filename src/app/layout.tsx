import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import GlobalHeader from "@/components/GlobalHeader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Skin Aura Test | Zenshil",
  description: "Discover your skin's true energy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-HK"
      className={`${inter.variable} ${playfair.variable} h-[100dvh] antialiased`}
    >
      <body className="min-h-[100dvh] flex flex-col selection:bg-rose-200 selection:text-black">
        <GlobalHeader />
        {children}
      </body>
    </html>
  );
}
