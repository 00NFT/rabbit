import { css } from "@emotion/react";
import { useState } from "react";
import { Button } from "~/components/button";
import { FloatingBottomArea } from "~/components/floating-bottom-area";
import { Header } from "~/components/header";

export default function Page() {
  const [text, setText] = useState("");

  /**
   * 줄바꿈 최대 1번 / 최대 40자 제한
   */
  const handleChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const newValue = value
      .split(/[\r\n]/)
      .slice(0, 2)
      .join("\n")
      .slice(0, 40);

    setText(newValue);
  };

  return (
    <>
      <Header backgroundColor="#f0f4fc" />

      <div css={containerCss}>
        <h1>
          지렁이 용사의 달토끼로
          <br />
          덕담카드 만들기
        </h1>

        <div css={cardCss}>
          <img src="/images/rabbit_beta.png" alt="rabbit beta" css={imageCss} />
          <div css={textAreaWrapperCss}>
            <textarea value={text} onChange={handleChangeTextarea} rows={2} placeholder="덕담 메시지를 입력해줘" />
            <div css={underlineCss}>
              <div />
              <div />
            </div>
          </div>
        </div>

        <p css={descriptionCss}>최대 2줄, 40글자까지 작성 가능합니다</p>
      </div>

      <FloatingBottomArea backgroundColor="#F0F4FC">
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
  padding: 0px 24px 16px;
  background-color: #f0f4fc;

  > h1 {
    font-size: 20px;
    text-align: center;
    padding-top: 12px;
  }
`;

const imageCss = css`
  width: 100%;
  aspect-ratio: 1/1;

  object-fit: cover;
  border-radius: 12px;

  background-color: #151528;
`;

const cardCss = css`
  padding: 16px 17px;
  margin-top: 24px;
  border-radius: 16px;
  background-color: #dde6fa;
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
    z-index: 5;
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

const descriptionCss = css`
  font-size: 10px;
  color: #6b7ca1;
  margin-top: 12px;
  text-align: center;
`;
