"use client";
import { useQuranPlayer } from "@/client/verse/hooks/use-quran-player";
import AudioPlayer from "./audio-player";
import { VERSE_AUDIO_API_URL } from "@/lib/variables";

export default function QuranPlayer() {
  const { onOpen, onClose, chapterId, verseId, totalVerses, readerId } = useQuranPlayer();

  if (!chapterId || !verseId || !readerId || !totalVerses) return;

  const format = `${chapterId.toString().padStart(3, "0")}${verseId.toString().padStart(3, "0")}`;

  const playNextVerse = () => {
    const nextVerseId = verseId + 1;
    if (nextVerseId <= totalVerses) {
      onOpen({ chapterId, totalVerses, verseId: nextVerseId });
    }
  };

  const playPreviousVerse = () => {
    const previousVerseId = verseId - 1;
    if (previousVerseId > 0) {
      onOpen({ chapterId, totalVerses, verseId: previousVerseId });
    }
  };

  return <AudioPlayer onPlayNext={playNextVerse} onPlayPrevious={playPreviousVerse} onClose={onClose} src={`${VERSE_AUDIO_API_URL}/${readerId}/${format}.mp3`} />;
}
