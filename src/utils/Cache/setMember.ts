import { Member } from '@biscuitland/core';
import { session } from '../../index.js';

export const setMember = async (memberId: string, guildId: string) => {
    const member: Member = await session.rest.get(`/guilds/${guildId}/members/${memberId}`);

    session.cache.members.set(memberId, guildId, member);
};