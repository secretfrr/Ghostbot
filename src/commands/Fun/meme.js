const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const ms = require("ms");

module.exports = {
    Cooldown: ms("5s"),
    usableInDms: true,
    category: "Fun",
  data: new SlashCommandBuilder()
    .setName("meme")
    .setDescription("Get a random meme."),
  async execute(interaction, client) {
    const response = await fetch("https://meme-api.com/gimme");
    const data = await response.json();

    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle(data.title)
      .setImage(data.url)
      .setFooter({ text: `From r/${data.subreddit}` });

    await interaction.reply({ embeds: [embed] });
  },
};