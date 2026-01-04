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
    <div className="space-y-3">
      {/* 次の動画ボタン */}
      {nextVideo && (
        <button
          onClick={() => onVideoSelect(nextVideo.video, nextVideo.sectionIndex, nextVideo.videoIndex)}
          className="group w-full rounded-xl bg-[var(--accent)] px-5 py-4 text-left font-semibold text-[var(--accent-foreground)] shadow-md transition-all duration-200 hover:bg-[var(--accent)]/90 hover:shadow-lg active:scale-[0.98]"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm">次の動画</span>
            <svg
              className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
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
          <p className="mt-2 line-clamp-2 text-sm font-normal opacity-95">
            {nextVideo.video.title}
          </p>
        </button>
      )}

      {/* セクションリスト */}
      <div className="space-y-2">
        {sections.map((section, sectionIndex) => (
          <div
            key={section.id}
            className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-sm"
          >
            {/* セクションヘッダー */}
            <button
              onClick={() => toggleSection(section.id)}
              className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-[var(--muted)]"
              aria-expanded={expandedSections.has(section.id)}
              aria-controls={`section-${section.id}`}
            >
              <div className="flex items-center gap-3">
                <svg
                  className={`h-5 w-5 text-[var(--muted-foreground)] transition-transform duration-200 ${
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
                <span className="font-semibold text-[var(--foreground)]">
                  {sectionIndex + 1}. {section.title}
                </span>
              </div>
              <span className="rounded-full bg-[var(--muted)] px-2.5 py-1 text-xs font-medium text-[var(--muted-foreground)]">
                {section.videos.length}
              </span>
            </button>

            {/* 動画リスト */}
            {expandedSections.has(section.id) && (
              <div
                id={`section-${section.id}`}
                className="divide-y divide-[var(--border)] border-t border-[var(--border)]"
              >
                {section.videos.map((video, videoIndex) => {
                  const isCurrent = video.id === currentVideoId;
                  const isWatched = watchedVideos.has(video.id);

                  return (
                    <button
                      key={video.id}
                      onClick={() => onVideoSelect(video, sectionIndex, videoIndex)}
                      className={`flex w-full items-start gap-4 px-5 py-4 text-left transition-all duration-200 ${
                        isCurrent
                          ? 'bg-[var(--accent)]/10 text-[var(--accent)]'
                          : 'hover:bg-[var(--muted)] text-[var(--card-foreground)]'
                      }`}
                      aria-current={isCurrent ? 'true' : undefined}
                      aria-label={`${video.title}を再生${isWatched ? '（視聴済み）' : ''}`}
                    >
                      {/* チェックマークまたは再生アイコン */}
                      <div className="mt-0.5 flex-shrink-0">
                        {isWatched ? (
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/10">
                            <svg
                              className="h-4 w-4 text-green-600 dark:text-green-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                        ) : (
                          <div className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                            isCurrent
                              ? 'border-[var(--accent)] bg-[var(--accent)]/10'
                              : 'border-[var(--border)]'
                          }`}>
                            {isCurrent && (
                              <div className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
                            )}
                          </div>
                        )}
                      </div>

                      {/* 動画情報 */}
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm leading-snug ${
                            isCurrent
                              ? 'font-semibold'
                              : 'font-medium'
                          }`}
                        >
                          {video.title}
                        </p>
                        {video.duration && (
                          <p className={`mt-1.5 text-xs ${
                            isCurrent
                              ? 'text-[var(--accent)]/70'
                              : 'text-[var(--muted-foreground)]'
                          }`}>
                            {formatDuration(video.duration)}
                          </p>
                        )}
                      </div>

                      {/* 現在視聴中インジケーター */}
                      {isCurrent && (
                        <div className="flex-shrink-0 pt-1">
                          <div className="h-2 w-2 animate-pulse rounded-full bg-[var(--accent)]" />
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
    </div>
  );
}

