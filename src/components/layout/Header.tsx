"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/UserButton";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Rooms", href: "/rooms" },
  { name: "Pricing", href: "/pricing" },
  { name: "Privacy", href: "/privacy" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 border-b border-transparent",
        isScrolled ? "bg-background/80 backdrop-blur-md border-border/10" : "bg-background/50"
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          {/* Brand */}
          <Link 
            href="/" 
            className="text-xl font-semibold tracking-tight text-foreground hover:opacity-80 transition-opacity"
          >
            EduQuiz
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <UserButton />
            <ThemeToggle />
          </div>
          <div className="md:hidden">
            <ThemeToggle />
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'md:hidden absolute inset-x-0 top-16 z-50 w-full origin-top scale-100 transform bg-background/95 p-4 opacity-100 transition-all duration-200 ease-in-out border-t border-border/10',
          !isMenuOpen && 'invisible scale-95 opacity-0',
        )}
        id="mobile-menu"
      >
        <div className="space-y-4 px-2 pb-3 pt-2">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-md px-3 py-2 text-base font-medium text-foreground/80 hover:bg-muted/50"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-border/20">
            <Link
              href="/login"
              className="block w-full rounded-md bg-muted/50 px-3 py-2 text-center text-base font-medium text-foreground hover:bg-muted/80 mb-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="block w-full rounded-md bg-primary px-3 py-2 text-center text-base font-medium text-primary-foreground hover:bg-primary/90"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
