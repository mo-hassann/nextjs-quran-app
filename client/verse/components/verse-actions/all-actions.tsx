"use client";
import FavoriteAction from "./favorite-action";
import BookmarkAction from "./bookmark-action";
import ShareAction from "./share-action";
import PlayAudioAction from "./play-audio-action";
import CopyLinkAction from "./copy-link-action";
import CopyAction from "./copy-action";

type props = {
  chapterId: number;
  isBookmarkedVerse: boolean;
  verseId: number;
  totalVerses: number;
  verse: string;
  className?: string;
};

export default function AllVerseActions({ className, chapterId, isBookmarkedVerse, verseId, totalVerses, verse }: props) {
  return (
    <div className={className}>
      <PlayAudioAction totalVerses={totalVerses} chapterId={chapterId} verseId={verseId} />
      <BookmarkAction chapterId={chapterId} isBookmarkedVerse={isBookmarkedVerse} verseId={verseId} />
      <ShareAction chapterId={chapterId} verseId={verseId} />
      <CopyLinkAction chapterId={chapterId} verseId={verseId} />
      <CopyAction text={verse} />
    </div>
  );
}
