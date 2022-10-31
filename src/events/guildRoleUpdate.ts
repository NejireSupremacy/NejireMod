import { AllEvents } from '@biscuitland/core';
import { DiscordRole } from '@biscuitland/api-types';

import { session } from '../index.js';
import { rolesCacheStructure } from '../utils/Interfaces/cacheStructures.js';
import { Event, WhenType } from '../utils/Interfaces/event.js';

export class ReadyEvent implements Event {
    name: AllEvents = 'guildRoleUpdate';
    when: WhenType = 'on';

    async execute(guildId: string, role: DiscordRole) {
        const roleObject: rolesCacheStructure = {
            guildId: guildId,
            role: role
        };

        session.cache.roles.set(role.id, roleObject);
    }
}
