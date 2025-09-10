'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, Mail, Lock, ArrowRight, Github, Apple } from 'lucide-react';
import Link from 'next/link';
import { signInWithEmail, signInWithOAuth } from './actions';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (formData: FormData) => {
    setError('');
    
    // Basic validation
    if (!formData.get('email') || !formData.get('password')) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await signInWithEmail(formData);
      if (result.error) {
        throw new Error(result.error);
      }
      // Redirect is handled by the server action
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Identifiants incorrects. Veuillez réessayer.');
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
      // Redirect is handled by the server action
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
            <Github className="w-5 h-5 mr-2" />
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
                  defaultValue={formData.email}
                  className="h-11 px-4 py-3 text-base"
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
                  defaultValue={formData.password}
                  className="h-11 px-4 py-3 text-base"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div>
            <Button 
              type="submit" 
              className="w-full py-6 text-base" 
              disabled={isLoading}
            >
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
          <Link 
            href="/auth/register" 
            className="font-medium text-blue-600 hover:underline"
          >
            Créer un compte
          </Link>
        </div>
      </div>
    </div>
  );
}
