import { atom, useAtom } from "jotai";

// NOTE: 토끼 카드 생성을 위한 플로우 과정 중 페이즈 관리에 대한 전역 유틸 함수예요.

export const phaseAtom = atom(0);
export const nameAtom = atom("");

export function usePhaseActions() {
  const [phase, setPhase] = useAtom(phaseAtom);
  const [name, setName] = useAtom(nameAtom);

  const increasePhase = () => {
    setPhase((prevPhase) => prevPhase + 1);
  };

  const decreasePhase = () => {
    if (phase > -1) setPhase((prevPhase) => prevPhase - 1);
  };

  const changeName = (value: string) => {
    setName(value);
  };

  const movePhase = (newPhase: number) => {
    setPhase(newPhase);
  };

  return {
    phase,
    name,
    increasePhase,
    decreasePhase,
    changeName,
    movePhase,
  };
}
