const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    category: ['Utility'],
    data: new SlashCommandBuilder()
        .setName('staff')
        .setDescription('Checks if a user is staff of Ghost'),

    async execute(interaction, client) {

        const update_roles = [
            "1241161358020710460", // exec
            "1241161359652294676", // chief       //REPLACE THIS ARRAY WITH ROLES THAT CAN UPDATE YOUR ROSTER (EG: OWNER, CO OWNER, ETC)
            "1241161356858884179", // co
            "1241161356510625832", // owner
        ];
1241161358947520564
        const roles = [
            "1241161356510625832", // owner
            "1241161356858884179", // co
            "1241161358020710460", // exec
            "1241161359652294676", // chief
            "1241161358947520564", // intern
            "1266533086296936621", // Mod
            "1266533086296936621", //Admin
        ];

        if (interaction.member.roles.cache.some(role => update_roles.includes(role.id))) {
            if (interaction.channel.id === '1156775945596846111') { //REPLACE THIS LINE WITH YOUR ROSTER CHANNEL ID

                await interaction.deferReply();

                
                await interaction.guild.members.fetch(); // Fetch all guild members

                const roleUserMap = roles.map(roleId => {
                    const role = interaction.guild.roles.cache.get(roleId);
                    return {
                        role: role ? `<@&${roleId}>` : roleId,
                        members: []
                    };
                });

                interaction.guild.members.cache.forEach(member => {
                    const memberRoles = member.roles.cache
                        .filter(role => roles.includes(role.id))
                        .sort((a, b) => b.position - a.position); // Sort roles by Discord role position

                    if (memberRoles.size > 0) {
                        const highestRole = memberRoles.first();
                        const roleIndex = roles.indexOf(highestRole.id);
                        if (roleIndex !== -1) {
                            roleUserMap[roleIndex].members.push(`* <@${member.user.id}>`);
                        }
                    }
                });

                const embed = new EmbedBuilder()
                    .setTitle('Ghost Staff Team')
                    .setColor('#0099ff');

                let description = '';

                roleUserMap.forEach(roleInfo => {
                    description += `${roleInfo.role}\n`;
                    description += roleInfo.members.length > 0 ? roleInfo.members.join('\n') : 'No members with this role';
                    description += '\n\n';
                });

                embed.setDescription(description);

                await interaction.editReply({ embeds: [embed] });
            } else {

                await interaction.deferReply({ephemeral:true})

                const roleUserMap = roles.map(roleId => {
                    const role = interaction.guild.roles.cache.get(roleId);
                    return {
                        role: role ? `<@&${roleId}>` : roleId,
                        members: []
                    };
                });

                interaction.guild.members.cache.forEach(member => {
                    if (member.presence && (member.presence.status === 'online' || member.presence.status === 'dnd')) { // Check if member is online and not DND
                        const memberRoles = member.roles.cache
                            .filter(role => roles.includes(role.id))
                            .sort((a, b) => b.position - a.position); // Sort roles by Discord role position

                        if (memberRoles.size > 0) {
                            const highestRole = memberRoles.first();
                            const roleIndex = roles.indexOf(highestRole.id);
                            if (roleIndex !== -1) {
                                roleUserMap[roleIndex].members.push(`* <@${member.user.id}>`);
                            }
                        }
                    }
                });

                // Filter out roles with no members
                const filteredRoleUserMap = roleUserMap.filter(roleInfo => roleInfo.members.length > 0);

                const embed = new EmbedBuilder()
                    .setTitle('Ghost Staff Team')
                    .setColor('#0099ff')

                let description = '';

                filteredRoleUserMap.forEach(roleInfo => {
                    description += `${roleInfo.role}\n`;
                    description += roleInfo.members.join('\n') + '\n\n';
                });

                const extraMessage = 'view https://discord.com/channels/1156775942224625684/1156775945596846111 for the full team!'; //REPLACE LINK WITH YOUR ROSTER CHANNEL LINK
                description += extraMessage;

                if (description === '') {
                    description = 'No online members with the specified roles.';
                }

                embed.setDescription(description);

                await interaction.editReply({ embeds: [embed], ephemeral: true });



            }
        } else {
            await interaction.deferReply({ephemeral:true})

            const roleUserMap = roles.map(roleId => {
                const role = interaction.guild.roles.cache.get(roleId);
                return {
                    role: role ? `<@&${roleId}>` : roleId,
                    members: []
                };
            });

            interaction.guild.members.cache.forEach(member => {
                if (member.presence && (member.presence.status === 'online' || member.presence.status === 'dnd')) { // Check if member is online and not DND
                    const memberRoles = member.roles.cache
                        .filter(role => roles.includes(role.id))
                        .sort((a, b) => b.position - a.position); // Sort roles by Discord role position

                    if (memberRoles.size > 0) {
                        const highestRole = memberRoles.first();
                        const roleIndex = roles.indexOf(highestRole.id);
                        if (roleIndex !== -1) {
                            roleUserMap[roleIndex].members.push(`* <@${member.user.id}>`);
                        }
                    }
                }
            });

            // Filter out roles with no members
            const filteredRoleUserMap = roleUserMap.filter(roleInfo => roleInfo.members.length > 0);

            const embed = new EmbedBuilder()
                .setTitle('Ghost Staff Team')
                .setColor('#0099ff')

            let description = '';

            filteredRoleUserMap.forEach(roleInfo => {
                description += `${roleInfo.role}\n`;
                description += roleInfo.members.join('\n') + '\n\n';
            });

            const extraMessage = 'view https://discord.com/channels/1156775942224625684/1156775945596846111 for the full team!'; //REPLACE LINK WITH YOUR ROSTER CHANNEL LINK
            description += extraMessage;

            if (description === '') {
                description = 'No online members with the specified roles.';
            }

            embed.setDescription(description);

            await interaction.editReply({ embeds: [embed], ephemeral: true });
        }
    }
};
