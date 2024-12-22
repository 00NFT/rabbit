import { css } from "@emotion/react";

interface Props {
  progress: number;
}

export default function ProgressBar({ progress }: Props) {
  return (
    <div css={progressBarCss(progress)}>
      <div />
    </div>
  );
}

const progressBarCss = (progress: number) => css`
  width: 100%;
  height: 6px;

  margin-top: 22px;

  background-color: #dde6fa;
  border-radius: 100px;

  overflow: hidden;

  > div {
    width: ${progress}%;
    height: 100%;

    background-color: #151528;

    transition: width 0.1s linear;
  }
`;
