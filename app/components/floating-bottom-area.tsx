import { css } from "@emotion/react";
import { type PropsWithChildren, useEffect, useRef, useState } from "react";

type Props = {
  backgroundColor?: string;
} & PropsWithChildren;
export const FloatingBottomArea = ({ backgroundColor = "#FFFFFF", children }: Props) => {
  const childrenRef = useRef<HTMLDivElement>(null);
  const [childrenHeight, setChildrenHeight] = useState(0);

  useEffect(() => {
    if (childrenRef.current) {
      const height = childrenRef.current.offsetHeight;
      setChildrenHeight(height);
    }
  }, [children]);

  return (
    <>
      <div
        css={containerCss}
        ref={childrenRef}
        style={{
          backgroundColor,
        }}
      >
        {children}
      </div>
      <div
        style={{
          height: childrenHeight,
        }}
      />
    </>
  );
};

const containerCss = css`
  position: fixed;
  bottom: 0;

  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 12px 24px 32px;

  display: flex;
  gap: 10px;
  justify-content: center;

  z-index: 10;
`;
