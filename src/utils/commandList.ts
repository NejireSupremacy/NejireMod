import { PingCommand } from "../commands/info/ping.js";
import { Command } from "./interfaces.js";

export const commandList: { [key: string]: Command } = {
    ping: new PingCommand()
}