import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";
import client from "@/server/client";
import { InferRequestType, InferResponseType } from "hono";
import { handleErrors } from "@/lib/errors";

const $post = client.api.v1.statistics["reading-time"].$post;

type resT = InferResponseType<typeof $post>;
type reqT = InferRequestType<typeof $post>["json"];

export default function useSetReadingTime() {
  const mutation = useMutation<resT, Error, reqT>({
    mutationFn: async ({ time }) => {
      const res = await $post({ json: { time } });

      // handle throw the error response
      if (!res.ok) {
        throw await handleErrors(res);
      }
      return await res.json();
    },
    onSuccess: ({ message }) => {
      toast.success(message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
}
