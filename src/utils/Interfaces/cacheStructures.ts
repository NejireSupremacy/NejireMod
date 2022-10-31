import { Member } from '@biscuitland/core';
import { DiscordRole, DiscordGuild } from '@biscuitland/api-types';

export interface membersCacheStructure {
    guildId: string,
    member: Member
}

export interface guildsCacheStructure {
    guildId: string,
    guild: DiscordGuild
}

export interface rolesCacheStructure {
    guildId: string,
    role: DiscordRole
}