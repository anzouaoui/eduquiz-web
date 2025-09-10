"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";

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
    // TODO: remplace par ton formulaire "nouveau mot de passe"
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="text-center space-y-2">
          <p className="text-lg font-medium">Set your new password</p>
          <p className="text-sm text-muted-foreground">(render form here calling supabase.auth.updateUser)</p>
        </div>
      </div>
    );
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
