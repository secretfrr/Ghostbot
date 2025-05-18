const { Events, EmbedBuilder } = require('discord.js');
const sticky = require('../../schemas/stickyMessageSystem');

module.exports = {
    name: Events.MessageCreate,
    async execute (message, client) {

        if (!message.guild || !message.channel) return;

        var data = await sticky.find({ Guild: message.guild.id, Channel: message.channel.id});
        if (data.length == 0) return;
        if (message.author.bot) return;

        await data.forEach(async value => {
            if (value.Count == value.Cap-1) {

                const embed = new EmbedBuilder()
                .setColor('Purple')
                .setDescription(`> ${value.Message}`)
                .setTimestamp();

                await message.channel.send({ embeds: [embed] });
                value.Count = 0;
                await value.save();
            } else {
                value.Count++;
                await value.save();
            }
        })
    }
}