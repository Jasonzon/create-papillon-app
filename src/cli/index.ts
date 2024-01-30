import { select } from "@clack/prompts";
import chalk from "chalk";
import { Command } from "commander";

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

  const shadCN = (await select({
    message: "Voulez-vous installer ShadCN UI ?",
    options: [
      { value: true, label: "Oui" },
      { value: false, label: "Non" },
    ],
  })) as boolean;

  console.log(chalk.bold("Vous avez choisi :"));
  console.log(`ShadCN : ${shadCN ? "Oui" : "Non"}`);

  const name = program.args[0];

  return { shadCN, name: name ?? "my-papillon-app" };
};
