const { EmbedBuilder, PermissionFlagsBits, MessageFlags} = require("discord.js")

module.exports = {
    name: 'unban',
    aliases: ['unbanuser'],
    description: 'Unban a user from the server',
    usage: 'unban <userID> [reason]',
    category: 'Moderation',
    usableInDms: false,
    permissions: [PermissionFlagsBits.BanMembers],
    async execute(message, client, args) {
        const userID = args[0];
        const user = client.users.cache.get(userID);

        
        if (!user) return message.channel.send({ content: `You need to provide a valid **user ID** to unban!`, ephemeral: true})
        
        const reason = args.slice(1).join(' ') || '\`\`No reason provided\`\`'

        const embed = new EmbedBuilder()
        .setColor(client.config.embedModHard)
        .addFields({ name: 'User', value: `> ${user.tag}`, inline: true})
        .addFields({ name: 'Reason', value: `> ${reason}`, inline: true})
        .setTimestamp()
        .setThumbnail(client.user.avatarURL())
    
        const bans = await message.guild.bans.fetch();

        if (bans.size == 0) return await message.channel.send({ content: 'There is **no one** to unban.', ephemeral: true})
        let bannedUser = bans.find(ban => ban.user.id == userID);
        if (!bannedUser) return await message.channel.send({ content: 'That user **is not** banned.', ephemeral: true})

        await message.guild.bans.remove(user, reason).catch(err => {
            return message.channel.send({ content: `**Couldn't** unban user specified!`, ephemeral: true})
        })

        await message.channel.send({ embeds: [embed] });
    }
}