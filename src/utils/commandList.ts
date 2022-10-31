import { EvalCommand } from '../commands/developer/eval.js';
import { PingCommand } from '../commands/info/ping.js';
import { BanCommand } from '../commands/moderation/ban.js';
import { InteractionCommand, TextCommand } from './Interfaces/commands.js';

export const commandList: Record<string, InteractionCommand> = {
    ping: new PingCommand(),
    ban: new BanCommand()
};

export const devCommands: Record<string, TextCommand> = {
    eval: new EvalCommand(),
};