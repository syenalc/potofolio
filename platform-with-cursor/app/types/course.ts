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
  createdAt?: string;
  updatedAt?: string;
}

// コース一覧用の簡易型（サムネイル表示用）
export interface CourseSummary {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  sectionCount: number;
  videoCount: number;
}

