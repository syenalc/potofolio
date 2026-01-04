import { Course, CourseSummary } from '@/app/types/course';
import coursesData from '@/app/data/courses.json';

/**
 * 全コースを取得する
 */
export async function getAllCourses(): Promise<Course[]> {
  // 実際の実装では、ここでAPI呼び出しやデータベースアクセスを行う
  // 今回は静的データを返す
  return coursesData.courses as Course[];
}

/**
 * コース一覧用のサマリー情報を取得する
 */
export async function getCourseSummaries(): Promise<CourseSummary[]> {
  const courses = await getAllCourses();
  
  return courses.map((course) => ({
    id: course.id,
    title: course.title,
    description: course.description,
    thumbnail: course.thumbnail,
    sectionCount: course.sections.length,
    videoCount: course.sections.reduce(
      (total, section) => total + section.videos.length,
      0
    ),
  }));
}

/**
 * IDでコースを取得する
 */
export async function getCourseById(id: string): Promise<Course | null> {
  const courses = await getAllCourses();
  const course = courses.find((c) => c.id === id);
  
  return course || null;
}

/**
 * コースの全動画数を取得する
 */
export function getTotalVideoCount(course: Course): number {
  return course.sections.reduce(
    (total, section) => total + section.videos.length,
    0
  );
}

/**
 * コースの全セクション数を取得する
 */
export function getTotalSectionCount(course: Course): number {
  return course.sections.length;
}

