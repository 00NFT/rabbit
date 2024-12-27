import { css } from "@emotion/react";
import { AllHTMLAttributes, useEffect, useState } from "react";

interface Props extends Omit<AllHTMLAttributes<HTMLDivElement>, "children"> {
  delay?: number; // ms
  duration?: number; // ms
  children: React.ReactNode;
}

export default function FlipCard({ delay = 100, duration = 1000, children, ...props }: Props) {
  const [flip, setFlip] = useState<boolean>(false);

  useEffect(() => {
    let delayFlip = setTimeout(() => setFlip(true), delay);
    return () => clearTimeout(delayFlip);
  }, []);

  return (
    <div css={[cardContainerCss, flip && flipCss]} {...props}>
      <div css={[innerCss(duration / 1000), flip && flipCss]}>
        <div css={[cardCss, backfaceCss]}>
          <div css={backfaceInnerCss}>{children}</div>
        </div>
        <div css={[cardCss]} />
      </div>
    </div>
  );
}

const cardContainerCss = css`
  width: 100%;
  height: 100%;

  aspect-ratio: 3/4;
  perspective: 1000px;
  background-color: transparent;
`;

const innerCss = (duration: number) => css`
  position: relative;
  width: 100%;
  height: 100%;

  transition: transform ${duration}s;
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
`;

const cardCss = css`
  position: absolute;
  left: 0;
  top: 0;

  width: 100%;
  height: 100%;

  background-color: #fff;
  border-radius: 12px;

  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
`;

const flipCss = css`
  transform: rotateY(180deg);
`;

const backfaceCss = css`
  transform: rotateY(180deg);
  z-index: 1;
`;

const backfaceInnerCss = css`
  width: 100%;
  height: 100%;

  transform: rotateY(180deg);
`;
