const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
        name: 'kick',
    aliases: ['boot'],
    description: 'Kick a user from the server',
    usage: 'kick <user> [reason]',
    category: 'Moderation',
    usableInDms: false,
    permissions: [PermissionFlagsBits.KickMembers],
    async execute(message, client, args) {

        const user = message.guild.members.cache.get(args[1]) || message.mentions.members.first() 

        if (!message.member.permissions.has(PermissionFlagsBits.KickMembers)) return message.reply({ content: `${client.config.noPerms}`, ephemeral: true });
        if (!user) return await message.reply({ content: 'Please mention a **user** to kick.', ephemeral: true });

        const reason = args.slice(1).join(' ') || `\`\`No reason given\`\``;

        if (user.kickable) {

            const dmEmbed = new EmbedBuilder()
            .setAuthor({ name: `${client.user.username} kick command` })
            .setColor(client.config.embedModHard)
            .setDescription(`\n ${user}, \n \`You have been kicked from ${message.channel.guild}\` \n \n \n **Reason:** \n ${reason} \n \n **Staff Member:** \n ${message.member} | (<@${message.member.id}>:${message.member.id}) \n`)
            .setTimestamp()
            .setThumbnail(client.user.avatarURL())
            .setFooter({ text: `Kicked - ${message.channel.guild}` });
    
            user.send({ embeds: [dmEmbed] }).catch((err) => { return client.logs.error('[KICK] Failed to DM user.') });
            user.kick({ reason: reason });

            const kickEmbed = new EmbedBuilder()
            .setAuthor({ name: `${client.user.username} kick command`})
            .setColor(client.config.embedModHard)
            .addFields({ name: 'User', value: `> ${user}`, inline: true })
            .addFields({ name: 'Reason', value: `> ${reason}`, inline: true })
            .setFooter({ text: `Someone got kicked from the server` })
            .setThumbnail(client.user.avatarURL())
            .setTimestamp()

            await message.reply({ content: `✅ kicked ${user} Reason: ${reason}` })

        } else {
            const Failed = new EmbedBuilder()
            .setDescription(`Failed to kick **${user}**!`)
            .setColor(client.config.embedModHard)
            message.channel.send({ content: `Failed to kick **${user}**!`, ephemeral: true}).catch(err => {
                return;
            });
        }
    }
}