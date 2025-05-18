const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    usableInDms: true,
    category: ['Owner'],
    data: new SlashCommandBuilder()
    .setName("presence")
    .setDescription("Change Ghosts presence")
    .addStringOption(option => option
        .setName("type")
        .setDescription("The presence type")
        .addChoices(
            {name: "• 🌙 Idle", value: "idle"},
            {name: "• 🟢 Online", value: "online"},
            {name: "• ⭕ DND", value: "dnd"},
            {name: "• 👀 Invisible", value: "invisible"}
        )
        .setRequired(true)
    ),

    async execute (interaction, client) {
        const {user, options} = interaction;
        const presence = options.getString("type");
        if (!process.env.devid.includes(user.id)) {
            await interaction.reply({
                content: `Error: \`Cannot set presence to ${presence}\` because you are not the bot owner!`,
                flags: MessageFlags.Ephemeral
            })
        }

        const embed = new EmbedBuilder()
        .setTitle("Presence")
        .setDescription(`Successfully set presence to **${presence}**!`)
        .setColor('Purple')

        await client.user.setStatus(presence);

        return await interaction.reply({
            embeds: [embed]
        })
    }
}