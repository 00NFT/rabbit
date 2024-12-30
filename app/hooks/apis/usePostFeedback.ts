import { useMutation } from "@tanstack/react-query";
import { api } from "~/api";

type Req = {
  username: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  answer5: string;
};
export const usePostFeedback = () => {
  const postFeedback = async (req: Req) => {
    const res = await api.post(`/v1/beta`, req);
    return res;
  };

  return useMutation({
    mutationFn: (req: Req) => postFeedback(req),
  });
};
