import { CommandInteraction } from '@biscuitland/core';

import { InteractionCommand } from '../../utils/Interfaces/commands.js';

const data = {
    'name': 'information',
    'description': 'Get information about NejireBot',
    'options': [
        {
            'type': 1,
            'name': 'ping',
            'description': 'Get the bot latency'
        }
    ]
};

export class PingCommand implements InteractionCommand {
    data = data;
    async execute(interaction: CommandInteraction) {
        await interaction.respondWith({ content: '🏓 Pong!' });

        const startTime = Date.now();
        const response = await interaction.fetchFollowUp('@original');
        
        const endTime = Date.now();

        const msgLatency = endTime - startTime;

        await response?.edit({
            content: `🏓 Pong! \n> **My message latency is ${msgLatency} ms**`
        });
    }
}