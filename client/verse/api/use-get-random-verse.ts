import { useQuery } from "@tanstack/react-query";

import { handleErrors } from "@/lib/errors";
import { QURAN_JSON_API_URL } from "@/constants";

import { Chapter, Verse } from "@/types";

export default function useGetRandomVerse(verseNumber?: number) {
  const query = useQuery({
    queryKey: ["random_verse", verseNumber],
    queryFn: async () => {
      const res = await fetch(`${QURAN_JSON_API_URL}/verses/${verseNumber}.json`);

      // handle throw the error response
      if (!res.ok) {
        throw await handleErrors(res);
      }
      const data = (await res.json()) as Verse & { chapter: Chapter };

      return data;
    },
    enabled: !!verseNumber,
  });

  return query;
}
