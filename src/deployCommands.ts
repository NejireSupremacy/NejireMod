import "dotenv/config";

import { commandList } from "./utils/commandList.js";
import { DefaultRestAdapter } from "@biscuitland/rest";
import { APPLICATION_COMMANDS } from "@biscuitland/api-types";

import type { CreateApplicationCommands } from "@biscuitland/core";

const commandArray: CreateApplicationCommands[] = Object.values(commandList).map(x => x.data);

export async function deployCommands(): Promise<void> {
  const res = new DefaultRestAdapter({ token: process.env.DISCORD_AUTH_TOKEN });

  await res.put(
    APPLICATION_COMMANDS(process.env.DISCORD_APLICATION_ID),
    commandArray
  );
  console.log("Commands loaded");
  return;
}

deployCommands();