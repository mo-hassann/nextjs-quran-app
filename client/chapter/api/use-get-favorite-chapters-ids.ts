import { useQuery } from "@tanstack/react-query";

import client from "@/server/client";

import { handleErrors } from "@/lib/errors";

export default function useGetFavoriteChaptersIds(enabled?: boolean) {
  const query = useQuery({
    queryKey: ["favorite_chapters_ids"],
    queryFn: async () => {
      const res = await client.api.v1.chapter.favorites.$get();

      // handle throw the error response
      if (!res.ok) {
        throw await handleErrors(res);
      }
      const { data } = await res.json();

      return data;
    },
    enabled,
  });

  return query;
}
