export const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const defineIconMode = (iconId: string): string => {
  if (iconId.includes("d")) return "-d";
  if (iconId.includes("n")) return "-n";
  return "";
};
