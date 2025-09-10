
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";

export default function AuthCallbackPage() {
  const search = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading"|"password"|"done"|"error">("loading");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const code = search.get("code");
    const next = search.get("next") || "/";
    
    if (!code) {
      setError("Missing authentication code");
      setStatus("error");
      return;
    }

    const handleAuth = async () => {
      try {
        const supabase = supabaseBrowser();
        const { data, error: authError } = await supabase.auth.exchangeCodeForSession(code);
        
        if (authError) { 
          throw new Error(authError.message);
        }

        // Check if this is a password recovery flow
        const type = search.get("type");
        if (type === "recovery" || 
            (data?.user?.app_metadata?.provider === "email" && 
             data?.user?.email_confirmed_at)) {
          setStatus("password");
          return;
        }

        // Regular auth flow - redirect to home
        router.replace(next);
        setStatus("done");
      } catch (err) {
        console.error("Authentication error:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        setStatus("error");
      }
    };

    handleAuth();
  }, [search, router]);

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError("Please enter a new password");
      return;
    }
    
    setIsUpdating(true);
    try {
      const supabase = supabaseBrowser();
      const { error } = await supabase.auth.updateUser({
        password: password
      });
      
      if (error) throw error;
      
      // Password updated successfully
      router.push("/auth/login?message=Password updated successfully");
    } catch (err) {
      console.error("Password update error:", err);
      setError(err instanceof Error ? err.message : "Failed to update password");
    } finally {
      setIsUpdating(false);
    }
  };

  // Loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Authenticating...</span>
        </div>
      </div>
    );
  }

  // Password reset form
  if (status === "password") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Set New Password</h1>
            <p className="mt-2 text-gray-600">Please enter your new password below.</p>
          </div>
          
          {error && (
            <div className="p-3 text-sm text-red-700 bg-red-100 rounded-md">
              {error}
            </div>
          )}
          
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter your new password"
              />
            </div>
            
            <button
              type="submit"
              disabled={isUpdating}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Error state
  if (status === "error") {
    return (
      <div className="min-h-screen grid place-items-center p-4">
        <div className="w-full max-w-md p-6 space-y-4 text-center bg-white rounded-lg shadow">
          <div className="text-red-500">
            <svg
              className="w-12 h-12 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Authentication Error</h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.href = "/auth/login"}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  // Default return (should not be reached in normal flow)
  return null;
}
