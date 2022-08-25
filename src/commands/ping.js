export default {
    name: 'ping',
    execute(interaction) {
        interaction.followUp('pong');
    }
}