import { useQuery } from "@tanstack/react-query";
import { api } from "~/api";

type Req = {
  id: string;
};
type Res = {
  USERNAME: string;
  CARD_MESSAGE: string;
  RESULT: string;
}
export const useGetPlayerGameInfos = (req: Req) => {
  const getPlayerGameInfos = async ({ id }: Req) => {
    const res = await api.get<Res>(`/v1/card/${id}`);
    return res;
  };

  return useQuery({
    queryKey: ["playerNames", req.id],
    queryFn: () => getPlayerGameInfos(req),
    retry: 2
  });
};
