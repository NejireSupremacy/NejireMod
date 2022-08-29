import { EventAdapter } from '@biscuitland/core';

const eventList = {
    ready: await import('./events/ready.js'),
    interactionCreate: await import('./events/interactionCreate.js')
}

const eventListKeys: string[] = Object.keys(eventList);

export const eventsListener = ({ events }: { events: EventAdapter }) => {
    for (const event of eventListKeys) {
        const { name, when, execute } = eventList[event].default;

        events[when](name, (...args: any[]) => execute(...args));
    }
}