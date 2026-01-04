import { getCourseSummaries } from '@/app/lib/courses';
import CourseCard from '@/app/components/CourseCard';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const courses = await getCourseSummaries();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* ヘッダー */}
      <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            動画配信プラットフォーム
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            月学生向けの動画学習プラットフォーム
          </p>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {courses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              コースが見つかりませんでした
            </p>
          </div>
        ) : (
          <>
            {/* コース一覧ヘッダー */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                すべてのコース
              </h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {courses.length} コースが見つかりました
              </p>
            </div>

            {/* コースグリッド */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
