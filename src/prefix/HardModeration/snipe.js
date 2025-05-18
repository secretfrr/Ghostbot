const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    cooldowns: true,
    name: 'snipe',
    aliases: ['s'],
    description: 'Snipe a last deleted message',
    usage: 'snipe',
    category: 'Moderation',
    usableInDms: false,
    permissions: [PermissionFlagsBits.Administrator],
    async execute(message, client, args) {
         const msg = client.snipes.get(message.channel.id);
        if (!msg) return await message.reply({ content: `** I cannot find any deleted messages!**`, ephemeral: true });
        
        const ID = msg.author.id;
        const member = message.guild.members.cache.get(ID)
        const URL = member.displayAvatarURL();
        
        const embed = new EmbedBuilder()
        .setColor('Purple')
        .setTitle(`snipe: (${member.user.tag})`)
        .setDescription(`${msg.content}`)
        .setTimestamp()
        .setFooter({ text: `Member ID: ${ID}`, iconURL: `${URL}`})
        
        if (msg.image) embed.setImage(msg.image)
        await message.reply({ embeds: [embed] });
    }
}