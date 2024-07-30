import FavoriteAction from "./favorite-action";
import BookmarkAction from "./bookmark-action";
import ShareAction from "./share-action";
import PlayAudioAction from "./play-audio-action";
import CopyLinkAction from "./copy-link-action";
import CopyAction from "./copy-action";

type props = {
  chapterId: number;
  isFavoriteVerse: boolean;
  isBookmarkedVerse: boolean;
  verseId: number;
};

export default function AllVerseActions({ chapterId, isFavoriteVerse, isBookmarkedVerse, verseId }: props) {
  return (
    <>
      <FavoriteAction chapterId={chapterId} isFavoriteVerse={isFavoriteVerse} verseId={verseId} />
      <BookmarkAction chapterId={chapterId} isBookmarkedVerse={isBookmarkedVerse} verseId={verseId} />
      <ShareAction />
      <PlayAudioAction chapterId={chapterId} verseId={verseId} />
      <CopyLinkAction />
      <CopyAction />
    </>
  );
}
