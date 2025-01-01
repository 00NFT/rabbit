import { css } from "@emotion/react";
import type { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import FloatingMessages from "~/components/common/floating-messages";
import { getPlayerName } from "~/hooks/apis/useGetPlayerNames";
import { usePhaseActions } from "~/utils/usePhaseActions";

type dataType = {
  ID: number;
  USERNAME: string;
  CARD_MESSAGE: string;
  REG_DATE: string;
};

export const loader: LoaderFunction = async () => {
  try {
    const loaderData = await getPlayerName();
    return loaderData;
  } catch (error) {
    return [];
  }
};

export default function Index() {
  const { name, phase, movePhase, changeName } = usePhaseActions();
  const loaderData = useLoaderData<typeof loader>();
  const messageRule = ["용사 토끼 구조작전 실행 중!", "용사 토끼 구하는 중...", "용사가 지금 토끼를 구하고 있어!"];
  const scaledLoaderData = loaderData?.data?.reduce((acc: string[], cur: dataType, idx: number) => {
    if (cur.USERNAME) {
      const messageIdx = idx % messageRule.length;
      acc.push(`${cur.USERNAME} ${messageRule[messageIdx]}`);
    }
    return acc;
  }, []);

  useEffect(() => {
    if (phase !== 0) movePhase(0);
    if (name !== "") changeName("");
  }, []);

  return (
    <>
      <div css={containerCss}>
        <div css={textWrapperCss}>
          <h1>
            새해맞이 <br /> 달토끼 구출 대작전
          </h1>
        </div>
        <FloatingMessages messages={scaledLoaderData} />
      </div>
      <div css={buttons.wrapperCss}>
        <Link to={"/game"} css={buttons.cardButtonCss}>
          시작하기
        </Link>
        <span> TEAM N프터 </span>
      </div>
    </>
  );
}

const containerCss = css`
  position: relative;
  padding-top: 42px;
  height: 100dvh;

  background: #151528 url("/images/rabbit_intro.png") center/cover no-repeat;
  background-color: #151528;
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
    font-size: 28px;
  }
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

    > span {
      color: #6b7ca1;
      text-align: center;
      font-size: 12px;
      font-weight: 400;
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
