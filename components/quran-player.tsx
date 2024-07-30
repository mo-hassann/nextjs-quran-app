"use client";
import { useQuranPlayer } from "@/client/verse/hooks/use-quran-player";
import AudioPlayer from "./audio-player";
import { VERSE_AUDIO_API_URL } from "@/lib/variables";
import { useRouter } from "next/navigation";

export default function QuranPlayer() {
  const { onOpen, onClose, chapterId, verseId, totalVerses, readerId } = useQuranPlayer();
  const router = useRouter();

  if (!chapterId || !verseId || !readerId || !totalVerses) return;

  const format = `${chapterId.toString().padStart(3, "0")}${verseId.toString().padStart(3, "0")}`;

  const playNextVerse = () => {
    const nextVerseId = verseId + 1;
    if (nextVerseId <= totalVerses) {
      onOpen({ chapterId, totalVerses, verseId: nextVerseId });
      router.push(`?verse=${nextVerseId}`, { scroll: false });
    }
  };

  const playPreviousVerse = () => {
    const previousVerseId = verseId - 1;
    if (previousVerseId > 0) {
      onOpen({ chapterId, totalVerses, verseId: previousVerseId });
      router.push(`?verse=${previousVerseId}`, { scroll: false });
    }
  };

  return <AudioPlayer onPlayNext={playNextVerse} onPlayPrevious={playPreviousVerse} onClose={onClose} src={`${VERSE_AUDIO_API_URL}/${readerId}/${format}.mp3`} />;
}
