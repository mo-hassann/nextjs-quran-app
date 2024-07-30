"use client";
import { useQuranPlayer } from "@/client/verse/hooks/use-quran-player";
import AudioPlayer from "./audio-player";
import { VERSE_AUDIO_API_URL } from "@/lib/variables";

export default function QuranPlayer() {
  const { onClose, chapterId, verseId, readerId } = useQuranPlayer();

  if (!chapterId || !verseId || !readerId) return;

  const format = `${chapterId.toString().padStart(3, "0")}${verseId.toString().padStart(3, "0")}`;

  return <AudioPlayer onClose={onClose} src={`${VERSE_AUDIO_API_URL}/${readerId}/${format}.mp3`} />;
}
