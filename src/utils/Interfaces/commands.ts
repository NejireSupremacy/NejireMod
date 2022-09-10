import { CreateApplicationCommands } from '@biscuitland/core';

export interface InteractionCommand {
    data: CreateApplicationCommands;
    needEphemeral?: boolean;
    defer?: boolean;
    execute(...args: any[]): Promise<void>;
}

export interface TextCommand {
    name: string,
    execute(...args: any[]): Promise<void>;
}