import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  isLoading, 
  variant = 'primary', 
  className = '', 
  disabled,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 border text-base font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "border-transparent text-black bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 shadow-lg shadow-amber-900/20 focus:ring-amber-500",
    secondary: "border-transparent text-white bg-zinc-700 hover:bg-zinc-600 focus:ring-zinc-500",
    outline: "border-zinc-600 text-zinc-300 bg-transparent hover:bg-zinc-800 focus:ring-zinc-500"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />}
      {children}
    </button>
  );
};
