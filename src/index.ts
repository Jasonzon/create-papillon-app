import { readJSONSync } from "fs-extra";
import path from "path";
import { execa } from "execa";
import { writeJSONSync } from "fs-extra";

// UTILS
import { runCli } from "./cli";
import { createProject } from "./utils/createProject";
import { logger } from "./utils/logger";
import { renderTitle } from "./utils/renderTitle";
import { getUserPkgManager } from "./utils/getUserPkgManager";

// TYPES
import { PackageJson } from "type-fest";
import { installDependencies } from "./utils/installDependencies";
import { logNextSteps } from "./utils/logNextSteps";

const main = async () => {
  const pkgManager = getUserPkgManager();

  renderTitle();
  const projectOptions = await runCli();
  await createProject(projectOptions);

  const projectDir = await createProject(projectOptions);

  const pkgJson = readJSONSync(
    path.join(projectDir, "package.json")
  ) as PackageJson;
  pkgJson.name = projectOptions.name;

  // ? Bun doesn't support this field (yet)
  if (pkgManager !== "bun") {
    const { stdout } = await execa(pkgManager, ["-v"], {
      cwd: projectDir,
    });
    pkgJson.packageManager = `${pkgManager}@${stdout.trim()}`;
  }

  writeJSONSync(path.join(projectDir, "package.json"), pkgJson, {
    spaces: 2,
  });

  await installDependencies({ projectDir });

  await logNextSteps(projectOptions.name);

  process.exit(0);
};

main().catch((err) => {
  logger.error("Aborting installation...");
  if (err instanceof Error) {
    logger.error(err);
  } else {
    logger.error(
      "An unknown error has occurred. Please open an issue on github with the below:"
    );
    console.log(err);
  }
  process.exit(1);
});
