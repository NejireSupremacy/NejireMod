import { GatewayIntents } from '@biscuitland/api-types';
import { Session } from '@biscuitland/core';
import { Cache } from '@biscuitland/cache';

const intents = GatewayIntents.Guilds |
                GatewayIntents.GuildMessages;

export class ClientSession extends Session {
    cache = new Cache();

    constructor() {
        super({
            token: process.env.DISCORD_AUTH_TOKEN,
            intents: intents
        });
    }
}