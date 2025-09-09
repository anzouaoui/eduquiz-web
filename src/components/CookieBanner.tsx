'use client';

import { Button } from './ui/button';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CookieBannerProps {
  isVisible: boolean;
  onAcceptAll: () => void;
  onCustomize: () => void;
  onRejectAll: () => void;
}

export function CookieBanner({ isVisible, onAcceptAll, onCustomize, onRejectAll }: CookieBannerProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onRejectAll();
    }, 300);
  };

  if (!isMounted || !isVisible) return null;

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 z-50 transition-transform duration-300 transform ${
        isClosing ? 'translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h2 className="text-lg font-medium text-gray-900">Nous utilisons des cookies</h2>
              <button
                type="button"
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                aria-label="Fermer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-1 text-sm text-gray-600">
              Nous utilisons des cookies pour améliorer votre expérience sur notre site. 
              Certains cookies sont nécessaires au bon fonctionnement du site.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={onRejectAll}
              className="w-full sm:w-auto"
            >
              Tout refuser
            </Button>
            <Button
              variant="outline"
              onClick={onCustomize}
              className="w-full sm:w-auto"
            >
              Personnaliser
            </Button>
            <Button
              onClick={onAcceptAll}
              className="w-full sm:w-auto"
            >
              Tout accepter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
