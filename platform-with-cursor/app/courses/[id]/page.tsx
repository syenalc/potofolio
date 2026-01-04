import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getCourseById, getTotalVideoCount, getTotalSectionCount } from '@/app/lib/courses';
import { formatDuration } from '@/app/lib/utils';

interface CourseDetailPageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: CourseDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const course = await getCourseById(id);

  if (!course) {
    return {
      title: 'コースが見つかりません',
    };
  }

  return {
    title: course.title,
    description: course.description,
    openGraph: {
      title: course.title,
      description: course.description,
      images: [course.thumbnail],
    },
  };
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { id } = await params;
  const course = await getCourseById(id);

  if (!course) {
    notFound();
  }

  const totalVideos = getTotalVideoCount(course);
  const totalSections = getTotalSectionCount(course);
  const totalDuration = course.sections.reduce((total, section) => {
    return (
      total +
      section.videos.reduce((sectionTotal, video) => {
        return sectionTotal + (video.duration || 0);
      }, 0)
    );
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* ヘッダー */}
      <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            コース一覧に戻る
          </Link>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* 左側: コース詳細情報 */}
          <div className="lg:col-span-2">
            {/* コースタイトル */}
            <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-gray-100">
              {course.title}
            </h1>

            {/* コース画像 */}
            <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
              <Image
                src={course.thumbnail}
                alt={course.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </div>

            {/* コース説明 */}
            <div className="mb-8">
              <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
                コースについて
              </h2>
              <p className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                {course.description}
              </p>
            </div>

            {/* セクション一覧 */}
            <div className="mb-8">
              <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
                コース内容
              </h2>
              <div className="space-y-4">
                {course.sections.map((section, sectionIndex) => (
                  <div
                    key={section.id}
                    className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
                  >
                    <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {sectionIndex + 1}. {section.title}
                    </h3>
                    <ul className="space-y-2">
                      {section.videos.map((video, videoIndex) => (
                        <li
                          key={video.id}
                          className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400"
                        >
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs font-medium dark:bg-gray-700">
                            {videoIndex + 1}
                          </span>
                          <span className="flex-1">{video.title}</span>
                          {video.duration && (
                            <span className="text-xs">
                              {formatDuration(video.duration)}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 右側: サイドバー（統計情報とボタン） */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              {/* 統計情報 */}
              <div className="mb-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    セクション数
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {totalSections}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    動画数
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {totalVideos}
                  </span>
                </div>
                {totalDuration > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      総時間
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {formatDuration(totalDuration)}
                    </span>
                  </div>
                )}
              </div>

              {/* 「コースを見る」ボタン */}
              <Link
                href={`/courses/${course.id}/watch`}
                className="block w-full rounded-lg bg-blue-600 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                コースを見る
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

