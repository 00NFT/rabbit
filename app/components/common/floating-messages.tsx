import { css } from "@emotion/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
  messages: string[];
};

const mockMessage = ["헤온 용사 토끼 구조작전 실행 중!", "현토리 용사 토끼 구하는 중...", "지렁이 용사가 지금 토끼를 구하고 있어!"];

export default function FloatingMessages({ messages = mockMessage }: Props) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const getXPosition = (index: number) => {
    return index % 2 === 0 ? "-25%" : "25%";
  };

  return (
    <div css={floatingMessagesCss.container}>
      <AnimatePresence>
        <motion.div
          key={currentMessageIndex}
          initial={{
            opacity: 0,
            y: 100,
            x: getXPosition(currentMessageIndex),
          }}
          animate={{
            opacity: 1,
            y: 0,
            x: getXPosition(currentMessageIndex),
          }}
          exit={{
            opacity: 0,
            y: -100,
            x: getXPosition(currentMessageIndex),
          }}
          transition={{
            duration: 1.2,
            ease: "easeInOut",
          }}
          css={floatingMessagesCss.message}
        >
          {messages && messages.length ? messages[currentMessageIndex] : mockMessage[currentMessageIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const floatingMessagesCss = {
  container: css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: var(--layout-max-width);
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  message: css`
    position: absolute;
    width: fit-content;
    padding: 12px 16px;
    border-radius: 16px;
    background: #fff;
    text-align: center;
    flex-wrap: wrap;
    font-size: 12px;
    margin-bottom: 20px;
  `,
};
