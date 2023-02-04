export enum COLORS {
  RED = "\x1b[31m",
  GREEN = "\x1b[32m",
  YELLOW = "\x1b[33m",
}

type LogColors = keyof typeof COLORS;

export const log = (color: LogColors, date: boolean, ...msg: string[]): void => {
  if (date) {
    console.log(new Date(), ">", COLORS[color], ...msg, "\x1b[0m");
  } else {
    console.log(">", COLORS[color], ...msg, "\x1b{0m");
  }
};
