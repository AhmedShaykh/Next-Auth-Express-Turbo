import ClientSessionProvider from "@/Components/ClientSessionProvider";
import { Inter as FontSans } from "next/font/google";
import { Toaster } from "@/Components/ui/sonner";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Clash App",
  description: "Next Auth.JS Express Turbo Full Stack App"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("min-h-screen font-sans antialiased", fontSans.variable)}
      >
        <ClientSessionProvider>
          {children}
        </ClientSessionProvider>

        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
};