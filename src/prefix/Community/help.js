const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ['h', 'cmd', 'command'],
    Category: ['Info'],
    async execute(message, client, args) {

        message.channel.send({
            embeds: [
                new EmbedBuilder()
                .setTitle(`Ghost **prefix** commands | **My prefix**: \`\`${client.config.prefix}\`\``)
                .setDescription(client.pcommands.map(cmd => `> ${cmd.name}`).join('\n'))
                .setColor('Purple')
                .setFooter({ text: `Watching over ${client.pcommands.size} commands.`})
                .setTimestamp()
            ]
        });
    },
};