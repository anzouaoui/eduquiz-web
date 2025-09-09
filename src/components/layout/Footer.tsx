import Link from 'next/link';
import { useState } from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [showCookieModal, setShowCookieModal] = useState(false);

  return (
    <footer className="border-t bg-background/50 py-6">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-center text-sm text-muted-foreground md:text-left">
          © {currentYear} EduQuiz. Tous droits réservés.
        </p>
        
        <div className="flex items-center gap-4
        ">
          <Link 
            href="/confidentialite" 
            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            Confidentialité
          </Link>
          
          <button 
            onClick={() => setShowCookieModal(true)}
            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            Gérer mes cookies
          </button>
        </div>
      </div>

      {/* Cookie Modal */}
      {showCookieModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg bg-background p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-semibold">Préférences de cookies</h3>
            <p className="mb-6 text-sm text-muted-foreground">
              Nous utilisons des cookies pour améliorer votre expérience. En continuant, vous acceptez notre utilisation des cookies.
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Cookies essentiels</span>
                <span className="text-sm text-muted-foreground">Toujours actifs</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Analytique</span>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" className="peer sr-only" defaultChecked />
                  <div className="peer h-6 w-11 rounded-full bg-muted after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-muted-foreground/20 after:bg-background after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Personnalisation</span>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" className="peer sr-only" defaultChecked />
                  <div className="peer h-6 w-11 rounded-full bg-muted after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-muted-foreground/20 after:bg-background after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
                </label>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button 
                onClick={() => setShowCookieModal(false)}
                className="rounded-md px-4 py-2 text-sm font-medium text-foreground hover:bg-accent"
              >
                Tout refuser
              </button>
              <button 
                onClick={() => setShowCookieModal(false)}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Tout accepter
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
