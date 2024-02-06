import path from "path";

const __filename = module.filename;
const distPath = path.dirname(__filename);
export const PKG_ROOT = path.join(distPath, "../");

export const defaultProjectName = "my-papillon-app";

export const srcDir = "template/base";
export const srcTestDir = "template/test";

export const TITLE_TEXT = `   ___ ___ ___   __ _____ ___   _____ ____    __   ___ ___
  / __| _ \\ __| /  \\_   _| __| |_   _|__ /   /  \\ | _ \\ _ \\
 | (__|   / _| / /\\ \\| | | _|    | |  |_ \\  / /\\ \\|  _/  _/
  \\___|_|_\\___|_/‾‾\\_\\_| |___|   |_| |___/ /_/‾‾\\_\\_| |_|
`;
