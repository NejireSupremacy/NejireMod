import { CommandInteraction } from '@biscuitland/core';

import { session } from '../../index.js';
import { setGuild } from './setGuild.js';
import { setMember } from './setMember.js';
import { setRoles } from './setRoles.js';

export const initialize = async (interaction: CommandInteraction) => {
    const { guildId, member } = interaction;
    const { cache } = session;

    if (!guildId || !member) return;

    if (!cache.guilds.get(guildId)) {
        setGuild(guildId);
        setRoles(guildId);
    }

    if (!cache.members.get(member?.id, guildId)) {
        setMember(member?.id, guildId);
    }

    if (!cache.members.get(session.botId, guildId)) {
        setMember(session.botId, guildId);
    }
};