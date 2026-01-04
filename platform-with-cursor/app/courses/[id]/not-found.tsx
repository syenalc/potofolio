import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-950">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100">
          404
        </h1>
        <h2 className="mb-4 text-2xl font-semibold text-gray-700 dark:text-gray-300">
          コースが見つかりませんでした
        </h2>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          お探しのコースは存在しないか、削除された可能性があります。
        </p>
        <Link
          href="/"
          className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          コース一覧に戻る
        </Link>
      </div>
    </div>
  );
}

