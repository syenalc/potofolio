'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--muted)] px-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
          <svg
            className="h-8 w-8 text-red-600 dark:text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h1 className="mb-3 text-2xl font-bold tracking-tight text-[var(--foreground)]">
          エラーが発生しました
        </h1>
        <p className="mb-8 text-sm text-[var(--muted-foreground)]">
          {error.message || '予期しないエラーが発生しました。'}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent-foreground)] transition-all duration-200 hover:bg-[var(--accent)]/90 hover:shadow-md active:scale-[0.98]"
          >
            もう一度試す
          </button>
          <button
            onClick={() => (window.location.href = '/')}
            className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-6 py-3 text-sm font-semibold text-[var(--card-foreground)] transition-all duration-200 hover:bg-[var(--muted)] active:scale-[0.98]"
          >
            ホームに戻る
          </button>
        </div>
      </div>
    </div>
  );
}

