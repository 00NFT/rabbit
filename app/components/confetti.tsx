import { css } from "@emotion/react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo } from "react";
import { loadFull } from "tsparticles";

const image = Array.from({ length: 4 }).map((_, idx) => ({
  src: `/illusts/confetti${idx + 1}.svg`,
  width: 30,
  height: 30,
  particles: {
    size: {
      value: 30,
    },
  },
}));

export default function Confetti({ condition }: { condition: boolean }) {
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    });
  }, []);

  const options = useMemo(
    () => ({
      interactivity: {
        detectsOn: "parent",
      },
      emitters: [
        {
          direction: "top-right",
          position: {
            x: 0,
            y: 100,
          },
          life: {
            count: 1,
          },
          rate: {
            quantity: 4,
            delay: 1000,
          },
        },
        {
          direction: "top-left",

          position: {
            x: 100,
            y: 100,
          },
          life: {
            count: 1,
          },
          rate: {
            quantity: 4,
            delay: 1000,
          },
        },
      ],
      fullScreen: {
        enable: true,
        zIndex: -1,
      },
      number: {
        value: 0,
      },
      particles: {
        move: {
          decay: 0.01,
          enable: true,
          gravity: {
            enable: true,
            acceleration: 80,
            maxSpeed: 200,
          },
          outModes: {
            default: "none",
          },

          speed: { min: 30, max: 30 },
        },
        shape: {
          type: ["image"],
          options: {
            image,
          },
        },
      },
      style: { height: "100%" },
    }),
    [],
  );

  if (!condition) return null;

  return (
    <div css={containerCss}>
      <Particles options={options} />
    </div>
  );
}

const containerCss = css`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: end;
  height: 100%;
  width: 100%;
  max-width: 600px;

  bottom: 0;
  left: 50%;

  transform: translateX(-50%);
`;
