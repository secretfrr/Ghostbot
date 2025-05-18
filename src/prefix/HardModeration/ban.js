const { EmbedBuilder, PermissionsBitField, PermissionFlagsBits } = require("discord.js")

module.exports = {
    name: 'ban',
    aliases: ['banish'],
    description: 'Ban a user from the server',
    usage: 'ban <user> [reason]',
    category: 'Moderation',
    usableInDms: false,
    permissions: [PermissionFlagsBits.BanMembers],
    async execute(message, client, args) {
        
        const guild = message.guild;
        
        const userId = args[0];
 const member = guild.members.cache.get(userId) || message.guild.members.cache.get(args[1]) || message.mentions.members.first()

 
        
        if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return await message.channel.send({ content: `${client.config.noPerms}`, ephemeral: true});
        if (!member) return message.channel.send({ content: `<:HR_info:1296207717253386392> Please provide a valid userid or mention them.`, ephemeral: true})
        const reason = args.slice(1).join(' ') || '\`\`No reason provided\`\`'

        if (member.bannable) {
            await message.react('✅')

            const dmEmbed = new EmbedBuilder()
            .setAuthor({ name: `Ghost` })
            .setColor('Purple')
           
            .setDescription(`\n <@${userId}>, \n \`You have been banned from ${message.channel.guild}\` \n \n \n **Reason:** \n ${reason} \n \n **Staff Member:** \n ${message.member} | (<@${message.member.id}>:${message.member.id}) \n`)
            .setTimestamp()
            .setThumbnail(client.user.avatarURL())
            .setFooter({ text: `Banned - ${message.channel.guild}` });

            member.send({ embeds: [dmEmbed] }).catch((err) => { return client.logs.error('[BAN] Failed to DM user.') });
            member.ban({ reason: reason })

         


        } else { 
            const Failed = new EmbedBuilder()
            .setDescription(`Failed to ban **${userId}**!`)
            .setColor('Purple')
            message.channel.send({ embeds: [Failed], ephemeral: true}).catch(err => {
                return;
            });
        }
    }
}