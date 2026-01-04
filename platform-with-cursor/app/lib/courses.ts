import { Course, CourseStats } from '@/app/types/course';
import coursesData from '@/app/data/courses.json';

/**
 * すべてのコースを取得する
 */
export function getAllCourses(): Course[] {
  return coursesData as Course[];
}

/**
 * IDでコースを取得する
 */
export function getCourseById(id: string): Course | undefined {
  return coursesData.find((course) => course.id === id) as Course | undefined;
}

/**
 * コースの統計情報を計算する
 */
export function getCourseStats(course: Course): CourseStats {
  const totalSections = course.sections.length;
  const totalVideos = course.sections.reduce(
    (sum, section) => sum + section.videos.length,
    0
  );
  const totalDuration = course.sections.reduce((sum, section) => {
    const sectionDuration = section.videos.reduce(
      (videoSum, video) => videoSum + (video.duration || 0),
      0
    );
    return sum + sectionDuration;
  }, 0);

  return {
    totalSections,
    totalVideos,
    totalDuration: totalDuration > 0 ? totalDuration : undefined,
  };
}

/**
 * 秒数を時間形式（HH:MM:SS）に変換する
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

