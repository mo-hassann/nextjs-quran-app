import { PlayCircle } from "lucide-react";
import { useQuranPlayer } from "../../hooks/use-quran-player";

type props = {
  chapterId: number;
  verseId: number;
};

export default function PlayAudioAction({ chapterId, verseId }: props) {
  const { onOpen } = useQuranPlayer();

  return (
    <button onClick={() => onOpen({ chapterId, verseId })}>
      <PlayCircle className={"text-muted-foreground  cursor-pointer"} />
    </button>
  );
}
