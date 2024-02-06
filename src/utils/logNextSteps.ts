// UTILS
import { getUserPkgManager } from "~/utils/getUserPkgManager";
import { logger } from "~/utils/logger";

// This logs the next steps that the user should take in order to advance the project
export const logNextSteps = async (name: string) => {
  const pkgManager = getUserPkgManager();

  logger.info("Next steps:");
  name !== "." && logger.info(`  cd ${name}`);

  logger.info("  ./start-database.sh");

  if (["npm", "bun"].includes(pkgManager)) {
    logger.info(`  ${pkgManager} run db:push`);
  } else {
    logger.info(`  ${pkgManager} db:push`);
  }

  if (["npm", "bun"].includes(pkgManager)) {
    logger.info(`  ${pkgManager} run dev`);
  } else {
    logger.info(`  ${pkgManager} dev`);
  }

  logger.info(`  git init`);
  logger.info(`  git commit -m "initial commit"`);

  logger.warn(
    `\nThank you for trying out the App Router option. If you encounter any issues, please open an issue!`
  );
};
