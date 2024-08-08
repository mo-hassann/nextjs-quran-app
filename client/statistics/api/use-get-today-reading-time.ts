import { useQuery } from "@tanstack/react-query";

import { handleErrors } from "@/lib/errors";

import client from "@/server/client";

export default function useGetTodayReadingTime() {
  const query = useQuery({
    queryKey: ["today_reading_time"],
    queryFn: async () => {
      const res = await client.api.v1.statistics["today-reading-time"].$get();

      // handle throw the error response
      if (!res.ok) {
        throw await handleErrors(res);
      }
      const { data } = await res.json();

      return data;
    },
  });

  return query;
}
