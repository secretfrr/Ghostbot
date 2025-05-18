const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'meme',
    aliases: ['meme'],
    description: 'Get a meme',
    usage: 'meme',
    category: 'Fun',
    usableInDms: true,
    async execute(message, client, args) {


const response = await fetch("https://meme-api.com/gimme");
    const data = await response.json();

    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle(data.title)
      .setImage(data.url)
      .setFooter({ text: `From r/${data.subreddit}` });
        
        await message.reply({ embeds: [embed]})
        
    }
}