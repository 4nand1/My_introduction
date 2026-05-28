import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Cursor from "./components/CursorGlow";
import { WallpaperProvider } from "./components/WallpaperContext";
import WallpaperBackground from "./components/WallpaperBackground";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anand — Developer",
  description: "Full-stack developer from Mongolia. I build fast, purposeful products.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-[#06060b] text-[#eceae3] antialiased overflow-x-hidden cursor-none">
        <WallpaperProvider>
          <Cursor />
          <WallpaperBackground />
          <div className="relative z-10">{children}</div>
        </WallpaperProvider>
      </body>
    </html>
  );
}
