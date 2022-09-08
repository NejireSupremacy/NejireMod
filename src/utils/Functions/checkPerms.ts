import { Member, PermissionResolvable, Permissions, Role } from '@biscuitland/core';

import { session } from '../../index.js';

export const checkPerms = async (member: Member, guildId: string, perms: PermissionResolvable) => {
    const { roles } = member;
    const permissions = new Permissions(0n);

    for (const r of roles) {
        const role = await session.cache.roles.get(r, guildId).catch();

        if (!role) return;
        
        const roleC = new Role(session, role, guildId);
        permissions.add(roleC.permissions.bitfield);
    }

    return !permissions.any(perms);
};