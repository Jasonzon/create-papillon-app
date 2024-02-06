import path from "path";
import { readFileSync, writeFileSync } from "fs-extra";

import { PKG_ROOT } from "consts";
import { type Installer } from "installers";

export const envVariablesInstaller: Installer = ({
  projectDir,
  packages,
  databaseProvider,
  projectName,
}) => {
  const usingAuth = packages?.nextAuth.inUse;

  const envContent = getEnvContent(!!usingAuth, projectName);

  let envFile = "";
  if (usingAuth) {
    envFile = "with-auth-db.js";
  } else if (usingAuth) {
    envFile = "with-auth.js";
  } else {
    envFile = "with-db.js";
  }

  if (envFile !== "") {
    const envSchemaSrc = path.join(
      PKG_ROOT,
      "template/extras/src/env",
      envFile
    );
    const envFileText = readFileSync(envSchemaSrc, "utf-8");
    const envSchemaDest = path.join(projectDir, "src/env.js");
    writeFileSync(envSchemaDest, envFileText, "utf-8");
  }

  const envDest = path.join(projectDir, ".env");
  const envExampleDest = path.join(projectDir, ".env.example");

  writeFileSync(envDest, envContent, "utf-8");
  writeFileSync(envExampleDest, exampleEnvContent + envContent, "utf-8");
};

const getEnvContent = (usingAuth: boolean, projectName: string) => {
  let content = `
# When adding additional environment variables, the schema in "/src/env.js"
# should be updated accordingly.
`
    .trim()
    .concat("\n");

  content += `
# Prisma
# https://www.prisma.io/docs/reference/database-reference/connection-urls#env
`;
  content += `DATABASE_URL="postgresql://postgres:password@localhost:5432/${projectName}"\n`;

  if (usingAuth)
    content += `
# Next Auth
# You can generate a new secret on the command line with:
# openssl rand -base64 32
# https://next-auth.js.org/configuration/options#secret
# NEXTAUTH_SECRET=""
NEXTAUTH_URL="http://localhost:3000"

# Next Auth Discord Provider
DISCORD_CLIENT_ID=""
DISCORD_CLIENT_SECRET=""
`;

  if (!usingAuth)
    content += `
# Example:
# SERVERVAR="foo"
# NEXT_PUBLIC_CLIENTVAR="bar"
`;

  return content;
};

const exampleEnvContent = `
# Since the ".env" file is gitignored, you can use the ".env.example" file to
# build a new ".env" file when you clone the repo. Keep this file up-to-date
# when you add new variables to \`.env\`.

# This file will be committed to version control, so make sure not to have any
# secrets in it. If you are cloning this repo, create a copy of this file named
# ".env" and populate it with your secrets.
`
  .trim()
  .concat("\n\n");
