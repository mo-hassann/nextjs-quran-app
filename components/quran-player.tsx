"use client";
import AudioPlayer from "./audio-player";
import { VERSE_AUDIO_API_URL } from "@/lib/variables";

type props = {
  chapter: number;
  verse: number;
  onClose: () => void;
};

export default function QuranPlayer({ chapter, verse, onClose }: props) {
  const format = `${chapter.toString().padStart(3, "0")}${verse.toString().padStart(3, "0")}`;

  return <AudioPlayer onClose={onClose} src={`${VERSE_AUDIO_API_URL}/AbdulSamad_64kbps_QuranExplorer.Com/${format}.mp3`} />;
}
