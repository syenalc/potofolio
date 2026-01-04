import Image from 'next/image';
import Link from 'next/link';
import { CourseSummary } from '@/app/types/course';

interface CourseCardProps {
  course: CourseSummary;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link
      href={`/courses/${course.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-sm transition-all duration-200 hover:border-[var(--accent)]/20 hover:shadow-md"
      aria-label={`${course.title}の詳細を見る`}
    >
      {/* サムネイル画像 */}
      <div className="relative aspect-video w-full overflow-hidden bg-[var(--muted)]">
        <Image
          src={course.thumbnail}
          alt={`${course.title}のサムネイル画像`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/5" />
      </div>

      {/* コース情報 */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-3 line-clamp-2 text-lg font-semibold leading-snug text-[var(--card-foreground)] transition-colors duration-200 group-hover:text-[var(--accent)]">
          {course.title}
        </h3>
        <p className="mb-6 line-clamp-2 flex-1 text-sm leading-relaxed text-[var(--muted-foreground)]">
          {course.description}
        </p>

        {/* 統計情報 */}
        <div className="mt-auto flex items-center gap-6 border-t border-[var(--border)] pt-4">
          <span className="flex items-center gap-2 text-xs font-medium text-[var(--muted-foreground)]">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            {course.sectionCount} セクション
          </span>
          <span className="flex items-center gap-2 text-xs font-medium text-[var(--muted-foreground)]">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            {course.videoCount} 動画
          </span>
        </div>
      </div>
    </Link>
  );
}

