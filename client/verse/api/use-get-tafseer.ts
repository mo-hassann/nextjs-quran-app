import { useQuery } from "@tanstack/react-query";

import { handleErrors } from "@/lib/errors";
import client from "@/server/client";

type props = {
  tafseerId: number;
  verseId?: number;
  chapterId?: number;
};

export default function useGetTafseer({ tafseerId, verseId, chapterId }: props) {
  const query = useQuery({
    queryKey: ["tafseerId", tafseerId, verseId, chapterId],
    queryFn: async () => {
      const res = await client.api.v1.verse.tafseer.$get({ query: { chapterId: `${chapterId}`, tafseerId: `${tafseerId}`, verseId: `${verseId}` } });

      // handle throw the error response
      if (!res.ok) {
        throw await handleErrors(res);
      }
      const data = await res.json();

      return { id: data.tafseer_id, verseId: data.ayah_number, name: data.tafseer_name, text: data.text };
    },
  });

  return query;
}
