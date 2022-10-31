import { DiscordRole } from '@biscuitland/api-types';

import { session } from '../../../index.js';

export const highestRole = (roles: string[]) => {
    const roleList: DiscordRole[] = [];
    for (const r of roles) {
        const role = session.cache.roles.get(r);
        if (!role) continue;

        roleList.push(role.role);
    }

    if (roleList.length < 1) return null;

    const highestRole = roleList.reduce((a, b) => a.position > b.position ? a : b);
    return highestRole;
};