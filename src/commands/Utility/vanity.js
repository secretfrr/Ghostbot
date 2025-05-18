const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const Vanity = require('../../schemas/vanitySchema'); // Set the appropriate location for the schema file

module.exports = {
    category: ['Utility'],
    permissions: [PermissionFlagsBits.ManageServer],
    data: new SlashCommandBuilder()
        .setName('vanity')
        .setDescription('Set vanity URL, channel for messages, and role for users with the vanity URL in their status.')
        .addStringOption(option =>
            option.setName('vanity')
                .setDescription('The vanity URL to check for (e.g., .gg/yourserver).')
                .setRequired(true))
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel where the message will be sent.')
                .setRequired(true))
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('The role to assign to the user.')
                .setRequired(true)),

    async execute(interaction) {
        const vanity = interaction.options.getString('vanity');
        const channel = interaction.options.getChannel('channel');
        const role = interaction.options.getRole('role');
        const guildId = interaction.guild.id;

        // MongoDB Data for vanity
        let settings = await Vanity.findOne({ guildId });
        if (settings) {
            settings.vanity = vanity;
            settings.channelId = channel.id;
            settings.roleId = role.id;
        } else {
            settings = new Vanity({
                guildId,
                vanity,
                channelId: channel.id,
                roleId: role.id,
            });
        }

        await settings.save();

        await interaction.reply({ content: 'Vanity URL, channel, and role have been set.', ephemeral: true });
        
        // You can change the content of the message to whatever you want, you can even add an embed. As you like.
    }
};
