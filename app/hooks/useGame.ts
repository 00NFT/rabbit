import { useContext } from "react";
import { GameContext } from "~/providers/game-provider";

export const useGame = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("GameProvider 내에서 사용해주세요.");
  }
  return context;
};
