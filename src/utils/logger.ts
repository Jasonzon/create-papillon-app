import { red, yellow, cyan, green } from "chalk";

export const logger = {
  error(...args: unknown[]) {
    console.log(red(...args));
  },
  warn(...args: unknown[]) {
    console.log(yellow(...args));
  },
  info(...args: unknown[]) {
    console.log(cyan(...args));
  },
  success(...args: unknown[]) {
    console.log(green(...args));
  },
};
