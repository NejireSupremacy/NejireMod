import { DiscordGuild } from '@biscuitland/api-types';

import { session } from '../../index.js';
import { guildsCacheStructure } from '../Interfaces/cacheStructures.js';

export const setGuild = async (guildId: string) => {
    const guild: DiscordGuild = await session.rest.get(`/guilds/${guildId}`);

    const guildObject: guildsCacheStructure = {
        guildId,
        guild
    };

    session.cache.guilds.set(guildId, guildObject);
};