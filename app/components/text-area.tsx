import { css } from "@emotion/react";
import { Dispatch, Fragment, SetStateAction } from "react";

type textareaProps = {
  limit: number;
  currentLength: number;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;

  height?: string;
  setHeight?: Dispatch<SetStateAction<string>>;
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "type">;

export const Textarea = ({
  limit = 40,
  currentLength = 0,
  placeholder = "없다면 ‘없음'이라고 적어주세요!",
  onChange,
  height,
  setHeight,
  ...props
}: textareaProps) => {
  const LIMIT = limit;

  return (
    <Fragment>
      <div css={containerCss}>
        <textarea
          css={textareaCss}
          title="텍스트 입력"
          maxLength={LIMIT}
          style={{ height: height }}
          onChange={(event) => {
            if (event.target.value.length > limit) return;
            /** 스크롤의 높이 값과 현재 박스의 크기가 같거나, 스크롤이 생기지 않을 경우에는 auto로 높이를 자동 조정 */
            if (event.target.scrollHeight <= event.target.clientHeight) {
              event.target.style.height = "auto";
            }

            /** 스크롤이 생길 경우, 스크롤의 높이만큼 현재 박스의 높이를 조정 */
            if (event.target.scrollHeight > event.target.clientHeight) {
              event.target.style.height = event.target.scrollHeight + "px";
            }

            setHeight && setHeight(event.target.style.height);
            document.body.scrollIntoView({ behavior: "smooth", block: "end" });
            onChange(event);
          }}
          placeholder={placeholder}
          {...props}
        ></textarea>
        <span css={textCss}>{`${currentLength}/${LIMIT}`}</span>
      </div>
    </Fragment>
  );
};

const containerCss = css`
  min-height: 102px;
  display: flex;
  height: auto;
  width: 100%;
  flex-direction: column;
  border-radius: 16px;
  background-color: #ffffff;
  padding: 16px 18px;
  outline: 1px solid #e0e2e6;

  &:focus-within {
    outline: 1px solid #338aff;
  }
`;

const textareaCss = css`
  font-size: 14px;
  min-height: 50px;
  height: auto;
  max-height: 200px;
  width: 100%;
  resize: none;
  background-color: transparent;
  caret-color: #338aff;
  color: inherit;

  &::placeholder {
    color: #838b98;
  }
  &:focus {
    outline: none;
  }
`;

const textCss = css`
  font-size: 14px;
  width: 100%;
  text-align: right;
  color: #838b98;
`;
