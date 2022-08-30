import { AllEvents, CreateApplicationCommands } from '@biscuitland/core';

export interface Command {
    data: CreateApplicationCommands;
    needEphemeral: boolean;
    execute(...args: any[]): Promise<void>;
}

export interface Event {
    name: AllEvents;
    when: WhenType;
    execute(...args: any[]): Promise<void>;
}

export type WhenType = 'on' | 'once';
