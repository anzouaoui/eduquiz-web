"use client";

import Link from "next/link";
import { Container } from "./Container";
import { cn } from "@/lib/utils";

const footerLinks = [
  {
    title: "Product",
    items: [
      { name: "Features", href: "/#features" },
      { name: "Pricing", href: "/pricing" },
      { name: "Rooms", href: "/rooms" },
      { name: "Templates", href: "/templates" },
    ],
  },
  {
    title: "Company",
    items: [
      { name: "About Us", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    items: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "GDPR", href: "/gdpr" },
    ],
  },
];

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className={cn(
      "text-sm text-muted-foreground transition-colors hover:text-foreground",
      "inline-block py-1.5"
    )}
  >
    {children}
  </Link>
);

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background">
      {/* Gradient top border */}
      <div className="bg-gradient-accent h-[1px] w-full" />
      
      {/* Main footer content */}
      <div className="section-y">
        <Container>
          <div className="grid gap-8 md:grid-cols-4">
            {/* Brand column */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">EduQuiz</h3>
              <p className="text-sm text-muted-foreground">
                Making learning interactive and engaging through gamified quizzes and collaborative learning experiences.
              </p>
            </div>

            {/* Link columns */}
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h4 className="mb-4 text-sm font-medium">{section.title}</h4>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item.name}>
                      <FooterLink href={item.href}>{item.name}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="mt-12 border-t border-border/50 pt-6 text-sm text-muted-foreground">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p>© {currentYear} EduQuiz. All rights reserved.</p>
              <div className="flex items-center space-x-6">
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
