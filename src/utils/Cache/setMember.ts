import { Member } from '@biscuitland/core';
import { session } from '../../index.js';
import { membersCacheStructure } from '../Interfaces/cacheStructures.js';

export const setMember = async (memberId: string, guildId: string) => {
    const member: Member = await session.rest.get(`/guilds/${guildId}/members/${memberId}`);

    const memberObject: membersCacheStructure = {
        guildId: guildId,
        member
    };

    session.cache.members.set(memberId, memberObject);
};