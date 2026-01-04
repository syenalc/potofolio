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
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-950">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
          エラーが発生しました
        </h1>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          {error.message || '予期しないエラーが発生しました。'}
        </p>
        <div className="flex gap-4">
          <button
            onClick={reset}
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            もう一度試す
          </button>
          <button
            onClick={() => (window.location.href = '/')}
            className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            ホームに戻る
          </button>
        </div>
      </div>
    </div>
  );
}

