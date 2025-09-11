import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/navbar";

type Theme = 'light' | 'dark';

// Configure Inter for body text
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Configure Sora for headings
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EduQuiz - Quiz Scolaire Interactif",
  description: "Apprenez en vous amusant avec des quiz éducatifs pour tous les niveaux scolaires.",
  keywords: ["quiz", "éducation", "apprentissage", "scolaire", "jeu éducatif"],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://ediquiz.vercel.app'),
  openGraph: {
    title: 'EduQuiz - Quiz Scolaire Interactif',
    description: 'Apprenez en vous amusant avec des quiz éducatifs pour tous les niveaux scolaires.',
    url: '/',
    siteName: 'EduQuiz',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'EduQuiz - Quiz Scolaire Interactif',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EduQuiz - Quiz Scolaire Interactif',
    description: 'Apprenez en vous amusant avec des quiz éducatifs pour tous les niveaux scolaires.',
    images: ['/og-image.jpg'],
  },
  manifest: '/manifest.json',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0B' },
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'EduQuiz',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0B" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#FFFFFF" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0A0A0B" media="(prefers-color-scheme: dark)" />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${sora.variable} font-sans antialiased min-h-screen bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Providers>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
            </div>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
