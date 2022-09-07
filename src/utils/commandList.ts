import { EvalCommand } from '../commands/developer/eval.js';
import { PingCommand } from '../commands/info/ping.js';
import { InteractionCommand, TextCommand } from './Interfaces/commands.js';

export const commandList: Record<string, InteractionCommand> = {
    ping: new PingCommand()
};

export const devCommands: Record<string, TextCommand> = {
    eval: new EvalCommand(),
};