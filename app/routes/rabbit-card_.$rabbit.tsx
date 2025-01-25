import { css } from "@emotion/react";
import { useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Button } from "~/components/button";
import { GAME_RESULT_CONTENT, gameResultContent } from "~/constants/result";
import { useGetPlayerGameInfos } from "~/hooks/apis/useGetPlayerGameInfos";

export default function Page() {
  const { rabbit = "" } = useParams();
  const { data } = useGetPlayerGameInfos({ id: rabbit });

  const [gameResult, setGameResult] = useState<{ image: string; text: gameResultContent }>({
    image: "0000",
    text: GAME_RESULT_CONTENT["0000"],
  });

  useEffect(() => {
    if (!data) return;

    setGameResult({
      image: data.RESULT,
      text: GAME_RESULT_CONTENT[data?.RESULT],
    });
  }, [data]);

  // NOTE: 로딩 표시?
  if (!gameResult) return;
  return (
    <>
      <div
        css={containerCss}
        style={{
          background: `#151528 url("/images/result/rabbit_${gameResult.image}.png") center/cover no-repeat`,
        }}
      >
        <div css={textWrapperCss}>
          <h1>{gameResult?.text.title}</h1>
          <div>{gameResult?.text.description}</div>
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
