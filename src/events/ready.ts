import { AllEvents, Ready } from "@biscuitland/core";
import { Event, WhenType } from "../utils/interfaces.js";

export default class implements Event {
  name: AllEvents = "ready";
  when: WhenType = "once";

  async execute(client: Ready) {
    console.log(`Logged in as ${client.user.username}`);
  }
}
