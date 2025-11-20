'use client';

import { InputHTMLAttributes, useState } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  validator?: (value: string) => { valid: boolean; error?: string };
}

export default function FormInput({
  label,
  error: externalError,
  helperText,
  validator,
  onChange,
  ...props
}: FormInputProps) {
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (validator) {
      const result = validator(value);
      setError(result.valid ? '' : result.error || '');
    }

    onChange?.(e);
  };

  const displayError = externalError || error;

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        {...props}
        onChange={handleChange}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
          displayError
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-blue-500'
        }`}
      />
      {displayError && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <span>✕</span> {displayError}
        </p>
      )}
      {helperText && !displayError && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
}
