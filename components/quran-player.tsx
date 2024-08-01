"use client";
import { useQuranPlayer } from "@/client/verse/hooks/use-quran-player";
import AudioPlayer from "./audio-player";
import useGetAudioInfo from "@/client/verse/hooks/use-get-audio-info";
import useUpdateSearchParams from "@/hooks/use-update-search-params";

export default function QuranPlayer() {
  const { updateSearchParams } = useUpdateSearchParams();
  const { onOpen, onClose, chapterId, verseId, totalVerses, readerId } = useQuranPlayer();
  const audioInfo = useGetAudioInfo({ chapterId, readerId, verseId });

  if (!chapterId || !verseId || !readerId || !totalVerses || !audioInfo) return;

  const { audioLink, audioSrc, audioTitle } = audioInfo;

  const handleOnClose = () => {
    onClose();
    updateSearchParams({ verse: null, chapter: null }, { scroll: false });
  };

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

  return <AudioPlayer onPlayNext={playNextVerse} onPlayPrevious={playPreviousVerse} onClose={handleOnClose} src={audioSrc} audioTitle={audioTitle} audioLink={audioLink} />;
}
