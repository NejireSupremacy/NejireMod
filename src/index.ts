import { Session } from "@biscuitland/core";
import { GatewayIntents } from "@biscuitland/api-types";

import { eventsListener } from "./loadHandlers";
import "dotenv/config";

const intents = GatewayIntents.Guilds;

const session = new Session({
  token: process.env.DISCORD_AUTH_TOKEN,
  intents: intents,
});

const boot = async () => {
  eventsListener(session);
  session.start();
};

boot();
