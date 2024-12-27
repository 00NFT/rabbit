import { css } from "@emotion/react";
import type { MetaFunction } from "@remix-run/node";
import { ArrowLeft } from "public/icons/Arrow";
import { Button } from "../button";
import TypewriterComponent from "typewriter-effect";
import { ANIMATION } from "~/utils/animation";
import Marquee from "react-fast-marquee";
import { usePhaseActions } from "~/utils/usePhaseActions";

export const meta: MetaFunction = () => {
  return [{ title: "토끼 구출 대작전" }, { name: "description", content: "Welcome to Remix!" }];
};

export default function Introduction() {
  const { increasePhase, decreasePhase, name } = usePhaseActions();
  const assets = ["carrot", "ears", "moon", "bucket"];

  return (
    <>
      <div css={containerCss}>
        <nav css={navigationCss}>
          <button onClick={decreasePhase}>
            <ArrowLeft />
          </button>
        </nav>
        <Marquee>
          {assets.map((item) => {
            return (
              <img
                key={item}
                src={`/images/marquee/${item}.svg`}
                alt={`${item} 그림`}
                css={css`
                  margin-right: 20px;
                `}
              />
            );
          })}
        </Marquee>
        <div css={decriptionCss}>
          <TypewriterComponent
            options={{
              strings: `거기 ${name} 용사!
                <br/> 옆동네 토끼가 내 아이템을 훔쳐가서 내 모습을 잃어버렸어!
                명절 떡을 만들수가 없다고 날 좀 도와주지 않겠어?`,
              autoStart: true,
              loop: false,
              delay: 50,
            }}
          />
        </div>
      </div>
      <div css={buttons.wrapperCss}>
        <Button onClick={increasePhase}>틀린그림 찾기 하러 가기</Button>
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

  #mysteriout-rabbit {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -40%);
    animation: ${ANIMATION.FADE_IN} 0.8s ease-in-out;
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

/* 공통 컴포넌트 필요 */
const buttons = {
  wrapperCss: css`
    position: fixed;
    bottom: 0;

    width: 100%;
    max-width: 600px;
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
