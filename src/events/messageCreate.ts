import { AllEvents, Message } from '@biscuitland/core';
import { devCommands } from '../utils/commandList.js';
import { Event, WhenType } from '../utils/Interfaces/event.js';

export class MessageCreateEvent implements Event {
    name: AllEvents = 'messageCreate';
    when: WhenType = 'on';

    async execute(message: Message) {
        const prefix = /^<@!?1013206983345717331>/;
        if (!prefix.test(message.content)) return;

        const args = message.content.split(' ').slice(1);

        const getCommand = devCommands[args[0]];
        if (!getCommand) return;

        try {
            await getCommand.execute(message, args);
        } catch (e) {
            if (e instanceof Error) {
                message.reply({ content: `There was an error! \n${e.name}: ${e.message}` });
            }
        }
    }
}
