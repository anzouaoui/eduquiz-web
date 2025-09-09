'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type ConsentType = {
  necessary: boolean;
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
};

type CookieConsentContextType = {
  consent: ConsentType | null;
  updateConsent: (consent: Partial<ConsentType>) => void;
  isBannerVisible: boolean;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const defaultConsent: ConsentType = {
  necessary: true,  // Always true as these cookies are essential
  preferences: false,
  analytics: false,
  marketing: false,
};

const COOKIE_CONSENT_KEY = 'cookie-consent';

export const CookieConsentContext = createContext<CookieConsentContextType | undefined>(
  undefined
);

export const CookieConsentProvider = ({ children }: { children: ReactNode }) => {
  const [consent, setConsent] = useState<ConsentType | null>(null);
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load saved consent from localStorage on mount
  useEffect(() => {
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (savedConsent) {
      setConsent(JSON.parse(savedConsent));
    } else {
      setConsent(defaultConsent);
      setIsBannerVisible(true);
    }
  }, []);

  const updateConsent = (newConsent: Partial<ConsentType>) => {
    const updatedConsent = {
      ...defaultConsent,
      ...consent,
      ...newConsent,
    };
    
    setConsent(updatedConsent);
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(updatedConsent));
    setIsBannerVisible(false);
    
    // Here you can initialize or remove analytics/marketing scripts based on consent
    if (updatedConsent.analytics) {
      // Initialize analytics
    } else {
      // Remove analytics
    }
    
    if (updatedConsent.marketing) {
      // Initialize marketing
    } else {
      // Remove marketing
    }
  };

  const acceptAll = () => {
    updateConsent({
      necessary: true,
      preferences: true,
      analytics: true,
      marketing: true,
    });
  };

  const rejectAll = () => {
    updateConsent({
      necessary: true, // Necessary cookies can't be disabled
      preferences: false,
      analytics: false,
      marketing: false,
    });
  };

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        updateConsent,
        isBannerVisible,
        isModalOpen,
        openModal: () => setIsModalOpen(true),
        closeModal: () => setIsModalOpen(false),
      }}
    >
      {children}
      {consent && (
        <>
          <CookieBanner 
            isVisible={isBannerVisible} 
            onAcceptAll={acceptAll}
            onCustomize={() => setIsModalOpen(true)}
            onRejectAll={rejectAll}
          />
          <CookieModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            currentConsent={consent}
            onSave={updateConsent}
          />
        </>
      )}
    </CookieConsentContext.Provider>
  );
};

export const useConsent = () => {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error('useConsent must be used within a CookieConsentProvider');
  }
  return context;
};

// Import the actual components
import { CookieBanner } from '@/components/CookieBanner';
import { CookieModal } from '@/components/CookieModal';
