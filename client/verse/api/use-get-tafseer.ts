import { useQuery } from "@tanstack/react-query";

import { handleErrors } from "@/lib/errors";
import { TAFSEER_API_URL } from "@/constants";

import { Tafseer } from "@/types";

type props = {
  tafseerId: number;
  verseId?: number;
  chapterId?: number;
};

export default function useGetTafseer({ tafseerId, verseId, chapterId }: props) {
  const query = useQuery({
    queryKey: ["tafseerId", tafseerId, verseId, chapterId],
    queryFn: async () => {
      const res = await fetch(`${TAFSEER_API_URL}/${tafseerId}/${chapterId}/${verseId}`);

      // handle throw the error response
      if (!res.ok) {
        throw await handleErrors(res);
      }
      const data = (await res.json()) as Tafseer;

      return { id: data.tafseer_id, verseId: data.ayah_number, name: data.tafseer_name, text: data.text };
    },
    enabled: !!verseId && !!chapterId,
  });

  return query;
}
