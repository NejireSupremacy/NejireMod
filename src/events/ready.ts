import { AllEvents, Ready } from '@biscuitland/core';
import { session } from '../index.js';
import { Event, WhenType } from '../utils/interfaces.js';

import { ActivityTypes } from '@biscuitland/api-types';

export class ReadyEvent implements Event {
    name: AllEvents = 'ready';
    when: WhenType = 'once';

    // TODO: Change ready event
    async execute(client: Ready) {
        console.log(`Logged in as ${client.user.username}`);

        const shardsC = session.ws.shards.values();
        for (const { options } of shardsC) {
            const { id } = options;

            session.editStatus(id, {
                activities: [{
                    name: 'a free spirit',
                    type: ActivityTypes.Watching,
                    createdAt: Date.now()
                }],
                status: 'online'
            });
        }
    }
}
