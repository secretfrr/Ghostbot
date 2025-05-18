const { SlashCommandBuilder, EmbedBuilder, MessageFlags, PermissionFlagsBits } = require('discord.js')

module.exports = {
    usableInDms: true,
    category: "Owner",
    permissions: [PermissionFlagsBits.Administrator],
    data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('Test command'),
    async execute(interaction, client) {

       if (interaction.user.id !== client.config.developers) {
                return await interaction.reply({ content: `${client.config.ownerOnlyCommand}`, flags: MessageFlags.Ephemeral,});
            }
        
        const embed = new EmbedBuilder()
        .setColor(client.config.embedCommunity)
        .setDescription(`Test command successful | ${client.user.username} is online!`)

        await interaction.reply({ content: `<@${interaction.user.id}>` , embeds: [embed]})
    }
}