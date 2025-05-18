const {SlashCommandBuilder, PermissionsBitField, EmbedBuilder, ChannelType, PermissionFlagsBits, MessageFlags } = require('discord.js');
const logSchema = require("../../schemas/auditLoggingSystem");

module.exports = {
    usableInDms: false,
    category: "Moderation",
    data: new SlashCommandBuilder()
    .setName("logs")
    .setDescription("Configure your logging system.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addSubcommand(command => command.setName('setup').setDescription('Sets up your logging system.').addChannelOption(option => option.setName("channel").setDescription("Specified channel will receive logs.").setRequired(false).addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement)))
    .addSubcommand(command => command.setName('disable').setDescription('Disables your logging system.')),
    async execute(interaction, client) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: `${client.config.noPerms}`, flags: MessageFlags.Ephemeral});

        const sub = await interaction.options.getSubcommand();
        const data = await logSchema.findOne({ Guild: interaction.guild.id });

        switch (sub) {
            case 'setup':

            if (data) return await interaction.reply({ content: `You have **already** set up the logging system! \n> Do **/logs disable** to undo.`, flags: MessageFlags.Ephemeral});
            else {

                const logchannel = interaction.options.getChannel("channel") || interaction.channel;

                const setupEmbed = new EmbedBuilder()
                .setTitle(`${client.user.username} Logging system`)
                .setColor(client.config.embedAuditLogs)
                .setDescription(`Logging system in **${interaction.guild.name}** has been enabled!`)
                .setTimestamp()
                .setAuthor({ name: `Ghost`})
                .setFooter({ text: ` https://discord.gg/ghostt`})
                .setThumbnail(client.user.avatarURL())
                .addFields({ name: `Logging was Enabled`, value: `> Your logging system has been set up successfully. Your channel **${logchannel}** will now receive alerts for actions taken in your server!`})

                await interaction.reply({ embeds: [setupEmbed] });

                await logSchema.create({
                    Guild: interaction.guild.id,
                    Channel: logchannel.id
                })
            }

            break;
            case 'disable':

            if (!data) return await interaction.reply({ content: `You have **not** set up the logging system! Do \`/logs setup\` to set it up.`, flags: MessageFlags.Ephemeral});
            else {

                const disableEmbed = new EmbedBuilder()
                .setTitle(`Logging system`)
                .setThumbnail(client.user.avatarURL())
                .setDescription(`Logging system in **${interaction.guild.name}** has been disabled!`)
                .setColor(client.config.embedAuditLogs)
                .setTimestamp()
                .setAuthor({ name: `Logging System`})
                .setFooter({ text: `https://discord.gg/ghostt`})
                .addFields({ name: `Logging was Disabled`, value: `> Your logging system has been disabled successfully. Your logging channel will no longer receive alerts for actions taken in your server!`})

                await interaction.reply({ embeds: [disableEmbed] });

                await logSchema.deleteMany({ Guild: interaction.guild.id })
            }
        }          
    }
}