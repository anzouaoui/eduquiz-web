"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";

function PasswordResetForm({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = supabaseBrowser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) throw error;
      
      // Redirect to home after successful password update
      onSuccess();
      router.push("/");
    } catch (err) {
      console.error("Error updating password:", err);
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Réinitialiser votre mot de passe</h1>
          <p className="text-muted-foreground mt-2">
            Entrez et confirmez votre nouveau mot de passe
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Nouveau mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              minLength={6}
              placeholder="••••••••"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirmer le mot de passe
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              minLength={6}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                En cours...
              </>
            ) : (
              'Réinitialiser le mot de passe'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function CallbackClient() {
  const search = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "password" | "done" | "error">("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    const code = search.get("code");
    const type = search.get("type"); // "recovery" pour reset password
    const next = search.get("next") || "/";

    if (!code) {
      setError("Missing code");
      setStatus("error");
      return;
    }

    (async () => {
      const supabase = supabaseBrowser();
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) {
        setError(error.message);
        setStatus("error");
        return;
      }

      // Si lien de récupération de mot de passe
      if (type === "recovery") {
        setStatus("password");
        return;
      }

      setStatus("done");
      router.replace(next);
    })();
  }, [search, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" /> Connecting...
        </div>
      </div>
    );
  }

  if (status === "password") {
    return <PasswordResetForm onSuccess={() => setStatus("done")} />;
  }

  if (status === "error") {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="text-red-600">Auth error: {error}</div>
      </div>
    );
  }

  return null;
}
