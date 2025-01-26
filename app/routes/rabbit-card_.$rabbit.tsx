import { css } from "@emotion/react";
import { MetaFunction, useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Button } from "~/components/button";
import { FloatingBottomArea } from "~/components/floating-bottom-area";
import Loading from "~/components/loading";
import { RabbitCard } from "~/components/rabbit-card";
import { GAME_RESULT_CONTENT, gameResultContent } from "~/constants/result";
import { useGetPlayerGameInfos } from "~/hooks/apis/useGetPlayerGameInfos";

// NOTE: 테스트 용 (제거 예정)
// const tempInitialGameResult = {
//   image: "0000",
//   text: GAME_RESULT_CONTENT["0000"],
//   username: "정졍",
//   message: "새해 복 마니 받아라\n뿡뿡💨",
// };

export const meta: MetaFunction = () => {
  return [
    { property: "og:title", content: "띵동! 메시지가 도착했어요!" },
    { property: "og:description", content: "달토끼와 함께하는 새해 덕담카드를 보러 오세요" },
    { property: "og:image", content: "/images/og/og-card.png" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
  ];
};

type gameResult = {
  image: string;
  text: gameResultContent;
  username: string;
  message: string;
};
export default function Page() {
  const { rabbit = "" } = useParams();
  const { isLoading, data } = useGetPlayerGameInfos({ id: rabbit });

  const [gameResult, setGameResult] = useState<gameResult>();

  useEffect(() => {
    if (!data?.data) return;

    const { RESULT, USERNAME, CARD_MESSAGE } = data.data;
    setGameResult({
      image: RESULT,
      text: GAME_RESULT_CONTENT[RESULT],
      username: USERNAME,
      message: CARD_MESSAGE,
    });
  }, [data]);

  if (isLoading || !gameResult) {
    return <Loading message={"덕담카드를 꺼내는 중이야!\n잠시만 기다려줘"} />;
  }
  return (
    <>
      <div css={containerCss}>
        <div>
          <h1 css={cardTitleCss}>{gameResult.username} 용사의 덕담카드</h1>
          <RabbitCard
            message={gameResult.message}
            rabbitId={gameResult.image}
            textAreaOptions={{
              disabled: true,
            }}
          />
        </div>

        <div
          css={result.wrapperCss}
          style={{
            background: `#151528 url("/images/result/preview/rabbit_${gameResult.image}.png") center/cover no-repeat`,
          }}
        >
          <div css={result.textWrapperCss}>
            <h1>{gameResult?.text.title}</h1>
            <div>{gameResult?.text.description}</div>
          </div>
        </div>

        <div css={descriptionCss}>
          <h2>
            새해맞이 달토끼 구출작전에는
            <br />
            다양한 종류의 토끼가 있어!
            <br />
            너만의 토끼를 찾고 덕담카드도 만들어봐
          </h2>
        </div>
      </div>

      <FloatingBottomArea backgroundColor="#F0F4FC">
        <Button as="link" to={`/`}>
          나도 토끼 구하러 가기
        </Button>
      </FloatingBottomArea>
    </>
  );
}

const containerCss = css`
  padding: 44px 24px 0;
`;

const cardTitleCss = css`
  font-size: 20px;
  text-align: center;
  padding-top: 12px;
  margin-bottom: 20px;
`;

const result = {
  wrapperCss: css`
    width: 100%;
    aspect-ratio: 312/660;

    border-radius: 20px;
    overflow: hidden;

    margin-top: 52px;
    padding-top: 40px;
  `,

  textWrapperCss: css`
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
      padding-top: 28px;

      font-weight: 400;
      font-size: 14px;
      white-space: pre-wrap;
    }
  `,
};

const descriptionCss = css`
  padding: 36px 0 52px;

  > h2 {
    font-size: 14px;
    font-weight: 500;
    text-align: center;
  }
`;
