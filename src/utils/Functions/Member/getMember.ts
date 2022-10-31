import { session } from '../../../index.js';
import { setMember } from '../../Cache/setMember.js';

export const getMember = async (memberId: string, guildId: string) => {
    if (!session.cache.members.get(guildId, memberId)) {
        await setMember(memberId, guildId);
    }

    const member = session.cache.members.get(guildId, memberId);
    if (!member) throw new Error('Faled to get member');

    return member;
};