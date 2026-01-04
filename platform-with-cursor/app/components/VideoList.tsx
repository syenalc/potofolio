'use client';

import { useState } from 'react';
import { Section, Video } from '@/app/types/course';
import { formatDuration } from '@/app/lib/utils';

interface VideoListProps {
  sections: Section[];
  currentVideoId: string;
  watchedVideos: Set<string>;
  onVideoSelect: (video: Video, sectionIndex: number, videoIndex: number) => void;
}

export default function VideoList({
  sections,
  currentVideoId,
  watchedVideos,
  onVideoSelect,
}: VideoListProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(sections.map((s) => s.id))
  );

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const getVideoIndex = (sectionIndex: number, videoIndex: number): number => {
    let index = 0;
    for (let i = 0; i < sectionIndex; i++) {
      index += sections[i].videos.length;
    }
    return index + videoIndex;
  };

  const getNextVideo = (): { video: Video; sectionIndex: number; videoIndex: number } | null => {
    for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex++) {
      const section = sections[sectionIndex];
      for (let videoIndex = 0; videoIndex < section.videos.length; videoIndex++) {
        const video = section.videos[videoIndex];
        if (video.id === currentVideoId) {
          // 次の動画を探す
          if (videoIndex < section.videos.length - 1) {
            return {
              video: section.videos[videoIndex + 1],
              sectionIndex,
              videoIndex: videoIndex + 1,
            };
          } else if (sectionIndex < sections.length - 1) {
            // 次のセクションの最初の動画
            return {
              video: sections[sectionIndex + 1].videos[0],
              sectionIndex: sectionIndex + 1,
              videoIndex: 0,
            };
          }
        }
      }
    }
    return null;
  };

  const nextVideo = getNextVideo();

  return (
    <div className="space-y-2">
      {/* 次の動画ボタン */}
      {nextVideo && (
        <button
          onClick={() => onVideoSelect(nextVideo.video, nextVideo.sectionIndex, nextVideo.videoIndex)}
          className="w-full rounded-lg bg-blue-600 px-4 py-3 text-left font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <div className="flex items-center justify-between">
            <span>次の動画</span>
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
          <p className="mt-1 text-sm font-normal opacity-90">
            {nextVideo.video.title}
          </p>
        </button>
      )}

      {/* セクションリスト */}
      {sections.map((section, sectionIndex) => (
        <div
          key={section.id}
          className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
        >
          {/* セクションヘッダー */}
          <button
            onClick={() => toggleSection(section.id)}
            className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
            aria-expanded={expandedSections.has(section.id)}
            aria-controls={`section-${section.id}`}
          >
            <div className="flex items-center gap-3">
              <svg
                className={`h-5 w-5 transition-transform duration-200 ${
                  expandedSections.has(section.id) ? 'rotate-90' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {sectionIndex + 1}. {section.title}
              </span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {section.videos.length} 動画
            </span>
          </button>

          {/* 動画リスト */}
          {expandedSections.has(section.id) && (
            <div
              id={`section-${section.id}`}
              className="border-t border-gray-200 dark:border-gray-800"
            >
              {section.videos.map((video, videoIndex) => {
                const isCurrent = video.id === currentVideoId;
                const isWatched = watchedVideos.has(video.id);

                return (
                  <button
                    key={video.id}
                    onClick={() => onVideoSelect(video, sectionIndex, videoIndex)}
                    className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors duration-200 ${
                      isCurrent
                        ? 'bg-blue-50 text-blue-900 dark:bg-blue-900/20 dark:text-blue-300'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                    aria-current={isCurrent ? 'true' : undefined}
                    aria-label={`${video.title}を再生${isWatched ? '（視聴済み）' : ''}`}
                  >
                    {/* チェックマークまたは再生アイコン */}
                    <div className="flex-shrink-0">
                      {isWatched ? (
                        <svg
                          className="h-5 w-5 text-green-600 dark:text-green-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-gray-300 dark:border-gray-600">
                          {isCurrent && (
                            <div className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                          )}
                        </div>
                      )}
                    </div>

                    {/* 動画情報 */}
                    <div className="flex-1">
                      <p
                        className={`text-sm ${
                          isCurrent
                            ? 'font-semibold'
                            : 'font-medium text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {video.title}
                      </p>
                      {video.duration && (
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          {formatDuration(video.duration)}
                        </p>
                      )}
                    </div>

                    {/* 現在視聴中インジケーター */}
                    {isCurrent && (
                      <div className="flex-shrink-0">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-blue-600 dark:bg-blue-400" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

