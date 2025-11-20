'use client';

import { ReactNode } from 'react';

interface LoadingButtonProps {
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger';
}

export default function LoadingButton({
  loading = false,
  disabled = false,
  onClick,
  children,
  className = '',
  type = 'button',
  variant = 'primary',
}: LoadingButtonProps) {
  const baseClass = 'px-4 py-2 rounded font-medium transition flex items-center gap-2';
  
  const variantClass = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-400',
  }[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`${baseClass} ${variantClass} ${className}`}
    >
      {loading && (
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent" />
      )}
      {children}
    </button>
  );
}
