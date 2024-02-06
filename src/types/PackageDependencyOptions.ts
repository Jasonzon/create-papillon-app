// TYPES
import { type AvailableDependencies } from "installers/depencendyVersionMap";

export type PackageDepencencyOptions = {
  dependencies: AvailableDependencies[];
  devMode: boolean;
  projectDir: string;
};
