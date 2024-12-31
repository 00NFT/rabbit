import { css } from "@emotion/react";
import { ArrowLeft } from "public/icons/Arrow";
import { useEffect, useState } from "react";
import { Button } from "~/components/button";
import FlipCard from "~/components/flip-card";
import { FloatingBottomArea } from "~/components/floating-bottom-area";
import ProgressBar from "~/components/progress-bar";
import { useTimer } from "~/hooks/useTimer";
import { executeSequentially } from "~/utils/executeSequentially";
import { useGameProgress } from "~/utils/useGameProgress";
import { usePhaseActions } from "~/utils/usePhaseActions";
import Confetti from "../confetti";

type StatusType = "PENDING" | "SUCCESS" | "FAILURE" | "REVEALED" | "READY" | "COMPLETED" | "SHOW_RESULT";

const FLIP_DELAY = 100; // ms
const FLIP_DURATION = 500; // ms
const PROGRESS_DURATION = FLIP_DELAY + FLIP_DURATION + 3000; // Flip delay time + Flip duration time + 3s (base)

export default function Game() {
  const [select, setSelect] = useState<number | null>(null); // user select
  const [status, setStatus] = useState<StatusType>("PENDING");

  const { decreasePhase } = usePhaseActions();
  const { generateGame, checkAnswer, timeover, cards, step, resetStep, nextStep, currentStep } = useGameProgress();
  const { start, stop, reset, progress } = useTimer(PROGRESS_DURATION + (step - 1) * 1200);

  useEffect(() => {
    generateGame();
    reset();
    setStatus("PENDING");
    setSelect(null);
    setTimeout(() => {
      start();
    }, FLIP_DELAY);
  }, [step]);

  useEffect(() => {
    // timeover
    if (progress === 100) {
      timeover();
      handleClick({ id: 0, isAnswer: false, image: "" });
    }
  }, [progress]);

  useEffect(() => {
    if (status === "SUCCESS" || status === "FAILURE") {
      handleTimeline();
    }
  }, [status]);

  const getHeadingText = () => {
    switch (status) {
      case "PENDING":
        return `다르게 생긴 ${currentStep.label} 찾아줘`;
      case "SUCCESS":
        return `정답!`;
      case "FAILURE":
        return "땡!";
      case "REVEALED":
        return "으이구... 여기에 있었어";
      case "READY":
        return "다음 아이템을 찾으러 갈래?";
      case "COMPLETED":
        return "아이템 찾기를 다 했어!";
      case "SHOW_RESULT":
        return "이제 나를 보러 와줘";
    }
  };

  const handleTimeline = () => {
    const isLast = step === 4;
    let initialDelay = 1200;
    let actions: { action: () => void; delay?: number }[] = [];

    if (status === "FAILURE") {
      actions = [{ action: () => setStatus("REVEALED"), delay: 1400 }];
    }

    if (isLast)
      actions = actions.concat([
        { action: () => setStatus("COMPLETED"), delay: 1400 },
        { action: () => setStatus("SHOW_RESULT"), delay: 1400 },
        { action: () => nextStep() },
      ]);
    else {
      actions = actions.concat([{ action: () => setStatus("READY") }]);
    }
    executeSequentially(actions, initialDelay);
  };

  const handleClick = (card: any) => {
    if (!select && status === "PENDING") {
      stop();
      setSelect(card.id);
      checkAnswer(card);

      setStatus(card.isAnswer ? "SUCCESS" : "FAILURE");
    }
  };

  return (
    <>
      <div css={containerCss}>
        <nav css={navigationCss}>
          <button
            onClick={() => {
              resetStep();
              decreasePhase();
            }}
          >
            <ArrowLeft />
          </button>
        </nav>

        <h1>{getHeadingText()}</h1>
        <div css={paddingWrapperCss}>
          <ProgressBar progress={progress} />
          <div css={imageGridCss(step + 1)}>
            {cards.map((card, idx: number) => (
              <FlipCard key={`${cards.length}_${idx}`} onClick={() => handleClick(card)} delay={FLIP_DELAY} duration={FLIP_DURATION}>
                <div
                  css={[
                    cardCss,
                    status === "REVEALED" || status === "READY" || status === "COMPLETED" || status === "SHOW_RESULT"
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
        </div>
        {status === "READY" && (
          <FloatingBottomArea backgroundColor="#F0F4FC">
            <Button onClick={nextStep}>찾으러 가기</Button>
          </FloatingBottomArea>
        )}
      </div>
      <Confetti condition={status === "SUCCESS"} />
    </>
  );
}

const containerCss = css`
  min-height: 100%;

  padding-top: 64px;

  background-color: #f0f4fc;
  text-align: center;

  > h1 {
    font-weight: 400;
    font-size: 20px;
    line-height: 34px;
  }
`;

const navigationCss = css`
  position: absolute;
  top: 0;

  display: flex;
  align-items: center;

  max-width: 400px;
  width: 100%;

  margin: 0 auto;
  padding: 20px;
`;

const paddingWrapperCss = css`
  padding: 0 24px;
`;

const imageGridCss = (gridCnt: number) => css`
  display: grid;
  grid-template-columns: repeat(${gridCnt}, 1fr);
  gap: 12px;

  height: calc(100% - 100px);
  max-width: 100%;
  aspect-ratio: 3/4;

  margin: 28px 0;

  cursor: pointer;

  > div {
    width: 100%;
    height: 100%;

    border-radius: 12px;
  }
`;

const cardCss = css`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  background-color: white;
  border-radius: 12px;

  > img {
    width: 100%;
    height: auto;

    object-fit: contain;
  }
`;
