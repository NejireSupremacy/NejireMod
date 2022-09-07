import { CommandInteraction } from '@biscuitland/core';
import { InteractionCommand } from '../../utils/Interfaces/commands.js';

const data = {
    name: 'information',
    description: 'Get information about NejireBot',
    options: [
        {
            type: 1,
            name: 'ping',
            description: 'Get the bot latency'
        }
    ]
};

export class PingCommand implements InteractionCommand {
    data = data;
    needEphemeral = false;
    async execute(interaction: CommandInteraction) {
        const response = await interaction.sendFollowUp({ content: '🏓 Pong!' });

        const startTime = interaction.createdTimestamp;
        const endTime = response.createdTimestamp;

        const msgLatency = endTime - startTime;

        await response.edit({
            content: `🏓 Pong! \n> **My message latency is ${msgLatency} ms**`
        });
    }
}