'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PageBackground } from '@/components/ui/PageBackground';
import { CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function PaywallPage() {
  const [isLoading, setIsLoading] = useState(false);
  
  // Placeholder price - should be fetched from your payment SDK
  const price = '0,99 €';
  
  const benefits = [
    'Créer des rooms illimitées',
    'Soutenir le développement du projet',
    'Accès aux fonctionnalités premium',
    'Pas de publicité',
    'Support prioritaire',
    'Nouveautés en avant-première'
  ];

  const handleSubscribe = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement actual subscription logic with your payment SDK
      // This is a mock implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Abonnement réussi !');
    } catch (error) {
      toast.error('Erreur lors de l\'abonnement');
      console.error('Subscription error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestore = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement actual restore purchase logic with your payment SDK
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Achat restauré avec succès !');
    } catch (error) {
      toast.error('Aucun achat à restaurer');
      console.error('Restore error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageBackground variant="secondary" className="py-12">
      <div className="container mx-auto px-4 max-w-4xl sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
              Premier de la classe
            </h1>
            <p className="text-xl text-gray-600">
              Accédez à toutes les fonctionnalités premium
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            {/* Price Tag */}
            <div className="bg-blue-600 py-4 px-6">
              <p className="text-white text-center text-4xl font-bold">
                {price} <span className="text-lg font-normal">/ mois</span>
              </p>
            </div>

            {/* Benefits List */}
            <div className="p-6">
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button 
              onClick={handleSubscribe}
              disabled={isLoading}
              className="w-full py-6 text-lg font-semibold bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? 'Chargement...' : 'S\'abonner'}
            </Button>
            
            <Button 
              onClick={handleRestore}
              disabled={isLoading}
              variant="outline"
              className="w-full py-6 text-lg font-semibold text-blue-600 border-blue-600 hover:bg-blue-50"
            >
              Restaurer mon achat
            </Button>
          </div>

          {/* Legal Text */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p className="mb-2">
              {price} par mois. Annulable à tout moment.
            </p>
            <p>
              En vous abonnant, vous acceptez nos{' '}
              <a 
                href="/privacy" 
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Conditions d'utilisation
              </a>{' '}
              et notre{' '}
              <a 
                href="/privacy" 
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Politique de confidentialité
              </a>.
            </p>
          </div>
        </div>
      </div>
    </PageBackground>
  );
}
