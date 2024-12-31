import { css } from "@emotion/react";
import type { MetaFunction } from "@remix-run/node";
import { ArrowLeft } from "public/icons/Arrow";
import { useEffect, useRef } from "react";
import { usePhaseActions } from "~/utils/usePhaseActions";
import { Button } from "../button";

export const meta: MetaFunction = () => {
  return [{ title: "토끼 구출 대작전" }, { name: "description", content: "Welcome to Remix!" }];
};

export default function UserName() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { increasePhase, decreasePhase, changeName, name } = usePhaseActions();

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return (
    <>
      <nav css={navigationCss}>
        <button
          onClick={() => {
            decreasePhase();
          }}
        >
          <ArrowLeft />
        </button>
      </nav>
      <div css={containerCss}>
        <h1> 용사야 이름이 뭐니? </h1>
        <input
          onChange={(e) => {
            if (e.target.value.length > 4) return;
            changeName(e.target.value);
          }}
          value={name}
          maxLength={4}
          ref={inputRef}
        />
      </div>
      <div css={buttons.wrapperCss}>
        <Button onClick={increasePhase} disabled={!name.trim().length}>
          다음
        </Button>
      </div>
    </>
  );
}

const containerCss = css`
  position: relative;
  padding: 84px 24px 0 24px;
  height: 100vh;

  background-color: #f0f4fc;

  display: flex;
  align-items: center;
  flex-direction: column;

  > h1 {
    color: #151528;
    font-size: 20px;
    font-weight: 400;
  }

  > input {
    margin-top: 112px;
    color: #151528;
    text-align: center;
    font-family: Pretendard;
    font-size: 36px;
    font-weight: 700;
    line-height: 43.2px;
  }
`;

const navigationCss = css`
  position: absolute;
  z-index: 1;
  top: 0;

  display: flex;
  align-items: center;

  max-width: var(--layout-max-width);
  width: 100%;

  margin: 0 auto;
  padding: 20px;
  margin-bottom: 16px;
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
