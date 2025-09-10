// src/app/auth/callback/page.tsx
import { Suspense } from "react";
import CallbackClient from "./CallbackClient";

export const dynamic = "force-dynamic";

function Fallback() {
  return (
    <div className="min-h-screen grid place-items-center text-muted-foreground">
      Connecting...
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<Fallback />}>
      <CallbackClient />
    </Suspense>
  );
}
