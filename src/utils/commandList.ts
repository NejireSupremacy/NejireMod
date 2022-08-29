import { PingCommand } from "../commands/info/ping.js";
import { Command } from "./interfaces.js";

export const commandList: Record<string, Command> = {
    ping: new PingCommand()
}