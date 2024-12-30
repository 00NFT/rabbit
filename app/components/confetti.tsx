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
        detectsOn: "window",
      },
      emitters: {
        position: {
          x: 50,
          y: 100,
        },
        life: {
          count: 1,
        },
        rate: {
          quantity: 9,
          delay: 1000,
        },
      },
      fullScreen: {
        enable: true,
        zIndex: -1,
      },
      number: {
        value: 0,
      },
      particles: {
        move: {
          decay: 0.018,
          direction: "top",
          enable: true,
          gravity: {
            enable: true,
            acceleration: 40,
            maxSpeed: 200,
          },
          outModes: {
            top: "none",
            default: "destroy",
          },
          speed: { min: 25, max: 30 },
        },
        shape: {
          type: ["image"],
          options: {
            image,
          },
        },
      },
    }),
    [],
  );

  if (!condition) return null;

  return (
    <div style={{ position: "fixed", bottom: 0 }}>
      <Particles options={options} />
    </div>
  );
}
