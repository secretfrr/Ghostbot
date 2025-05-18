const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const MassJoinProtection = require('../../schemas/AntiRaidSchema');

module.exports = {
    usableInDms: false,
    category: "Utility",
    permissions: [PermissionFlagsBits.Administrator],
    data: new SlashCommandBuilder()
        .setName('anti-raid')
        .setDescription('Manage anti-raid settings for the server')
        .addSubcommand(subcommand =>
            subcommand
                .setName('set-punishment')
                .setDescription('Set the punishment for mass join raids')
                .addStringOption(option =>
                    option
                        .setName('punishment')
                        .setDescription('Select a punishment')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Mute', value: 'mute' },
                            { name: 'Kick', value: 'kick' },
                            { name: 'Ban', value: 'ban' },
                            { name: 'Lock Channels', value: 'lockChannels' },
                            { name: 'Hide Channels', value: 'hideChannels' }
                        )
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('set-timelimit')
                .setDescription('Set the time limit for detecting mass joins')
                .addIntegerOption(option =>
                    option
                        .setName('minutes')
                        .setDescription('Time limit in minutes')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('set-joinlimit')
                .setDescription('Set the join limit for triggering anti-raid')
                .addIntegerOption(option =>
                    option
                        .setName('limit')
                        .setDescription('Number of joins within the time limit')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('toggle')
                .setDescription('Enable or disable the anti-raid system')
                .addBooleanOption(option =>
                    option
                        .setName('enabled')
                        .setDescription('Enable or disable the anti-raid system')
                        .setRequired(true)
                )
        ),
    async execute(interaction) {
        const guildId = interaction.guild.id;
        const subcommand = interaction.options.getSubcommand();

        let responseEmbed = new EmbedBuilder()
            .setColor('Blue')
            .setTitle('Anti-Raid System Updated')
            .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });

        try {
            let protection = await MassJoinProtection.findOne({ guildId });

            if (!protection) {
                protection = new MassJoinProtection({ guildId });
            }

            if (subcommand === 'set-punishment') {
                const punishment = interaction.options.getString('punishment');
                protection.punishment = punishment;
                responseEmbed.setDescription(`Punishment set to **${punishment}**.`);
            }

            if (subcommand === 'set-timelimit') {
                const timeLimit = interaction.options.getInteger('minutes');
                protection.timeLimit = timeLimit;
                responseEmbed.setDescription(`Time limit set to **${timeLimit} minutes**.`);
            }

            if (subcommand === 'set-joinlimit') {
                const joinLimit = interaction.options.getInteger('limit');
                protection.massJoinLimit = joinLimit;
                responseEmbed.setDescription(`Join limit set to **${joinLimit} joins**.`);
            }

            if (subcommand === 'toggle') {
                const isEnabled = interaction.options.getBoolean('enabled');
                protection.isEnabled = isEnabled;
                responseEmbed.setDescription(`Anti-Raid system is now **${isEnabled ? 'enabled' : 'disabled'}**.`);
            }

            await protection.save();
            interaction.reply({ embeds: [responseEmbed] });

        } catch (error) {
            console.error('Error updating anti-raid settings:', error);
            interaction.reply({ content: 'There was an error while updating the anti-raid settings. Please try again later.', ephemeral: true });
        }
    }
};