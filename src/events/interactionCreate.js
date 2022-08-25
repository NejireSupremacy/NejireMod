const commandList = {
    ping: await import('../commands/ping.js')
}

export default {
    name: 'interactionCreate',
    when: 'on',
    execute(interaction) {
        interaction.deferReply();

        const { commandName } = interaction;
        const { execute } = commandList[commandName].default;

        try {
            execute(interaction);
        } catch (e) {
            interaction.followUp(`There was an error! \n${e.name}: ${e.message}`);
            console.error(e);
        }
    }
}