const { SlashCommandBuilder, EmbedBuilder }  = require("discord.js");

module.exports = {
    usableInDms: true,
    data: new SlashCommandBuilder()
    .setName('ghostsupport')
    .setDescription('Ghosts Support Server'),

    async execute (interaction) {
        await interaction.reply({ content: `https://discord.gg/tYvw4RHC8w` });
      }
}