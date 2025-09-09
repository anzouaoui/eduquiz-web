'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center px-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Une erreur est survenue</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        Désolé, une erreur inattendue s'est produite. Veuillez réessayer.
      </p>
      <div className="flex gap-4">
        <Button
          onClick={() => reset()}
        >
          Réessayer
        </Button>
        <Button
          variant="outline"
          asChild
        >
          <a href="/">Retour à l'accueil</a>
        </Button>
      </div>
    </div>
  );
}
