import { useNavigate, useParams } from "@remix-run/react";
import { createContext, useRef, useState } from "react";

export interface CardType {
  id: number;
  image: string;
  isAnswer: boolean;
}

export interface TargetType {
  label: string;
  value: string;
}

interface ContextProps {
  generateGame: () => void;
  checkAnswer: (card: CardType) => void;
  timeover: () => void;
  cards: CardType[];
  step: number;
  nextStep: () => void;
  target: TargetType;
}

interface Props {
  children: React.ReactNode;
}

export const GameContext = createContext<ContextProps | undefined>({
  timeover: () => {},
  generateGame: () => {},
  checkAnswer: ({}) => {},
  cards: [],
  step: 0,
  nextStep: () => {},
  target: { label: "", value: "" },
});

const INITIAL_STEP: TargetType[] = [
  { label: "당근을", value: "carrot" },
  { label: "귀를", value: "ear" },
  { label: "달을", value: "moon" },
  { label: "절구를", value: "mortar" },
];

export const GameProvider = ({ children }: Props) => {
  const [userAnswer, setUserAnswer] = useState({});

  const [cards, setCards] = useState<CardType[]>([]);
  const [target, setTarget] = useState({ label: "", value: "" }); // e.g. {label: "귀", value: "ear"}

  const restStep = useRef(INITIAL_STEP);

  const params = useParams();
  const navigate = useNavigate();

  const step = Number(params.step);

  const generateGame = () => {
    if (step - 1 !== Object.keys(userAnswer).length) return navigate("/");

    const indexes = (step + 1) * (step + 1); // Lv1 - 2*2, Lv2 - 3*3, ...
    const obj = restStep.current[Math.floor(Math.random() * restStep.current.length)]; // target object
    const answerPos = Math.floor(Math.random() * indexes); // wrong image position

    const cards: CardType[] = Array(indexes)
      .fill({ image: `/illusts/${obj.value}.svg`, isAnswer: false })
      .map((card, idx) => ({ ...card, id: indexes * (idx + 1) }));
    cards[answerPos].isAnswer = true;
    cards[answerPos].image = `/illusts/${obj.value}2.svg`;

    setCards(cards);
    setTarget(obj);
  };

  const checkAnswer = (card: CardType) => {
    setUserAnswer((prev) => ({ ...prev, [target.value]: card.isAnswer }));
    restStep.current = restStep.current.filter((item) => item.value !== target.value);
  };

  const timeover = () => {
    setUserAnswer((prev) => ({ ...prev, [target.value]: false }));
    restStep.current = restStep.current.filter((item) => item.value !== target.value);
  };

  const nextStep = () => {
    if (restStep.current.length) navigate(`/progress/${step + 1}`);
    else {
      // TODO: 결과에 따른 일러스트 인덱스를 naviagate state으로 전달
      navigate(`/result`);
    }
  };

  return <GameContext.Provider value={{ generateGame, checkAnswer, timeover, cards, step, nextStep, target }}>{children}</GameContext.Provider>;
};
