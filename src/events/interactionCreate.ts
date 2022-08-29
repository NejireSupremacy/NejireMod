import { CommandInteraction } from '@biscuitland/core';
import { commandList } from '../utils/commandList.js';

export default {
    name: 'interactionCreate',
    when: 'on',
    async execute(interaction: CommandInteraction) {
        await interaction.defer();

        const { commandName }  = interaction;
        const { execute } = commandList[commandName];

        try {
            execute(interaction);
        } catch (e) {
            if (e instanceof Error) {
                interaction.sendFollowUp({ content: `There was an error! \n${e.name}: ${e.message}` });
                console.error(e);
            }
        }
    }
}