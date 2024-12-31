import { useQuery } from "@tanstack/react-query";
import { api } from "~/api";

const getPlayerName = async () => {
  const res = await api.get("/v1/card");
  return res;
};

const useGetPlayerName = () => {
  return useQuery({
    queryKey: ["playerNames"],
    queryFn: () => getPlayerName(),
  });
};

export { useGetPlayerName, getPlayerName };
