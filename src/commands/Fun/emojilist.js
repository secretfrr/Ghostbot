const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    voteRequired: true,
    usableInDms: false,
    category: "Utility",
    data: new SlashCommandBuilder()
    .setName('emojilist')
    .setDescription('List the server emojis'),
    async execute (interaction) {

        async function chunkArray(array, size) {
            let chunks = [];
            for (let i = 0; i < array.length; i+= size) {
                const chunk = array.slice(i, i + size);
                chunks.push(chunk);
            }

            return chunks;
        }

        async function send (chunked) {
            var intResponse;
            await chunked.forEach(async emoji => {
                if (intResponse == 1) {
                   const  embed = new EmbedBuilder()
                    .setDescription(emoji.join(' ')).setTitle(' ');
                    await interaction.channel.send({ embeds: [embed] });
                } else {
                    intResponse = 1;
                    var total = cache.size;
                    var animated = cache.filter(emoji => emoji.animated).size;
                                       const  embed = new EmbedBuilder()
                    .setTitle(`${total - animated} Regular, ${animated} Animated, ${total} Total`)
                    .setDescription(emoji.join(' '));

                    await interaction.reply({ embeds: [embed] });
                }
            });
        }

        var emojis = [];
        var cache = await interaction.guild.emojis.fetch();

        await cache.forEach(async emoji => {
            if (emoji.animated) {
                emojis.push(`<a:${emoji.name}:${emoji.id}>`);
            } else {
                emojis.push(`<:${emoji.name}:${emoji.id}>`)
            }
        });

        var chunked = await chunkArray(emojis, 50);

        const embed = new EmbedBuilder()
        .setColor("Blurple")

        var redo;
        await chunked.forEach(async chunk => {
            if (chunk.join(' ').length > 2000) redo = true;
            else redo = false;
        });

        console.log(redo)

        if (redo) {
            var newChunk = await chunkArray(emojis, 20);
            send(newChunk);
        } else {
            send(chunked);
        }


    }
}