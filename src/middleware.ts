// src/middleware.ts (ou à la racine du projet si tu n'as pas de dossier src)
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  // Toujours créer une response avant toute modif de cookies
  const res = NextResponse.next({ request: { headers: req.headers } });

  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Si les env vars ne sont pas dispo en prod, ne crashe pas le middleware
    if (!url || !key) {
      console.warn("[middleware] Missing Supabase env vars; skipping auth refresh.");
      return res;
    }

    const supabase = createServerClient(url, key, {
      cookies: {
        get: (name: string) => req.cookies.get(name)?.value,
        set: (name: string, value: string, options: any) => {
          res.cookies.set(name, value, options);
          return Promise.resolve();
        },
        remove: (name: string, options: any) => {
          res.cookies.set(name, "", { ...options, expires: new Date(0) });
          return Promise.resolve();
        },
      },
    });

    // Rafraîchit silencieusement la session si nécessaire
    await supabase.auth.getSession();

    return res;
  } catch (e) {
    // Ne jamais faire planter l'edge middleware (sinon 500)
    console.error("[middleware] Error:", e);
    return res;
  }
}

// Limite le middleware aux pages applicatives (pas les assets statiques)
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
