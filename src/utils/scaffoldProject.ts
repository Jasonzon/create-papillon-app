import { existsSync, readdirSync, copySync, emptyDirSync } from "fs-extra";
import ora from "ora";
import { cyan, redBright, green } from "chalk";
import { select, confirm } from "@clack/prompts";

// TYPES
import { type ProjectOptions } from "../types/ProjectOptions";

// CONSTS
import { srcTestDir as srcDir } from "../consts";

export const scaffoldProject = async ({ shadCn, name }: ProjectOptions) => {
  const projectDir = `./${name}`;

  const spinner = ora(`Scaffolding in: ${projectDir}...\n`).start();

  if (existsSync(projectDir)) {
    if (readdirSync(projectDir).length === 0) {
      if (name !== ".")
        spinner.info(`${cyan.bold(name)} exists but is empty, continuing...\n`);
    } else {
      spinner.stopAndPersist();
      const overwriteDir = await select({
        message: `${redBright.bold("Warning:")} ${cyan.bold(
          name
        )} already exists and isn't empty. How would you like to proceed?`,
        options: [
          {
            label: "Abort installation (recommended)",
            value: "abort",
          },
          {
            label: "Clear the directory and continue installation",
            value: "clear",
          },
          {
            label: "Continue installation and overwrite conflicting files",
            value: "overwrite",
          },
        ],
        initialValue: "abort",
      });
      if (overwriteDir === "abort") {
        spinner.fail("Aborting installation...");
        process.exit(1);
      }

      const overwriteAction =
        overwriteDir === "clear"
          ? "clear the directory"
          : "overwrite conflicting files";

      const confirmOverwriteDir = await confirm({
        message: `Are you sure you want to ${overwriteAction}?`,
        initialValue: false,
      });

      if (!confirmOverwriteDir) {
        spinner.fail("Aborting installation...");
        process.exit(1);
      }

      if (overwriteDir === "clear") {
        spinner.info(`Emptying ${cyan.bold(name)} and creating t3 app..\n`);
        emptyDirSync(projectDir);
      }
    }
  }

  spinner.start();

  copySync(srcDir, projectDir);

  const scaffoldedName = name === "." ? "App" : cyan.bold(name);

  spinner.succeed(`${scaffoldedName} ${green("scaffolded successfully!")}\n`);
};
