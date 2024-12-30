import { css } from "@emotion/react";
import { ArrowLeft } from "public/icons/Arrow";
import { useEffect, useRef, useState } from "react";
import { Button } from "~/components/button";
import FlipCard from "~/components/flip-card";
import { FloatingBottomArea } from "~/components/floating-bottom-area";
import ProgressBar from "~/components/progress-bar";
import { useGame } from "~/hooks/useGame";
import { useTimer } from "~/hooks/useTimer";
import { CardType } from "~/providers/game-provider";
import { usePhaseActions } from "~/utils/usePhaseActions";

type StatusType = "PENDING" | "SELECTED" | "SUCCESS" | "FAILURE" | "REVEALED" | "READY";

const FLIP_DELAY = 100; // ms
const FLIP_DURATION = 500; // ms
const PROGRESS_DURATION = FLIP_DELAY + FLIP_DURATION + 3000; // Flip delay time + Flip duration time + 3s (base)

export default function Game() {
  const [select, setSelect] = useState<number | null>(null); // user select
  const [status, setStatus] = useState<StatusType>("PENDING");
  const [heading, setHeading] = useState<string>("");

  const headingRef = useRef<NodeJS.Timeout>();

  const { decreasePhase } = usePhaseActions();
  const { generateGame, checkAnswer, timeover, cards, step, resetStep, nextStep, target } = useGame();
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
    return () => {
      if (headingRef.current) clearTimeout(headingRef.current);
    };
  }, []);

  useEffect(() => {
    setHeading(`다르게 생긴 ${target.label} 찾아줘`);
  }, [target]);

  useEffect(() => {
    // timeover
    if (progress === 100) {
      timeover();
      handleClick({ id: 0, isAnswer: false, image: "" });
    }
  }, [progress]);

  const handleDelayHeadingChange = async (text: string, delay: number = 1000, callback?: (obj?: any) => any) => {
    clearTimeout(headingRef.current);
    return new Promise((resolve) => {
      headingRef.current = setTimeout(() => {
        setHeading(text);
        callback?.();
        resolve(true);
      }, delay);
    });
  };

  const handleClick = async (card: CardType) => {
    const isLast = step === 4;

    if (!select && status === "PENDING") {
      stop();
      setSelect(card.id);
      checkAnswer(card);
      if (card.isAnswer) {
        setStatus("SUCCESS");
        await handleDelayHeadingChange("정답!", 0);
      } else {
        setStatus("FAILURE");
        await handleDelayHeadingChange("땡!", 0);
        await handleDelayHeadingChange("으이구...여기에 있었어", 800, () => {
          setStatus("REVEALED");
        });
      }

      if (isLast) {
        await handleDelayHeadingChange("아이템 찾기를 다 했어!");
        await handleDelayHeadingChange("이제 나를 보러 와줘").then(() => {
          return new Promise((resolve) => {
            setTimeout(() => {
              nextStep();
              resolve(true);
            }, 1000);
          });
        });
      } else
        await handleDelayHeadingChange("다음 아이템을 찾으러 갈래?", 2000, () => {
          setStatus("READY");
        });
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
        <h1>{heading}</h1>
        <div css={paddingWrapperCss}>
          <ProgressBar progress={progress} />
          <div css={imageGridCss(step + 1)}>
            {cards.map((card: CardType, idx: number) => (
              <FlipCard key={`${cards.length}_${idx}`} onClick={() => handleClick(card)} delay={FLIP_DELAY} duration={FLIP_DURATION}>
                <div
                  css={[
                    cardCss,
                    status === "REVEALED" || status === "READY"
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
    </>
  );
}

const containerCss = css`
  height: 100%;

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

  max-width: 600px;
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
