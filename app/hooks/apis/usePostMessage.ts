import { useMutation } from "@tanstack/react-query";
import { api } from "~/api";

type Req = {
  uuid: string;
  message: string;
};
export const usePostMessage = () => {
  const postMessage = async (req: Req) => {
    const res = await api.post(`/v1/card/update`, req);
    return res;
  };

  return useMutation({
    mutationFn: (req: Req) => postMessage(req),
  });
};
