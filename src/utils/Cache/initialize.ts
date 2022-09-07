import { CommandInteraction } from '@biscuitland/core';

import { session } from '../../index.js';
import { setGuild } from './setGuild.js';
import { setMember } from './setMember.js';
import { setRoles } from './setRoles.js';

export const initialize = async (interaction: CommandInteraction) => {
    const { guildId, member } = interaction;
    const { cache } = session;

    if (!guildId || !member) return;

    if (!(await cache.guilds.get(guildId))) {
        await setGuild(guildId).catch();
        setRoles(guildId);
    }

    if (!(await cache.members.get(member?.id, guildId))) {
        setMember(member?.id, guildId);
        console.log(member?.id, guildId);
    }
};