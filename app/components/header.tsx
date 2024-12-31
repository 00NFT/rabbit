/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useNavigate } from "@remix-run/react";
import { ArrowLeft } from "public/icons/Arrow";

type Props = {
  onClickBack?: () => void;
  backgroundColor?: string;
};

export const Header = ({ onClickBack, backgroundColor = "#FFFFFF" }: Props) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (!onClickBack) {
      navigate(-1);
      return;
    }

    onClickBack();
  };

  return (
    <>
      <nav css={navigationCss}>
        <button onClick={handleBack}>
          <ArrowLeft />
        </button>
      </nav>
      <div
        css={placeholderCss}
        style={{
          backgroundColor,
        }}
      />
    </>
  );
};

const navigationCss = css`
  position: absolute;
  top: 0;

  display: flex;
  align-items: center;

  max-width: 400px;
  width: 100%;
  height: 64px;

  margin: 0 auto;
  padding: 0 20px;

  > button {
    padding: 10px 20px 10px 0;
    background: none;
    border: none;
    cursor: pointer;
  }
`;

const placeholderCss = css`
  height: 64px;
  max-width: 400px;
  width: 100%;
`;
