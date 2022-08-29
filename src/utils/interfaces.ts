import { CreateApplicationCommands } from '@biscuitland/core';

export interface Command {
  data: CreateApplicationCommands;
  execute(...args: any[]): Promise<void>;
}