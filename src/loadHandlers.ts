import { EventAdapter } from '@biscuitland/core';

import { InteractionCreateEvent } from './events/interactionCreate.js';
import { MessageCreateEvent } from './events/messageCreate.js';
import { Event } from './utils/Interfaces/event.js';

const eventList: Record<string, Event> = {
    interactionCreate: new InteractionCreateEvent,
    messageCreate: new MessageCreateEvent,
    
};

export const eventsListener = ({ events }: { events: EventAdapter }) => {
    for (const event of Object.values(eventList)) {
        const { name, when, execute } = event;

        events[when](name, (...args: any[]) => execute(...args));
    }
};
