'use client';

import { useEffect, useRef, useState } from 'react';

interface YouTubePlayerProps {
  videoId: string;
  onEnd?: () => void;
}

export default function YouTubePlayer({ videoId, onEnd }: YouTubePlayerProps) {
  const [playerId] = useState(() => `youtube-player-${Math.random().toString(36).substring(2, 11)}`);
  const playerRef = useRef<YT.Player | null>(null);
  const onEndRef = useRef(onEnd);

  // onEndの最新値を保持
  useEffect(() => {
    onEndRef.current = onEnd;
  }, [onEnd]);

  useEffect(() => {
    // YouTube IFrame APIの読み込み
    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const initializePlayer = () => {
      if ((window as any).YT && (window as any).YT.Player) {
        const container = document.getElementById(playerId);
        if (container && !playerRef.current) {
          playerRef.current = new YT.Player(playerId, {
            videoId,
            events: {
              onStateChange: (event: YT.OnStateChangeEvent) => {
                // 動画が終了した時（state = 0）
                if (event.data === YT.PlayerState.ENDED && onEndRef.current) {
                  onEndRef.current();
                }
              },
            },
          });
        }
      }
    };

    // グローバル関数として設定（既に存在する場合は上書き）
    (window as any).onYouTubeIframeAPIReady = initializePlayer;

    // APIが既に読み込まれている場合
    if ((window as any).YT && (window as any).YT.Player) {
      initializePlayer();
    }

    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) {
          // エラーは無視
        }
        playerRef.current = null;
      }
    };
  }, [videoId, playerId]);

  // videoIdが変更された時に動画を更新
  useEffect(() => {
    if (playerRef.current) {
      try {
        playerRef.current.loadVideoById(videoId);
      } catch (e) {
        // エラーは無視
      }
    }
  }, [videoId]);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
      <div id={playerId} className="h-full w-full" />
    </div>
  );
}

