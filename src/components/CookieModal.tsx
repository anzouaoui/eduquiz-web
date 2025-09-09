'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { Button } from './ui/button';
import { X } from 'lucide-react';

interface CookieModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentConsent: {
    necessary: boolean;
    preferences: boolean;
    analytics: boolean;
    marketing: boolean;
  };
  onSave: (consent: {
    necessary: boolean;
    preferences: boolean;
    analytics: boolean;
    marketing: boolean;
  }) => void;
}

export function CookieModal({ isOpen, onClose, currentConsent, onSave }: CookieModalProps) {
  const [consent, setConsent] = useState(currentConsent);

  const handleSave = () => {
    onSave(consent);
    onClose();
  };

  const handleAcceptAll = () => {
    onSave({
      necessary: true,
      preferences: true,
      analytics: true,
      marketing: true,
    });
    onClose();
  };

  const handleRejectAll = () => {
    onSave({
      necessary: true,
      preferences: false,
      analytics: false,
      marketing: false,
    });
    onClose();
  };

  const handleToggle = (key: keyof typeof consent) => {
    if (key === 'necessary') return; // Can't disable necessary cookies
    setConsent(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-center mb-6">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Préférences de confidentialité
                  </Dialog.Title>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={onClose}
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <p className="text-sm text-gray-600">
                    Nous utilisons des cookies pour améliorer votre expérience sur notre site. 
                    Sélectionnez les cookies que vous souhaitez activer.
                  </p>

                  <div className="space-y-4">
                    {/* Necessary Cookies - Always on */}
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="necessary"
                          name="necessary"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          checked={true}
                          disabled
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="necessary" className="font-medium text-gray-700">
                          Cookies nécessaires
                        </label>
                        <p className="text-gray-500">
                          Essentiels au bon fonctionnement du site. Ne peuvent pas être désactivés.
                        </p>
                      </div>
                    </div>

                    {/* Preferences */}
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="preferences"
                          name="preferences"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          checked={consent.preferences}
                          onChange={() => handleToggle('preferences')}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="preferences" className="font-medium text-gray-700">
                          Cookies de préférences
                        </label>
                        <p className="text-gray-500">
                          Permettent de mémoriser vos préférences (comme la langue ou la région).
                        </p>
                      </div>
                    </div>

                    {/* Analytics */}
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="analytics"
                          name="analytics"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          checked={consent.analytics}
                          onChange={() => handleToggle('analytics')}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="analytics" className="font-medium text-gray-700">
                          Cookies d'analyse
                        </label>
                        <p className="text-gray-500">
                          Nous aident à comprendre comment vous utilisez notre site pour l'améliorer.
                        </p>
                      </div>
                    </div>

                    {/* Marketing */}
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="marketing"
                          name="marketing"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          checked={consent.marketing}
                          onChange={() => handleToggle('marketing')}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="marketing" className="font-medium text-gray-700">
                          Cookies marketing
                        </label>
                        <p className="text-gray-500">
                          Utilisés pour vous proposer des publicités personnalisées.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row-reverse sm:justify-between gap-3">
                  <div className="space-x-3">
                    <Button
                      onClick={handleSave}
                      className="w-full sm:w-auto"
                    >
                      Enregistrer les préférences
                    </Button>
                    <Button
                      variant="outline"
                      onClick={onClose}
                      className="w-full sm:w-auto mt-2 sm:mt-0"
                    >
                      Annuler
                    </Button>
                  </div>
                  <div className="space-x-3 mt-2 sm:mt-0">
                    <Button
                      variant="outline"
                      onClick={handleAcceptAll}
                      className="w-full sm:w-auto"
                    >
                      Tout accepter
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleRejectAll}
                      className="w-full sm:w-auto mt-2 sm:mt-0"
                    >
                      Tout refuser
                    </Button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
