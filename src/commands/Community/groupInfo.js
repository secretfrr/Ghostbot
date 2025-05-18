const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const noblox = require('noblox.js');

module.exports = {
    usableInDms: true,
    category: ['Fun'],
  data: new SlashCommandBuilder()
    .setName('groupinfo')
    .setDescription('Fetches information about a Roblox group')
    .addIntegerOption(option => 
      option.setName('groupid')
        .setDescription('The Roblox group ID to fetch information for')
        .setRequired(true)
        
    ),
  async execute(interaction) {
    const groupId = interaction.options.getInteger('groupid');

    try {
      const groupInfo = await noblox.getGroup(groupId);

      const embed = new EmbedBuilder()
        .setColor('#1E90FF')
        .setTitle(`🏢 Group Info: ${groupInfo.name}`)
        .setURL(`https://www.roblox.com/groups/${groupId}`)
        .setThumbnail(groupInfo.emblemUrl)
        .addFields(
          { name: '📛 Name', value: groupInfo.name, inline: true },
          { name: '🆔 Group ID', value: groupId.toString(), inline: true },
          { name: '📝 Description', value: groupInfo.description || 'No description', inline: false },
          { name: '👥 Member Count', value: groupInfo.memberCount.toString(), inline: true },
          { name: '🔗 Owner', value: `[${groupInfo.owner.username}](https://www.roblox.com/users/${groupInfo.owner.userId}/profile)`, inline: true }
        )
        .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel('🔗 View Group')
          .setURL(`https://www.roblox.com/groups/${groupId}`)
          .setStyle(ButtonStyle.Link)
      );

      await interaction.reply({ embeds: [embed], components: [row] });
    } catch (error) {
      console.error(error);
      await interaction.reply(`An error occurred while fetching the group information: ${error.message}`);
    }
  },
};