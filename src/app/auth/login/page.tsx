'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, Mail, Lock, ArrowRight, Apple } from 'lucide-react';
import Link from 'next/link';
import { signInWithEmail, signInWithOAuth } from './actions';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // (facultatif) si tu veux préremplir, garde un state; sinon on peut supprimer complètement ce state.
  const [formState] = useState({ email: '', password: '' });

  // ✅ Corrigé: handler typé en événement, puis FormData depuis le formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const fd = new FormData(e.currentTarget);

    if (!fd.get('email') || !fd.get('password')) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    setIsLoading(true);
    try {
      const result = await signInWithEmail(fd);
      if (result?.error) {
        throw new Error(result.error);
      }
      // Redirection gérée côté Server Action (ou via Supabase)
    } catch (err) {
      console.error('Login error:', err);
      setError(
        err instanceof Error ? err.message : 'Identifiants incorrects. Veuillez réessayer.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'apple') => {
    try {
      const result = await signInWithOAuth(provider);
      if (result?.error) {
        throw new Error(result.error);
      }
    } catch (err) {
      console.error('Social login error:', err);
      toast.error('Erreur lors de la connexion avec ' + provider);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Content de vous revoir</h1>
          <p className="mt-2 text-gray-600">Connectez-vous à votre compte</p>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full py-6 border-gray-300 hover:bg-gray-50"
            onClick={() => handleSocialLogin('google')}
          >
            {/* Remplace l’icône si tu veux le vrai logo Google */}
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continuer avec Google
          </Button>

          <Button
            variant="outline"
            className="w-full py-6 border-gray-300 hover:bg-gray-50"
            onClick={() => handleSocialLogin('apple')}
          >
            <Apple className="w-5 h-5 mr-2" />
            Continuer avec Apple
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Ou continuer avec</span>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 text-sm text-red-600 bg-red-50 rounded-lg">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Adresse email
              </Label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  defaultValue={formState.email}
                  className="h-11 pl-10 pr-4 py-3 text-base"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Mot de passe
                </Label>
                <Link href="/auth/forgot" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                  Mot de passe oublié ?
                </Link>
              </div>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  defaultValue={formState.password}
                  className="h-11 pl-10 pr-4 py-3 text-base"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full py-6 text-base" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Connexion...
                </>
              ) : (
                <>
                  Se connecter
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        </form>

        <div className="text-center text-sm text-gray-600">
          Pas encore de compte ?{' '}
          <Link href="/auth/register" className="font-medium text-blue-600 hover:text-blue-500">
            Créer un compte
          </Link>
        </div>
      </div>
    </div>
  );
}
