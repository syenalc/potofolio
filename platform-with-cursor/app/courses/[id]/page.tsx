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
    <div className="min-h-screen bg-[var(--muted)]">
      {/* ヘッダー */}
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
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
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* 左側: コース詳細情報 */}
          <div className="lg:col-span-2">
            {/* コースタイトル */}
            <h1 className="mb-6 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
              {course.title}
            </h1>

            {/* コース画像 */}
            <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-xl bg-[var(--muted)] shadow-md">
              <Image
                src={course.thumbnail}
                alt={course.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </div>

            {/* コース説明 */}
            <div className="mb-10">
              <h2 className="mb-4 text-xl font-semibold text-[var(--foreground)]">
                コースについて
              </h2>
              <div className="rounded-lg bg-[var(--card)] p-6 border border-[var(--border)]">
                <p className="whitespace-pre-line leading-relaxed text-[var(--muted-foreground)]">
                  {course.description}
                </p>
              </div>
            </div>

            {/* セクション一覧 */}
            <div className="mb-8">
              <h2 className="mb-6 text-xl font-semibold text-[var(--foreground)]">
                コース内容
              </h2>
              <div className="space-y-4">
                {course.sections.map((section, sectionIndex) => (
                  <div
                    key={section.id}
                    className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-sm"
                  >
                    <div className="border-b border-[var(--border)] bg-[var(--muted)] px-6 py-4">
                      <h3 className="text-lg font-semibold text-[var(--foreground)]">
                        {sectionIndex + 1}. {section.title}
                      </h3>
                    </div>
                    <ul className="divide-y divide-[var(--border)]">
                      {section.videos.map((video, videoIndex) => (
                        <li
                          key={video.id}
                          className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-[var(--muted)]"
                        >
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--muted)] text-xs font-semibold text-[var(--muted-foreground)]">
                            {videoIndex + 1}
                          </span>
                          <span className="flex-1 text-sm font-medium text-[var(--card-foreground)]">
                            {video.title}
                          </span>
                          {video.duration && (
                            <span className="text-xs font-medium text-[var(--muted-foreground)]">
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
            <div className="sticky top-8 rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-md">
              {/* 統計情報 */}
              <div className="mb-8 space-y-5">
                <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
                  <span className="text-sm font-medium text-[var(--muted-foreground)]">
                    セクション数
                  </span>
                  <span className="text-lg font-bold text-[var(--foreground)]">
                    {totalSections}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
                  <span className="text-sm font-medium text-[var(--muted-foreground)]">
                    動画数
                  </span>
                  <span className="text-lg font-bold text-[var(--foreground)]">
                    {totalVideos}
                  </span>
                </div>
                {totalDuration > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[var(--muted-foreground)]">
                      総時間
                    </span>
                    <span className="text-lg font-bold text-[var(--foreground)]">
                      {formatDuration(totalDuration)}
                    </span>
                  </div>
                )}
              </div>

              {/* 「コースを見る」ボタン */}
              <Link
                href={`/courses/${course.id}/watch`}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-6 py-3 text-center text-sm font-semibold text-[var(--accent-foreground)] transition-all duration-200 hover:bg-[var(--accent)]/90 hover:shadow-md active:scale-[0.98]"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                コースを見る
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

