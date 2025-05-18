const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require(`discord.js`);

module.exports = {
    adminOnly: true,
    data: new SlashCommandBuilder()
    .setName('greet')
    
    .setDescription('This is greeting message.'),
    async execute (interaction) {

       if(interaction.member.id !== '375931932036431873') return interaction.reply({ content: 'this command is locked under the owner', ephemeral: true})
         
        const embed = new EmbedBuilder()
        .setTitle(`Welcome to ${interaction.guild.name}!`)
        .setDescription('Welcome to our server! We made this a safe place for everyone to have fun and be ourselves! You can chat, play, or do whatever you want here. I hope we can make a bunch of lifelong friends and have fun together!\nIf you ever need any help, do contact one of the Mods to get assistance by opening a ticket [here](https://discord.com/channels/1156775942224625684/1254293721130860554) (DMs are **NOT** allowed).')

        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('butt1')
            .setLabel('Server Rules')
            .setEmoji('<a:megashout:1275974971398684715>')
            .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()        
            .setCustomId('butt2')
            .setLabel('🪄 Getting Started')
            .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
            .setCustomId('butt3')
            .setLabel('✨ Server Perks')
            .setStyle(ButtonStyle.Primary)
        );

        await interaction.reply({ content: 'Your greeting message has been sent!', flags: MessageFlags.Ephemeral})

        await interaction.channel.send({ embeds: [embed], components: [button] });
    }
}