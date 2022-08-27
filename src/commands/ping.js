const data = {
    "name": "ping",
    "description": "Get the bot latency"
}

export default {
    name: 'ping',
    data,
    execute(interaction) {
        interaction.followUp('pong');
    }
}