import { PlayCircle } from "lucide-react";
import { useQuranPlayer } from "../../hooks/use-quran-player";
import { useRouter } from "next/navigation";

type props = {
  chapterId: number;
  verseId: number;
  totalVerses: number;
};

export default function PlayAudioAction({ chapterId, verseId, totalVerses }: props) {
  const { onOpen } = useQuranPlayer();
  const router = useRouter();

  const onClick = () => {
    router.push(`?verse=${verseId}`, { scroll: false });
    onOpen({ chapterId, verseId, totalVerses });
  };

  return (
    <button onClick={onClick}>
      <PlayCircle className={"text-muted-foreground  cursor-pointer"} />
    </button>
  );
}
