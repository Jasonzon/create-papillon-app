import { envVariablesInstaller } from "./envVars";
import { nextAuthInstaller } from "./nextAuth";

// TYPES
import { type PackageManager } from "types/PackageManager";

export const availablePackages = ["nextAuth", "envVariables"] as const;
export type AvailablePackages = (typeof availablePackages)[number];

export const databaseProviders = ["postgres"] as const;
export type DatabaseProvider = (typeof databaseProviders)[number];

export interface InstallerOptions {
  projectDir: string;
  pkgManager: PackageManager;
  noInstall: boolean;
  packages?: PkgInstallerMap;
  appRouter?: boolean;
  projectName: string;
  scopedAppName: string;
  databaseProvider: DatabaseProvider;
}

export type Installer = (opts: InstallerOptions) => void;

export type PkgInstallerMap = {
  [pkg in AvailablePackages]: {
    inUse: boolean;
    installer: Installer;
  };
};

export const buildPkgInstallerMap = (
  packages: AvailablePackages[]
): PkgInstallerMap => ({
  nextAuth: {
    inUse: packages.includes("nextAuth"),
    installer: nextAuthInstaller,
  },
  envVariables: {
    inUse: true,
    installer: envVariablesInstaller,
  },
});
