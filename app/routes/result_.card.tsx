import { css } from "@emotion/react";
import { useNavigate } from "@remix-run/react";
import { ArrowLeft } from "public/icons/Arrow";
import { useState } from "react";
import { Button } from "~/components/button";
import { FloatingBottomArea } from "~/components/floating-bottom-area";

export default function Page() {
  const navigate = useNavigate();
  const [text, setText] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <>
      <nav css={navigationCss}>
        <button onClick={() => navigate(-1)}>
          <ArrowLeft />
        </button>
      </nav>

      <div css={containerCss}>
        <h1>
          지렁이 용사의 달토끼로
          <br />
          덕담카드 만들기
        </h1>

        <div css={cardCss}>
          image section
          <div css={textAreaWrapperCss}>
            <textarea value={text} onChange={handleInput} rows={2} placeholder="덕담 메세지를 입력해줘" />
            <div css={underlineCss}>
              <div />
              <div />
            </div>
          </div>
        </div>
      </div>

      <FloatingBottomArea>
        <div css={buttonWrapper}>
          {/* NOTE: 베타테스트 버튼 */}
          <Button as="link" to="/result/feedback">
            베타테스트 후기 남기기
          </Button>

          {/* <Button buttonType="secondary">카드 다운로드</Button>
          <Button>결과 공유하기</Button> */}
        </div>
      </FloatingBottomArea>
    </>
  );
}

const containerCss = css`
  padding: 64px 24px 0 24px;

  > h1 {
    font-size: 20px;
    text-align: center;
    margin-top: 12px;
  }
`;

const navigationCss = css`
  position: absolute;
  top: 0;

  display: flex;
  align-items: center;

  max-width: 600px;
  width: 100%;
  height: 64px;

  margin: 0 auto;
  padding: 0 20px;

  > button {
    padding: 10px 20px 10px 0;
  }
`;

const cardCss = css`
  padding: 16px 17px;
  margin-top: 24px;
  background-color: #f1f1f1;
  border-radius: 16px;
`;

const textAreaWrapperCss = css`
  position: relative;

  display: flex;
  flex-direction: column;

  width: 100%;

  textarea {
    width: 100%;
    height: 100%;
    font-size: 16px;
    padding: 10px 0 0;
    line-height: 36px;
    border: none;
    outline: none;
    resize: none;
    color: black;
    overflow: hidden;
    text-align: center;
  }
`;

const underlineCss = css`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  gap: 36px;

  div {
    border-bottom: 2px solid black;
  }
`;

const buttonWrapper = css`
  width: 100%;

  display: flex;
  gap: 10px;
  justify-content: center;
`;
