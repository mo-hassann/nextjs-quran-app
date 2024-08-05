import { LibraryBig } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

type props = {
  chapterId: number;
  verseId: number;
};

export default function TafseerAction({ chapterId, verseId }: props) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname.includes(`/learning`)) return;

  return (
    <button
      onClick={() => {
        router.push(`learning?chapter=${chapterId}&verse=${verseId}`);
      }}
    >
      <LibraryBig className={"text-muted-foreground  cursor-pointer"} />
    </button>
  );
}
