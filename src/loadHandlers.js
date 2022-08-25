const eventList = {
    ready: await import('./events/ready.js')
}

const eventListEntries = Object.keys(eventList);

export const eventsListener = ({ events }) => {
    for (const event of eventListEntries) {
        const { name, when, execute } = eventList[event].default;

        events[when](name, (...args) => execute(...args));
    }
}