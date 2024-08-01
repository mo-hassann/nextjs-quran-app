import { CircleX, PlayCircle } from "lucide-react";
import { useQuranPlayer } from "../../hooks/use-quran-player";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import useUpdateSearchParams from "@/hooks/use-update-search-params";

type props = {
  chapterId: number;
  verseId: number;
  totalVerses: number;
};

export default function PlayAudioAction({ chapterId, verseId, totalVerses }: props) {
  const { onOpen, onClose, isOpen, chapterId: playingChapterId, verseId: playingVerseId } = useQuranPlayer();
  const t = useTranslations("ChapterPage.sidebarSettings.Actions");
  const { updateSearchParams } = useUpdateSearchParams();

  const isPlaying = isOpen && chapterId === playingChapterId && verseId === playingVerseId;

  const handleOnClose = () => {
    onClose();
    updateSearchParams({ verse: null, chapter: null }, { scroll: false });
  };

  return (
    <>
      {isPlaying ? (
        <Button className="space-x-2" variant="outline" size="sm" onClick={handleOnClose}>
          <CircleX size={18} className={" cursor-pointer rtl:ml-2 ltr:mr-2"} /> {t("exit")}
        </Button>
      ) : (
        <Button className="space-x-2" variant="secondary" size="sm" onClick={() => onOpen({ chapterId, verseId, totalVerses })}>
          <PlayCircle size={18} className={" cursor-pointer rtl:ml-2 ltr:mr-2"} /> {t("play")}
        </Button>
      )}
    </>
  );
}
