import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import client from "@/server/client";
import { InferRequestType, InferResponseType } from "hono";
import { handleErrors } from "@/lib/errors";

const $post = client.api.v1.chapter.favorites.$post;

type resT = InferResponseType<typeof $post>;
type reqT = InferRequestType<typeof $post>["json"];

type chapterIdsType = { chapterId: number };

type mutationContext = {
  prevQuery?: chapterIdsType[];
};

export default function useToggleFavoriteChapter() {
  const queryClient = useQueryClient();
  const mutation = useMutation<resT, Error, reqT, mutationContext>({
    mutationFn: async ({ chapterId }) => {
      const res = await $post({ json: { chapterId } });

      // handle throw the error response
      if (!res.ok) {
        throw await handleErrors(res);
      }
      return await res.json();
    },
    onMutate: async (newQuery: chapterIdsType) => {
      await queryClient.cancelQueries({ queryKey: ["favorite_chapters_ids"] });

      const prevQuery = queryClient.getQueryData<chapterIdsType[]>(["favorite_chapters_ids"]);

      const isExist = prevQuery?.find((q) => q.chapterId === newQuery.chapterId);

      if (isExist) {
        queryClient.setQueryData<chapterIdsType[]>(["favorite_chapters_ids"], (old = []) => [...old.filter((query) => query.chapterId !== newQuery.chapterId)]);
      } else {
        queryClient.setQueryData<chapterIdsType[]>(["favorite_chapters_ids"], (old = []) => [...old, newQuery]);
      }

      return { prevQuery };
    },
    onSuccess: ({ message }) => {
      toast.success(message);
    },
    onError: (error, newQuery, context) => {
      queryClient.setQueryData(["favorite_chapters_ids"], context?.prevQuery);
      toast.error(error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["favorite_chapters_ids"] });
    },
  });

  return mutation;
}
