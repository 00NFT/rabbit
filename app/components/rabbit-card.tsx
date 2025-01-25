import { css } from "@emotion/react";
import { ChangeEventHandler, forwardRef } from "react";

type Props = {
  message: string;
  onChangeMessage: ChangeEventHandler;
  rabbitId: string;
};
export const RabbitCard = forwardRef<HTMLDivElement, Props>(({ message, onChangeMessage, rabbitId }, ref) => {
  return (
    <div css={cardCss} ref={ref}>
      <div
        css={imageCss}
        style={{
          background: `#151528 url("/images/result/card/${rabbitId}.png") center/cover no-repeat`,
        }}
      />
      <div css={textAreaWrapperCss}>
        <div
          id="rabbit_print_textarea"
          css={[textareaCss, printTextareaCss]}
          dangerouslySetInnerHTML={{
            __html: message.replace("\n", "<br/>"),
          }}
        />
        <textarea
          id="rabbit_textarea"
          css={textareaCss}
          value={message}
          onChange={onChangeMessage}
          rows={2}
          placeholder={"2025년도 새해\n덕담 메시지를 입력해주세요!✨"}
        />
        <div css={underlineCss}>
          <div />
          <div />
        </div>
      </div>
    </div>
  );
});

RabbitCard.displayName = "rabbit_card";

const cardCss = css`
  padding: 16px 17px;
  border-radius: 16px;
  background-color: #dde6fa;
`;

const imageCss = css`
  width: 100%;
  aspect-ratio: 1/1;

  object-fit: cover;
  border-radius: 12px;

  background-color: #151528;
`;

const textAreaWrapperCss = css`
  position: relative;

  display: flex;
  flex-direction: column;

  width: 100%;
`;

const printTextareaCss = css`
  position: absolute;
  top: -5px;

  visibility: hidden;

  height: auto;
  padding-bottom: 10px;
  z-index: 1;
`;

const textareaCss = css`
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
  white-space: pre-wrap;

  &::placeholder {
    white-space: pre-line;
    color: #8e8e8e;
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
    border-bottom: 1px solid #6b7ca1;
  }
`;
