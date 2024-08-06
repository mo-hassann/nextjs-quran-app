import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import client from "@/server/client";
import { InferRequestType, InferResponseType } from "hono";
import { handleErrors } from "@/lib/errors";

const $post = client.api.v1.verse.bookmark.$post;

type resT = InferResponseType<typeof $post>;
type reqT = InferRequestType<typeof $post>["json"];

type verseIdsType = { chapterId: number; verseId: number };

type mutationContext = {
  prevQuery?: verseIdsType[];
};

export default function useToggleBookmarkVerse() {
  const queryClient = useQueryClient();
  const mutation = useMutation<resT, Error, reqT, mutationContext>({
    mutationFn: async ({ chapterId, verseId }) => {
      const res = await $post({ json: { chapterId, verseId } });

      // handle throw the error response
      if (!res.ok) {
        throw await handleErrors(res);
      }
      return await res.json();
    },
    onMutate: async (newQuery: verseIdsType) => {
      await queryClient.cancelQueries({ queryKey: ["booked_verses_ids"] });

      const prevQuery = queryClient.getQueryData<verseIdsType[]>(["booked_verses_ids"]);

      const isExist = prevQuery?.findIndex((q) => q.chapterId === newQuery.chapterId && q.verseId === newQuery.verseId);

      if (isExist !== -1) {
        queryClient.setQueryData<verseIdsType[]>(["booked_verses_ids"], (old = []) => [...old.filter((q, i) => i !== isExist)]);
      } else {
        queryClient.setQueryData<verseIdsType[]>(["booked_verses_ids"], (old = []) => [...old, newQuery]);
      }

      return { prevQuery };
    },
    onSuccess: ({ message }) => {
      toast.success(message);
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(["favorite_chapters_ids"], context?.prevQuery);
      toast.error(error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["booked_verses_ids"] });
    },
  });

  return mutation;
}
