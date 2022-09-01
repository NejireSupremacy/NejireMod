import { AllEvents, Interaction, MessageFlags } from '@biscuitland/core';
import { InteractionResponseTypes } from '@biscuitland/api-types';
import { commandList } from '../utils/commandList.js';
import { Event, WhenType } from '../utils/interfaces.js';

export class InteractionCreateEvent implements Event {
    name: AllEvents = 'interactionCreate';
    when: WhenType = 'on';

    async execute(interaction: Interaction) {
        if (interaction.isCommand()) {
            const { options } = interaction;
            const subCommand = options.getSubCommand(true)[0];

            if (subCommand === undefined) return;
            
            const { execute, needEphemeral } = commandList[subCommand];

            // TODO: Change this method to a defer when the ephemeral flag is available
            if (needEphemeral) await interaction.respond(
                { type: InteractionResponseTypes.DeferredUpdateMessage, data: { flags: MessageFlags.Ephemeral } }
            );
            else await interaction.defer();

            try {
                await execute(interaction);
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
