import { Message } from '@biscuitland/core';
import { TextCommand } from '../../utils/interfaces.js';

export class EvalCommand implements TextCommand {
    name = 'eval';
    async execute(message: Message, args: string[]) {
        const devs = ['593611267818782730', '366779196975874049'];
        if (!devs.includes(message.author.id)) return;

        const msgCodeBlock = args.join('').match(/```[\s\S]*```/gm);
        if (!msgCodeBlock) return;

        const toEval = msgCodeBlock[0].replace('```js', '').replace('```', '');

        const evaluated = eval(toEval);
        await message.reply({ content: `TypeOf: ${typeof(evaluated)} \nOutput: \`\`\`js ${evaluated}\`\`\`` }).catch(e => {
            console.log(e);
        });
    }
}