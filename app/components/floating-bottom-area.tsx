import { css } from "@emotion/react";
import { type PropsWithChildren, useEffect, useRef, useState } from "react";

export const FloatingBottomArea = ({ children }: PropsWithChildren) => {
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
      <div css={containerCss} ref={childrenRef}>
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
  max-width: 600px;
  margin: 0 auto;
  padding: 12px 24px 32px;

  display: flex;
  gap: 10px;
  justify-content: center;

  background-color: white;
`;
