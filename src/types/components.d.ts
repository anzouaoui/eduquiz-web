// Type definitions for components
declare module '@/components/ui/button' {
  import * as React from 'react';
  
  interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'secondary' | 'accent' | 'destructive' | 'outline' | 'ghost' | 'link' | 'gradient';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    asChild?: boolean;
  }
  
  export const Button: React.ForwardRefExoticComponent<
    ButtonProps & React.RefAttributes<HTMLButtonElement>
  >;
}

declare module '@/components/ui/input' {
  import * as React from 'react';
  
  interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
  
  export const Input: React.ForwardRefExoticComponent<
    InputProps & React.RefAttributes<HTMLInputElement>
  >;
}

declare module '@/components/ui/label' {
  import * as React from 'react';
  
  interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}
  
  export const Label: React.ForwardRefExoticComponent<
    LabelProps & React.RefAttributes<HTMLLabelElement>
  >;
}

declare module '@/components/auth/OAuthButtons' {
  import * as React from 'react';
  
  export const OAuthButtons: React.FC<{}>;
}

declare module '@/app/auth/actions' {
  export interface AuthResult {
    error?: string;
  }

  export function signInWithEmail(formData: FormData): Promise<AuthResult | void>;
  export function signUpWithEmail(formData: FormData): Promise<AuthResult>;
  export function signInWithOAuth(provider: 'google' | 'apple'): Promise<void>;
  export function signOutAction(): Promise<void>;
  export function sendResetPassword(formData: FormData): Promise<{ error?: string }>;
}
