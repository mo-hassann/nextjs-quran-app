import FavoriteAction from "./favorite-action";
import BookmarkAction from "./bookmark-action";
import ShareAction from "./share-action";
import PlayAudioAction from "./play-audio-action";
import CopyLinkAction from "./copy-link-action";
import CopyAction from "./copy-action";

export default function AllVerseActions() {
  return (
    <>
      <FavoriteAction />
      <BookmarkAction />
      <ShareAction />
      <PlayAudioAction />
      <CopyLinkAction />
      <CopyAction />
    </>
  );
}
