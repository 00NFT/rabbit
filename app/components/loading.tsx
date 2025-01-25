import { css } from "@emotion/react";
import { useEffect, useState } from "react";

const images = ["carrot", "ear", "moon", "mortar"];

type Props = {
  message?: string;
};
export default function Loading({ message = "지금까지 찾아준 것들로 단장중이야\n조금만 기다려줘" }: Props) {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const changeImageInterval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 800);

    return () => clearInterval(changeImageInterval);
  }, []);

  return (
    <div css={containerCss}>
      <div>
        <img src={`/illusts/${images[current]}_right.PNG`} css={imageCss} alt="loading" />
        <p>
          {message}
          {/** TODO: 사용자가 입력한 이름 활용한 멘트로 변경 */}
        </p>
      </div>
    </div>
  );
}

const containerCss = css`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  text-align: center;
  white-space: pre-wrap;
`;

const imageCss = css`
  width: 200px;
  height: 200px;

  margin: auto;
`;
