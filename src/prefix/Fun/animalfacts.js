const { EmbedBuilder, MessageFlags } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'animalfacts',
    aliases: ['animal-facts', 'animal-fact', 'af'],
    description: 'Get a random animal fact from Reddit',
    usage: 'animalfacts',
    category: 'Community',
    usableInDms: true,
    async execute(message, client) {
        try {
            const response = await axios.get('https://www.reddit.com/r/animalfacts1935943924/random/.json');

            if (response.data && response.data[0] && response.data[0].data.children[0].data) {
                const memeData = response.data[0].data.children[0].data;
                const { url, title, ups, num_comments } = memeData;

                const embed = new EmbedBuilder()
                .setAuthor({ name: `Ghost`})
                .setColor(client.config.embedCommunity)
                .setTitle(`Animal Facts`)
                .setDescription(`**${title}**`)
                .setURL(`https://www.reddit.com${memeData.permalink}`)
                .setImage(url)
                .setFooter({ text: `👍 ${ups}  |  💬 ${num_comments || 0}` })
                .setTimestamp();

                await message.channel.send({ embeds: [embed] });
            } else {
                await message.channel.send({ content: 'Failed to fetch a meme. Try again later.', flags: MessageFlags.Ephemeral });
            }
        } catch (error) {
            await message.channel.send({ content: 'There was an error getting the meme from axios!', flags: MessageFlags.Ephemeral });
        }
    }
}