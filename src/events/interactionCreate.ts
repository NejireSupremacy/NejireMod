import { AllEvents, Interaction } from "@biscuitland/core";
import { commandList } from "../utils/commandList.js";
import { Event, WhenType } from "../utils/interfaces.js";

export class InteractionCreateEvent implements Event {
  name: AllEvents = "interactionCreate";
  when: WhenType = "on";

  async execute(interaction: Interaction) {
    await interaction.defer();
    if (interaction.isCommand()) {
      const { commandName } = interaction;
      const { execute } = commandList[commandName];

      try {
        execute(interaction);
      } catch (e) {
        if (e instanceof Error) {
          interaction.sendFollowUp({
            content: `There was an error! \n${e.name}: ${e.message}`,
          });
          console.error(e);
        }
      }
    }
  }
}
