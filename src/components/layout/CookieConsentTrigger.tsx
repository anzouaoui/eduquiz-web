"use client";

import { useState } from "react";

export default function CookieConsentTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-sm text-muted-foreground underline-offset-4 hover:underline"
      >
        Gérer mes cookies
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-title"
        >
          <div className="w-full max-w-md rounded-lg bg-background p-6 shadow-lg">
            <h3 id="cookie-title" className="mb-4 text-lg font-semibold">Préférences de cookies</h3>
            {/* … mêmes contenus que ton modal … */}
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => setOpen(false)} className="rounded-md px-4 py-2 text-sm font-medium text-foreground hover:bg-accent">
                Tout refuser
              </button>
              <button type="button" onClick={() => setOpen(false)} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                Tout accepter
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
