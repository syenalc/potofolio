// 動画データの型定義
export interface Video {
  id: string;
  title: string;
  youtubeId: string;
  duration?: number; // 秒単位（オプション）
}

// セクションデータの型定義
export interface Section {
  id: string;
  title: string;
  videos: Video[];
}

// コースデータの型定義
export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  sections: Section[];
}

// コース統計情報の型定義
export interface CourseStats {
  totalSections: number;
  totalVideos: number;
  totalDuration?: number; // 秒単位（オプション）
}

