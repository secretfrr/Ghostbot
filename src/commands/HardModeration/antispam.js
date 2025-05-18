const { SlashCommandBuilder, PermissionFlagsBits, PermissionBitsField } = require('@discordjs/builders');
const { CommandInteraction, MessageEmbed, EmbedBuilder } = require('discord.js');
const AntiSpam = require('../../schemas/AntiSpamSchema');

module.exports = {
    usableInDms: false,
    category: "Utility",
  
    data: new SlashCommandBuilder()
        .setName('setup-antispam')
        .setDescription('Configure the anti-spam system for your server')
        .addSubcommand(subcommand =>
            subcommand
                .setName('status')
                .setDescription('Enable or disable the anti-spam system')
                .addBooleanOption(option => option.setName('enabled').setDescription('Enable or disable the system').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('set-limit')
                .setDescription('Set limits for anti-spam system')
                .addStringOption(option => option.setName('type').setDescription('Type of limit').setRequired(true)
                    .addChoices(
                        { name: 'Spam Message Limit', value: 'MaxSpamMessageLimit' },
                        { name: 'Mentions Limit', value: 'MaxMentionsLimit' },
                        { name: 'Links Limit', value: 'MaxLinksLimit' },
                        { name: 'Caps Limit', value: 'MaxCapsLimit' }
                    ))
                .addIntegerOption(option => option.setName('limit').setDescription('Set the limit').setRequired(true))
                .addStringOption(option => option.setName('action').setDescription('Action to take').setRequired(true)
                    .addChoices(
                        { name: 'Kick', value: 'kick' },
                        { name: 'Ban', value: 'ban' },
                        { name: 'Warn', value: 'warn' },
                        { name: 'Mute', value: 'mute' }
                    ))),

    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();
        const guildId = interaction.guild.id;

        if (subcommand === 'status') {
            const enabled = interaction.options.getBoolean('enabled');

            await AntiSpam.findOneAndUpdate(
                { guildId },
                { $set: { status: enabled } },
                { upsert: true, new: true }
            );

            const statusEmbed = new EmbedBuilder()
                .setTitle('Anti-Spam System Status')
                .setDescription(`The anti-spam system has been ${enabled ? 'enabled' : 'disabled'}.`)
                .setColor(enabled ? '#00FF00' : '#FF0000')
                .setFooter({ text: 'Anti-Spam Setup', iconURL: interaction.guild.iconURL() });

            return interaction.reply({ embeds: [statusEmbed], ephemeral: true });
        } else if (subcommand === 'set-limit') {
            const type = interaction.options.getString('type');
            const limit = interaction.options.getInteger('limit');
            const action = interaction.options.getString('action');

            const updateData = {};
            updateData[`punishments.${type}.limit`] = limit;
            updateData[`punishments.${type}.action`] = action;

            await AntiSpam.findOneAndUpdate(
                { guildId },
                { $set: updateData },
                { upsert: true, new: true }
            );

            const limitEmbed = new EmbedBuilder()
                .setTitle('Anti-Spam System Configuration')
                .setDescription(`The limit for **${type}** has been set to **${limit}**. The action to be taken is **${action}**.`)
                .setColor('#3498DB')
                .setFooter({ text: 'Anti-Spam Setup', iconURL: interaction.guild.iconURL() });

            return interaction.reply({ embeds: [limitEmbed], ephemeral: true });
        }
    }
};
