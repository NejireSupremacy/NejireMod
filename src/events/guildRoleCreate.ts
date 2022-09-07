import { AllEvents, Role } from '@biscuitland/core';
import { session } from '../index.js';
import { Event, WhenType } from '../utils/Interfaces/event.js';

export class ReadyEvent implements Event {
    name: AllEvents = 'guildRoleCreate';
    when: WhenType = 'on';

    async execute(guildId: string, role: Role) {
        session.cache.roles.set(role.id, guildId, role);
    }
}
