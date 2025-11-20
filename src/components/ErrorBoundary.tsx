'use client';

import React, { ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-red-600 mb-4">Bir Hata Oluştu</h1>
              <p className="text-gray-600 mb-4">{this.state.error?.message}</p>
              <button
                onClick={() => this.setState({ hasError: false })}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Tekrar Deneyin
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
