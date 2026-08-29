import type { Metadata } from "next";
import localFont from "next/font/local";
import "@repo/ui/styles.css";
import "./globals.css";
import DashboardWrapper from "@/components/DashboardWrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Agentic Trello Project Management Dashboard",
  description: "Project management dashboard web application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <DashboardWrapper>{children}</DashboardWrapper>
      </body>
    </html>
  );
}
