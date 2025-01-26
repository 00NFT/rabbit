import { css } from "@emotion/react";
import { ChangeEventHandler, forwardRef } from "react";

type Props = {
  rabbitId: string;
  message: string;
  onChangeMessage?: ChangeEventHandler;
  textAreaOptions?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
};
export const RabbitCard = forwardRef<HTMLDivElement, Props>(({ message, onChangeMessage, rabbitId, textAreaOptions }, ref) => {
  return (
    <div css={cardCss} ref={ref}>
      <div
        css={imageCss}
        style={{
          background: `#151528 url("/images/result/card/rabbit_${rabbitId}.png") center/cover no-repeat`,
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
          placeholder={"2025년도 새해 덕담 메시지를\n입력해주세요! 🍀"}
          {...textAreaOptions}
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
  padding-bottom: 17px;
  border-radius: 16px;
  overflow: hidden;
  background-color: #dde6fa;
`;

const imageCss = css`
  width: 100%;
  aspect-ratio: 312/337;

  object-fit: cover;

  background-color: #151528;
`;

const textAreaWrapperCss = css`
  position: relative;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;

  width: calc(100%-32px);
  margin: 0 16px;
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
  padding-top: 10px;
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

  /* disabled style (모바일 대응) */
  &:disabled {
    color: black;
    background-color: transparent;
    -webkit-text-fill-color: black;
    opacity: 1;
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
