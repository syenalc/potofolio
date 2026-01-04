import { getCourseSummaries } from '@/app/lib/courses';
import CourseCard from '@/app/components/CourseCard';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const courses = await getCourseSummaries();

  return (
    <div className="min-h-screen bg-[var(--muted)]">
      {/* ヘッダー */}
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
                動画配信プラットフォーム
              </h1>
              <p className="mt-2 text-base text-[var(--muted-foreground)]">
                月学生向けの動画学習プラットフォーム
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {courses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="rounded-full bg-[var(--muted)] p-4">
              <svg
                className="h-12 w-12 text-[var(--muted-foreground)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="mt-6 text-lg font-medium text-[var(--muted-foreground)]">
              コースが見つかりませんでした
            </p>
          </div>
        ) : (
          <>
            {/* コース一覧ヘッダー */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
                すべてのコース
              </h2>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                {courses.length} コースが利用可能です
              </p>
            </div>

            {/* コースグリッド */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
