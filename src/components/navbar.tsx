'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { signOutAction } from '@/app/auth/actions';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/auth');

  if (isAuthPage) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl">EduQuiz</span>
        </Link>
        
        <nav className="flex items-center space-x-4">
          <Link 
            href="/" 
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              pathname === '/' ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            Accueil
          </Link>
          <Link 
            href="/quiz" 
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              pathname.startsWith('/quiz') ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            Quiz
          </Link>
          
          <form action={signOutAction}>
            <Button variant="ghost" size="sm">
              Déconnexion
            </Button>
          </form>
        </nav>
      </div>
    </header>
  );
}
