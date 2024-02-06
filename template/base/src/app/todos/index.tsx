// TYPES
import type { Metadata } from "next";

// DB
import { db } from "~/server/db";

export const metadata: Metadata = {
  title: "Todos",
  description: "List of all todos",
};

const Todos = async () => {};

export default Todos;
