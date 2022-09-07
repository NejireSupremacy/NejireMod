import { Guild } from '@biscuitland/core';
import { session } from '../../index.js';

export const setGuild = async (guildId: string) => {
    const guild: Guild = await session.rest.get(`/guilds/${guildId}`);

    session.cache.guilds.set(guildId, guild);
};