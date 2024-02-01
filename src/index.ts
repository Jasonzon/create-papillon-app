// UTILS
import { runCli } from "./cli";
import { scaffoldProject } from "./utils/scaffoldProject";

const main = async () => {
  const { name, shadCn } = await runCli();
  await scaffoldProject({ name, shadCn });
};

main();
