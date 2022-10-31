import { CommandInteraction, Guild, Permissions } from '@biscuitland/core';
import { BitwisePermissionFlags } from '@biscuitland/api-types';

import { checkPerms } from '../../utils/Functions/Member/checkPerms.js';
import { InteractionCommand } from '../../utils/Interfaces/commands.js';
import { highestRole } from '../../utils/Functions/Member/highestRole.js';
import { session } from '../../index.js';
import { getMember } from '../../utils/Functions/Member/getMember.js';

const data = {
    'name': 'moderation',
    'description': 'Tools to facilitate moderation',
    'options': [
        {
            'type': 1,
            'name': 'ban',
            'description': 'Ban a guild member',
            'options': [
                {
                    'type': 6,
                    'name': 'member',
                    'description': 'Member to be banned',
                    'required': true
                },
                {
                    'type': 3,
                    'name': 'duration',
                    'description': 'Duration of the ban'
                }
            ]
        }
    ]
};

export class BanCommand implements InteractionCommand {
    data = data;
    needEphemeral = true;
    async execute(interaction: CommandInteraction) {
        const { member, guildId }  = interaction;
        if (!member || !guildId) throw new Error('Failed to get member or guild');
        
        // Check if user have the required permissions
        const permissions = new Permissions(0n);
        permissions.add(BitwisePermissionFlags.BAN_MEMBERS);

        const memberHasPerms = await checkPerms(member, guildId, permissions.bitfield).catch();
        if (!memberHasPerms) {
            interaction.sendFollowUp({ 
                content: 'You do not have the permissions to perform this action \n> Permissions needed: `BAN_MEMBERS`'
            });

            return;
        }

        // Get the guild
        const guild = session.cache.guilds.get(guildId);
        if (!guild) throw new Error('Failed to get the guild');
        
        // Get all the required members
        const members = session.cache.members;

        const botMember = await members.get(guildId, session.botId);
        if (!botMember) throw new Error('Failed to get bot at guild');

        const toBanMemberId = interaction.options.getUser('member');
        if (!toBanMemberId) throw new Error('Faled to get member');
        const toBanMember = await getMember(toBanMemberId, guildId);

        const highRoleToBanMember = highestRole(toBanMember.member.roles);
        const highRoleBot = highestRole(botMember.member.roles);
        const highRoleMember = highestRole(member.roles);

        // Check for hierarchy
        if ((highRoleToBanMember?.position || 0) > (highRoleMember?.position || 0)) {
            interaction.sendFollowUp({
                content: 'This member has a higher role than you have'
            });

            return;
        } else if ((highRoleToBanMember?.position || 0) > (highRoleBot?.position || 0)) {
            interaction.sendFollowUp({
                content: 'This member has a higher role than mine'
            });

            return;
        }

        // Ban the member
        const bGuild = new Guild(session, guild.guild);
        await bGuild.banMember(toBanMemberId, {}).catch();

        interaction.sendFollowUp({
            content: `The member \`${toBanMember.member.user.username}\` was banned.`
        });
    }
}