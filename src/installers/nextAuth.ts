import path from "path";
import { copySync } from "fs-extra";

import { PKG_ROOT } from "consts";
import { type AvailableDependencies } from "./depencendyVersionMap";
import { type Installer } from "installers";
import { addPackageDependency } from "utils/addPackageDependency";

export const nextAuthInstaller: Installer = ({
  projectDir,
  packages,
  appRouter,
}) => {
  const deps: AvailableDependencies[] = ["next-auth"];
  deps.push("@next-auth/prisma-adapter");

  addPackageDependency({
    projectDir,
    dependencies: deps,
    devMode: false,
  });

  const extrasDir = path.join(PKG_ROOT, "template/options");

  const apiHandlerFile = "src/pages/api/auth/[...nextauth].ts";
  const routeHandlerFile = "src/app/api/auth/[...nextauth]/route.ts";
  const srcToUse = appRouter ? routeHandlerFile : apiHandlerFile;

  const apiHandlerSrc = path.join(extrasDir, srcToUse);
  const apiHandlerDest = path.join(projectDir, srcToUse);

  const authConfigSrc = path.join(
    extrasDir,
    "src/server",
    appRouter ? "auth-app" : "auth-pages",
    "with-prisma.ts"
  );
  const authConfigDest = path.join(projectDir, "src/server/auth.ts");

  copySync(apiHandlerSrc, apiHandlerDest);
  copySync(authConfigSrc, authConfigDest);
};
