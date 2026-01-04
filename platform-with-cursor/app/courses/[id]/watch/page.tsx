import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getCourseById } from '@/app/lib/courses';
import VideoPlayer from '@/app/components/VideoPlayer';
import VideoList from '@/app/components/VideoList';

interface WatchPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ video?: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: WatchPageProps): Promise<Metadata> {
  const { id } = await params;
  const course = await getCourseById(id);

  if (!course) {
    return {
      title: 'コースが見つかりません',
    };
  }

  return {
    title: `${course.title} - 動画視聴`,
    description: `${course.title}の動画を視聴できます`,
  };
}

export default async function WatchPage({ params, searchParams }: WatchPageProps) {
  const { id } = await params;
  const { video: videoIdParam } = await searchParams;
  const course = await getCourseById(id);

  if (!course) {
    notFound();
  }

  // 最初の動画を決定（URLパラメータまたは最初の動画）
  let initialVideo = course.sections[0]?.videos[0];
  let initialSectionIndex = 0;
  let initialVideoIndex = 0;

  if (videoIdParam) {
    for (let sectionIndex = 0; sectionIndex < course.sections.length; sectionIndex++) {
      const section = course.sections[sectionIndex];
      const videoIndex = section.videos.findIndex((v) => v.id === videoIdParam);
      if (videoIndex !== -1) {
        initialVideo = section.videos[videoIndex];
        initialSectionIndex = sectionIndex;
        initialVideoIndex = videoIndex;
        break;
      }
    }
  }

  if (!initialVideo) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--muted)]">
      {/* ヘッダー */}
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link
              href={`/courses/${course.id}`}
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
              コース詳細に戻る
            </Link>
            <h1 className="hidden truncate text-lg font-semibold text-[var(--foreground)] sm:block">
              {course.title}
            </h1>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <VideoPlayer
          course={course}
          initialVideo={initialVideo}
          initialSectionIndex={initialSectionIndex}
          initialVideoIndex={initialVideoIndex}
        />
      </main>
    </div>
  );
}

