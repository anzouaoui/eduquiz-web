import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Layout } from "@/components/layout/Layout";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "EduQuiz - Quiz Scolaire Interactif",
  description: "Apprenez en vous amusant avec des quiz éducatifs pour tous les niveaux scolaires.",
  keywords: ["quiz", "éducation", "apprentissage", "scolaire", "jeu éducatif"],
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${geist.variable} font-sans antialiased`}>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
