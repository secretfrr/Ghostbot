const { SlashCommandBuilder, ChannelType, EmbedBuilder } = require('discord.js');
const deletemsglog = require('../../schemas/deletemsglog');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('delete-message-log')
        .setDescription('Delete message log')
        .addSubcommand(
            option => option
            .setName('setup')
            .setDescription('setup the delete message log system')
            .addChannelOption(
                option => option
                .setName('channel')
                .setDescription('The channel to log deleted message into')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true)
            )
        )
        .addSubcommand(
            option => option
            .setName('disable')
            .setDescription('Disable the deleted message log system')
        ),
    async execute(interaction, client) {
        const sub = interaction.options.getSubcommand()
        const data = await deletemsglog.findOne({ Guild: interaction.guild.id })

        async function sendMessage(message) {
            const embed = new EmbedBuilder()
            .setColor('Blurple')
            .setDescription(message)

            await interaction.reply({ embeds: [embed], ephemeral: true })
        }

        if(sub == 'setup') {
            if(data) {
                await sendMessage(`Looks like you already have this system setup`)
            } else {
                const channel = interaction.options.getChannel('channel')
                await deletemsglog.create({
                    Guild: interaction.guild.id,
                    Channel: channel.id
                })

                await sendMessage(`I have setup the deleted message logging system in ${channel}`)
            }
        }
        if(sub == 'disable') {
            if(!data) {
                await sendMessage(`this system has yet to be setup`)
            } else {
                await deletemsglog.deleteOne({ Guild: interaction.guild.id })
                await sendMessage('I have disabled your deleted message logging system')
            }
        }
    }
}