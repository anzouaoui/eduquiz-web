"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/theme-toggle";

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
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-background/50"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Brand */}
        <Link 
          href="/" 
          className="text-xl font-semibold tracking-tight text-foreground"
        >
          EduQuiz
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative text-sm font-medium text-foreground/70 hover:text-foreground",
                "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0",
                "after:bg-foreground after:transition-all after:duration-300",
                "hover:after:w-full"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link 
            href="/login" 
            className="hidden text-sm font-medium text-foreground/70 hover:text-foreground transition-colors md:block"
          >
            Sign in
          </Link>
          <Link 
            href="/signup" 
            className="hidden md:inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 h-10 px-4 py-2"
          >
            Get Started
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-foreground/70 hover:text-foreground focus:outline-none md:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        id="mobile-menu"
        className={cn(
          "md:hidden transition-all duration-300 ease-in-out overflow-hidden",
          isMenuOpen ? "max-h-64 py-2" : "max-h-0"
        )}
        aria-hidden={!isMenuOpen}
      >
        <div className="glass rounded-lg mx-4 p-4 space-y-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2 text-base font-medium text-foreground/90 hover:text-foreground hover:bg-foreground/5 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 border-t border-border/50 mt-2">
            <Link
              href="/login"
              className="block w-full text-center px-3 py-2 text-base font-medium text-foreground/90 hover:text-foreground hover:bg-foreground/5 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="mt-2 block w-full text-center bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium py-2 px-4 rounded-md hover:opacity-90 transition-opacity"
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
