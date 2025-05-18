const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'banner',
    description: 'Get a users server/main banner',
    aliases: ["banner"],
    async execute (message, client, args) {
        
        let user, embed;

        switch (args[0]) {
            case 'get':
                user = message.guild.members.cache.get(args[1]) || message.mentions.members.first() || message.member;
                embed = new EmbedBuilder()
                .setTitle('Server Banner')
                .setImage(user.bannerURL({ size: 4096 }))
                .setAuthor({ name: `${user.user.tag}`, iconURL: user.bannerURL() })
                .setTimestamp()
                message.channel.send({ embeds: [embed] })
            break;
            case 'guild':
                user = message.guild.members.cache.get(args[1]) || message.mentions.members.first() || message.member;
                const user2 = message.guild.members.cache.get(args[0]) || message.mentions.members.first() || message.author;
                if (user.bannerURL() == user2.bannerURL()) return message.channel.send({ embeds: [new EmbedBuilder().setColor(client.config.embedError).setDescription(`<:error:1205124558638813194> does not have a server banner.`)], ephemeral: true });
                embed = new EmbedBuilder()
                .setTitle('Server Banner')
                .setImage(user.bannerURL({ size: 4096 }))
                .setAuthor({ name: `${user.user.tag}`, iconURL: user.bannerURL() })
                .setTimestamp()
                message.channel.send({ embeds: [embed] })
            break;
            case 'user':
                user = message.guild.members.cache.get(args[1]) || message.mentions.members.first() || message.author;
                embed = new EmbedBuilder()
                .setTitle('User Banner')
                .setImage(user.bannerURL({ size: 4096 }))
                .setAuthor({ name: `${user.tag}`, iconURL: user.bannerURL() })
                .setTimestamp()
                message.channel.send({ embeds: [embed] })
            break;
            default:
                user = message.guild.members.cache.get(args[0]) || message.mentions.members.first() || message.member;
                embed = new EmbedBuilder()
                .setTitle('Server Banner')
                .setImage(user.bannerURL({ size: 4096 }))
                .setAuthor({ name: `${user.user.tag}`, iconURL: user.bannerURL() })
                .setTimestamp()
                message.channel.send({ embeds: [embed] })
            break;
        }
    }
}