import { useMutation } from "@tanstack/react-query";
import { api } from "~/api";

type Req = {
  username: string;
  message: string;
  game_result: string;
};
type Res = {
  id: string;
}
export const usePostNickname = () => {
  const postNickname = async (req: Req) => {
    const res: Res = await api.post(`/v1/card`, req);
    return res;
  };

  return useMutation({
    mutationFn: (req: Req) => postNickname(req),
  });
};
