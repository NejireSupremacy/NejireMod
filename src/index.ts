import { Session } from '@biscuitland/core';
import { GatewayIntents } from '@biscuitland/api-types';

import { eventsListener } from './loadHandlers.js';
import 'dotenv/config';

const intents = GatewayIntents.Guilds;

export const session = new Session({
    token: process.env.DISCORD_AUTH_TOKEN,
    intents: intents,
});

const boot = async () => {
    await eventsListener(session);
    session.start();
};

boot();