import { DiscordRole } from '@biscuitland/api-types';

import { session } from '../../index.js';
import { rolesCacheStructure } from '../Interfaces/cacheStructures.js';

export const setRoles = async (guildId: string) => {
    const roles: DiscordRole[] = await session.rest.get(`/guilds/${guildId}/roles`);

    for (const role of roles) {
        const roleObject: rolesCacheStructure = {
            guildId: guildId,
            role: role
        };

        session.cache.roles.set(role.id, roleObject);
    }
};