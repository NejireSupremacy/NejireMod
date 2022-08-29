import { EventAdapter } from "@biscuitland/core";
import { Event } from "./utils/interfaces";

const eventList: Record<string, Event> = {
  ready: (await import("./events/ready").then((x) => x.default)) as Event,
  interaction: (await import("./events/interactionCreate").then(
    (x) => x.default
  )) as Event,
};

export const eventsListener = ({ events }: { events: EventAdapter }) => {
  for (const event of Object.values(eventList)) {
    const { name, when, execute } = event;

    events[when](name, (...args: any[]) => execute(...args));
  }
};
