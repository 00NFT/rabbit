import { css } from "@emotion/react";
import { useParams } from "@remix-run/react";
import { Button } from "~/components/button";
import { GAME_RESULT } from "~/constants/result";

export default function Page() {
  const { rabbit = "0000" } = useParams();
  const resultText = GAME_RESULT[rabbit];

  return (
    <>
      <div
        css={containerCss}
        style={{
          background: `#151528 url("/images/result/rabbit_${rabbit}.png") center/cover no-repeat`,
        }}
      >
        <div css={textWrapperCss}>
          <h1>{resultText.title}</h1>
          <div>{resultText.description}</div>
        </div>
      </div>

      <div css={buttons.wrapperCss}>
        <Button as="link" to={`/`}>
          나도 토끼 구하러 가기
        </Button>
      </div>
    </>
  );
}

const containerCss = css`
  padding-top: 42px;
  height: 100vh;
`;

const textWrapperCss = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;

  > h1 {
    font-weight: 400;
    font-size: 20px;
  }

  > div {
    padding-top: 12px;

    font-weight: 400;
    font-size: 14px;
    white-space: pre-wrap;
  }
`;

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

  homeButtonCss: css`
    font-size: 12px;
    color: #7d7d7d;
  `,
};
