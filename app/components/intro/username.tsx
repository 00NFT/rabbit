import { css } from "@emotion/react";
import type { MetaFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { ArrowLeft } from "public/icons/Arrow";
import { Button } from "../button";
import { usePhaseActions } from "~/utils/usePhaseActions";

export const meta: MetaFunction = () => {
  return [{ title: "토끼 구출 대작전" }, { name: "description", content: "Welcome to Remix!" }];
};

export default function UserName() {
  const navigate = useNavigate();
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
  padding: 84px 24px 0 0px;
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

const textWrapperCss = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  > h1 {
    font-weight: 400;
    font-size: 28px;
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
  margin-top: auto;
  margin-bottom: 115px;

  > span {
    color: #6b7ca1;
    font-size: 12px;
    font-weight: 400;
  }
`;

const navigationCss = css`
  position: absolute;
  z-index: 1;
  top: 0;

  display: flex;
  align-items: center;

  max-width: 600px;
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
