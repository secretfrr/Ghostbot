const { Events, EmbedBuilder } = require('discord.js');
const deletemsglog = require('../../schemas/deletemsglog');

module.exports = {
    name: Events.MessageDelete,
    async execute(message, client) {
        if(!message.guild || !message.author || message.author.bot || !message) return;

        const data = await deletemsglog.findOne({ Guild: message.guild.id })
        if(!data) return

        const sendChannel = await message.guild.channels.fetch(data.Channel)
        const attachment = await message.attachments.map(attachment => attachment.url)

        const embed = new EmbedBuilder()
        .setColor('Blurple')
        .setTitle('New Message Deleted')
        .setDescription(`This message was deleted <t:${Math.floor(Date.now() / 1000)}:R> and is being logged for moderation purposes`)
        .setFields(
            { name: 'Message Content', value: `> ${message.content || 'No Message Provided'}`},
            { name: 'Message Author', value: `> ${message.author.username } (${message.author.id})`},
            { name: 'Message Channel', value: `> ${message.channel}(${message.channel.id})`}
        )
        .setFooter({ text: 'Message Deleted Log System'})
        .setTimestamp()

        if(attachment.length > 0) {
            embed.addFields({ name: 'Message Attachments', value: `> ${attachment.join(' , ')}`})
        }

        await sendChannel.send({ embeds: [embed]})
    }
}