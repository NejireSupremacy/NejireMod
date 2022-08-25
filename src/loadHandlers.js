const eventList = {
    ready: await import('./events/ready.js')
}

const eventListKeys = Object.keys(eventList);

export const eventsListener = ({ events }) => {
    for (const event of eventListKeys) {
        const { name, when, execute } = eventList[event].default;

        events[when](name, (...args) => execute(...args));
    }
}