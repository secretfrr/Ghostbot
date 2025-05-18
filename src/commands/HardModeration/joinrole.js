const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, PermissionFlagsBits } = require('discord.js');


const joinrole = require('../../schemas/joinrole');

module.exports = {
    usableInDms: false,
    category: "Utility",
    permissions: [PermissionFlagsBits.Administrator],
    data: new SlashCommandBuilder()
    .setName('joinrole')
    .setDescription('Setup auto role system for your server.')
    .addRoleOption(option => option.setName('role').setDescription('The role to be given when someone joining the server.').setRequired(true)),
    async execute (interaction) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: "You do not have permissions to run this command." });


        const role = interaction.options.getRole('role');


        joinrole.findOne({ Guild: interaction.guild.id}, async (err, data) => {
            if (err) throw err;

            if (!data) {
                joinrole.create({
                    Guild: interaction.guild.id,
                    RoleID: role.id,
                    RoleName: role.name
                })

                const embed = new EmbedBuilder()
                .setColor('#00c7fe')
                .setDescription(`${role} has been successfully set as a join role.`)
                .setFooter({ text: `${interaction.guild.name}` })
                .setTimestamp()

                return interaction.reply({ embeds: [embed] });

            } else {
                await interaction.reply({ content: 'Join Role has already been set up.'})
            }
        })
    }
}