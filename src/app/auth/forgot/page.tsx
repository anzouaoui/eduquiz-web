'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { sendResetPassword } from '../actions';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    try {
      setIsLoading(true);
      setError('');
      
      const result = await sendResetPassword(formData);
      
      if (!result) {
        throw new Error('Aucune réponse du serveur');
      }
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      setIsSubmitted(true);
      toast.success('Email de réinitialisation envoyé avec succès');
    } catch (err: unknown) {
      console.error('Password reset error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Email Envoyé</CardTitle>
            <CardDescription>
              Si un compte avec cette adresse email existe, vous recevrez un lien de réinitialisation.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/auth/login">Retour à la connexion</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Mot de passe oublié</CardTitle>
          <CardDescription>
            Entrez votre adresse email pour recevoir un lien de réinitialisation.
          </CardDescription>
        </CardHeader>
        <form action={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium leading-none">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="votre@email.com"
                required
                className={error ? 'border-red-500' : ''}
              />
              {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Envoi en cours...
                </>
              ) : 'Envoyer le lien'}
            </Button>
            <div className="text-center text-sm">
              <Link href="/auth/login" className="text-primary hover:underline">
                Retour à la connexion
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
