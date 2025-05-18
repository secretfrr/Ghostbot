const { SlashCommandBuilder, EmbedBuilder, ChannelType, PermissionFlagsBits, version } = require('discord.js');

module.exports = {
    usableInDms: true,
    category: "Utility",
    data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription(`Get someones Avatar.`)
    .addUserOption(option => option.setName(`user`).setDescription(`Select a user`).setRequired(false)),
    async execute (interaction, client) {

        const userMention = interaction.options.getUser(`user`) || interaction.user;
        
        const embed = new EmbedBuilder()
.setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}`})
        .setTitle(`Avatar of ${userMention.tag}`)
        .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 512 })}`})
      .setURL(userMention.displayAvatarURL({ size: 1024, format: `png`, dynamic: true}))     .setImage(userMention.displayAvatarURL({ size: 1024, format: "png", dynamic: true }))

     const message = await interaction.reply({ embeds: [embed] });
        
        
    }
}