import { Session } from "@biscuitland/core";
import { GatewayIntents } from "@biscuitland/api-types";

import "dotenv/config";
import { eventsListener } from "./loadHandlers";
import { deployCommands } from "./deployCommands";

const intents = GatewayIntents.Guilds;

const session = new Session({
  token: process.env.DISCORD_AUTH_TOKEN,
  intents: intents,
});

const boot = async () => {
  await deployCommands(session);
  eventsListener(session);
  session.start();
};

boot();
