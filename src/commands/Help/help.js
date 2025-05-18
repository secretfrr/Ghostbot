const { SlashCommandBuilder, StringSelectMenuBuilder, ButtonStyle, ButtonBuilder, EmbedBuilder, ActionRowBuilder, MessageFlags, Collection } = require('discord.js');
const guildSettingsSchema = require('../../schemas/prefixSystem.js');
const { getSlashCommandsByCategory, getPrefixCommandsByCategory, getCategoryEmoji } = require('../../utils/helpCommandUtils.js');

module.exports = {
    usableInDms: false,
    category: "Info",
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Cannot find what you were wishing to? Check this out!')
    .addSubcommand(command => command.setName('server').setDescription('Join our official support server for Ghost!'))
    .addSubcommand(command => command.setName('manual').setDescription('Get some information on our bot commands and plans.')),
    async execute(interaction, client) {
        const sub = interaction.options.getSubcommand();

        switch (sub) {
            case 'server':
                const button = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setLabel('Support Server')
                    .setEmoji('🔗')
                    .setStyle(ButtonStyle.Link)
                    .setURL("https://discord.gg/tYvw4RHC8w")
                );
            
                const embedHelpServer = new EmbedBuilder()
                .setColor(client.config.embedColor)
                .setTitle(`${client.user.username} Help Center`)
                .setFooter({ text: `🚑 ${client.user.username}'s support server`})
                .setTimestamp()
                .setAuthor({ name: `🚑 Help Command`})
                .setDescription(`> Join our official support server for ${client.user.username}! \n> Get help, report bugs, and more!`)
                .setThumbnail(client.user.avatarURL())
                .addFields({ name: `Manual link to the Discord server:`, value: `> [SERVER INVITE](https://discord.gg/tYvw4RHC8w)`});
            
                await interaction.reply({ embeds: [embedHelpServer], components: [button] });
                break;

            case 'manual':
                const slashCommandCategories = getSlashCommandsByCategory(client);
                const prefixCommandCategories = getPrefixCommandsByCategory(client);
                
                const categoryOptions = Object.keys(slashCommandCategories).map(category => {
                    return {
                        label: `${getCategoryEmoji(category)} ${category}`,
                        description: `View ${category} commands`,
                        value: category,
                        emoji: getCategoryEmoji(category)
                    };
                });
                
                categoryOptions.unshift({
                    label: '📚 Help Center',
                    description: 'Navigate to the Help Center.',
                    value: 'helpcenter',
                    emoji: '📚'
                });
                
                const categorySelectMenu = new ActionRowBuilder()
                .addComponents(
                    new StringSelectMenuBuilder()
                    .setCustomId('help_category_select')
                    .setPlaceholder('📚 Select a category')
                    .setMinValues(1)
                    .setMaxValues(1)
                    .addOptions(categoryOptions)
                );
                
                // Create button to switch to prefix command help
                const switchToPrefixRow = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('switch_to_prefix_help')
                        .setLabel('View Prefix Commands')
                        .setStyle(ButtonStyle.Primary)
                );
                
                const fetchGuildPrefix = await guildSettingsSchema.findOne({ Guild: interaction.guild.id });
                const guildPrefix = fetchGuildPrefix ? fetchGuildPrefix.Prefix : client.config.prefix;
                
                const categoryList = Object.keys(slashCommandCategories)
                    .map(cat => `${getCategoryEmoji(cat)} **${cat}**`)
                    .join(' • ');
                
                const embed = new EmbedBuilder()
                .setColor(client.config.embedColor)
               
                .setAuthor({ name: `${client.user.username}, `})
                .setFooter({ text: `${client.user.username} 2019-2025`})
                
                .addFields({ name: `📊 Commands Statistics`, value: `> Get all **Commands** (**${client.commands.size}** slash & **${client.pcommands.size}** prefix) ${client.user.username} offers!`})
                .addFields({ name: `🔤 What's my prefix?`, value: `> The prefix for **${interaction.guild.name}** is \`\`${guildPrefix}\`\``})
                .addFields({ name: `📂 Categories`, value: `> ${categoryList}`})
                .addFields({ name: "🔗 Support Server", value: `> Join our [support server](${client.config.botServerInvite}) for help`})
                .addFields({ name: "💬 Feedback", value: "> Use `/suggestion` to send feedback and suggestions"})
           
                .setTimestamp();
                
                interaction.client.helpData = {
                    slashCommandCategories,
                    prefixCommandCategories,
                    guildPrefix
                };
                
                await interaction.reply({ embeds: [embed], components: [categorySelectMenu, switchToPrefixRow], flags: MessageFlags.Ephemeral });
                break;
        }
    }
};