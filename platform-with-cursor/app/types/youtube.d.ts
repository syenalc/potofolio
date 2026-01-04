// YouTube IFrame Player API の型定義
declare namespace YT {
  interface PlayerState {
    UNSTARTED: -1;
    ENDED: 0;
    PLAYING: 1;
    PAUSED: 2;
    BUFFERING: 3;
    CUED: 5;
  }

  const PlayerState: PlayerState;

  interface OnStateChangeEvent {
    data: number;
  }

  interface PlayerEvent {
    target: Player;
    data: any;
  }

  interface PlayerOptions {
    height?: string | number;
    width?: string | number;
    videoId?: string;
    playerVars?: {
      autoplay?: 0 | 1;
      cc_lang_pref?: string;
      cc_load_policy?: 0 | 1;
      color?: 'red' | 'white';
      controls?: 0 | 1 | 2;
      disablekb?: 0 | 1;
      enablejsapi?: 0 | 1;
      end?: number;
      fs?: 0 | 1;
      hl?: string;
      iv_load_policy?: 1 | 3;
      list?: string;
      listType?: 'playlist' | 'user_uploads' | 'search';
      loop?: 0 | 1;
      modestbranding?: 0 | 1;
      origin?: string;
      playlist?: string;
      playsinline?: 0 | 1;
      rel?: 0 | 1;
      start?: number;
      widget_referrer?: string;
    };
    events?: {
      onReady?: (event: PlayerEvent) => void;
      onStateChange?: (event: OnStateChangeEvent) => void;
      onPlaybackQualityChange?: (event: PlayerEvent) => void;
      onPlaybackRateChange?: (event: PlayerEvent) => void;
      onError?: (event: PlayerEvent) => void;
      onApiChange?: (event: PlayerEvent) => void;
    };
  }

  class Player {
    constructor(containerId: string | HTMLElement, options: PlayerOptions);
    destroy(): void;
    loadVideoById(videoId: string, startSeconds?: number): void;
    cueVideoById(videoId: string, startSeconds?: number): void;
    playVideo(): void;
    pauseVideo(): void;
    stopVideo(): void;
    seekTo(seconds: number, allowSeekAhead: boolean): void;
    getVideoLoadedFraction(): number;
    getPlayerState(): number;
    getCurrentTime(): number;
    getDuration(): number;
    getVideoUrl(): string;
    getVideoEmbedCode(): string;
    getPlaylist(): string[];
    getPlaylistIndex(): number;
    getIframe(): HTMLIFrameElement;
    setSize(width: number, height: number): void;
    setVolume(volume: number): void;
    getVolume(): number;
    mute(): void;
    unMute(): void;
    isMuted(): boolean;
    setPlaybackQuality(suggestedQuality: string): void;
    getPlaybackQuality(): string;
    setPlaybackRate(suggestedRate: number): void;
    getPlaybackRate(): number;
    getAvailablePlaybackRates(): number[];
    getPlaybackRate(): number;
    getVideoData(): {
      video_id: string;
      author: string;
      title: string;
    };
    getCurrentVideoData(): {
      video_id: string;
      author: string;
      title: string;
    };
  }
}

declare var YT: {
  Player: typeof YT.Player;
  PlayerState: YT.PlayerState;
};

