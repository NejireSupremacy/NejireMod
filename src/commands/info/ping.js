const data = {
    "name": "ping",
    "description": "Get the bot latency"
}

export default {
    data,
    async execute(interaction) {
        const response = await interaction.sendFollowUp({ content: '🏓 Pong!' });

        const startTime = interaction.createdTimestamp;
        const endTime = response.createdTimestamp;

        console.log(startTime, endTime);
        const msgLatency = endTime - startTime;

        await response.edit({
            content: `🏓 Pong! \n> **My message latency is ${msgLatency} ms**`
        })
    }
}