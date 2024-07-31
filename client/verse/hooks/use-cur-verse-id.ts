import { useSearchParams } from "next/navigation";

export default function useCurVerseId() {
  const searchParams = useSearchParams();
  const chapterId = searchParams.get("chapter");
  const verseId = searchParams.get("verse");

  if (!verseId || !chapterId) return undefined;

  const curVerseId = `${chapterId}-${verseId}`;

  return curVerseId;
}
