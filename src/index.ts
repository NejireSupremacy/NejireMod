import { Session } from "@biscuitland/core";
import { GatewayIntents } from "@biscuitland/api-types";

import 'dotenv/config';
import { eventsListener } from "./loadHandlers.js";

const intents =
    GatewayIntents.Guilds;

const session = new Session({
    token: process.env.DISCORD_AUTH_TOKEN,
    intents: intents
})

eventsListener(session);

session.start();