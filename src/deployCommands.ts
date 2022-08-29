import "dotenv/config";

import { commandList } from "./utils/commandList.js";
import type { Session, CreateApplicationCommands } from "@biscuitland/core";
import { APPLICATION_COMMANDS } from "@biscuitland/api-types";

const commandArray: CreateApplicationCommands[] = Object.values(commandList).map(x => x.data);

export async function deployCommands(session: Session): Promise<void> {
  await session.rest.put(
    APPLICATION_COMMANDS(process.env.DISCORD_APLICATION_ID),
    commandArray
  );
  console.log("Commands loaded");
  return;
}