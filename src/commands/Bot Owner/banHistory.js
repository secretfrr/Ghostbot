const { SlashCommandBuilder, EmbedBuilder, MessageFlags, PermissionFlagsBits } = require('discord.js');

module.exports = {
    usableInDms: true,
    category: "Owner",
    permissions: [PermissionFlagsBits.Administrator],
    data: new SlashCommandBuilder()
    .setName('ban-history')
    .setDescription('Get a users ban history across all guilds')
    .addUserOption(option => option.setName('user').setDescription('The user to check').setRequired(true)),
    async execute (interaction, client) {

        const { options } = interaction;
        const user = options.getUser('user');

        await interaction.deferReply({ flags: MessageFlags.Ephemeral });

        async function sendMessage (message) {
            const embed = new EmbedBuilder()
            .setColor("Blurple")
            .setDescription(message);

            await interaction.editReply({ embeds: [embed] });
        }

        var guilds = await client.guilds.fetch();
        var banString = ``;

        for (const [id, guild] of guilds) {
            try {
                var fetchedGuild = await client.guilds.fetch(id);
                const bans = await fetchedGuild.bans.fetch();
    
                var fetchedBan = bans.get(user.id);
                if (fetchedBan) banString += `> Guild: ${fetchedBan.guild.id}\n> Ban Reason: \`${fetchedBan.reason}\`\n\n`;
            } catch (e) {
                console.log(e);
            }
        }

        if (banString.length == 0) {
            await sendMessage(`🌍 \`${user.username}\` is not banned in any of my servers!`);
        } else {
            await sendMessage(`⚠️ ${user.username} (\`${user.id}\`) has ban history: \n\n${banString}`);
        }

    }
}