import { Role } from '@biscuitland/core';
import { session } from '../../index.js';

export const setRoles = async (guildId: string) => {
    const roles: Role[] = await session.rest.get(`/guilds/${guildId}/roles`);

    for (const role of roles) {
        session.cache.roles.set(role.id, guildId, role);
    }
};