export const executeSequentially = (actions: { action: () => void; delay?: number }[], initialDelay: number) => {
  let timeline = initialDelay;

  actions.forEach(({ action, delay }) => {
    setTimeout(action, timeline);
    timeline += delay ?? 1000;
  });
};
