import { css } from "@emotion/react";
import { Link } from "@remix-run/react";

export default function Page() {
  return (
    <>
      <div css={containerCss}>
        <div css={textWrapperCss}>
          <h1>아무것도 찾지 못한 달토끼</h1>
          <div>
            <p>아무것도 찾지 못했지만</p>
            <p>우주에 떠다니는 선글라스는 찾았어</p>
          </div>
        </div>
      </div>

      <div css={buttons.wrapperCss}>
        <Link to={"/result/card"} css={buttons.cardButtonCss}>
          새해 덕담카드 만들기
        </Link>
        <Link to={"/"} css={buttons.homeButtonCss}>
          처음으로 돌아가기
        </Link>
      </div>
    </>
  );
}

const containerCss = css`
  padding-top: 42px;
  height: 100vh;

  background: #151528 url("/images/rabbit_beta.png") center/cover no-repeat;
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
    font-size: 20px;
  }

  > div {
    padding-top: 12px;

    > p {
      font-weight: 400;
      font-size: 14px;
    }
  }
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
