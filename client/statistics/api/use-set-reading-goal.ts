import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import client from "@/server/client";
import { InferRequestType, InferResponseType } from "hono";
import { handleErrors } from "@/lib/errors";

const $post = client.api.v1.statistics["reading-goal"].$post;

type resT = InferResponseType<typeof $post>;
type reqT = InferRequestType<typeof $post>["json"];

export default function useSetReadingGoal() {
  const queryClient = useQueryClient();
  const mutation = useMutation<resT, Error, reqT>({
    mutationFn: async ({ readingGoal }) => {
      const res = await $post({ json: { readingGoal } });

      // handle throw the error response
      if (!res.ok) {
        throw await handleErrors(res);
      }
      return await res.json();
    },
    onSuccess: ({ message }) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["reading_goal"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
}
