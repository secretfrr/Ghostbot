const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    usableInDms: true,
    category: ['Owner'],
    data: new SlashCommandBuilder()
    .setName("leave-guild")
    .setDescription("make the bot leave a server")
    .addStringOption(option =>
      option.setName("guildid")
          .setDescription("guildid")
          .setRequired(true)
    ),
                   
                    async execute(interaction, client) {

                      if(interaction.member.id !== '375931932036431873') return interaction.reply({ content: 'this command is locked under the owner', flags: MessageFlags.Ephemeral})

                      interaction.reply({content:'the bot has left the server'})

                      const guildid = interaction.options.getString("guildid");

                      const guild = client.guilds.cache.get(guildid)

                      guild.leave().catch(() => {
                    return false;
                    });

                    }
}