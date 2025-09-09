'use client';

import { useToast } from '@/components/ui/use-toast';
import { Toast, ToastProvider, ToastViewport } from '@/components/ui/toast';
import { useEffect } from 'react';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, variant, ...props }) => (
        <Toast key={id} variant={variant} {...props}>
          <div className="grid gap-1">
            {title && <div className="font-medium">{title}</div>}
            {description && <div className="text-sm opacity-90">{description}</div>}
          </div>
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}

export function useToaster() {
  const { toast } = useToast();
  
  return {
    toast: ({ title, description, variant }: {
      title?: string;
      description?: string;
      variant?: 'default' | 'destructive';
    }) => {
      toast({
        title,
        description,
        variant,
      });
    },
  };
}
