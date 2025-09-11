"use client";

import { useTransition } from "react";
import { signInWithOAuth } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

type Provider = "google" | "apple";

interface OAuthProvider {
  name: string;
  icon: keyof typeof Icons;
  provider: Provider;
}

const providers: OAuthProvider[] = [
  {
    name: "Google",
    icon: "google",
    provider: "google",
  },
  {
    name: "Apple",
    icon: "apple",
    provider: "apple",
  },
];

export function OAuthButtons() {
  const [isPending, startTransition] = useTransition();

  const handleOAuthSignIn = (provider: Provider) => {
    startTransition(async () => {
      try {
        await signInWithOAuth(provider);
      } catch (error) {
        console.error(`Error signing in with ${provider}:`, error);
      }
    });
  };

  return (
    <div className="grid gap-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Ou continuer avec
          </span>
        </div>
      </div>
      
      {providers.map(({ name, icon, provider }) => {
        const Icon = Icons[icon];
        
        return (
          <Button
            key={provider}
            type="button"
            variant="outline"
            className="w-full"
            disabled={isPending}
            onClick={() => handleOAuthSignIn(provider)}
          >
            {Icon && <Icon className="mr-2 h-4 w-4" />}
            {`Continuer avec ${name}`}
          </Button>
        );
      })}
    </div>
  );
}
