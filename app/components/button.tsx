import { css } from "@emotion/react";
import React from "react";
import { Link } from "@remix-run/react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonType?: "primary" | "secondary";
  as?: "button" | "link";
  to?: string;
};

export const Button = ({ buttonType = "primary", children, as = "button", to, ...props }: Props) => {
  const getButtonStyles = () => {
    switch (buttonType) {
      case "primary":
        return primaryCss;
      case "secondary":
        return secondaryCss;
      default:
        return primaryCss;
    }
  };

  if (as === "link") {
    return (
      <Link to={to!} css={[baseButtonCss, getButtonStyles()]}>
        {children}
      </Link>
    );
  }
  return (
    <button css={[baseButtonCss, getButtonStyles()]} {...props}>
      {children}
    </button>
  );
};

// 기본 스타일
const baseButtonCss = css`
  width: 100%;
  text-align: center;
  border-radius: 8px;
  padding: 16px 0;
  font-size: 14px;
`;

const primaryCss = css`
  color: white;
  background-color: #151528;
`;

const secondaryCss = css`
  color: #151528;
  background-color: #c1c1c1;
`;
