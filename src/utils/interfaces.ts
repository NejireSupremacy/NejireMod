import { AllEvents, CreateApplicationCommands } from '@biscuitland/core';

export interface InteractionCommand {
    data: CreateApplicationCommands;
    needEphemeral: boolean;
    execute(...args: any[]): Promise<void>;
}

export interface TextCommand {
    name: string,
    execute(...args: any[]): Promise<void>;
}

export interface Event {
    name: AllEvents;
    when: WhenType;
    execute(...args: any[]): Promise<void>;
}

export type WhenType = 'on' | 'once';
