const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    usableInDms: false,
    category: "Moderation",
    permissions: [PermissionFlagsBits.ManageMessages],
    data: new SlashCommandBuilder()
    .setName('purge')
    .setDescription("Purge a specific amount of messages")
    .addNumberOption(option => option.setName('amount').setDescription(`the amount of messages to be deleted`).setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

    async execute (interaction) {
        const GivenAmount = interaction.options.get('amount');
        const AmountToDelete = Math.min(parseInt(GivenAmount, 10) || 0, 100);

        try {
            const FetchedMessages = await interaction.channel.messages.fetch({ limit: AmountToDelete });
            const DeletedMessages = await interaction.channel.bulkDelete(FetchedMessages, true);
        
            const DeletedResults = DeletedMessages.reduce((a, b) => {
                const SelectedUser = b.author.discriminator === '0' ? b.author.username : `${b.author.username}#${b.author.discriminator}`;
                a[SelectedUser] = (a[SelectedUser] || 0) + 1;
                return a;
            }, {});
        
            await interaction.reply({ content: `${DeletedMessages.size} message${DeletedMessages.size > 1 ? 's' : ''} were purged.\n\n${Object.entries(DeletedResults).map(([User, Messages]) => `__**${User}**__・${Messages}`).join('\n')}`, ephemeral: true });
        } catch (err) {
            console.log(err)
        }
    }
}