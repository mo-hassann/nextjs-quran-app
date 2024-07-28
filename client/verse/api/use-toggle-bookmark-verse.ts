import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import client from "@/server/client";
import { InferRequestType, InferResponseType } from "hono";
import { handleErrors } from "@/lib/errors";

const $post = client.api.v1.verse.bookmark.$post;

type resT = InferResponseType<typeof $post>;
type reqT = InferRequestType<typeof $post>["json"];

export default function useToggleBookmarkVerse() {
  const queryClient = useQueryClient();
  const mutation = useMutation<resT, Error, reqT>({
    mutationFn: async ({ chapterId, verseId }) => {
      console.log(chapterId, "props ch id");
      const res = await $post({ json: { chapterId, verseId } });

      // handle throw the error response
      if (!res.ok) {
        throw await handleErrors(res);
      }
      return await res.json();
    },
    onSuccess: ({ message }) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["favorite_chapters_ids"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
}
