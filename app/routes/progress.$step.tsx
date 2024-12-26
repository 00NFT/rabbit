import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import { Button } from "~/components/button";
import FlipCard from "~/components/flip-card";
import { Header } from "~/components/header";
import { useGame } from "~/hooks/useGame";
import { useTimer } from "~/hooks/useTimer";
import { CardType } from "~/providers/game-provider";

type StatusType = "PENDING" | "SELECTED" | "SUCCESS" | "FAILURE" | "REVEALED" | "READY";

const FLIP_DELAY = 100; // ms
const FLIP_DURATION = 500; // ms
const PROGRESS_DURATION = FLIP_DELAY + FLIP_DURATION + 3000; // Flip delay time + Flip duration time + 3s

export default function Game() {
  const [select, setSelect] = useState<number | null>(null); // user select
  const [status, setStatus] = useState<StatusType>("PENDING");
  const [heading, setHeading] = useState<string>("");

  const headingRef = useRef<NodeJS.Timeout>();

  const { start, stop, reset } = useTimer(PROGRESS_DURATION);
  const { generateGame, checkAnswer, cards, step, nextStep, target } = useGame();

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
      if (headingRef.current) {
        clearTimeout(headingRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setHeading(`다르게 생긴 ${target.label}을(를) 찾아줘`);
  }, [target]);

  const handleDelayHeadingChange = async (text: string, delay: number = 1000, callback?: (obj?: any) => any) => {
    clearTimeout(headingRef.current);
    return new Promise((resolve) => {
      headingRef.current = setTimeout(() => {
        setHeading(text);
        !!callback ? callback() : null;
        resolve(true);
      }, delay);
    });
  };

  const handleClick = async (card: CardType) => {
    checkAnswer(card);

    const isLast = step === 4;

    if (!select) {
      stop();
      setSelect(card.id);
      if (card.isAnswer) {
        setStatus("SUCCESS");
        await handleDelayHeadingChange("정답!", 0);
      } else {
        setStatus("FAILURE");
        await handleDelayHeadingChange("땡!", 0);
        await handleDelayHeadingChange("여기에 있었어", 800, () => {
          setStatus("REVEALED");
        });
      }

      if (isLast) {
        await handleDelayHeadingChange("모든 아이템을 다 찾아봤어!");
        await handleDelayHeadingChange("이제 달토끼를 보러 가자!").then(() => {
          return new Promise((resolve) => {
            setTimeout(() => {
              nextStep();
              resolve(true);
            }, 1000);
          });
        });
      } else
        await handleDelayHeadingChange("다음 아이템을 찾으러 가볼까?", 2000, () => {
          setStatus("READY");
        });
    }
  };

  return (
    <>
      <div css={containerCss}>
        <Header />
        <h1>{heading}</h1>
        <div>
          {/* <ProgressBar progress={progress} /> */}
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
          {status === "READY" && <Button onClick={nextStep}>찾으러 가기</Button>}
        </div>
      </div>
    </>
  );
}

const containerCss = css`
  position: relative;

  height: 100%;

  background-color: #f9f9f9;
  text-align: center;

  > nav {
    background-color: #f9f9f9 !important;
  }

  > h1 {
    margin-top: 4px;

    font-weight: 400;
    font-size: 20px;
    line-height: 34px;
  }

  > div {
    padding: 0 24px;
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
