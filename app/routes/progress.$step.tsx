import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import FlipCard from "~/components/flip-card";
import ProgressBar from "~/components/progress-bar";
import { useGame } from "~/hooks/useGame";
import { useTimer } from "~/hooks/useTimer";
import { CardType } from "~/providers/game-provider";

const FLIP_DELAY = 100; // ms
const FLIP_DURATION = 500; // ms
const PROGRESS_DURATION = FLIP_DELAY + FLIP_DURATION + 3000; // Flip delay time + Flip duration time + 3s

export default function Game() {
  const [select, setSelect] = useState<number | null>(null); // user select
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const { start, stop, reset, progress } = useTimer(PROGRESS_DURATION);

  const { generateGame, checkAnswer, cards, step, nextStep, target } = useGame();

  useEffect(() => {
    reset();
    setSelect(null);
    setShowAnswer(false);
    generateGame();
    setTimeout(() => {
      start();
    }, FLIP_DELAY);
  }, [step]);

  const handleClick = (card: CardType) => {
    if (!select) {
      stop();
      setSelect(card.id);
      if (card.isAnswer) {
        setShowAnswer(true);
      } else
        setTimeout(() => {
          setShowAnswer(true);
        }, 2000); // delay after incorrect answer is selected
      checkAnswer(card);
    }
  };

  return (
    <>
      <div css={containerCss}>
        <h1>다르게 생긴 {target?.label}를 찾아줘</h1>
        <ProgressBar progress={progress} />
        <div css={imageGridCss(Number(step) + 1)}>
          {cards.map((card: CardType, idx: number) => (
            <FlipCard key={`${cards.length}_${idx}`} onClick={() => handleClick(card)} delay={FLIP_DELAY} duration={FLIP_DURATION}>
              <div
                css={[
                  cardCss,
                  showAnswer
                    ? card.isAnswer
                      ? "border: 1px solid black;"
                      : "border: 1px solid white;"
                    : !select
                      ? "border: 1px solid white;"
                      : select === card.id
                        ? card.isAnswer
                          ? "border: 1px solid black;"
                          : "border: 1px solid red;"
                        : "border: 1px solid white;",
                ]}
              >
                <img src={card.image} />
              </div>
            </FlipCard>
          ))}
        </div>
        {showAnswer && (
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
