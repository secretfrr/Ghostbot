const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');


const joinrole = require('../../schemas/joinrole');

module.exports = {
    usableInDms: true,
    category: ['Moderation'],
    data: new SlashCommandBuilder()
        .setName('joinrole_disable')
        .setDescription('Disable auto role system for your server.'),
    async execute(interaction) {

        const data = await joinrole.findOne({ Guild: interaction.guild.id });

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: "You do not have permissions to run this command." });

        if (!data) {
            return await interaction.reply({ content: 'No Join Role has been set.'})
        } else {
            joinrole.deleteMany({ Guild: interaction.guild.id}, async (err, data) => {
                if (err) throw err;

                const embed = new EmbedBuilder()
                .setColor('#00c7fe')
                .setDescription(`Successfully disabled **auto roles** in this server.`)
                .setFooter({ text: `${interaction.guild.name}` })
                .setTimestamp()

                return interaction.reply({ embeds: [embed] })
            })
        }


    }
}