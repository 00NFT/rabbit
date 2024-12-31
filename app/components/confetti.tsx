import { css } from "@emotion/react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo } from "react";
import { loadFull } from "tsparticles";

const image = Array.from({ length: 4 }).map((_, idx) => ({
  src: `/illusts/confetti${idx + 1}.svg`,
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
          // direction: "top-right",
          direction: 280,

          position: {
            x: 0,
            y: 100,
          },
          life: {
            count: 1,
          },
          rate: {
            quantity: 6,
            delay: 1000,
          },

          particles: {
            move: {
              angle: { min: -3, max: 3 },
            },
          },
        },
        {
          // direction: "top-left",
          direction: 260,

          position: {
            x: 100,
            y: 100,
          },
          life: {
            count: 1,
          },
          rate: {
            quantity: 6,
            delay: 1000,
          },

          particles: {
            move: {
              angle: { min: -3, max: 3 },
            },
          },
        },
      ],
      fullScreen: {
        enable: true,
        zIndex: -1,
      },
      particles: {
        size: {
          value: 40,
        },
        move: {
          enable: true,
          gravity: {
            enable: true,
            acceleration: 120,
          },
          outModes: {
            default: "none",
          },
          speed: { min: 40, max: 55 },
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
  max-width: 400px;

  bottom: 0;
  left: 50%;

  transform: translateX(-50%);
`;
