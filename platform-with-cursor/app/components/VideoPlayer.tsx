'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Course, Video } from '@/app/types/course';
import YouTubePlayer from './YouTubePlayer';
import VideoList from './VideoList';

interface VideoPlayerProps {
  course: Course;
  initialVideo: Video;
  initialSectionIndex: number;
  initialVideoIndex: number;
}

export default function VideoPlayer({
  course,
  initialVideo,
  initialSectionIndex,
  initialVideoIndex,
}: VideoPlayerProps) {
  const router = useRouter();
  const [currentVideo, setCurrentVideo] = useState(initialVideo);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(initialSectionIndex);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(initialVideoIndex);
  const [watchedVideos, setWatchedVideos] = useState<Set<string>>(new Set());

  // localStorageから視聴済み動画を読み込む
  useEffect(() => {
    const stored = localStorage.getItem(`watched-${course.id}`);
    if (stored) {
      try {
        const watched = JSON.parse(stored) as string[];
        setWatchedVideos(new Set(watched));
      } catch (e) {
        // パースエラーは無視
      }
    }
  }, [course.id]);

  // 視聴済み動画を保存
  const markAsWatched = (videoId: string) => {
    const newWatched = new Set(watchedVideos);
    newWatched.add(videoId);
    setWatchedVideos(newWatched);
    localStorage.setItem(`watched-${course.id}`, JSON.stringify(Array.from(newWatched)));
  };

  // 動画が終了した時の処理
  const handleVideoEnd = () => {
    markAsWatched(currentVideo.id);

    // 次の動画を探す
    if (currentVideoIndex < course.sections[currentSectionIndex].videos.length - 1) {
      // 同じセクション内の次の動画
      const nextVideo = course.sections[currentSectionIndex].videos[currentVideoIndex + 1];
      setCurrentVideo(nextVideo);
      setCurrentVideoIndex(currentVideoIndex + 1);
      router.push(`/courses/${course.id}/watch?video=${nextVideo.id}`, { scroll: false });
    } else if (currentSectionIndex < course.sections.length - 1) {
      // 次のセクションの最初の動画
      const nextVideo = course.sections[currentSectionIndex + 1].videos[0];
      setCurrentVideo(nextVideo);
      setCurrentSectionIndex(currentSectionIndex + 1);
      setCurrentVideoIndex(0);
      router.push(`/courses/${course.id}/watch?video=${nextVideo.id}`, { scroll: false });
    }
  };

  // URLパラメータが変更された時に動画を更新
  useEffect(() => {
    setCurrentVideo(initialVideo);
    setCurrentSectionIndex(initialSectionIndex);
    setCurrentVideoIndex(initialVideoIndex);
  }, [initialVideo.id, initialSectionIndex, initialVideoIndex]);

  // 動画を選択した時の処理
  const handleVideoSelect = (video: Video, sectionIndex: number, videoIndex: number) => {
    setCurrentVideo(video);
    setCurrentSectionIndex(sectionIndex);
    setCurrentVideoIndex(videoIndex);
    router.push(`/courses/${course.id}/watch?video=${video.id}`, { scroll: false });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* 左側: 動画プレーヤー */}
      <div className="lg:col-span-2">
        <div className="space-y-4">
          {/* 動画タイトル */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {currentVideo.title}
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {course.sections[currentSectionIndex].title}
            </p>
          </div>

          {/* YouTubeプレーヤー */}
          <YouTubePlayer videoId={currentVideo.youtubeId} onEnd={handleVideoEnd} />
        </div>
      </div>

      {/* 右側: 動画リスト */}
      <div className="lg:col-span-1">
        <div className="sticky top-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
            コース内容
          </h2>
          <VideoList
            sections={course.sections}
            currentVideoId={currentVideo.id}
            watchedVideos={watchedVideos}
            onVideoSelect={handleVideoSelect}
          />
        </div>
      </div>
    </div>
  );
}

