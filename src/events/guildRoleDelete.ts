import { AllEvents } from '@biscuitland/core';
import { session } from '../index.js';
import { Event, WhenType } from '../utils/Interfaces/event.js';

export class ReadyEvent implements Event {
    name: AllEvents = 'guildRoleDelete';
    when: WhenType = 'on';

    async execute(guildId: string, roleId: string) {
        session.cache.roles.remove(roleId, guildId);
    }
}
