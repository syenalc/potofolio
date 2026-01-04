'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-950">
            <div className="text-center">
              <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
                エラーが発生しました
              </h1>
              <p className="mb-8 text-gray-600 dark:text-gray-400">
                申し訳ございません。予期しないエラーが発生しました。
              </p>
              <button
                onClick={() => window.location.reload()}
                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                ページを再読み込み
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

