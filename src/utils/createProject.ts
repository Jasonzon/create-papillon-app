import path from "path";

// UTILS
import { scaffoldProject } from "./scaffoldProject";

// TYPES
import type { ProjectOptions } from "~/types/ProjectOptions";

export const createProject = async ({ name, shadCn }: ProjectOptions) => {
  const projectDir = path.resolve(process.cwd(), name);

  // Bootstraps the base Next.js application
  await scaffoldProject({
    name,
    shadCn,
  });

  return projectDir;
};
