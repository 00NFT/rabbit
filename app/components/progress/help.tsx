import { css } from "@emotion/react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { ArrowLeft } from "public/icons/Arrow";
import { Fragment, useEffect, useState } from "react";
import TypewriterComponent from "typewriter-effect";
import { ANIMATION } from "~/utils/animation";
import { usePhaseActions } from "~/utils/usePhaseActions";
import { Button } from "../button";
import { helpMessage } from "~/utils/message";

export const meta: MetaFunction = () => {
  return [{ title: "토끼 구출 대작전" }, { name: "description", content: "Welcome to Remix!" }];
};

export const links: LinksFunction = () => {
  return [{ rel: "preload", href: "/images/rabbit-mysterious.svg", as: "image" }];
};

export default function Help() {
  const navigate = useNavigate();
  const { increasePhase } = usePhaseActions();
  const [isVisible, setIsVisible] = useState(false);
  const [storySpeed] = useState(30);
  const [skipStory, setSkipStory] = useState(false);

  useEffect(() => {
    const skipStory = () => {
      setIsVisible(true);
      setSkipStory(true);
    };

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    document.body.addEventListener("click", skipStory);

    return () => {
      clearTimeout(timer);
      document.body.removeEventListener("click", skipStory);
    };
  }, []);

  return (
    <Fragment>
      <div css={containerCss}>
        <nav css={navigationCss}>
          <button onClick={() => navigate(-1)}>
            <ArrowLeft />
          </button>
        </nav>
        <img id="mysterioutRabbit" src="/images/rabbit-mysterious.svg" alt="Mysterious Rabbit" width={205} height={279} />
        <div css={decriptionCss}>
          {skipStory ? (
            <div className="Typewriter" dangerouslySetInnerHTML={{ __html: helpMessage() }} />
          ) : (
            <TypewriterComponent
              options={{
                strings: helpMessage(),
                autoStart: true,
                loop: false,
                delay: storySpeed,
              }}
            />
          )}
        </div>
      </div>
      <div css={buttons.wrapperCss}>
        <Button onClick={increasePhase} css={visibleEffectCss(isVisible)}>
          도와준다
        </Button>
      </div>
    </Fragment>
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

  #mysterioutRabbit {
    animation: ${ANIMATION.FADE_IN} 1s ease-in-out;
  }
`;

const visibleEffectCss = (isVisible: boolean) => css`
  display: ${isVisible ? "block" : "none"};
  animation: ${ANIMATION.FADE_IN} 1s ease-in-out;
`;

const decriptionCss = css`
  display: flex;
  width: 100%;
  padding: 16px 20px;
  align-items: flex-start;
  gap: 10px;
  border-radius: 12px;
  background: #c9d5f0;

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
