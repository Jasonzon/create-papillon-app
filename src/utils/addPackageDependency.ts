import path from "path";
import fs from "fs-extra";
import sortPackageJson from "sort-package-json";
import { type PackageJson } from "type-fest";

import { dependencyVersionMap } from "installers/depencendyVersionMap";

// TYPES
import { type PackageDepencencyOptions } from "types/PackageDependencyOptions";

export const addPackageDependency = ({
  dependencies,
  devMode,
  projectDir,
}: PackageDepencencyOptions) => {
  const pkgJson = fs.readJSONSync(
    path.join(projectDir, "package.json")
  ) as PackageJson;

  dependencies.forEach((pkgName) => {
    const version = dependencyVersionMap[pkgName];

    if (devMode && pkgJson.devDependencies) {
      pkgJson.devDependencies[pkgName] = version;
    } else if (pkgJson.dependencies) {
      pkgJson.dependencies[pkgName] = version;
    }
  });
  const sortedPkgJson = sortPackageJson(pkgJson);

  fs.writeJSONSync(path.join(projectDir, "package.json"), sortedPkgJson, {
    spaces: 2,
  });
};
