import { AllEvents } from '@biscuitland/core';

export interface Event {
    name: AllEvents;
    when: WhenType;
    execute(...args: any[]): Promise<void>;
}

export type WhenType = 'on' | 'once';
