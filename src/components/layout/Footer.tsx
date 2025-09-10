"use client";

import Link from 'next/link';
import CookieConsentTrigger from './CookieConsentTrigger';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background/50 py-6">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-center text-sm text-muted-foreground md:text-left">
          © {currentYear} EduQuiz. Tous droits réservés.
        </p>

        <div className="flex items-center gap-4">
          <Link
            href="/confidentialite"
            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            Confidentialité
          </Link>

          <CookieConsentTrigger />
        </div>
      </div>
    </footer>
  );
}
