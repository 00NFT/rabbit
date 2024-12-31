import { css } from "@emotion/react";
import { motion } from "framer-motion";
import { ArrowLeft } from "public/icons/Arrow";
import { useEffect, useState } from "react";
import { usePhaseActions } from "~/utils/usePhaseActions";

export default function Timer() {
  const [count, setCount] = useState<number>(3);

  const { increasePhase, decreasePhase } = usePhaseActions();

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => {
        setCount((prev: number) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      increasePhase();
    }
  }, [count]);

  return (
    <div css={containerCss}>
      <nav css={navigationCss}>
        <button onClick={decreasePhase}>
          <ArrowLeft />
        </button>
      </nav>

      <motion.div
        key={count}
        initial={{ scale: 2 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 1, repeat: 3, ease: "easeInOut" }}
        css={countdownCss}
      >
        <p>{count > 0 ? count : null}</p>
      </motion.div>
    </div>
  );
}

const containerCss = css`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  background-color: #f0f4fc;
`;

const navigationCss = css`
  position: absolute;
  top: 0;

  display: flex;
  align-items: center;

  max-width: 600px;
  width: 100%;

  margin: 0 auto;
  padding: 20px;
`;

const countdownCss = css`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100px;
  height: 100px;

  padding: 30px;

  background-color: white;
  border-radius: 100%;

  font-size: 38px;
`;
