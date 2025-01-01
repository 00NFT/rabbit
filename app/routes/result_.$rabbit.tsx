import { css } from "@emotion/react";
import { Link, useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Button } from "~/components/button";
import Loading from "~/components/loading";
import { GAME_RESULT } from "~/constants/result";

export default function Page() {
  const { rabbit = "0000" } = useParams();
  const resultText = GAME_RESULT[rabbit];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;

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
        <Button as="link" to={`/result/${rabbit}/card`}>
          새해 덕담카드 만들기
        </Button>
        <Link to={"/"} css={buttons.homeButtonCss}>
          처음으로 돌아가기
        </Link>
      </div>
    </>
  );
}

const containerCss = css`
  padding-top: 42px;
  max-height: var(--layout-max-height);
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
    position: absolute;
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
