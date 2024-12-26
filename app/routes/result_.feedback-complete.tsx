import { css } from "@emotion/react";
import { Button } from "~/components/button";
import { FloatingBottomArea } from "~/components/floating-bottom-area";

export default function Page() {
  return (
    <>
      <div css={containerCss}>
        <p>
          새해맞이
          <br />
          달토끼 구출 대작전
          <br />
          베타테스트에 참가해주셔서
          <br />
          감사합니다!:)
          <br />
          <br />
          새해에 완성된 서비스로 찾아올게요!
        </p>
      </div>

      <FloatingBottomArea>
        <Button as="link" to="/">
          처음으로
        </Button>
      </FloatingBottomArea>
    </>
  );
}

const containerCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;

  height: calc(100dvh - 100px);
  padding: 64px 24px 32px 24px;
  text-align: center;

  > h1 {
    font-size: 20px;
    text-align: center;
    margin-top: 12px;
  }
`;
