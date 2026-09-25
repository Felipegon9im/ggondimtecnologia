import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';
import { createSynthAudioDataUrl } from '../services/defaultSongs';

interface AudioPlayerControlsProps {
  audioUrl: string;
  songId: string;
  songTitle: string;
  artist: string;
  isPlaying: boolean;
  onPlayPauseToggle: () => void;
  onTimeUpdate: (currentTime: number, duration: number) => void;
  onEnded: () => void;
}

export const AudioPlayerControls: React.FC<AudioPlayerControlsProps> = ({
  audioUrl,
  songId,
  songTitle,
  artist,
  isPlaying,
  onPlayPauseToggle,
  onTimeUpdate,
  onEnded
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(180);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const activeAudioUrl = useRef<string>('');
  useEffect(() => {
    if (!audioUrl) {
      let type: 'SANTO' | 'VIVE' | 'LEAO' | 'GRANDE' = 'SANTO';
      if (songId.includes('vive')) type = 'VIVE';
      if (songId.includes('leao')) type = 'LEAO';
      if (songId.includes('grande')) type = 'GRANDE';
      activeAudioUrl.current = createSynthAudioDataUrl(type);
    } else {
      activeAudioUrl.current = audioUrl;
    }

    if (audioRef.current) {
      audioRef.current.src = activeAudioUrl.current;
      audioRef.current.load();
    }
  }, [audioUrl, songId]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(e => console.warn('Audio play error:', e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const handleNativeTimeUpdate = () => {
    if (!audioRef.current) return;
    const cur = audioRef.current.currentTime;
    const dur = audioRef.current.duration || 180;
    setCurrentTime(cur);
    setDuration(dur);
    onTimeUpdate(cur, dur);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
      setCurrentTime(val);
      onTimeUpdate(val, duration);
    }
  };

  const formatTime = (secs: number): string => {
    if (isNaN(secs)) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 rounded-3xl bg-slate-900/90 border border-amber-500/20 backdrop-blur-xl shadow-2xl flex flex-col gap-3">
      <audio
        ref={audioRef}
        onTimeUpdate={handleNativeTimeUpdate}
        onEnded={onEnded}
        preload="auto"
      />

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-lg animate-pulse">
            <Music size={20} />
          </div>
          <div className="truncate">
            <h3 className="font-heading font-extrabold text-sm md:text-base text-white truncate">
              {songTitle}
            </h3>
            <p className="text-xs text-purple-300/70 truncate">{artist}</p>
          </div>
        </div>

        <button
          onClick={onPlayPauseToggle}
          className="w-12 h-12 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.5)] active:scale-95 transition-all shrink-0"
        >
          {isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" className="ml-0.5" />}
        </button>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs font-mono font-bold text-amber-400 w-10 text-right">
          {formatTime(currentTime)}
        </span>

        <input
          type="range"
          min="0"
          max={duration || 180}
          step="0.1"
          value={currentTime}
          onChange={handleSeek}
          className="flex-1 h-2 rounded-lg bg-slate-800 accent-amber-400 cursor-pointer"
        />

        <span className="text-xs font-mono text-slate-400 w-10">
          {formatTime(duration)}
        </span>

        <button
          onClick={() => {
            if (audioRef.current) {
              audioRef.current.muted = !isMuted;
              setIsMuted(!isMuted);
            }
          }}
          className="p-2 text-slate-400 hover:text-white transition-colors"
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>
    </div>
  );
};
