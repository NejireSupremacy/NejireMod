import { EventAdapter } from "@biscuitland/core";
import { InteractionCreateEvent } from "./events/interactionCreate.js";
import { ReadyEvent } from "./events/ready.js";
import { Event } from "./utils/interfaces";

const eventList: Record<string, Event> = {
  ready: new ReadyEvent,
  interaction: new InteractionCreateEvent,
};

export const eventsListener = ({ events }: { events: EventAdapter }) => {
  for (const event of Object.values(eventList)) {
    const { name, when, execute } = event;

    events[when](name, (...args: any[]) => execute(...args));
  }
};
