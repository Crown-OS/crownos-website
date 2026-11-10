let loadedRatio = 0;

export const reportBootProgress = (ratio: number) => {
  loadedRatio = Math.max(loadedRatio, ratio);
};

export const bootProgress = () => loadedRatio;
