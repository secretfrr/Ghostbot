
const { EmbedBuilder } = require('discord.js'); 

module.exports = {
    name: 'ping',
    aliases: ['latency'],
    description: 'Check the bot latency',
    usage: 'ping',
    category: 'Community',
    usableInDms: true,
    async execute(message, client) {

        const embed = new EmbedBuilder()
        .setAuthor({ name: `${client.user.username}`})
        .setDescription(`> Pong! ${client.ws.ping}ms`)
        .setColor(client.config.embedCommunity)
        .setFooter({ text: `Requested by ${message.author.username}`, iconURL: message.author.avatarURL() })
        .setTimestamp()

        message.channel.send({ embeds: [embed] });
    }
}