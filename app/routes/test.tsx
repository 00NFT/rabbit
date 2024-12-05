import { css } from "@emotion/react";

function Home() {
  return <div css={testCss}> Its works! </div>;
}

const testCss = () => css`
  color: gray;
  background-color: white;
  padding: 15px 30px;
  border-radius: 90px;
`;

export default Home;
