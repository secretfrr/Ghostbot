const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'dad-joke',
    aliases: ['dadjoke', 'dadj', 'dadjokes'],
    description: 'Get a random dad joke',
    usage: 'dad-joke',
    category: 'Fun',
    usableInDms: true,
    async execute(message, client, args) {

        const response = await fetch("https://icanhazdadjoke.com/", {
            headers: {
                Accept: "application/json",
            },
        });

        if (!response.ok) { return message.channel.send({ content: `An **error occurred** while attempting to fetch a dad joke. Please try again later.` })}

        const data = await response.json();

        const jokeEmbed = new EmbedBuilder()
        .setAuthor({ name: `${client.user.username}`})
        .setDescription(`> ${data.joke}`)
        .setColor(client.config.embedCommunity)
        .setFooter({ text: `Joke ID: ${data.id}` })
        .setThumbnail(client.user.avatarURL())
        .setTimestamp();

        message.channel.send({ embeds: [jokeEmbed] });
    }
}