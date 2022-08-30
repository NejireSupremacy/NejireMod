import { CommandInteraction } from "@biscuitland/core";
import { Command } from "../../utils/interfaces.js";

const data = {
    name: 'ping',
    description: 'Get the bot latency'
}

export class PingCommand implements Command {
    data = data
    async execute(interaction: CommandInteraction) {
        const response = await interaction.sendFollowUp({ content: '🏓 Pong!' });

        const startTime = interaction.createdTimestamp;
        const endTime = response.createdTimestamp;

        const msgLatency = endTime - startTime;

        await response.edit({
            content: `🏓 Pong! \n> **My message latency is ${msgLatency} ms**`
        })
    }
}