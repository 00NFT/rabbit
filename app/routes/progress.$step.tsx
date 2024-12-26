import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import FlipCard from "~/components/flip-card";
import { useGame } from "~/hooks/useGame";
import { useTimer } from "~/hooks/useTimer";
import { CardType } from "~/providers/game-provider";

const FLIP_DELAY = 100; // ms
const FLIP_DURATION = 500; // ms
const PROGRESS_DURATION = FLIP_DELAY + FLIP_DURATION + 3000; // Flip delay time + Flip duration time + 3s

export default function Game() {
  const [select, setSelect] = useState<number | null>(null); // user select
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [showNextStep, setShowNextStep] = useState<boolean>(false);
  const [heading, setHeading] = useState<string>("");

  const { start, stop, reset } = useTimer(PROGRESS_DURATION);
  const { generateGame, checkAnswer, cards, step, nextStep, target } = useGame();

  useEffect(() => {
    generateGame();
    reset();
    setSelect(null);
    setShowAnswer(false);
    setShowNextStep(false);
    setTimeout(() => {
      start();
    }, FLIP_DELAY);
  }, [step]);

  useEffect(() => {
    setHeading(`다르게 생긴 ${target.label}를 찾아줘`);
  }, [target]);

  const showNext = () => {
    setTimeout(() => {
      setHeading("다음 아이템을 찾으러 가볼까?");
      setShowNextStep(true);
    }, 2000); // ready for next step
  };

  const handleClick = (card: CardType) => {
    checkAnswer(card);

    const isLast = step === 4;

    if (!select) {
      stop();
      setSelect(card.id);
      if (card.isAnswer) {
        setHeading("정답!");
      } else {
        setHeading("땡!");

        setTimeout(() => {
          setShowAnswer(true);
          setHeading("여기에 있었어");
        }, 1000); //  delay (shown answer) after incorrect answer is selected
      }
      if (isLast) {
        setTimeout(() => {
          setHeading("모든 아이템을 다 찾아봤어!");
        }, 1000);
        setTimeout(() => {
          setHeading("이제 달토끼를 보러 가자!");
        }, 2000);
        setTimeout(() => {
          nextStep();
        }, 3000);
      } else showNext();
    }
  };

  return (
    <>
      <div css={containerCss}>
        <h1>{heading}</h1>
        {/* <ProgressBar progress={progress} /> */}
        <div css={imageGridCss(step + 1)}>
          {cards.map((card: CardType, idx: number) => (
            <FlipCard key={`${cards.length}_${idx}`} onClick={() => handleClick(card)} delay={FLIP_DELAY} duration={FLIP_DURATION}>
              <div
                css={[
                  cardCss,
                  showAnswer
                    ? card.isAnswer
                      ? "border: 1.5px solid black;"
                      : "border: 1px solid white; opacity: 0.6;"
                    : !select
                      ? "border: 1px solid white;"
                      : select === card.id
                        ? card.isAnswer
                          ? "border: 1.5px solid black;"
                          : "border: 1.5px solid red;"
                        : "border: 1px solid white;",
                ]}
              >
                <img src={card.image} />
              </div>
            </FlipCard>
          ))}
        </div>
        {showNextStep && (
          <div css={buttons.wrapperCss}>
            <button css={buttons.cardButtonCss} onClick={nextStep}>
              찾으러 가기
            </button>
          </div>
        )}
      </div>
    </>
  );
}

const containerCss = css`
  height: 100%;

  padding: 0 24px;

  background-color: #f0f4fc;
  text-align: center;

  > h1 {
    margin-top: 4px;

    font-weight: 400;
    font-size: 20px;
    line-height: 34px;
  }
`;

const imageGridCss = (gridCnt: number) => css`
  display: grid;
  grid-template-columns: repeat(${gridCnt}, 1fr);
  gap: 12px;

  height: calc(100% - 200px);
  max-width: 100%;
  aspect-ratio: 3/4;

  margin: 28px auto;

  cursor: pointer;

  > div {
    width: 100%;
    height: 100%;

    border-radius: 12px;
  }
`;

const cardCss = css`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 12px;

  > img {
    width: 100%;
    height: auto;
  }
`;

/* 공통 컴포넌트 필요 feat. @Jungjjyeong */
const buttons = {
  wrapperCss: css`
    position: fixed;
    bottom: 0;

    width: 100%;
    max-width: 600px;
    margin: 0 -24px 0;
    padding: 12px 24px 32px;

    display: flex;
    flex-direction: column;
    gap: 12px;
    justify-content: center;

    > a {
      text-align: center;
    }
  `,

  cardButtonCss: css`
    font-size: 14px;
    padding: 16px 0;
    border-radius: 8px;

    color: white;
    background-color: #151528;
  `,
};
