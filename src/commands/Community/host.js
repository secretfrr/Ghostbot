const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const os = require("os");

module.exports = {
    adminOnly: true,
  data: new SlashCommandBuilder()
    .setName("host")
    .setDescription("Gives information about Ghosts host!")
    .setDMPermission(false),

  async execute(interaction, client) {
    const infoEmbed = new EmbedBuilder()
      .setColor("Blurple")
      .setDescription(`**Ghosts Host Information:**`)
      .addFields(
        {
          name: `Platform:`,
          value: `${os.platform()}`,
        },
        {
          name: `OS Version:`,
          value: `${os.release()}`,
        },
        {
          name: `CPU:`,
          value: os.cpus()[0].model,
        },
        {
          name: "CPU Cores:",
          value: `${os.cpus().length / 2}`,
        },
        {
          name: "Total RAM:",
          value: `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
        },
        {
          name: "Storage Used:",
          value: `${(
            (os.totalmem() - os.freemem()) /
            1024 /
            1024 /
            1024
          ).toFixed(2)} GB`,
        }
      );

    return await interaction.reply({ embeds: [infoEmbed] });
  },
};
