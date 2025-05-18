const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    usableInDms: true,
    category: "Owner",
    permissions: [PermissionFlagsBits.Administrator],
    data: new SlashCommandBuilder()
    .setName('direct-message')
    .setDescription('Messages a user, only available for the owner of the bot.')
    .addStringOption(option => option.setName('message').setDescription('Specified message will be sent to specified user.').setRequired(true))
    .addUserOption(option => option.setName('user').setDescription('Specified user will be sent the specified message.').setRequired(true)),
    async execute(interaction, client) {
        
        if (interaction.user.id !== client.config.developers) {
                return await interaction.reply({ content: `${client.config.ownerOnlyCommand}`, flags: MessageFlags.Ephemeral,});
            }

        const user = interaction.options.getUser('user');
        const message = interaction.options.getString('message');
        
 

            const embed = new EmbedBuilder()
            .setAuthor({ name: `Ghost` })
            .setColor(client.config.embedDev)
            .setDescription(`> Your message has been sent to **${user}**`)
            .setFooter({ text: `Message sent!` })
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp();
        
            interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral })
        } 
     }