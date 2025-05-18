const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    underDevelopment: true,
    
  data: new SlashCommandBuilder()
    .setName('maintenance')
    .setDescription('Toggle maintenance mode.')
    .addBooleanOption(option =>
      option.setName('enabled').setDescription('Enable or disable maintenance mode.')
    ),
  async execute(interaction) {
    const enabled = interaction.options.getBoolean('enabled');
    const config = require('../../config.js')

    config.maintenance = enabled;
    
    return interaction.reply(`Maintenance mode is now ${enabled ? 'enabled' : 'disabled'}.`);
  },
};