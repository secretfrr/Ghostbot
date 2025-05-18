
const { SlashCommandBuilder, MessageFlags } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

const ALLOWED_USER_ID = '375931932036431873'; // Replace with your user ID here

module.exports = {
    data: new SlashCommandBuilder()
        .setName('announcement')
        .setDescription('Command to make an announcement in the server')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The announcement message to be sent')
                .setRequired(true)),
    async execute(interaction) {
        // Only the allowed user can use this command
        if (interaction.user.id !== ALLOWED_USER_ID) {
            return interaction.reply({ content: ':x: You do not have permission to use this command.', flags: MessageFlags.Ephemeral  });
        }

        const message = interaction.options.getString('message');
        const embed = new EmbedBuilder()
            .setColor('Red')
            .setTitle('Announcement')
            .setDescription(message)
            .setTimestamp()
            .setFooter({ text: 'Sent by the bot' });

        // Send the message to appropriate channels in all servers
        const guilds = interaction.client.guilds.cache; // Get the servers the bot is connected to

        guilds.forEach(guild => {
            const channels = guild.channels.cache;
            channels.forEach(channel => {
                // If the channel is a text channel and the bot has permission to send messages
                if (channel.isTextBased() && channel.permissionsFor(guild.members.me).has('SendMessages')) {
                    // Check the channel name
                    const channelName = channel.name.toLowerCase();
                    if (channelName.includes('announcement') || channelName.includes('announcements')) {
                        channel.send({ embeds: [embed] })
                            .then(() => console.log(`Message sent to ${channel.guild.name} - ${channel.name}`))
                            .catch(error => console.error(`Could not send message to ${channel.guild.name} - ${channel.name}:`, error));
                    }
                }
            });
        });

        // Send a success message to the user
        await interaction.reply('Announcement has been sent to all appropriate channels.');
    },
};