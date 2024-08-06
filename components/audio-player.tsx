"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Pause, Play, Redo, Repeat, SkipBack, SkipForward, Undo, Volume1, Volume2, VolumeX, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Spinner from "./spinner";
import Link from "next/link";

type props = {
  src: string;
  audioTitle: string;
  audioLink: string;
  onClose: () => void;
  onPlayNext: () => void;
  onPlayPrevious: () => void;
};

export default function AudioPlayer({ src, onClose, onPlayNext, onPlayPrevious, audioTitle, audioLink }: props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showAudioBar, setShowAudioBar] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const onTimeUpdate = () => {
    if (audioRef.current && !isDragging) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * duration;

      updateCurTime(newTime);
    }
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging && progressBarRef.current) {
        const rect = progressBarRef.current.getBoundingClientRect();
        const moveX = e.clientX - rect.left;

        let newTime = (moveX / rect.width) * duration;

        if (newTime < 0) newTime = 0;
        if (newTime > duration) newTime = duration;

        updateCurTime(newTime);
      }
    },
    [duration, isDragging]
  );

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updateCurTime = (newTime: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleRepeat = () => {
    setIsRepeat((curState) => !curState);
    if (audioRef.current) {
      audioRef.current.loop = !isRepeat;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const skipForeword = (sec: number = 5) => {
    const newTime = currentTime + sec;
    updateCurTime(newTime > duration ? duration : newTime);
  };

  const skipBack = (sec: number = 5) => {
    const newTime = currentTime - sec;
    updateCurTime(newTime < 0 ? 0 : newTime);
  };

  // when the audio ends, play the next audio. if repeat state is true, the audio will repeat by the native html loop event
  const handleOnEnded = () => {
    if (!isRepeat) {
      onPlayNext();
    }
  };

  // handle progressbar change by user
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove]);

  // if the src is changed set loading state until onLoadedMetadata event triggered then set is loading to false
  useEffect(() => {
    setIsLoading(true);
  }, [src]);

  // if the loading is finished and sated to false get audio duration and play the audio
  useEffect(() => {
    if (audioRef.current && !isLoading) {
      setCurrentTime(0);
      setDuration(audioRef.current.duration);
      setIsPlaying(true);
    }
  }, [isLoading]);

  // track the loading state changes
  useEffect(() => {
    if (audioRef.current && !isLoading) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, isLoading]);

  return (
    <div className="max-w-screen-lg w-9/12 bg-background md:shadow-2xl shadow-md fixed md:bottom-2 bottom-24 text-sm md:text-lg left-1/2 -translate-x-1/2 py-3.5 px-5 mx-3 rounded-md">
      <div className="flex items-center justify-between gap-3">
        <Link className="hover:text-primary hover:underline" href={audioLink}>
          {audioTitle}
        </Link>
        <Button onClick={onClose} className="p-0 size-6" size="icon" variant="ghost">
          <X size={16} />
        </Button>
      </div>

      <audio ref={audioRef} src={src} onEnded={handleOnEnded} onTimeUpdate={onTimeUpdate} onLoadedMetadata={() => setIsLoading(false)} />

      <div className="w-full space-y-2 mt-2.5">
        <div className="relative w-full h-1.5 bg-muted-foreground/15 rounded-full" ref={progressBarRef} onClick={handleProgressClick}>
          <div className="absolute top-0 left-0 h-full bg-primary rounded-full" style={{ width: `${(currentTime / duration) * 100}%` }}></div>
          <div className="absolute top-1/2 -translate-y-1/2 left-[calc(100% - 8px)] size-4 bg-primary rounded-full cursor-pointer" style={{ left: `calc(${(currentTime / duration) * 100}% - 8px)` }} onMouseDown={handleMouseDown}></div>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground/70">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between" style={{ direction: "ltr" }}>
        <div className="relative">
          <Button onClick={() => setShowAudioBar((curState) => !curState)} className="rounded-full" variant="ghost" size="icon">
            {(volume === 0 && <VolumeX size={16} />) || (volume < 0.6 && <Volume1 size={16} />) || <Volume2 size={16} />}
          </Button>
          {showAudioBar && (
            <div onBlur={() => setShowAudioBar(false)} className="absolute -top-10 left-1/2 -translate-x-1/2 rounded-md bg-background shadow-md p-2 w-80">
              <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} className={"w-full"} />
            </div>
          )}
        </div>

        <div className="flex items-center md:gap-2 gap-1 *:size-6 *:p-1 md:*:size-10 ">
          <Button onClick={() => onPlayPrevious()} className="rounded-full" variant="ghost" size="icon">
            <SkipBack size={18} />
          </Button>
          <Button onClick={() => skipForeword()} className="rounded-full" variant="ghost" size="icon">
            <Redo size={18} />
          </Button>
          <Button disabled={isLoading} className={cn("rounded-full size-12", !isPlaying && "bg-primary text-white hover:bg-primary/80 hover:text-white")} variant="ghost" size="icon" onClick={() => setIsPlaying((curState) => !curState)}>
            {isLoading ? <Spinner /> : isPlaying ? <Pause /> : <Play />}
          </Button>
          <Button onClick={() => skipBack()} className="rounded-full" variant="ghost" size="icon">
            <Undo size={18} />
          </Button>
          <Button onClick={() => onPlayNext()} className="rounded-full" variant="ghost" size="icon">
            <SkipForward size={18} />
          </Button>
        </div>

        <Button className={cn("rounded-full", isRepeat && "bg-primary text-white hover:bg-primary hover:text-white")} variant="ghost" size="icon" onClick={toggleRepeat}>
          <Repeat size={16} />
        </Button>
      </div>
    </div>
  );
}
