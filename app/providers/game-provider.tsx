import { useNavigate, useParams } from "@remix-run/react";
import { createContext, useEffect, useRef, useState } from "react";

export interface CardType {
  id: number;
  step: string;
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
  cards: CardType[];
  step: number;
  nextStep: () => void;
  target: TargetType;
}

interface Props {
  children: React.ReactNode;
}

export const GameContext = createContext<ContextProps | undefined>({
  generateGame: () => {},
  checkAnswer: ({}) => {},
  cards: [],
  step: 0,
  nextStep: () => {},
  target: { label: "", value: "" },
});

const INITIAL_STEP: TargetType[] = [
  { label: "당근", value: "carrot" },
  { label: "귀", value: "ear" },
  { label: "달", value: "moon" },
  { label: "절구", value: "mortar" },
];

export const GameProvider = ({ children }: Props) => {
  const [userAnswer, setUserAnswer] = useState({});

  const [cards, setCards] = useState<CardType[]>([]);
  const [target, setTarget] = useState({ label: "", value: "" }); // e.g. {label: "귀", value: "ear"}

  const restStep = useRef(INITIAL_STEP);

  const params = useParams();
  const navigate = useNavigate();

  const step = Number(params.step);

  useEffect(() => {
    if (step > 4 || step < 1) navigate("/");
  }, [step]);

  const generateGame = () => {
    if (step - 1 !== Object.keys(userAnswer).length) navigate("/");
    const indexes = (step + 1) * (step + 1); // Lv1 - 2*2, Lv2 - 3*3, ...
    const obj = restStep.current[Math.floor(Math.random() * restStep.current.length)]; // target object
    const answerPos = Math.floor(Math.random() * indexes); // wrong image position

    const cards: CardType[] = Array(indexes)
      .fill({ step: obj.value, image: `/illusts/${obj.value}.svg`, isAnswer: false })
      .map((card, idx) => ({ ...card, id: indexes * (idx + 1) }));
    cards[answerPos].isAnswer = true;
    cards[answerPos].image = `/illusts/${obj.value}2.svg`;

    setCards(cards);
    setTarget(obj);
  };

  const checkAnswer = (card: CardType) => {
    setUserAnswer((prev) => ({ ...prev, [card.step]: card.isAnswer }));
    restStep.current = restStep.current.filter((item) => item.value !== card.step);
  };

  const nextStep = () => {
    if (restStep.current.length) navigate(`/progress/${step + 1}`);
    else {
      // TODO: 결과에 따른 일러스트 인덱스를 naviagate state으로 전달
      navigate(`/result`);
    }
  };

  return <GameContext.Provider value={{ generateGame, checkAnswer, cards, step, nextStep, target }}>{children}</GameContext.Provider>;
};
