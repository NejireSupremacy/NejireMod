import { GatewayIntents } from '@biscuitland/api-types';
import { Session } from '@biscuitland/core';

import { GuildsCache } from './Cache/GuildsCache.js';
import { MembersCache } from './Cache/MembersCache.js';
import { RolesCache } from './Cache/RolesCache.js';

const intents = GatewayIntents.Guilds |
                GatewayIntents.GuildMessages;

export class ClientSession extends Session {
    cache = {
        guilds: new GuildsCache(),
        roles: new RolesCache(),
        members: new MembersCache()
    };

    constructor() {
        super({
            token: process.env.DISCORD_AUTH_TOKEN,
            intents: intents
        });
    }
}