
import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { GraduationCap, Library, Activity } from "lucide-react";

export const metadata: Metadata = {
  title: "Medgenius | Medical CMS Viewer",
  description: "Headless Notion viewer with active recall gym for medical students.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col">
        <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 border-b border-slate-200/60">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-teal-600/20 group-hover:scale-105 transition-all">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-xl font-serif font-bold text-slate-900 tracking-tight">Medgenius</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-teal-600 transition-colors">
                <Library className="w-4 h-4" /> Library
              </Link>
              <Link href="/" className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-teal-600 transition-colors">
                <Activity className="w-4 h-4" /> Progress
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-xs border border-teal-200 shadow-sm">
                DR
              </div>
            </div>
          </div>
        </header>

        <main className="flex-grow">{children}</main>

        <footer className="bg-white border-t border-slate-200 py-10">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
              © 2024 Medgenius — Headless CMS Viewer
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
