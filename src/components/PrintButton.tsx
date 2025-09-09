'use client';

import { Button } from './ui/button';
import { Printer } from 'lucide-react';

export function PrintButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Button
      onClick={handlePrint}
      variant="outline"
      className="w-full flex items-center justify-center gap-2"
    >
      <Printer className="h-4 w-4" />
      <span>Imprimer / PDF</span>
    </Button>
  );
}
