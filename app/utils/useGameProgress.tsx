import { useNavigate } from "@remix-run/react";
import { atom, useAtom } from "jotai";
import { useRef, useState } from "react";

export interface CardType {
  id: number;
  image: string;
  isAnswer: boolean;
}

export interface StepType {
  label: string;
  value: string;
}

export interface UserAnswerType {
  [key: string]: boolean;
}

const INITIAL_STEPS: StepType[] = [
  { label: "당근을", value: "carrot" },
  { label: "귀를", value: "ear" },
  { label: "달을", value: "moon" },
  { label: "절구를", value: "mortar" },
];

export const userAnswerAtom = atom({});

export function useGameProgress() {
  const [step, setStep] = useState<number>(1);
  const [cards, setCards] = useState<CardType[]>([]);
  const [currentStep, setCurrentStep] = useState<StepType>({ label: "", value: "" }); // e.g. {label: "귀", value: "ear"}

  const [userAnswer, setUserAnswer] = useAtom<UserAnswerType>(userAnswerAtom); // not used yet

  const restStep = useRef(INITIAL_STEPS);

  const navigate = useNavigate();

  const generateGame = () => {
    const indexes = (step + 1) * (step + 1); // Lv1 - 2*2, Lv2 - 3*3, ...
    const obj = restStep.current[Math.floor(Math.random() * restStep.current.length)]; // target object
    const answerPos = Math.floor(Math.random() * indexes); // wrong image position

    const cards: CardType[] = Array(indexes)
      .fill({ image: `/illusts/${obj.value}_right.PNG`, isAnswer: false })
      .map((card, idx) => ({ ...card, id: indexes * (idx + 1) }));
    cards[answerPos].isAnswer = true;
    cards[answerPos].image = `/illusts/${obj.value}_wrong.PNG`;

    setCards(cards);
    setCurrentStep(obj);
  };

  const checkAnswer = (card: CardType) => {
    setUserAnswer((prev: UserAnswerType) => ({ ...prev, [currentStep.value]: card.isAnswer }));
    restStep.current = restStep.current.filter((item: StepType) => item.value !== currentStep.value);
  };

  const timeover = () => {
    setUserAnswer((prev: UserAnswerType) => ({ ...prev, [currentStep.value]: false }));
    restStep.current = restStep.current.filter((item: StepType) => item.value !== currentStep.value);
  };

  const resetStep = () => setStep(1);

  const nextStep = () => {
    console.log(userAnswer);
    if (restStep.current.length) setStep((prev: number) => prev + 1);
    else {
      // TODO: 결과에 따른 일러스트 인덱스를 path param 으로 전달
      navigate(`/result`);
    }
  };

  return {
    generateGame,
    checkAnswer,
    timeover,
    cards,
    step,
    resetStep,
    nextStep,
    currentStep,
  };
}
