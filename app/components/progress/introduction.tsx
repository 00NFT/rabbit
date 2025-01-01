import { css } from "@emotion/react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { ArrowLeft } from "public/icons/Arrow";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import TypewriterComponent from "typewriter-effect";
import { ANIMATION } from "~/utils/animation";
import { usePhaseActions } from "~/utils/usePhaseActions";
import { Button } from "../button";
import { beforeGameMessage } from "~/utils/message";

const assets = ["carrot", "ears", "moon", "bucket"];

export const links: LinksFunction = () => {
  return assets.map((asset) => ({
    rel: "preload",
    href: `/images/marquee/${asset}.svg`,
    as: "image",
  }));
};

export const meta: MetaFunction = () => {
  return [{ title: "토끼 구출 대작전" }, { name: "description", content: "Welcome to Remix!" }];
};

export default function Introduction() {
  const { increasePhase, decreasePhase, name } = usePhaseActions();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [skipStory, setSkipStory] = useState(false);
  const [storySpeed] = useState(30);

  useEffect(() => {
    const skipStory = () => {
      setIsVisible(true);
      setSkipStory(true);
    };

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    document.body.addEventListener("click", skipStory);

    return () => {
      clearTimeout(timer);
      document.body.removeEventListener("click", skipStory);
    };
  }, []);

  return (
    <>
      <div css={containerCss}>
        <nav css={navigationCss}>
          <button onClick={decreasePhase}>
            <ArrowLeft />
          </button>
        </nav>
        <Marquee
          css={css`
            width: var(--layout-max-width) !important;
          `}
        >
          {assets.map((item) => {
            return (
              <img
                id="marqueeItems"
                key={item}
                src={`/images/marquee/${item}.svg`}
                alt={`${item} 그림`}
                width={150}
                height={150}
                css={css`
                  margin-right: 20px;
                `}
              />
            );
          })}
        </Marquee>
        <div css={decriptionCss}>
          {skipStory ? (
            <div className="Typewriter" dangerouslySetInnerHTML={{ __html: beforeGameMessage(name) }} />
          ) : (
            <TypewriterComponent
              options={{
                strings: beforeGameMessage(name),
                autoStart: true,
                loop: false,
                delay: storySpeed,
              }}
            />
          )}
        </div>
      </div>
      <div css={buttons.wrapperCss}>
        <Button onClick={() => increasePhase()} css={visibleEffectCss(isVisible)}>
          틀린그림 찾기 하러 가기
        </Button>
      </div>
    </>
  );
}

const containerCss = css`
  position: relative;
  padding: 42px 24px 0 24px;
  height: 100dvh;

  background-color: #f0f4fc;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  #marqueeItems {
    animation: ${ANIMATION.FADE_IN} 1s ease-in-out;
  }
`;

const decriptionCss = css`
  display: flex;
  width: 100%;
  padding: 16px 20px;
  align-items: flex-start;
  gap: 10px;
  border-radius: 12px;
  background: #c9d5f0;
  margin-top: 50px;

  .Typewriter {
    color: #6b7ca1;
    font-size: 12px;
    font-weight: 400;
    line-height: 2;
  }
`;

const navigationCss = css`
  position: absolute;
  top: 0;

  display: flex;
  align-items: center;

  max-width: var(--layout-max-width);
  width: 100%;

  margin: 0 auto;
  padding: 20px;
`;

const visibleEffectCss = (isVisible: boolean) => css`
  display: ${isVisible ? "block" : "none"};
  animation: ${ANIMATION.FADE_IN} 1s ease-in-out;
`;

/* 공통 컴포넌트 필요 */
const buttons = {
  wrapperCss: css`
    position: fixed;
    bottom: 0;

    width: 100%;
    max-width: var(--layout-max-width);
    margin: 0 auto;
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

  homeButtonCss: css`
    font-size: 12px;
    color: #7d7d7d;
  `,
};
