import { commandList } from '../utils/commandList.js';

export default {
    name: 'interactionCreate',
    when: 'on',
    async execute(interaction) {
        await interaction.defer();

        const { commandName } = interaction;
        const { execute } = commandList[commandName].default;

        try {
            execute(interaction);
        } catch (e) {
            interaction.sendFollowUp({ content: `There was an error! \n${e.name}: ${e.message}` });
            console.error(e);
        }
    }
}