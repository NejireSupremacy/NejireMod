const data = {
    "name": "ping",
    "description": "Get the bot latency"
}

export default {
    data,
    execute(interaction) {
        interaction.sendFollowUp({ content: 'Pong!' });
    }
}