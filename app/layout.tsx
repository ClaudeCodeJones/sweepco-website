import type { Metadata } from "next";
import { Archivo, Archivo_Black } from "next/font/google";
import "./globals.css";
import { brand } from "@/config/brand";
import { site } from "@/config/site";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import RevealObserver from "@/app/components/RevealObserver";

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
});

const archivoblack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo-black",
});

export const metadata: Metadata = {
  title: "SweepCo | Coming Soon",
  description:
    "SweepCo provides professional sweeping services across New Zealand. Website launching soon.",
  metadataBase: new URL(site.url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-NZ"
      className={`${archivo.variable} ${archivoblack.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
          <Navbar />
          <main className="flex-1 pt-14 md:pt-20">{children}</main>
          <Footer />
          <RevealObserver />
        </body>
    </html>
  );
}
