import { select } from "@clack/prompts";
import { bold } from "chalk";
import { Command } from "commander";

// CONSTS
import { defaultProjectName } from "../consts";

export const runCli = async () => {
  const program = new Command()
    .name("create-papillon-app")
    .description(
      "Un CLI pour créer des applications web avec le papillon stack"
    )
    .argument(
      "[dir]",
      "Le nom de l'application, ainsi que le nom du répertoire à créer"
    )
    .parse(process.argv);

  const programArgs = program.args;
  if (programArgs.length !== 0) {
    console.log("Le nom de l'application sera : ", bold(programArgs[0]));
  }

  const name = programArgs[0];

  const shadCn = (await select({
    message: "Voulez-vous installer ShadCN UI ?",
    options: [
      { value: true, label: "Oui" },
      { value: false, label: "Non" },
    ],
  })) as boolean;

  console.log(bold("Vous avez choisi :"));
  if (shadCn) {
    console.log(bold("ShadCN UI"));
  }

  return { name: name ?? defaultProjectName, shadCn };
};
